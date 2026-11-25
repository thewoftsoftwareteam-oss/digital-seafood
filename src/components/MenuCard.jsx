import React from 'react';
import { Plus, Flame, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import { useSelection } from '../context/SelectionContext';

const FALLBACK_DISH_IMAGE = 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80';

export default function MenuCard({ item, onSelectItem }) {
  const { lang, t } = useLanguage();
  const { formatPrice } = useCurrency();
  const { selectedItems } = useSelection();

  // Check how many of this item are currently in selection
  const currentCount = selectedItems
    .filter(entry => entry.item.id === item.id)
    .reduce((sum, entry) => sum + entry.quantity, 0);

  const priceFormatted = formatPrice(item.priceUsd);
  const dishTitle = lang === 'km' ? item.nameKh : item.nameEn;
  const secondaryTitle = lang === 'km' ? item.nameEn : item.nameKh;
  const description = lang === 'km' ? item.descriptionKh : item.descriptionEn;
  const unit = lang === 'km' ? item.unitKh : item.unitEn;

  const handleOpenDetail = () => {
    onSelectItem(item);
  };

  const handleCardKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleOpenDetail();
    }
  };

  return (
    <div className="bg-white dark:bg-[#1e1e24] border border-zinc-200 dark:border-[#373742] rounded-xl overflow-hidden flex flex-col justify-between hover:border-zinc-300 dark:hover:border-[#52525b] transition-all relative shadow-sm">

      {/* Primary Clickable Card Region (Image + Title + Description) */}
      <div
        role="button"
        tabIndex={0}
        onClick={handleOpenDetail}
        onKeyDown={handleCardKeyDown}
        aria-label={dishTitle}
        className="flex-1 flex flex-col cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#ea580c]"
      >
        {/* Top Image Container - Optimized for 2-Column Grid */}
        <div className="relative w-full h-32 sm:h-44 md:h-48 bg-zinc-100 dark:bg-[#141416] overflow-hidden">
          <img
            src={item.image}
            alt={dishTitle}
            loading="lazy"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = FALLBACK_DISH_IMAGE;
            }}
          />

          {/* Solid Badges (No Gradients) */}
          <div className="absolute top-1.5 left-1.5 sm:top-2.5 sm:left-2.5 flex flex-wrap gap-1">
            {item.isGrillSpecial && (
              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-[#ea580c] text-white text-[9px] sm:text-[11px] font-bold shadow-sm">
                <Flame className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                <span>{t.grillBadge}</span>
              </span>
            )}
            {item.isPopular && (
              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-[#d97706] text-white text-[9px] sm:text-[11px] font-bold shadow-sm">
                <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                <span>{t.popularBadge}</span>
              </span>
            )}
          </div>

          {/* Portion indicator badge */}
          <div className="absolute bottom-1.5 right-1.5 sm:bottom-2 sm:right-2 px-1.5 py-0.5 rounded bg-white dark:bg-[#141416] text-zinc-800 dark:text-[#e4e4e7] border border-zinc-200 dark:border-[#373742] text-[9px] sm:text-[11px] font-medium shadow-sm">
            {unit}
          </div>

          {/* Count badge if already selected */}
          {currentCount > 0 && (
            <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 px-1.5 py-0.5 rounded-full bg-[#16a34a] text-white text-[10px] sm:text-xs font-bold shadow">
              {currentCount} {t.inList}
            </div>
          )}
        </div>

        {/* Content Details */}
        <div className="p-2.5 sm:p-4 pb-2 sm:pb-4 flex-1">
          {/* Main Title */}
          <h3 className="text-xs sm:text-base font-bold text-zinc-900 dark:text-white tracking-tight leading-snug line-clamp-1 sm:line-clamp-2">
            {dishTitle}
          </h3>
          {/* Secondary Subtitle */}
          <p className="text-[10px] sm:text-xs text-zinc-500 dark:text-[#a1a1aa] mt-0.5 mb-1 sm:mb-2 font-medium truncate">
            {secondaryTitle}
          </p>

          {/* Description */}
          <p className="text-[10px] sm:text-xs text-zinc-600 dark:text-[#d4d4d8] leading-relaxed hidden sm:line-clamp-2">
            {description}
          </p>
        </div>
      </div>

      {/* Pricing & Add Button Container (Sibling to role="button" to prevent nested interactive elements) */}
      <div
        onClick={handleOpenDetail}
        className="px-2.5 pb-2.5 sm:px-4 sm:pb-4 cursor-pointer"
      >
        <div className="pt-2 sm:pt-3 border-t border-zinc-100 dark:border-[#272730] flex items-center justify-between gap-1">

          {/* Dual Currency Price Display */}
          <div className="min-w-0">
            <div className="text-xs sm:text-base md:text-lg font-bold text-zinc-900 dark:text-white font-mono truncate">
              {priceFormatted.primary}
            </div>
            {priceFormatted.secondary && (
              <div className="text-[9px] sm:text-xs font-semibold text-[#c2410c] dark:text-[#d97706] font-mono truncate">
                {priceFormatted.secondary}
              </div>
            )}
          </div>

          {/* Customizer / Select Dish Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleOpenDetail();
            }}
            aria-label={`${t.selectDish}: ${dishTitle}`}
            className="flex items-center space-x-1 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg bg-[#ea580c] hover:bg-[#c2410c] text-white text-[11px] sm:text-sm font-semibold transition-colors active:scale-95 shadow-sm flex-shrink-0"
          >
            <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">{t.selectDish}</span>
          </button>

        </div>
      </div>

    </div>
  );
}
