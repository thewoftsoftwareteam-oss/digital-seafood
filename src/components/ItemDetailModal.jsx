import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, Flame, Utensils } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import { useSelection } from '../context/SelectionContext';

const FALLBACK_DISH_IMAGE = 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80';

export default function ItemDetailModal({ item, onClose }) {
  const { lang, t } = useLanguage();
  const { formatPrice } = useCurrency();
  const { addItem } = useSelection();

  const [quantity, setQuantity] = useState(1);
  const [selectedSpicy, setSelectedSpicy] = useState(
    item?.spicyLevels && item.spicyLevels.length > 0 ? item.spicyLevels[0] : ''
  );
  const [selectedCooking, setSelectedCooking] = useState(
    item?.cookingStyles && item.cookingStyles.length > 0 ? item.cookingStyles[0] : ''
  );
  const [selectedSauce, setSelectedSauce] = useState(
    item?.sauceOptions && item.sauceOptions.length > 0 ? item.sauceOptions[0] : ''
  );
  const [specialNotes, setSpecialNotes] = useState('');

  useEffect(() => {
    if (!item) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [item, onClose]);

  if (!item) return null;

  const dishTitle = lang === 'km' ? item.nameKh : item.nameEn;
  const secondaryTitle = lang === 'km' ? item.nameEn : item.nameKh;
  const unit = lang === 'km' ? item.unitKh : item.unitEn;

  const itemTotalUsd = item.priceUsd * quantity;
  const formattedItemTotal = formatPrice(itemTotalUsd);

  const handleAdd = () => {
    addItem({
      item,
      quantity,
      selectedSpicy,
      selectedCooking,
      selectedSauce,
      specialNotes: specialNotes.trim()
    });
    onClose();
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/75"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="item-detail-modal-title"
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-[#1e1e24] border border-zinc-200 dark:border-[#373742] text-zinc-900 dark:text-white w-full max-w-lg rounded-t-2xl sm:rounded-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
      >

        {/* Header with image */}
        <div className="relative h-48 sm:h-52 flex-shrink-0 bg-zinc-100 dark:bg-[#141416]">
          <img
            src={item.image}
            alt={dishTitle}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = FALLBACK_DISH_IMAGE;
            }}
          />
          <button
            type="button"
            onClick={onClose}
            aria-label={t.close}
            className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 text-white hover:bg-black transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-2.5 left-3.5 bg-white dark:bg-[#141416] px-2.5 py-1 rounded text-xs font-semibold text-zinc-900 dark:text-white border border-zinc-200 dark:border-[#373742] shadow-sm">
            {unit}
          </div>
        </div>

        {/* Dish Title & Description */}
        <div className="p-4 sm:p-5 flex-1 overflow-y-auto min-h-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h2 id="item-detail-modal-title" className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white tracking-tight">
                {dishTitle}
              </h2>
              <p className="text-xs text-zinc-500 dark:text-[#a1a1aa] mt-0.5 font-medium">
                {secondaryTitle}
              </p>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="text-lg font-bold text-zinc-900 dark:text-white font-mono">
                {formatPrice(item.priceUsd).primary}
              </div>
              {formatPrice(item.priceUsd).secondary && (
                <div className="text-xs font-semibold text-[#c2410c] dark:text-[#d97706] font-mono">
                  {formatPrice(item.priceUsd).secondary}
                </div>
              )}
            </div>
          </div>

          <p className="text-xs sm:text-sm text-zinc-600 dark:text-[#d4d4d8] mt-2 leading-relaxed">
            {lang === 'km' ? item.descriptionKh : item.descriptionEn}
          </p>

          {/* Cooking Styles Option */}
          {item.cookingStyles && item.cookingStyles.length > 0 && (
            <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-[#272730]">
              <label className="text-xs font-bold text-zinc-900 dark:text-[#f8fafc] flex items-center gap-1 mb-2">
                <Utensils className="w-3.5 h-3.5 text-[#ea580c]" />
                <span>{t.cookingStyle}</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {item.cookingStyles.map((style) => (
                  <button
                    key={style}
                    type="button"
                    onClick={() => setSelectedCooking(style)}
                    className={`px-3 py-2 rounded-lg text-xs font-medium text-left transition-colors border ${
                      selectedCooking === style
                        ? 'bg-[#ea580c] text-white border-[#ea580c] font-semibold'
                        : 'bg-zinc-50 dark:bg-[#141416] text-zinc-700 dark:text-[#d4d4d8] border-zinc-200 dark:border-[#373742] hover:border-zinc-400 dark:hover:border-[#52525b]'
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Spicy Level Option */}
          {item.spicyLevels && item.spicyLevels.length > 0 && (
            <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-[#272730]">
              <label className="text-xs font-bold text-zinc-900 dark:text-[#f8fafc] flex items-center gap-1 mb-2">
                <Flame className="w-3.5 h-3.5 text-[#ea580c]" />
                <span>{t.spiciness}</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {item.spicyLevels.map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setSelectedSpicy(level)}
                    className={`px-3 py-2 rounded-lg text-xs font-medium text-left transition-colors border ${
                      selectedSpicy === level
                        ? 'bg-[#ea580c] text-white border-[#ea580c] font-semibold'
                        : 'bg-zinc-50 dark:bg-[#141416] text-zinc-700 dark:text-[#d4d4d8] border-zinc-200 dark:border-[#373742] hover:border-zinc-400 dark:hover:border-[#52525b]'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Dipping Sauce Option */}
          {item.sauceOptions && item.sauceOptions.length > 0 && (
            <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-[#272730]">
              <label className="text-xs font-bold text-zinc-900 dark:text-[#f8fafc] mb-2 block">
                {t.sauceOption}
              </label>
              <div className="flex flex-wrap gap-2">
                {item.sauceOptions.map((sauce) => (
                  <button
                    key={sauce}
                    type="button"
                    onClick={() => setSelectedSauce(sauce)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
                      selectedSauce === sauce
                        ? 'bg-[#ea580c] text-white border-[#ea580c] font-semibold'
                        : 'bg-zinc-50 dark:bg-[#141416] text-zinc-700 dark:text-[#d4d4d8] border-zinc-200 dark:border-[#373742] hover:border-zinc-400 dark:hover:border-[#52525b]'
                    }`}
                  >
                    {sauce}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Special Requests / Notes */}
          <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-[#272730]">
            <label htmlFor="item-special-notes" className="text-xs font-bold text-zinc-900 dark:text-[#f8fafc] mb-1.5 block">
              {t.specialNotes}
            </label>
            <input
              id="item-special-notes"
              type="text"
              value={specialNotes}
              onChange={(e) => setSpecialNotes(e.target.value)}
              placeholder={t.notesPlaceholder}
              className="w-full px-3 py-2 rounded-lg bg-zinc-50 dark:bg-[#141416] border border-zinc-200 dark:border-[#373742] text-xs sm:text-sm text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-[#71717a] focus:outline-none focus:border-[#ea580c]"
            />
          </div>

        </div>

        {/* Modal Footer: Quantity Stepper & Add Button */}
        <div className="p-3 sm:p-4 bg-zinc-50 dark:bg-[#141416] border-t border-zinc-200 dark:border-[#373742] flex items-center justify-between gap-2.5 sm:gap-3 flex-shrink-0">

          {/* Quantity Controls */}
          <div className="flex items-center gap-1 sm:gap-1.5 bg-white dark:bg-[#1e1e24] border border-zinc-300 dark:border-[#373742] rounded-lg p-1 flex-shrink-0">
            <button
              type="button"
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              aria-label={t.decreaseQuantity}
              className="w-8 h-8 rounded flex items-center justify-center bg-zinc-100 dark:bg-[#272730] text-zinc-800 dark:text-white hover:bg-zinc-200 dark:hover:bg-[#373742] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-7 sm:w-8 text-center font-bold text-zinc-900 dark:text-white text-sm font-mono">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity(q => q + 1)}
              aria-label={t.increaseQuantity}
              className="w-8 h-8 rounded flex items-center justify-center bg-zinc-100 dark:bg-[#272730] text-zinc-800 dark:text-white hover:bg-zinc-200 dark:hover:bg-[#373742] transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add to Selection Button with Live Price */}
          <button
            type="button"
            onClick={handleAdd}
            className="flex-1 min-w-0 py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold text-xs sm:text-sm flex items-center justify-between gap-2 transition-colors shadow active:scale-[0.98]"
          >
            <span className="text-left leading-tight">{t.addToSelection}</span>
            <div className="flex flex-col sm:flex-row sm:items-baseline items-end text-right leading-tight flex-shrink-0 font-mono">
              <span className="text-xs sm:text-sm font-bold">{formattedItemTotal.primary}</span>
              {formattedItemTotal.secondary && (
                <span className="sm:ml-1.5 text-[10px] sm:text-xs text-amber-100 font-medium">
                  ({formattedItemTotal.secondary})
                </span>
              )}
            </div>
          </button>

        </div>

      </div>
    </div>
  );
}
