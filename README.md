# Sanal T. — Portfolio

A premium, dark, editorial AI-engineering portfolio.

## Architecture

Deliberately simple hybrid setup:

- **Frontend** — single `index.html` (HTML/CSS/vanilla JS). No framework.
- **Backend** — FastAPI, used only for what genuinely needs a server: currently
  just the contact form's email delivery.

```text
sanal-portfolio/
├── index.html              # entire frontend
├── backend/
│   ├── main.py              # app entrypoint, serves index.html + API
│   ├── config.py            # env-based settings
│   ├── routes/
│   │   └── contact.py        # POST /api/contact
│   └── services/
│       └── email_service.py  # SMTP delivery logic
├── requirements.txt
├── .env.example
└── .env                     # not committed
```

## Running locally

```bash
python -m venv .venv
source .venv/bin/activate       # Windows: .venv\Scripts\activate
pip install -r requirements.txt

cp .env.example .env            # then fill in real SMTP + recipient values
cd backend
uvicorn main:app --reload --port 8000
```

Visit `http://localhost:8000` — it serves `index.html` directly and exposes
`POST /api/contact` for the contact form.

## Known placeholders

- SMTP credentials in `.env` — still empty, needed for the contact form to
  actually send email (see below)
- Contribution graph on the "Always Building" section — illustrative
  placeholder pattern, not real GitHub activity, until GitHub API
  integration is added

Email, LinkedIn, and GitHub links in `index.html` are filled in with real
values.

## Contact form flow

```text
index.html (form) → fetch('/api/contact') → FastAPI route
  → services/email_service.py → SMTP → your inbox
```

Validation happens both client-side (required fields) and server-side
(Pydantic model + sanitization) — the backend never trusts the frontend
alone.
