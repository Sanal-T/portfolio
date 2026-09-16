"""
GitHub Live Activity & Repositories Router.

Live-syncs official GitHub contribution data from https://github.com/users/Sanal-T/contributions,
along with public repositories (18+ repos) and event streams.
Filters activity strictly for the last 3 months (90 days).
"""

from datetime import datetime, timedelta, timezone
from typing import Any, Dict, List, Optional
import urllib.request
import json
import re
import time

from fastapi import APIRouter

router = APIRouter(prefix="/api/github", tags=["github"])

GITHUB_USERNAME = "Sanal-T"
CACHE_TTL_SECONDS = 300  # 5 minutes cache

_cache_data: Optional[Dict[str, Any]] = None
_cache_timestamp: float = 0.0


def fetch_official_github_contributions() -> Dict[str, Any]:
    """Fetch and parse official GitHub contribution graph HTML for the user."""
    url = f"https://github.com/users/{GITHUB_USERNAME}/contributions"
    req = urllib.request.Request(
        url,
        headers={
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        },
    )
    try:
        with urllib.request.urlopen(req, timeout=10) as response:
            if response.status == 200:
                html = response.read().decode("utf-8")
                
                # Match TD elements: data-date, id, data-level
                td_items = re.findall(
                    r'data-date="(\d{4}-\d{2}-\d{2})"[^>]*id="([^"]+)"[^>]*data-level="(\d+)"',
                    html,
                )
                tooltips = dict(re.findall(r'for="([^"]+)"[^>]*>(.*?)</tool-tip>', html))

                daily_contributions = []
                for date_str, comp_id, level_str in td_items:
                    tooltip_text = tooltips.get(comp_id, "")
                    count = 0
                    if "contribution" in tooltip_text and not tooltip_text.startswith("No "):
                        m = re.search(r"(\d+)\s+contribution", tooltip_text)
                        if m:
                            count = int(m.group(1))
                    
                    daily_contributions.append({
                        "date": date_str,
                        "level": int(level_str),
                        "count": count,
                        "tooltip": tooltip_text or f"{count} contributions on {date_str}",
                    })

                # Sort chronologically by date
                daily_contributions.sort(key=lambda x: x["date"])
                return {"success": True, "contributions": daily_contributions}
    except Exception as exc:
        print(f"[WARNING] Failed to fetch official GitHub contributions HTML: {exc}")
    
    return {"success": False, "contributions": []}


def fetch_github_api(endpoint: str) -> Optional[Any]:
    url = f"https://api.github.com/{endpoint}"
    req = urllib.request.Request(
        url,
        headers={
            "User-Agent": "FastAPI-Portfolio-App",
            "Accept": "application/vnd.github.v3+json",
        },
    )
    try:
        with urllib.request.urlopen(req, timeout=10) as response:
            if response.status == 200:
                return json.loads(response.read().decode("utf-8"))
    except Exception as exc:
        print(f"[WARNING] Failed to fetch GitHub API '{endpoint}': {exc}")
    return None


@router.get("/summary")
def get_github_summary() -> Dict[str, Any]:
    global _cache_data, _cache_timestamp

    now_time = time.time()
    if _cache_data is not None and (now_time - _cache_timestamp) < CACHE_TTL_SECONDS:
        return _cache_data

    # 1. Fetch Official Contribution Graph Data from GitHub
    official_contrib_res = fetch_official_github_contributions()
    all_contributions = official_contrib_res.get("contributions", [])

    # Filter for the last 90 days (3 months)
    now_dt = datetime.now(timezone.utc)
    ninety_days_ago_str = (now_dt - timedelta(days=90)).strftime("%Y-%m-%d")
    
    heatmap_90d = [c for c in all_contributions if c["date"] >= ninety_days_ago_str]
    if len(heatmap_90d) < 90 and all_contributions:
        heatmap_90d = all_contributions[-90:]  # Fallback to latest 90 entries

    total_contributions_3m = sum(c["count"] for c in heatmap_90d)
    active_days_3m = sum(1 for c in heatmap_90d if c["count"] > 0)
    total_contributions_year = sum(c["count"] for c in all_contributions)

    # 2. Fetch User Profile & Repositories (18+ repos)
    user_data = fetch_github_api(f"users/{GITHUB_USERNAME}") or {}
    repos_raw = fetch_github_api(f"users/{GITHUB_USERNAME}/repos?sort=updated&per_page=100") or []
    events_raw = fetch_github_api(f"users/{GITHUB_USERNAME}/events?per_page=100") or []

    # Process Repositories
    processed_repos: List[Dict[str, Any]] = []
    language_counts: Dict[str, int] = {}
    
    for r in repos_raw:
        lang = r.get("language") or "Code"
        language_counts[lang] = language_counts.get(lang, 0) + 1

        processed_repos.append({
            "id": r.get("id"),
            "name": r.get("name"),
            "full_name": r.get("full_name"),
            "description": r.get("description") or "No description provided.",
            "html_url": r.get("html_url"),
            "stars": r.get("stargazers_count", 0),
            "forks": r.get("forks_count", 0),
            "language": lang,
            "updated_at": r.get("updated_at"),
            "created_at": r.get("created_at"),
            "pushed_at": r.get("pushed_at"),
            "topics": r.get("topics", []),
            "is_fork": r.get("fork", False),
        })

    # Process Recent Events for the Feed
    recent_events: List[Dict[str, Any]] = []
    active_repos_in_3m = set()

    for ev in events_raw:
        created_str = ev.get("created_at", "")
        if not created_str:
            continue
        
        date_key = created_str.split("T")[0]
        if date_key >= ninety_days_ago_str:
            repo_name = ev.get("repo", {}).get("name", "").replace(f"{GITHUB_USERNAME}/", "")
            if repo_name:
                active_repos_in_3m.add(repo_name)

            ev_type = ev.get("type", "Event")
            action_desc = "Pushed code to" if ev_type == "PushEvent" else ("Created repo" if ev_type == "CreateEvent" else "Updated")
            
            payload = ev.get("payload", {})
            commits = payload.get("commits", [])
            commit_msgs = [c.get("message", "") for c in commits if c.get("message")]

            recent_events.append({
                "id": ev.get("id"),
                "type": ev_type,
                "repo": repo_name or ev.get("repo", {}).get("name"),
                "action": action_desc,
                "date": date_key,
                "timestamp": created_str,
                "commits": commit_msgs,
                "ref": payload.get("ref", "").replace("refs/heads/", ""),
            })

    # Calculate Language Percentages
    total_langs = sum(language_counts.values()) or 1
    language_percentages = [
        {
            "language": lang,
            "count": count,
            "percentage": round((count / total_langs) * 100, 1),
        }
        for lang, count in sorted(language_counts.items(), key=lambda x: x[1], reverse=True)
    ]

    summary = {
        "success": True,
        "username": GITHUB_USERNAME,
        "profile": {
            "name": user_data.get("name", GITHUB_USERNAME),
            "avatar_url": user_data.get("avatar_url"),
            "bio": user_data.get("bio"),
            "public_repos": user_data.get("public_repos", len(processed_repos)),
            "followers": user_data.get("followers", 0),
            "following": user_data.get("following", 0),
            "html_url": user_data.get("html_url", f"https://github.com/{GITHUB_USERNAME}"),
        },
        "stats_3m": {
            "total_contributions_3m": total_contributions_3m,
            "active_days_3m": active_days_3m,
            "total_contributions_year": total_contributions_year,
            "active_repos_3m_count": len(active_repos_in_3m) or len(processed_repos[:5]),
            "total_repos_count": len(processed_repos),
            "primary_language": language_percentages[0]["language"] if language_percentages else "Python",
        },
        "heatmap_90d": heatmap_90d,
        "recent_events_3m": recent_events[:20],
        "repos": processed_repos,
        "languages": language_percentages,
    }

    _cache_data = summary
    _cache_timestamp = now_time

    return summary
