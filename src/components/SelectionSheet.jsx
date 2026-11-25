import React, { useState, useEffect } from 'react';
import { ShoppingBag, ChevronUp, ChevronDown, Trash2, Plus, Minus, Eye, Utensils } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import { useSelection } from '../context/SelectionContext';

export default function SelectionSheet({ onOpenShowOrder }) {
  const { lang, t } = useLanguage();
  const { convertUsdToKhr, formatUsd, formatKhr } = useCurrency();
  const {
    selectedItems,
    updateQuantity,
    removeItem,
    clearSelection,
    totalItemCount,
    totalUsd
  } = useSelection();

  const [isOpen, setIsOpen] = useState(false);

  // Reset drawer state when selection becomes empty so re-adding later keeps drawer collapsed
  useEffect(() => {
    if (totalItemCount === 0 && isOpen) {
      setIsOpen(false);
    }
  }, [totalItemCount, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (totalItemCount === 0) {
    return null;
  }

  const totalKhr = convertUsdToKhr(totalUsd);

  const handleClearSelection = () => {
    setIsOpen(false);
    clearSelection();
  };

  return (
    <>
      {/* Floating Rounded Dock Bar */}
      <div className="fixed bottom-3 left-3 right-3 sm:bottom-4 sm:left-6 sm:right-6 lg:left-10 lg:right-10 z-40 rounded-2xl bg-white dark:bg-[#1e1e24] border border-zinc-200 dark:border-[#373742] shadow-2xl p-2 pl-2.5 sm:p-2.5 sm:pl-3.5 transition-colors duration-150">
        <div className="w-full flex items-center justify-between gap-2 sm:gap-3">

          {/* Left: Unified Expand/Collapse Summary Trigger */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label={isOpen ? t.collapseSelection : t.expandSelection}
            className="flex items-center gap-2.5 sm:gap-3 text-left min-w-0 flex-1 focus:outline-none"
          >
            <div className="relative w-11 h-11 rounded-xl bg-orange-50 dark:bg-[#272730] border border-orange-200 dark:border-[#373742] flex items-center justify-center text-[#ea580c] flex-shrink-0">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1 rounded-full bg-[#ea580c] text-white border-2 border-white dark:border-[#1e1e24] text-[11px] font-bold flex items-center justify-center">
                {totalItemCount}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center flex-wrap gap-x-1.5 gap-y-0.5">
                <span className="text-base sm:text-lg font-extrabold text-zinc-900 dark:text-white font-mono leading-tight">
                  {formatUsd(totalUsd)}
                </span>
                <span className="text-[11px] font-semibold text-zinc-500 dark:text-[#a1a1aa] bg-zinc-100 dark:bg-[#272730] px-1.5 py-0.5 rounded-md inline-flex items-center gap-0.5 whitespace-nowrap">
                  <span>{totalItemCount} {t.dishesUnit}</span>
                  {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
                </span>
              </div>
              <div className="text-xs font-semibold text-[#c2410c] dark:text-[#d97706] font-mono leading-tight mt-0.5 truncate">
                ≈ {formatKhr(totalKhr)}
              </div>
            </div>
          </button>

          {/* Right Action: Show Waiter List CTA */}
          <button
            type="button"
            onClick={onOpenShowOrder}
            className="rounded-xl bg-[#ea580c] hover:bg-[#c2410c] px-3.5 py-2.5 sm:px-5 sm:py-3 text-xs sm:text-sm font-bold text-white flex items-center gap-1.5 sm:gap-2 shadow-sm flex-shrink-0 whitespace-nowrap transition-colors active:scale-95"
          >
            <Eye className="w-4 h-4 flex-shrink-0" />
            <span>{t.viewSelection}</span>
          </button>

        </div>
      </div>

      {/* Expanded Selection Drawer Modal */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/75 p-0 sm:p-4"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="selection-sheet-title"
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-[#1e1e24] border border-zinc-200 dark:border-[#373742] text-zinc-900 dark:text-white w-full max-w-2xl rounded-t-2xl sm:rounded-2xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl"
          >

            {/* Drawer Header */}
            <div className="p-4 bg-zinc-50 dark:bg-[#141416] border-b border-zinc-200 dark:border-[#373742] flex items-center justify-between flex-shrink-0">
              <div className="flex items-center space-x-2">
                <Utensils className="w-5 h-5 text-[#ea580c]" />
                <h3 id="selection-sheet-title" className="text-base font-bold text-zinc-900 dark:text-white">
                  {t.mySelection} ({totalItemCount})
                </h3>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={handleClearSelection}
                  className="text-xs text-zinc-500 hover:text-red-500 dark:text-[#a1a1aa] dark:hover:text-red-400 flex items-center gap-1 px-2 py-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>{t.clearAll}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label={t.collapseSelection}
                  className="p-1 rounded text-zinc-500 hover:text-zinc-800 dark:text-[#a1a1aa] dark:hover:text-white"
                >
                  <ChevronDown className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* List of Selected Items */}
            <div className="p-4 overflow-y-auto flex-1 min-h-0 divide-y divide-zinc-100 dark:divide-[#272730]">
              {selectedItems.map((entry) => {
                const dishTitle = lang === 'km' ? entry.item.nameKh : entry.item.nameEn;
                const itemTotalUsd = entry.item.priceUsd * entry.quantity;

                return (
                  <div key={entry.selectionId} className="py-3.5 flex items-start justify-between gap-3 first:pt-0 last:pb-0">

                    {/* Item Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-zinc-900 dark:text-white">{dishTitle}</h4>

                      {/* Options & Customizations */}
                      <div className="text-xs text-zinc-500 dark:text-[#a1a1aa] mt-1 space-y-0.5">
                        {entry.selectedCooking && (
                          <div>• {t.cookingStyle}: <span className="text-zinc-800 dark:text-[#d4d4d8] font-medium">{entry.selectedCooking}</span></div>
                        )}
                        {entry.selectedSpicy && (
                          <div>• {t.spiciness}: <span className="text-[#ea580c] font-medium">{entry.selectedSpicy}</span></div>
                        )}
                        {entry.selectedSauce && (
                          <div>• {t.sauceOption}: <span className="text-zinc-800 dark:text-[#d4d4d8]">{entry.selectedSauce}</span></div>
                        )}
                        {entry.specialNotes && (
                          <div>• {t.noteLabel}: <span className="text-[#c2410c] dark:text-amber-300 italic font-medium break-words">{entry.specialNotes}</span></div>
                        )}
                      </div>

                      {/* Item Total Price */}
                      <div className="mt-2 text-xs font-mono font-bold text-zinc-900 dark:text-white flex flex-wrap items-center gap-x-2">
                        <span>{formatUsd(itemTotalUsd)}</span>
                        <span className="text-[#c2410c] dark:text-[#d97706] font-normal">
                          ≈ {formatKhr(convertUsdToKhr(itemTotalUsd))}
                        </span>
                      </div>
                    </div>

                    {/* Quantity Controls & Delete */}
                    <div className="flex items-center space-x-1.5 sm:space-x-2 flex-shrink-0">
                      <div className="flex items-center space-x-1 bg-zinc-100 dark:bg-[#141416] border border-zinc-200 dark:border-[#373742] rounded-lg p-0.5">
                        <button
                          type="button"
                          onClick={() => updateQuantity(entry.selectionId, -1)}
                          aria-label={t.decreaseQuantity}
                          className="w-7 h-7 rounded flex items-center justify-center text-zinc-700 dark:text-white hover:bg-zinc-200 dark:hover:bg-[#272730] transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold font-mono text-zinc-900 dark:text-white">
                          {entry.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(entry.selectionId, 1)}
                          aria-label={t.increaseQuantity}
                          className="w-7 h-7 rounded flex items-center justify-center text-zinc-700 dark:text-white hover:bg-zinc-200 dark:hover:bg-[#272730] transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeItem(entry.selectionId)}
                        aria-label={t.removeItem}
                        className="p-1.5 text-zinc-400 hover:text-red-500 dark:text-[#71717a] dark:hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>

            {/* Drawer Footer: Total & Actions */}
            <div className="p-4 bg-zinc-50 dark:bg-[#141416] border-t border-zinc-200 dark:border-[#373742] space-y-3 flex-shrink-0">
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-500 dark:text-[#a1a1aa] font-medium">{t.totalEstimated}</span>
                <div className="text-right">
                  <div className="text-lg font-bold text-zinc-900 dark:text-white font-mono">{formatUsd(totalUsd)}</div>
                  <div className="text-xs font-bold text-[#c2410c] dark:text-[#d97706] font-mono">≈ {formatKhr(totalKhr)}</div>
                </div>
              </div>

              {/* Action Button: Show Waiter Order Sheet */}
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  onOpenShowOrder();
                }}
                className="w-full py-3 px-4 rounded-lg bg-[#ea580c] hover:bg-[#c2410c] text-white text-sm font-bold flex items-center justify-center gap-2 transition-colors shadow active:scale-[0.98]"
              >
                <Eye className="w-4 h-4" />
                <span>{t.showSelectionToWaiter}</span>
              </button>

            </div>

          </div>
        </div>
      )}
    </>
  );
}
