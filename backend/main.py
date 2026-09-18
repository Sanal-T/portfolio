"""
FastAPI application entrypoint.

Serves the static portfolio (index.html) and the API routes. Keep this file
thin — route logic lives in routes/, business logic lives in services/.
"""

import sys
from pathlib import Path

# Ensure backend directory is in sys.path so imports like `import config` work from any working directory
BACKEND_DIR = Path(__file__).resolve().parent
if str(BACKEND_DIR) not in sys.path:
    sys.path.insert(0, str(BACKEND_DIR))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

from config import get_settings
from routes import contact, github

settings = get_settings()

app = FastAPI(title="Sanal T. — Portfolio API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins_list,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

app.include_router(contact.router)
app.include_router(github.router)

ROOT_DIR = Path(__file__).resolve().parent.parent
INDEX_FILE = ROOT_DIR / "index.html"


@app.get("/", include_in_schema=False)
def serve_index() -> FileResponse:
    return FileResponse(INDEX_FILE)


# Serve index.html for any other non-API path too (simple single-page setup).
# Mounted last so it never shadows /api routes above.
app.mount("/", StaticFiles(directory=ROOT_DIR, html=True), name="static")
