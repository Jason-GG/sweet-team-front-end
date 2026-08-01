# SweetTea Frontend — Optimized Build Plan

## 1. Project Goal

Build a responsive community booth-listing web app inspired by the SweetTea reference UI.

The first usable release should let a user:
- Navigate between primary sections from a sidebar.
- Browse official and community booths.
- Filter booths by category.
- View a clean mobile-friendly layout.

## 2. MVP Scope

### In scope for v1
- App shell with sidebar and topbar.
- Base routes: Home, Booths, Groups, Chat, My Town, Guide, Profile.
- Booth listing page with:
    - category tabs
    - official/community section split
    - booth cards
    - loading, empty, and error states
- Mock data for booths.
- Responsive behavior for desktop and mobile.

### Out of scope for v1
- Authentication.
- Real backend integration.
- Live chat.
- Form-heavy flows.
- Localization beyond keeping copy easy to extract later.

## 3. Recommended Tech Decisions

| Concern | Choice | Notes |
|---|---|---|
| Build tool | Vite | Fast local dev and straightforward React setup |
| Language | TypeScript | Keep strict mode on |
| Routing | React Router | Route-per-page structure |
| Styling | Tailwind CSS | Good fit for fast UI iteration |
| Server state | React Query | Use once real API calls exist |
| Local UI state | Zustand | Only add if component state becomes awkward |
| Forms | React Hook Form + Zod | Defer until a real form exists |
| Icons | lucide-react | Lightweight and consistent |

Optimization note: do not introduce React Query, Zustand, React Hook Form, or Zod on day one unless the first slice actually needs them. Start lean, then add them when the app earns the complexity.

## 4. Build Order

### Phase 1 — Scaffold the app
- [ ] Create Vite React + TypeScript app in this repository.
- [ ] Add Tailwind CSS.
- [ ] Set up strict TypeScript, path aliases if desired, and basic linting.
- [ ] Add React Router and the base page routes.

### Phase 2 — Build the layout shell
- [ ] Create `AppLayout.tsx` with sidebar and content area.
- [ ] Create `Sidebar.tsx` with active route styling.
- [ ] Create `Topbar.tsx` with product branding.
- [ ] Ensure layout works on desktop before making it responsive.

### Phase 3 — Ship the core Booths experience
- [ ] Add mock booth data and types.
- [ ] Build `CategoryFilterTabs.tsx`.
- [ ] Build `OfficialBadge.tsx`.
- [ ] Build `BoothCard.tsx`.
- [ ] Build `BoothGrid.tsx` for official/community sections.
- [ ] Add client-side filtering.
- [ ] Add loading, empty, and error states.

### Phase 4 — Fill supporting routes
- [ ] Add lightweight placeholder pages for Home, Groups, Chat, My Town, Guide, and Profile.
- [ ] Promote only the Booths page to production-quality UI in the first pass.

### Phase 5 — Polish and harden
- [ ] Add responsive sidebar behavior.
- [ ] Improve keyboard focus states and ARIA labels.
- [ ] Add a route-level error boundary.
- [ ] Add basic tests for routing and booth filtering.

## 5. Suggested Folder Structure

Start smaller than the final target. Expand only when needed.

```text
src/
├── main.tsx
├── App.tsx
├── routes/
│   └── index.tsx
├── components/
│   └── layout/
│       ├── AppLayout.tsx
│       ├── Sidebar.tsx
│       └── Topbar.tsx
├── pages/
│   ├── Home/
│   ├── Booths/
│   ├── Groups/
│   ├── Chat/
│   ├── MyTown/
│   ├── Guide/
│   └── Profile/
├── features/
│   └── booths/
│       ├── api/
│       │   └── boothsApi.ts
│       ├── components/
│       │   ├── BoothCard.tsx
│       │   ├── BoothGrid.tsx
│       │   ├── CategoryFilterTabs.tsx
│       │   └── OfficialBadge.tsx
│       ├── hooks/
│       │   └── useBooths.ts
│       ├── mocks/
│       │   └── booths.ts
│       └── types.ts
├── lib/
│   ├── constants.ts
│   └── utils.ts
└── styles/
        └── globals.css
```

Add these later only if needed:
- `store/`
- `hooks/`
- shared `ui/` primitives
- `apiClient.ts`
- global `types/`

## 6. Component Mapping

| UI element | Component |
|---|---|
| Left navigation | `Sidebar.tsx` |
| Top logo/header | `Topbar.tsx` |
| App frame | `AppLayout.tsx` |
| Category pills | `CategoryFilterTabs.tsx` |
| Individual booth card | `BoothCard.tsx` |
| Official badge | `OfficialBadge.tsx` |
| Official/community booth sections | `BoothGrid.tsx` |

## 7. Definition of Done for v1

The first release is done when:
- A new developer can install dependencies and run the app locally.
- Sidebar navigation works across all planned routes.
- The Booths page renders mock data with category filtering.
- Official and community booths are visually separated.
- The layout works on mobile and desktop.
- Empty and loading states exist for the Booths page.

## 8. Local Setup and Run

This repository currently contains only the plan file, so there is no runnable frontend yet. Use the steps below to scaffold and run it locally.

### Prerequisites
- Node.js 20 or newer
- npm 10 or newer

### Create the app in the current repository

Run these commands from the repository root:

```bash
npm create vite@latest . -- --template react-ts
npm install
npm install react-router-dom lucide-react
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

If you want React Query, Zustand, and form tooling immediately, add them after the base app works:

```bash
npm install @tanstack/react-query zustand react-hook-form zod @hookform/resolvers
```

### Start the local dev server

```bash
npm run dev
```

Vite will print a local URL, usually:

```text
http://localhost:5173/
```

### Production preview flow

```bash
npm run build
npm run preview
```

## 9. Immediate Next Tasks

1. Scaffold the Vite app in this repository.
2. Add Tailwind and router.
3. Build the layout shell.
4. Implement the Booths page with mock data.

## 10. Outstanding Decisions

- Should the first Booths data source be local mocks or a temporary JSON file served by Vite?
- Is authentication a hard requirement for v1, or can Profile stay as a static placeholder?
- Do you want testing in the first pass with Vitest + React Testing Library, or after the MVP UI is stable?