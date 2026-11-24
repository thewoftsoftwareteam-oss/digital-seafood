---
name: digital-menu-app
description: >-
  Guide and blueprint for building mobile-first Digital Menu Web Applications (e.g. Seafood, Restaurant QR menus)
  using React, Vite, and Tailwind CSS. Covers dual-currency (USD/KHR exchange rates), solid-color dark/light themes
  without gradients, auto-scrolling category navigation, locked mobile appbar metrics, dish customization,
  two-column mobile menu grids, sticky category/search bars, and customer waiter-friendly order sheets.
---

# Digital Menu Web Application Skill

Use this skill when designing, scaffolding, or implementing digital restaurant menu web applications, especially QR-code scanned menus for mobile diners.

---

## 1. Core Architecture & Tech Stack

- **Framework**: React 18+ with Vite (blazing fast HMR and sub-second production builds).
- **Styling**: Tailwind CSS configured with `darkMode: 'class'`.
- **Icons**: `lucide-react` (lightweight, crisp SVG icons).
- **QR Support**: `qrcode` library for table tent card generators.
- **Typography**: Dual-font stack supporting complex scripts (e.g. `Kantumruy Pro` for Khmer + `Inter` for English).

---

## 2. Strict Design Rules (Solid Colors, Zero Gradients)

1. **NO CSS Gradients**:
   - Strictly avoid `bg-gradient-*`, gradient overlays, or gradient text.
   - Use high-contrast solid color fills:
     - Dark Mode: Charcoal dark `#141416`, Slate surface `#1e1e24`, Border `#373742`.
     - Light Mode: Sea-salt ivory `#f4f4f5`, Crisp white `#ffffff`, Border `#e4e4e7`.
     - Accent: Flame Ember `#ea580c` / `#c2410c`, Golden Amber `#d97706`.

2. **2-Column Mobile Menu Grid**:
   - Mobile users browse much faster with 2 cards per row (`grid-cols-2`):
     ```jsx
     <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5 sm:gap-4 md:gap-5">
     ```
   - Menu cards must be proportionally sized: image height `h-32 sm:h-44`, padding `p-2.5 sm:p-4`, and line clamping on titles and descriptions.

---

## 3. Sticky Search Bar & Category Navigation on Scroll

To allow seamless searching and category switching without scrolling back to the top:
```jsx
{/* Navbar: Sticky top-0 h-16 (64px) */}
<Navbar />

{/* Category Bar + Search Bar: Sticky top-16 (64px) right below Navbar */}
<div className="sticky top-16 sm:top-[68px] z-20 bg-white/95 dark:bg-[#141416]/95 backdrop-blur-md border-b border-zinc-200 dark:border-[#373742] py-2 w-full transition-colors duration-150 shadow-sm">
  <CategoryFilter selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
  <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
</div>
```

---

## 4. Mobile Appbar Stability Pattern (Zero Layout Shift)

When supporting bilingual text (Khmer vs English) or Theme switches, mobile appbars often jump in height. Prevent this with explicit dimensional locks:

```jsx
// Explicit header height & flex alignment
<header className="sticky top-0 z-30 bg-white dark:bg-[#141416] border-b border-zinc-200 dark:border-[#373742] w-full h-16 sm:h-[68px] flex items-center">
  <div className="w-full h-full px-3.5 sm:px-6 lg:px-10 flex items-center justify-between">
    
    // Truncate text & lock line-heights
    <div className="flex items-center space-x-2.5 min-w-0 mr-2">
      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#ea580c] flex items-center justify-center text-white flex-shrink-0">
        <Flame className="w-5 h-5 sm:w-6 sm:h-6" />
      </div>
      <div className="min-w-0">
        <h1 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white truncate leading-snug">
          {restaurantName}
        </h1>
        <p className="text-[10px] sm:text-xs text-zinc-500 dark:text-[#a1a1aa] truncate leading-tight mt-0.5">
          {restaurantTagline}
        </p>
      </div>
    </div>

    // Fixed square buttons & min-width pills
    <div className="flex items-center space-x-1.5 sm:space-x-2 flex-shrink-0">
      {/* Theme Switcher: Fixed square w-8 h-8 */}
      <button className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-lg ..." />
      
      {/* Language Switcher: Fixed height & min-width */}
      <button className="h-8 sm:h-9 px-2.5 flex items-center justify-center min-w-[78px] sm:min-w-[88px] text-xs font-semibold whitespace-nowrap leading-none ..." />
      
      {/* Fullscreen Button: Fixed square w-8 h-8 */}
      <button className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-lg ..." />
    </div>

  </div>
</header>
```

---

## 5. Horizontal Auto-Scrolling Category Navigation

When a customer taps a category chip partially cut off at the edge of the mobile screen, auto-scroll it to the center to unveil upcoming categories:

```jsx
const handleCategoryClick = (catId, e) => {
  onSelectCategory(catId);
  if (e?.currentTarget) {
    e.currentTarget.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest'
    });
  }
};

<div className="flex items-center space-x-1.5 sm:space-x-2 overflow-x-auto hide-scrollbar pb-0.5 scroll-smooth select-none">
  {categories.map(cat => (
    <button
      key={cat.id}
      onClick={(e) => handleCategoryClick(cat.id, e)}
      className="flex-shrink-0 active:scale-95 transition-all duration-200 ..."
    >
      {cat.name}
    </button>
  ))}
</div>
```

---

## 6. Dual Currency Conversion Engine (USD & KHR)

```javascript
export const DEFAULT_EXCHANGE_RATE = 4100;

export function usdToKhr(usdAmount, rate = DEFAULT_EXCHANGE_RATE) {
  if (!usdAmount || isNaN(usdAmount)) return 0;
  // Round to nearest 100 Riels (Cambodian cash standard)
  return Math.round((usdAmount * rate) / 100) * 100;
}

export function formatUsd(amount) {
  return `$${Number(amount || 0).toFixed(2)}`;
}

export function formatKhr(amount) {
  return `${Number(amount || 0).toLocaleString('en-US')} ៛`;
}

// Display format: $14.50 (≈ 59,500 ៛)
```

---

## 7. Customer vs. Manager View Separation

- **Customer View**: Pure viewing and selecting dishes.
  - No confusing exchange rate settings for customers.
  - No mandatory table selection prompts.
  - Real-time cart calculation in USD and KHR.
  - High-contrast **"Show Selection to Waiter"** ticket so the diner can simply show their smartphone to the waiter.
- **Manager View**: Accessed only via `?admin=1`.
  - QR Code tent card generator for tables (Table 1 to 20+).
  - Exchange rate adjustment settings.
