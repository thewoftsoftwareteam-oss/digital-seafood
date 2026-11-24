import React, { useState, useMemo } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { CurrencyProvider } from './context/CurrencyContext';
import { SelectionProvider } from './context/SelectionContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { SEAFOOD_ITEMS } from './data/seafoodMenuData';
import Navbar from './components/Navbar';
import CategoryFilter from './components/CategoryFilter';
import SearchBar from './components/SearchBar';
import MenuCard from './components/MenuCard';
import ItemDetailModal from './components/ItemDetailModal';
import SelectionSheet from './components/SelectionSheet';
import CallWaiterModal from './components/CallWaiterModal';
import QrCodeManagerModal from './components/QrCodeManagerModal';
import { Flame, Utensils } from 'lucide-react';

function MenuContent() {
  const { lang } = useLanguage();
  const { theme } = useTheme();

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeItemModal, setActiveItemModal] = useState(null);
  const [isShowOrderOpen, setIsShowOrderOpen] = useState(false);

  // Hidden admin/manager check via query param ?admin=1
  const isAdmin = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('admin') === '1';
  const [isAdminQrOpen, setIsAdminQrOpen] = useState(false);

  // Filter seafood items based on category and search query
  const filteredItems = useMemo(() => {
    return SEAFOOD_ITEMS.filter((item) => {
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.nameKh.toLowerCase().includes(q) ||
        item.nameEn.toLowerCase().includes(q) ||
        (item.descriptionKh && item.descriptionKh.toLowerCase().includes(q)) ||
        (item.descriptionEn && item.descriptionEn.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''} bg-[#f4f4f5] dark:bg-[#141416] text-[#09090b] dark:text-[#f8fafc] flex flex-col pb-28 w-full transition-colors duration-150`}>
      
      {/* 1. Top Navbar (Sticky at Top) */}
      <Navbar />

      {/* 2. Hero / Restaurant Welcome Banner */}
      <div className="bg-white dark:bg-[#1e1e24] border-b border-zinc-200 dark:border-[#373742] py-3.5 px-4 sm:px-6 lg:px-10 w-full transition-colors duration-150 shadow-sm">
        <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#ea580c] text-white text-xs font-bold mb-1 shadow-sm">
              <Flame className="w-3.5 h-3.5" />
              <span>{lang === 'km' ? 'ចង្ក្រានធ្យូងអាំងគ្រឿងសមុទ្រស្រស់ៗ' : 'Authentic Charcoal Grill & Fresh Seafood'}</span>
            </div>
            <h2 className="text-lg sm:text-2xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
              {lang === 'km' ? 'មីនុយម្ហូបគ្រឿងសមុទ្រអាំង' : 'Seafood Charcoal Grill Menu'}
            </h2>
            <p className="text-[11px] sm:text-xs text-zinc-500 dark:text-[#a1a1aa] mt-0.5">
              {lang === 'km' 
                ? 'ស្វែងរក និងរើសមុខម្ហូបដែលអ្នកចូលចិត្ត' 
                : 'Explore and select your favorite fresh seafood dishes'}
            </p>
          </div>
        </div>
      </div>

      {/* 3. Sticky Search Bar & Category Menu Bar (Locks in place right under Navbar when scrolling down) */}
      <div className="sticky top-16 sm:top-[68px] z-20 bg-white/95 dark:bg-[#141416]/95 backdrop-blur-md border-b border-zinc-200 dark:border-[#373742] py-2 w-full transition-colors duration-150 shadow-sm">
        {/* Category Filters */}
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Search Bar */}
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      </div>

      {/* 4. Main Menu Items Grid: Fixed 2-Column on Mobile, 2-3-4-5 on Larger Screens */}
      <main className="flex-1 w-full py-3.5">
        <div className="px-3 sm:px-6 lg:px-10 w-full">
          {filteredItems.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-[#1e1e24] border border-zinc-200 dark:border-[#373742] rounded-xl p-8 max-w-xl mx-auto shadow-sm">
              <Utensils className="w-10 h-10 text-zinc-400 dark:text-[#71717a] mx-auto mb-2" />
              <h4 className="text-base font-bold text-zinc-900 dark:text-white mb-1">
                {lang === 'km' ? 'រកមិនឃើញមុខម្ហូបនេះទេ' : 'No seafood dishes found'}
              </h4>
              <p className="text-xs text-zinc-500 dark:text-[#a1a1aa]">
                {lang === 'km' ? 'សូមសាកល្បងស្វែងរកពាក្យផ្សេងទៀត' : 'Try searching with another keyword'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5 sm:gap-4 md:gap-5">
              {filteredItems.map((item) => (
                <MenuCard
                  key={item.id}
                  item={item}
                  onSelectItem={(dish) => setActiveItemModal(dish)}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Floating Selection Sheet (Bottom Drawer) */}
      <SelectionSheet
        onOpenShowOrder={() => setIsShowOrderOpen(true)}
      />

      {/* Modal: Customize & Add Item */}
      {activeItemModal && (
        <ItemDetailModal
          item={activeItemModal}
          onClose={() => setActiveItemModal(null)}
        />
      )}

      {/* Modal: Show Selected Dishes Sheet to Waiter */}
      <CallWaiterModal
        isOpen={isShowOrderOpen}
        onClose={() => setIsShowOrderOpen(false)}
      />

      {/* Manager-only QR code generator (only visible if ?admin=1) */}
      {isAdmin && (
        <div className="py-4 text-center border-t border-zinc-200 dark:border-[#272730] mt-8">
          <button
            onClick={() => setIsAdminQrOpen(true)}
            className="text-xs text-zinc-500 dark:text-[#71717a] hover:text-[#ea580c] underline"
          >
            Manager Tools (Generate Table QR)
          </button>
          <QrCodeManagerModal
            isOpen={isAdminQrOpen}
            onClose={() => setIsAdminQrOpen(false)}
          />
        </div>
      )}

    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <CurrencyProvider>
          <SelectionProvider>
            <MenuContent />
          </SelectionProvider>
        </CurrencyProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
