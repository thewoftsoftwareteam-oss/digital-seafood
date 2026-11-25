# Development Log — Digital Seafood Menu (`digital-seafood`)

Living project reference and chronological development log to make future updates, handoffs, and maintenance fast and safe.

---

## 1. Project Snapshot

| Item | Value |
| :--- | :--- |
| **App Name** | គ្រឿងសមុទ្រអាំង \| Grilled Seafood Digital Menu (`digital-seafood`) |
| **Local Path** | `/Users/vanthiev/Documents/website/collaborate_ai` |
| **GitHub Repo** | `https://github.com/thewoftsoftwareteam-oss/digital-seafood.git` |
| **Live Site (GitHub Pages)** | `https://thewoftsoftwareteam-oss.github.io/digital-seafood/` |
| **Manager QR Tool URL** | `https://thewoftsoftwareteam-oss.github.io/digital-seafood/?admin=1` |
| **Tech Stack** | React 18, Vite 5, Tailwind CSS 3 (`darkMode: 'class'`), `lucide-react`, `qrcode` |
| **Local Dev Server** | `http://localhost:3000/` (configured in `vite.config.js` with `base: '/digital-seafood/'`) |

---

## 2. Core Design & UX Rules (Keep Consistent)

1. **Strictly Zero Gradients**: Use 100% solid colors only across all components, badges, buttons, and modals (no `bg-gradient-*`).
   - Dark mode: `#141416` background, `#1e1e24` cards, `#373742` borders.
   - Light mode: `#f4f4f5` background, `#ffffff` cards, `#e4e4e7` / `zinc-200` borders.
   - Accents: `#ea580c` / `#c2410c` (ember orange), `#d97706` (amber).
2. **Customer-Only View by Default**:
   - No customer-editable exchange rate controls or mandatory table selection in the main UI.
   - Diners browse dishes, customize modifiers (cooking style, spiciness, sauce, notes), and review their selection in `SelectionSheet` / `CallWaiterModal` to show the waiter directly.
3. **Mobile Appbar Stability**:
   - `Navbar.jsx` locks header height (`h-16 sm:h-[68px]`) and button dimensions (`w-8 h-8`, `h-8 min-w-[78px]`) so switching between Khmer (`Kantumruy Pro`) and English (`Inter`) or Dark/Light mode causes zero layout shift.
4. **2-Column Mobile Grid & Sticky Filters**:
   - `App.jsx` renders a 2-column mobile grid (`grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5`).
   - `CategoryFilter` + `SearchBar` sit inside a sticky bar (`sticky top-16 sm:top-[68px] z-20`) right beneath `Navbar`.
   - Clicking a category in `CategoryFilter.jsx` smoothly scrolls it into center view (`scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })`).
5. **Dual Currency Display (USD & KHR)**:
   - Prices stored in `priceUsd` inside `src/data/seafoodMenuData.js`.
   - `usdToKhr()` in `src/utils/currency.js` converts using `DEFAULT_EXCHANGE_RATE = 4100` and rounds to the nearest `100 ៛`.

---

## 3. File Map & State Keys

### Key Directories & Files
- `index.html` — Page title, Google Fonts (`Inter`, `Kantumruy Pro`), Open Graph & Twitter card meta tags pointing to `https://raw.githubusercontent.com/thewoftsoftwareteam-oss/digital-seafood/main/public/og-preview.jpg`.
- `public/og-preview.jpg` — 1200x800 social share preview thumbnail.
- `vite.config.js` — Vite config (`base: '/digital-seafood/'`, `server.port: 3000`, `host: true`).
- `tailwind.config.js` — `darkMode: 'class'` + `grill` color tokens + font stack.
- `src/data/seafoodMenuData.js` — Exports `CATEGORIES` and `SEAFOOD_ITEMS` (12 items: `sf-01` through `sf-12`).
- `src/utils/currency.js` — Exports `DEFAULT_EXCHANGE_RATE`, `usdToKhr`, `formatUsd`, `formatKhr`, `formatPriceByMode`.
- `src/utils/qrUtils.js` — Exports `generateTableQrDataUrl` using `qrcode`.
- `src/context/`:
  - `ThemeContext.jsx` — Manages `'dark'` / `'light'` class on `<html>` and `<body>`.
  - `LanguageContext.jsx` — Manages `'km'` / `'en'` and `UI_TRANSLATIONS`.
  - `CurrencyContext.jsx` — Wraps exchange rate (`4100` default) and `displayMode` (`'dual'` default).
  - `SelectionContext.jsx` — Manages `selectedItems`, `addItem`, `updateQuantity`, `removeItem`, `clearSelection`, totals, and `?table=` URL param parsing.
- `src/components/`:
  - Active customer UI: `Navbar.jsx`, `CategoryFilter.jsx`, `SearchBar.jsx`, `MenuCard.jsx`, `ItemDetailModal.jsx`, `SelectionSheet.jsx`, `CallWaiterModal.jsx`.
  - Manager-only (`?admin=1` in `App.jsx`): `QrCodeManagerModal.jsx`.
  - Dormant / kept for future use (not mounted in `App.jsx`, dark-styled only): `CurrencySettingsModal.jsx`, `TableModal.jsx`.
- `AGENTS.md` — Project rules (commit-only Git policy, multi-agent workflow, no-gradient UI constraints).
- `TASKS.md` — Live shared task board (`TODO` -> `IN_PROGRESS` -> `IN_REVIEW` -> `APPROVED` -> `DONE`).
- `agents/` — Team subagent definitions with inter-agent pass permissions (`README.md`, `coordinator.md`, `developer.md`, `reviewer.md`).
- `.agents/skills/digital-menu-app/SKILL.md` — Reusable Antigravity skill blueprint.

### `localStorage` Keys
| Key | Purpose | Default |
| :--- | :--- | :--- |
| `seafood_theme` | Active color theme | `'dark'` |
| `seafood_menu_lang` | Active UI language | `'km'` |
| `seafood_exchange_rate` | Stored KHR per 1 USD rate | `'4100'` |
| `seafood_currency_mode` | `'dual' \| 'usd' \| 'khr'` | `'dual'` |
| `seafood_selected_items` | Saved dish selection array | `[]` |
| `seafood_table_number` | Last detected `?table=` param | `'01'` |

---

## 4. Common Development & Deployment Workflows

### Run Locally
```bash
cd /Users/vanthiev/Documents/website/collaborate_ai
npm install
npm run dev
# Opens on http://localhost:3000/digital-seafood/ (due to base: '/digital-seafood/')
```

### Build & Git Workflow (Commit Only — Push Requires User Approval)
> [!IMPORTANT]
> **Git Policy**: Always commit changes locally first, and **wait for explicit user approval before running `git push` or `npm run deploy`**.

```bash
npm run build        # Verify production bundle into dist/
git add .
git commit -m "feat: describe your change"

# Run ONLY when the user explicitly approves pushing/deploying:
# git push origin main
# npm run deploy     # Runs predeploy (npm run build) then pushes dist/ to gh-pages branch
```

> [!NOTE]
> **Deployment Note**: GitHub Pages is currently served from the **`gh-pages` branch** via `npm run deploy` (`gh-pages -d dist`). The workflow file `.github/workflows/deploy.yml` is also present in the repo for GitHub Actions, so if Pages Source in GitHub Settings is set to *Deploy from a branch (`gh-pages`)*, that Actions job will report a 403 error on `actions/deploy-pages@v4` while `gh-pages` deployment succeeds normally. Keep running `npm run deploy` after code changes unless you switch GitHub Settings -> Pages -> Source to **GitHub Actions**.

### Quick Recipes for Future Updates
- **Add / edit dishes**: Update `SEAFOOD_ITEMS` (or `CATEGORIES`) in `src/data/seafoodMenuData.js`. Keep `priceUsd` as a number; KHR converts automatically.
- **Update default exchange rate**: Edit `DEFAULT_EXCHANGE_RATE` in `src/utils/currency.js`. Note that returning browsers with `seafood_exchange_rate` cached in `localStorage` will keep their old cached rate unless `CurrencyContext.jsx` ignores cached values or bumps the key name.
- **Expose manager rate/table settings under `?admin=1`**: Mount `CurrencySettingsModal.jsx` inside the `{isAdmin && ...}` block in `src/App.jsx` and add `dark:` light-mode classes to `CurrencySettingsModal.jsx` and `TableModal.jsx` before enabling them.

---

## 5. Chronological Changelog

### 2026-11-25
- **Polished "Add Item to Selection" Flow (`T-01` – `T-04`)**:
  - `src/context/SelectionContext.jsx` & `src/App.jsx` (`T-01`): Fixed in-place quantity mutation inside `addItem` with immutable updates safe under `<React.StrictMode>`, replaced `.substr(2, 4)` with `.slice(2, 6)`, and passed `key={activeItemModal.id}` to `<ItemDetailModal />`.
  - `src/components/ItemDetailModal.jsx` (`T-02`): Fixed mobile modal flex layout (`overflow-hidden max-h-[90vh] flex flex-col`, `flex-shrink-0` header & footer, `flex-1 overflow-y-auto min-h-0` form body), added `onError` image fallback, stacked narrow-screen dual-currency pricing in the Add button, backdrop/`Escape` closing, and removed dead `animate-in`/`fade-in`/`zoom-in-95` classes while keeping solid Dark/Light colors.
  - `src/components/SelectionSheet.jsx`, `src/components/CallWaiterModal.jsx`, `src/context/LanguageContext.jsx` (`T-03`): Fixed Dark Mode counter badge contrast (`dark:bg-white dark:text-[#141416]`), localized all selection drawer and waiter sheet strings into `UI_TRANSLATIONS` (`km`/`en`), raised the expanded drawer to `z-50`, added backdrop/`Escape` close and automatic `isOpen` reset when selection empties/clears, added empty-selection guard and dual-currency per-row pricing in `CallWaiterModal.jsx`.
  - `src/components/MenuCard.jsx` (`T-04`): Replaced dead `hidden xs:block` with `hidden sm:line-clamp-2` and made the entire card clickable with keyboard support and zero nested interactive controls.
- **Created 3-Agent Team (`coordinator`, `developer`, `reviewer`)**: Added `agents/README.md`, `agents/coordinator.md`, `agents/developer.md`, `agents/reviewer.md`, and `TASKS.md`, registered live session subagents with `EnableWriteTools: true` and `EnableSubagentTools: true` for cross-agent task passing, and documented team setup in `AGENTS.md`.
- `10fbb63` — **Added Project Rules (`AGENTS.md`)**: Enforced commit-only policy (never run `git push` or `npm run deploy` without explicit user approval) alongside core UI constraints.
- `e203965` — **Added Development Log**: Created `DEVELOPMENT_LOG.md` to document architecture, design rules, state keys, and deploy workflows.
- **Workspace & Git Cleanup**: Unstaged accidentally staged `node_modules/`, `dist/`, `.idea/`, and `.DS_Store` files after folder relocation to `/Users/vanthiev/Documents/website/collaborate_ai`, restored `.gitignore`, fast-forwarded local `main` to `origin/main` (`4b4e176`), reinstalled `gh-pages`, and verified `npm run build`.

### 2026-11-24
- `4b4e176` — **fix: use raw github url for reliable instant og:image thumbnail**: Pointed `og:image` and `twitter:image` in `index.html` to `raw.githubusercontent.com/.../public/og-preview.jpg` for instant social link previews.
- `3ee9208` — **feat: add Open Graph rich thumbnail and meta tags for link previews**: Added `public/og-preview.jpg` (1200x800) and Open Graph / Twitter Card metadata in `index.html`.
- `b00ae3a` — **feat: initial release of Digital Seafood Menu Web App**:
  - Built React + Vite + Tailwind CSS seafood menu with grilled charcoal aesthetic and strictly zero gradients.
  - Added dual-currency USD/KHR calculation (100-riel rounding), Khmer/English switching, dish customizer modal, waiter selection ticket (`SelectionSheet` + `CallWaiterModal`), and `?admin=1` QR code generator (`QrCodeManagerModal`).
  - Refined UX across iterations: full-screen fluid width, simplified customer-only view (removed customer rate/table pickers), fixed-height mobile appbar, auto-scroll category pills, class-based Dark/Light mode, 2-column mobile grid, and sticky category + search bar.
  - Saved reusable `.agents/skills/digital-menu-app/SKILL.md` and deployed `gh-pages` branch.
