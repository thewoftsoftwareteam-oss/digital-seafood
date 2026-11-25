# Project Task Board (`digital-seafood`)

Shared task queue managed by **`coordinator`**, implemented by **`developer`**, and verified by **`reviewer`**.

**Allowed Statuses**: `TODO` -> `IN_PROGRESS` -> `IN_REVIEW` -> `CHANGES_REQUESTED` -> `APPROVED` -> `DONE`

---

## Active Tasks

_No active feature tasks queued yet. Ask `coordinator` to create and assign tasks here._

| ID | Title | Assignee | Reviewer | Status | Acceptance Criteria |
| :--- | :--- | :--- | :--- | :--- | :--- |
| — | — | — | — | — | — |

---

## Completed Tasks

| ID | Title | Assignee | Reviewer | Status | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `T-05` | Redesign sticky bottom selection bar as floating rounded dock (`SelectionSheet.jsx` & `App.jsx`) | `developer` | `reviewer` | `DONE` | Floating rounded dock (`bottom-3 left-3 right-3`, `rounded-2xl`), unified expand/collapse left trigger with inline chevron chip, refined icon tile + ring-cutout count pill, 2-line responsive USD/KHR typography, polished CTA pill, and `pb-28 sm:pb-32` clearance in `App.jsx`. `[APPROVED]` by `reviewer`. |
| `T-01` | Fix `SelectionContext` immutable updates, `.slice`, and `ItemDetailModal` key | `developer` | `reviewer` | `DONE` | Immutable `addItem` update (`SelectionContext.jsx`), `.slice(2, 6)`, and `key={activeItemModal.id}` on `<ItemDetailModal />` (`App.jsx`). `[APPROVED]` by `reviewer`. |
| `T-02` | Fix `ItemDetailModal` mobile layout, fallback image, accessibility & solid styling | `developer` | `reviewer` | `DONE` | Pinned `flex-shrink-0` header/footer, scrollable `flex-1 overflow-y-auto min-h-0` body, `onError` image fallback, 360px-safe footer, backdrop & `Escape` close, solid Dark/Light styling. `[APPROVED]` by `reviewer`. |
| `T-03` | Fix `SelectionSheet` & `CallWaiterModal` Dark/Light contrast, localization, drawer layering & empty states | `developer` | `reviewer` | `DONE` | Fixed dark badge contrast, localized all labels via `LanguageContext.jsx`, raised drawer to `z-50`, added backdrop/`Escape` close, auto-reset `isOpen` when empty, added empty guard & dual-currency per-row pricing in `CallWaiterModal.jsx`. `[APPROVED]` by `reviewer`. |
| `T-04` | Fix `MenuCard` dead `xs` breakpoint and make whole card cleanly clickable without nested buttons | `developer` | `reviewer` | `DONE` | Replaced dead `hidden xs:block` with `hidden sm:line-clamp-2`, made card clickable via non-nested sibling interactive controls + keyboard support. `[APPROVED]` by `reviewer`. |
| `SETUP-01` | Configure 3-agent team (`coordinator`, `developer`, `reviewer`) with inter-agent pass permissions | `coordinator` | `reviewer` | `DONE` | Agent docs in `agents/`, `TASKS.md`, `AGENTS.md`, and session subagents configured. |
