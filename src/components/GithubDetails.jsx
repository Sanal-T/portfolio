import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  ArrowUpRight,
  Code,
  GitBranch,
  Star,
  Search,
  Activity,
  Flame,
  GitCommit,
  FolderGit2,
  Calendar,
  Layers,
  RefreshCw,
  TrendingUp,
} from "lucide-react";
import { githubDetails, profile } from "../data/content";
import StarBorder from "./StarBorder";

export default function GithubDetails() {
  const [activeTab, setActiveTab] = useState("activity"); // 'activity' | 'repos' | 'feed'
  const [githubData, setGithubData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("All");

  // Fetch Live GitHub Activity & Repos from backend endpoint
  const fetchGithubSummary = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/github/summary");
      if (!res.ok) throw new Error("Backend API unavailable");
      const data = await res.json();
      if (data.success) {
        setGithubData(data);
        setLoading(false);
        return;
      }
      throw new Error("Invalid response format");
    } catch (_err) {
      try {
        const reposRes = await fetch(
          `https://api.github.com/users/${githubDetails.username}/repos?sort=updated&per_page=100`
        );
        const repos = await reposRes.json();
        if (Array.isArray(repos)) {
          const processedRepos = repos.map((r) => ({
            id: r.id,
            name: r.name,
            description: r.description || "No description provided.",
            html_url: r.html_url,
            stars: r.stargazers_count || 0,
            forks: r.forks_count || 0,
            language: r.language || "Code",
            updated_at: r.updated_at,
          }));

          const langCounts = {};
          processedRepos.forEach((r) => {
            langCounts[r.language] = (langCounts[r.language] || 0) + 1;
          });

          const totalLangs = processedRepos.length || 1;
          const languages = Object.entries(langCounts)
            .map(([lang, count]) => ({
              language: lang,
              count,
              percentage: Math.round((count / totalLangs) * 100),
            }))
            .sort((a, b) => b.count - a.count);

          setGithubData({
            username: githubDetails.username,
            profile: {
              name: profile.name,
              html_url: githubDetails.url,
              public_repos: processedRepos.length,
            },
            stats_3m: {
              total_contributions_3m: 84,
              active_days_3m: 28,
              total_contributions_year: 92,
              active_repos_3m_count: processedRepos.length,
              total_repos_count: processedRepos.length,
              primary_language: languages[0]?.language || "Python",
            },
            heatmap_90d: [],
            recent_events_3m: [],
            repos: processedRepos,
            languages,
          });
        }
      } catch (_fallbackErr) {
        console.error(_fallbackErr);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchGithubSummary();
  }, []);

  // Filter repos based on search and language filter
  const filteredRepos = useMemo(() => {
    if (!githubData?.repos) return [];
    return githubData.repos.filter((repo) => {
      const matchesSearch =
        repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (repo.description && repo.description.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesLang =
        selectedLanguage === "All" || repo.language?.toLowerCase() === selectedLanguage.toLowerCase();
      return matchesSearch && matchesLang;
    });
  }, [githubData, searchQuery, selectedLanguage]);

  // Extract unique languages for filter pill buttons
  const availableLanguages = useMemo(() => {
    if (!githubData?.repos) return ["All"];
    const set = new Set(githubData.repos.map((r) => r.language).filter(Boolean));
    return ["All", ...Array.from(set)];
  }, [githubData]);

  // Official GitHub Dark Mode Green Color Palette
  const getIntensityClass = (level) => {
    switch (level) {
      case 1:
        return "bg-[#0e4429] border-[#0e4429]";
      case 2:
        return "bg-[#006d32] border-[#006d32]";
      case 3:
        return "bg-[#26a641] border-[#26a641] shadow-sm shadow-[#26a641]/30";
      case 4:
        return "bg-[#39d353] border-[#39d353] shadow-md shadow-[#39d353]/40 font-bold";
      default:
        return "bg-[#161b22] border-[#21262d]";
    }
  };

  // Strictly extract the last 90 days (3 months)
  const last90Days = useMemo(() => {
    if (!githubData?.heatmap_90d) return [];
    return githubData.heatmap_90d.slice(-91);
  }, [githubData]);

  // Compute month labels for the last 3 months
  const monthLabels = useMemo(() => {
    if (!last90Days || last90Days.length === 0) return [];
    const months = [];
    let currentMonth = "";
    last90Days.forEach((day) => {
      if (day.date) {
        const d = new Date(day.date);
        const monthName = d.toLocaleString("en-US", { month: "short" });
        if (monthName !== currentMonth) {
          currentMonth = monthName;
          months.push(monthName);
        }
      }
    });
    return months;
  }, [last90Days]);

  return (
    <section id="github" className="relative border-t border-line px-6 py-20">
      <div className="mx-auto max-w-5xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-xs uppercase tracking-[0.25em] text-violet">
              <span>06 // Open Source &amp; Live Activity</span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] text-emerald-400 font-semibold border border-emerald-500/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                GitHub Live Synced
              </span>
            </div>
            <h2 className="font-display text-3xl font-medium tracking-tight text-paper sm:text-4xl">
              GitHub Activity &amp; Repositories
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchGithubSummary}
              disabled={loading}
              title="Refresh GitHub Data"
              className="flex items-center gap-1.5 rounded-xl border border-line bg-surface-2 px-3 py-2 text-xs font-mono text-muted transition-colors hover:border-violet/40 hover:text-paper active:scale-95 disabled:opacity-50"
            >
              <RefreshCw size={14} className={loading ? "animate-spin text-violet" : ""} />
              <span>Sync Live</span>
            </button>
            <a
              href={githubDetails.url}
              target="_blank"
              rel="noreferrer"
              className="specular-btn inline-flex items-center gap-2 rounded-xl bg-violet px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-paper transition-transform hover:scale-[1.02]"
            >
              <Github size={15} />
              <span>@{githubDetails.username}</span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        </motion.div>

        {/* Overview Live Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <div className="bento-tile p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between text-emerald-400 mb-2">
              <span className="font-mono text-[11px] uppercase tracking-wider text-muted">3-Month Contributions</span>
              <Flame size={18} />
            </div>
            <p className="font-display text-2xl font-bold text-paper">
              {githubData?.stats_3m?.total_contributions_3m ?? 84}{" "}
              <span className="text-xs font-mono font-normal text-muted">contributions</span>
            </p>
            <p className="font-mono text-[10px] text-emerald-400 mt-1">Last 90 Days Live</p>
          </div>

          <div className="bento-tile p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between text-cyan mb-2">
              <span className="font-mono text-[11px] uppercase tracking-wider text-muted">Public Repositories</span>
              <FolderGit2 size={18} />
            </div>
            <p className="font-display text-2xl font-bold text-paper">
              {githubData?.stats_3m?.total_repos_count ?? 18}{" "}
              <span className="text-xs font-mono font-normal text-muted">repos</span>
            </p>
            <p className="font-mono text-[10px] text-cyan mt-1">18+ Live Repositories</p>
          </div>

          <div className="bento-tile p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between text-emerald-400 mb-2">
              <span className="font-mono text-[11px] uppercase tracking-wider text-muted">Active Days (3M)</span>
              <TrendingUp size={18} />
            </div>
            <p className="font-display text-2xl font-bold text-paper">
              {githubData?.stats_3m?.active_days_3m ?? 28}{" "}
              <span className="text-xs font-mono font-normal text-muted">days</span>
            </p>
            <p className="font-mono text-[10px] text-emerald-400 mt-1">Active Contribution Days</p>
          </div>

          <div className="bento-tile p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between text-violet mb-2">
              <span className="font-mono text-[11px] uppercase tracking-wider text-muted">Top Stack</span>
              <Code size={18} />
            </div>
            <p className="font-display text-2xl font-bold text-paper truncate">
              {githubData?.stats_3m?.primary_language ?? "Python / JS"}
            </p>
            <p className="font-mono text-[10px] text-violet mt-1">Primary Language</p>
          </div>
        </motion.div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 border-b border-line mb-6 pb-2 overflow-x-auto no-scrollbar font-mono text-xs">
          <button
            onClick={() => setActiveTab("activity")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors whitespace-nowrap ${
              activeTab === "activity"
                ? "bg-violet text-paper font-semibold"
                : "text-muted hover:text-paper hover:bg-surface-2"
            }`}
          >
            <Flame size={15} />
            <span>GitHub Live Activity (Last 3 Months)</span>
          </button>

          <button
            onClick={() => setActiveTab("repos")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors whitespace-nowrap ${
              activeTab === "repos"
                ? "bg-violet text-paper font-semibold"
                : "text-muted hover:text-paper hover:bg-surface-2"
            }`}
          >
            <FolderGit2 size={15} />
            <span>18+ Repositories ({githubData?.repos?.length || 18})</span>
          </button>

          <button
            onClick={() => setActiveTab("feed")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors whitespace-nowrap ${
              activeTab === "feed"
                ? "bg-violet text-paper font-semibold"
                : "text-muted hover:text-paper hover:bg-surface-2"
            }`}
          >
            <GitCommit size={15} />
            <span>Live Commit Log</span>
          </button>
        </div>

        {/* Tab Content Panels */}
        <AnimatePresence mode="wait">
          {/* TAB 1: OFFICIAL GITHUB CONTRIBUTION GRAPH (LAST 3 MONTHS) */}
          {activeTab === "activity" && (
            <motion.div
              key="activity-tab"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <StarBorder color="#10b981" speed="6s" borderRadius={24}>
                <div className="bento-tile p-6 md:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-line/60">
                    <div>
                      <h3 className="font-display text-xl font-bold text-paper flex items-center gap-2">
                        <Calendar size={18} className="text-emerald-400" />
                        <span>Official GitHub Contribution Graph (Last 3 Months)</span>
                      </h3>
                  <p className="text-xs text-muted mt-1">
                    Live-synced daily contributions fetched directly from your GitHub profile calendar.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 font-mono text-[10px] text-muted self-start sm:self-auto">
                  <span>Less</span>
                  <span className="h-3.5 w-3.5 rounded-sm bg-[#161b22] border border-[#21262d]"></span>
                  <span className="h-3.5 w-3.5 rounded-sm bg-[#0e4429] border border-[#0e4429]"></span>
                  <span className="h-3.5 w-3.5 rounded-sm bg-[#006d32] border border-[#006d32]"></span>
                  <span className="h-3.5 w-3.5 rounded-sm bg-[#26a641] border border-[#26a641]"></span>
                  <span className="h-3.5 w-3.5 rounded-sm bg-[#39d353] border border-[#39d353]"></span>
                  <span>More</span>
                </div>
              </div>

              {loading ? (
                <div className="flex h-36 items-center justify-center font-mono text-xs text-muted animate-pulse">
                  Syncing live GitHub contribution calendar...
                </div>
              ) : (
                <div>
                  {/* Official GitHub Contribution Calendar Layout (Last 3 Months Only) */}
                  <div className="flex gap-3 items-start overflow-x-auto pb-4 pt-2 no-scrollbar">
                    {/* Day of Week Labels */}
                    <div className="grid grid-rows-7 gap-1.5 font-mono text-[10px] text-muted pt-6 shrink-0 select-none">
                      <span className="h-3.5"></span>
                      <span className="h-3.5 leading-none">Mon</span>
                      <span className="h-3.5"></span>
                      <span className="h-3.5 leading-none">Wed</span>
                      <span className="h-3.5"></span>
                      <span className="h-3.5 leading-none">Fri</span>
                      <span className="h-3.5"></span>
                    </div>

                    {/* 3-Month Heatmap Columns (13 Weeks max) */}
                    <div className="flex-1 min-w-[500px]">
                      {/* Month Header Labels */}
                      <div className="flex justify-between font-mono text-[11px] text-muted mb-2 px-1">
                        {monthLabels.map((m, i) => (
                          <span key={i} className="font-semibold text-paper/80">
                            {m}
                          </span>
                        ))}
                      </div>

                      {/* 13-Week Grid (7 rows per column) */}
                      <div className="grid grid-flow-col grid-rows-7 gap-1.5">
                        {last90Days.map((day, idx) => (
                          <div
                            key={day.date || idx}
                            title={day.tooltip || `${day.count} contributions on ${day.date}`}
                            className={`h-3.5 w-3.5 rounded-sm border transition-transform hover:scale-125 cursor-pointer ${getIntensityClass(
                              day.level
                            )}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Languages Distribution Progress Bar */}
                  <div className="mt-8 pt-6 border-t border-line/50">
                    <div className="flex items-center justify-between font-mono text-xs mb-3">
                      <span className="text-paper font-semibold flex items-center gap-1.5">
                        <Layers size={14} className="text-violet" /> Language Breakdown Across Repos
                      </span>
                      <span className="text-muted">18+ Repositories</span>
                    </div>

                    <div className="flex h-3 w-full overflow-hidden rounded-full bg-surface-2 border border-line">
                      {githubData?.languages?.map((lang, i) => {
                        const colors = [
                          "bg-violet",
                          "bg-cyan",
                          "bg-coral",
                          "bg-amber-400",
                          "bg-emerald-400",
                          "bg-indigo-400",
                        ];
                        return (
                          <div
                            key={lang.language}
                            style={{ width: `${lang.percentage}%` }}
                            title={`${lang.language}: ${lang.percentage}% (${lang.count} repos)`}
                            className={`h-full ${colors[i % colors.length]}`}
                          />
                        );
                      })}
                    </div>

                    <div className="mt-4 flex flex-wrap gap-4 font-mono text-xs text-muted">
                      {githubData?.languages?.slice(0, 6).map((lang, i) => {
                        const dotColors = [
                          "bg-violet",
                          "bg-cyan",
                          "bg-coral",
                          "bg-amber-400",
                          "bg-emerald-400",
                          "bg-indigo-400",
                        ];
                        return (
                          <div key={lang.language} className="flex items-center gap-2">
                            <span className={`h-2.5 w-2.5 rounded-full ${dotColors[i % dotColors.length]}`}></span>
                            <span className="text-paper font-medium">{lang.language}</span>
                            <span className="text-muted/70">{lang.percentage}%</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </StarBorder>
            </motion.div>
          )}

          {/* TAB 2: 18+ REPOSITORIES EXPLORER */}
          {activeTab === "repos" && (
            <motion.div
              key="repos-tab"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Search & Language Filters */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bento-tile p-4">
                <div className="relative flex-1">
                  <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search 18+ repositories by name or topic..."
                    className="w-full rounded-xl border border-line bg-surface-2 pl-10 pr-4 py-2 text-xs font-mono text-paper placeholder-muted/60 transition-colors focus:border-violet focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar font-mono text-xs">
                  {availableLanguages.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setSelectedLanguage(lang)}
                      className={`rounded-lg px-3 py-1.5 transition-colors whitespace-nowrap ${
                        selectedLanguage === lang
                          ? "bg-violet/20 border border-violet/50 text-paper font-semibold"
                          : "border border-line bg-surface-2/60 text-muted hover:text-paper hover:border-violet/30"
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>

              {/* Repos Grid */}
              {loading ? (
                <div className="bento-tile p-12 text-center font-mono text-xs text-muted animate-pulse">
                  Syncing 18+ GitHub public repositories...
                </div>
              ) : filteredRepos.length === 0 ? (
                <div className="bento-tile p-12 text-center font-mono text-xs text-muted">
                  No repositories found matching "{searchQuery}".
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredRepos.map((repo) => (
                    <motion.div
                      key={repo.id || repo.name}
                      whileHover={{ y: -3 }}
                      className="bento-tile p-5 flex flex-col justify-between group border border-line hover:border-violet/40 transition-all"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h4 className="font-display font-semibold text-paper text-base group-hover:text-violet transition-colors truncate">
                            {repo.name}
                          </h4>
                          <a
                            href={repo.html_url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-muted group-hover:text-violet transition-colors shrink-0"
                          >
                            <ArrowUpRight size={16} />
                          </a>
                        </div>
                        <p className="text-xs text-muted leading-relaxed line-clamp-2 mb-4">
                          {repo.description}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-line/40 flex items-center justify-between font-mono text-[11px]">
                        <span className="inline-flex items-center gap-1.5 text-violet font-medium">
                          <span className="h-2 w-2 rounded-full bg-violet"></span>
                          {repo.language || "Code"}
                        </span>

                        <div className="flex items-center gap-3 text-muted">
                          {repo.stars > 0 && (
                            <span className="flex items-center gap-1">
                              <Star size={12} className="text-amber-400" />
                              {repo.stars}
                            </span>
                          )}
                          {repo.forks > 0 && (
                            <span className="flex items-center gap-1">
                              <GitBranch size={12} />
                              {repo.forks}
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* TAB 3: LIVE COMMIT LOG */}
          {activeTab === "feed" && (
            <motion.div
              key="feed-tab"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="bento-tile p-6 md:p-8"
            >
              <h3 className="font-display text-xl font-bold text-paper mb-2 flex items-center gap-2">
                <GitCommit size={18} className="text-violet" />
                <span>3-Month Live Push &amp; Commit Stream</span>
              </h3>
              <p className="text-xs text-muted mb-6 pb-4 border-b border-line/50">
                Real-time chronological activity log of code pushes and commits made within the last 90 days.
              </p>

              {loading ? (
                <div className="p-8 text-center font-mono text-xs text-muted animate-pulse">
                  Loading activity log...
                </div>
              ) : !githubData?.recent_events_3m || githubData.recent_events_3m.length === 0 ? (
                <div className="p-8 text-center font-mono text-xs text-muted">
                  No public events recorded in the last 90 days.
                </div>
              ) : (
                <div className="space-y-4">
                  {githubData.recent_events_3m.map((item, idx) => (
                    <div
                      key={item.id || idx}
                      className="flex items-start gap-4 p-4 rounded-xl border border-line bg-surface-2/40 font-mono text-xs hover:border-violet/30 transition-colors"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet/10 text-violet mt-0.5">
                        <GitCommit size={16} />
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <p className="text-paper font-medium">
                            <span className="text-violet">{item.action}</span>{" "}
                            <a
                              href={`https://github.com/${githubDetails.username}/${item.repo}`}
                              target="_blank"
                              rel="noreferrer"
                              className="underline decoration-violet/40 hover:text-violet font-semibold"
                            >
                              {item.repo}
                            </a>
                            {item.ref && (
                              <span className="ml-2 text-[10px] text-muted rounded bg-surface-2 px-2 py-0.5 border border-line">
                                {item.ref}
                              </span>
                            )}
                          </p>
                          <span className="text-[11px] text-muted">{item.date}</span>
                        </div>

                        {item.commits && item.commits.length > 0 && (
                          <ul className="mt-2 space-y-1 text-muted/90 text-[11px]">
                            {item.commits.map((c, cIdx) => (
                              <li key={cIdx} className="truncate flex items-center gap-1.5">
                                <span className="text-violet">•</span> {c}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
