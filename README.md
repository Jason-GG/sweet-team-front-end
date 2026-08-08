# SweetTea Frontend

Frontend scaffold for the SweetTea community booth-listing app.

## Stack

- React 19
- TypeScript
- Vite
- React Router
- Tailwind CSS v4
- Lucide icons

## Local development

```bash
npm install
npm run dev
```

The local dev server usually runs at `http://localhost:5173`.

To point the frontend at a different backend host, set `VITE_API_BASE_URL` before starting Vite.

```bash
VITE_API_BASE_URL=http://127.0.0.1:8000 npm run dev
```

If your backend expects the auth endpoints to receive JSON with `Content-Type: text/plain`, the current API layer already sends those requests that way.

## Quality checks

```bash
npm run build
npm run lint
```

## Current setup status

- App shell with sidebar and topbar
- Base routes for all planned pages
- Mocked Booths page with category filtering
- Placeholder pages for the remaining sections

## Project structure

```text
src/
├── components/
│   ├── layout/
│   └── ui/
├── features/
│   └── booths/
├── lib/
├── pages/
├── routes/
└── styles/
```
