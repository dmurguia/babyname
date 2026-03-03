# BabyName Backend

Production-ready starting point for a public baby-name analysis project based on SSA national baby name files.

## What this includes

- Clean folder structure for publishing.
- SSA dataset stored under `data/ssa/national`.
- FastAPI backend for analysis and chat-style query routing.
- Sync tooling to refresh data from official SSA source.
- Local-only `private/` folder excluded from git.

## Quickstart

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -e .
uvicorn babyname_api.main:app --reload
```

Then open: `http://127.0.0.1:8000/docs`

## Key endpoints

- `GET /health`
- `POST /dataset/refresh`
- `POST /analysis/top-names-by-decade`
- `POST /analysis/name-timeline`
- `POST /chat/query`

## Example request

```bash
curl -X POST http://127.0.0.1:8000/chat/query \
  -H 'Content-Type: application/json' \
  -d '{"query":"Show me the top ten popular names from each decade"}'
```

## Data provenance

See [docs/source_of_truth.md](docs/source_of_truth.md).

## Privacy for personal scripts

Personal analysis scripts are in `private/legacy_analysis/` and ignored via `.gitignore`.
