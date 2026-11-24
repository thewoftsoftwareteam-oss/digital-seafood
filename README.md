# 🦀 Digital Seafood Menu Web App (គ្រឿងសមុទ្រអាំង)

> A modern, mobile-first **Digital Grilled Seafood Menu Web Application** built with React, Vite, and Tailwind CSS. Tailored for Cambodian coastal seafood dining with QR code table scanning, dual-currency pricing (USD & KHR), dark/light modes, auto-scrolling category navigation, and a 2-column mobile grid.

🌐 **Live Demo on GitHub Pages**: [https://thewoftsoftwareteam-oss.github.io/digital-seafood/](https://thewoftsoftwareteam-oss.github.io/digital-seafood/)

---

## 🌟 Key Features

- **📱 2-Column Mobile-First Layout**: High-density 2-column menu card presentation optimized for smartphones.
- **📌 Sticky Category Bar & Search Bar**: Category filter and instant search bar stay fixed at the top when scrolling down.
- **💵 Real-time Dual Currency**: Displays prices in **USD ($)** and **Khmer Riel (៛)** (rounded to 100 Riels).
- **🌗 Dark / Light Mode**: Charcoal grill theme for nighttime and crisp sea-salt ivory for bright daylight dining (strictly 100% solid colors, zero gradients).
- **🇰🇭 Bilingual Support**: Complete ភាសាខ្មែរ (Kantumruy Pro) & English (Inter) localization.
- **⚡ Smooth Auto-Scroll Navigation**: Tapping off-screen category pills automatically scrolls them into the center view.
- **🍽️ Dish Customizer**: Allows selecting spicy level, cooking method (charcoal grilled, steamed, fried with Kampot pepper), sauce options, and special notes.
- **📋 Waiter-Friendly Order Sheet**: Diners can tap "View Selection" to show a clean order sheet directly to the waiter.
- **🖨️ Table QR Code Generator**: Manager utility accessible via `?admin=1` to generate and print table tent QR cards.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/thewoftsoftwareteam-oss/digital-seafood.git
cd digital-seafood

# Install dependencies
npm install

# Start local dev server
npm run dev
```

### Build for Production

```bash
npm run build
```

---

## 🛠️ Tech Stack

- **Frontend**: React 18
- **Bundler**: Vite 5
- **Styling**: Tailwind CSS 3 (class-based dark mode)
- **Icons**: Lucide React
- **QR Engine**: qrcode

---

## 📄 License

MIT © [thewoftsoftwareteam-oss](https://github.com/thewoftsoftwareteam-oss)
