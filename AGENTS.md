# AGENTS.md

## Cursor Cloud specific instructions

### Project overview

A personal portfolio website (React 18 + Flask backend chatbot API). See `README.md` for full docs.

### Services

| Service | Command | Port | Notes |
|---------|---------|------|-------|
| React frontend (dev) | `npm start` | 3000 | CRA dev server with hot reload |
| Flask backend (chatbot) | `python3 backend/app.py` | 5000 | Keyword-matching Q&A API; frontend has local fallback |

### Non-obvious caveats

- Use `python3` (not `python`) — the VM does not alias `python` to Python 3.
- Flask packages install to `~/.local/lib/python3.12/site-packages` (user-level); `python3` picks them up automatically.
- The `homepage` field in `package.json` is set for GitHub Pages deployment. In development (`npm start`), CRA ignores it and serves at `/`. Do not change it for local dev.
- There are **no automated test files** in the project. `npm test` will exit with code 1 unless run with `--passWithNoTests`.
- ESLint config is inline in `package.json` (extends `react-app`). Run lint with `npx eslint src/`.
- No databases, Docker, or external API keys are required.

### Quick reference

```bash
# Install deps
npm install
pip install --user -r backend/requirements.txt

# Lint
npx eslint src/

# Build
npm run build

# Run (two terminals)
python3 backend/app.py          # backend on :5000
npm start                       # frontend on :3000
```
