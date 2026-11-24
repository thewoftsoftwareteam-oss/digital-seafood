import React, { useRef } from 'react';
import { Sparkles, Flame, Shell, Fish, UtensilsCrossed, Soup, GlassWater } from 'lucide-react';
import { CATEGORIES } from '../data/seafoodMenuData';
import { useLanguage } from '../context/LanguageContext';

const ICON_MAP = {
  Sparkles,
  Flame,
  Shell,
  Fish,
  UtensilsCrossed,
  Soup,
  GlassWater,
};

export default function CategoryFilter({ selectedCategory, onSelectCategory }) {
  const { lang } = useLanguage();
  const scrollContainerRef = useRef(null);

  const handleCategoryClick = (catId, e) => {
    onSelectCategory(catId);
    
    // Smoothly scroll the clicked category button forward / into center view
    if (e && e.currentTarget) {
      e.currentTarget.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest'
      });
    }
  };

  return (
    <div className="py-1 px-3 sm:px-6 lg:px-10 w-full">
      <div 
        ref={scrollContainerRef}
        className="flex items-center space-x-1.5 sm:space-x-2 overflow-x-auto hide-scrollbar pb-0.5 scroll-smooth select-none"
      >
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          const IconComponent = ICON_MAP[cat.icon] || Sparkles;
          const label = lang === 'km' ? cat.nameKh : cat.nameEn;

          return (
            <button
              key={cat.id}
              onClick={(e) => handleCategoryClick(cat.id, e)}
              className={`flex items-center space-x-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 flex-shrink-0 cursor-pointer active:scale-95 ${
                isSelected
                  ? 'bg-[#ea580c] text-white border border-[#ea580c] shadow-sm font-semibold'
                  : 'bg-white dark:bg-[#1e1e24] text-zinc-700 dark:text-[#d4d4d8] border border-zinc-300 dark:border-[#373742] hover:text-zinc-900 dark:hover:text-white hover:border-zinc-400 dark:hover:border-[#52525b] shadow-sm'
              }`}
            >
              <IconComponent className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isSelected ? 'text-white' : 'text-[#ea580c]'}`} />
              <span>{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
