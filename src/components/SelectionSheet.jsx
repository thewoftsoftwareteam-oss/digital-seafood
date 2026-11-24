import React, { useState } from 'react';
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

  if (totalItemCount === 0) {
    return null;
  }

  const totalKhr = convertUsdToKhr(totalUsd);

  return (
    <>
      {/* Floating Bottom Bar (Full Width Sticky) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 p-3 sm:p-4 bg-white dark:bg-[#141416] border-t border-zinc-200 dark:border-[#373742] shadow-2xl w-full transition-colors duration-150">
        <div className="w-full px-2 sm:px-6 lg:px-10 flex items-center justify-between gap-3">
          
          {/* Left: Item Count & Total Info */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center space-x-3 text-left focus:outline-none"
          >
            <div className="relative w-11 h-11 rounded-lg bg-[#ea580c] flex items-center justify-center text-white flex-shrink-0 shadow-sm">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-zinc-900 text-white text-[11px] font-extrabold flex items-center justify-center shadow">
                {totalItemCount}
              </span>
            </div>
            <div>
              <div className="text-[11px] text-zinc-500 dark:text-[#a1a1aa] font-medium">
                {totalItemCount} {lang === 'km' ? 'មុខម្ហូបបានរើស' : 'dishes selected'}
              </div>
              <div className="flex items-baseline space-x-2">
                <span className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white font-mono">
                  {formatUsd(totalUsd)}
                </span>
                <span className="text-xs font-semibold text-[#c2410c] dark:text-[#d97706] font-mono">
                  ≈ {formatKhr(totalKhr)}
                </span>
              </div>
            </div>
          </button>

          {/* Right Action: Expand Drawer & Show Waiter List */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-lg bg-zinc-100 dark:bg-[#1e1e24] border border-zinc-300 dark:border-[#373742] text-zinc-800 dark:text-white hover:border-[#ea580c] transition-colors"
              title={isOpen ? "Collapse" : "Expand"}
            >
              {isOpen ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}
            </button>

            <button
              onClick={onOpenShowOrder}
              className="flex items-center space-x-1.5 px-4 py-2.5 rounded-lg bg-[#ea580c] hover:bg-[#c2410c] text-white text-xs sm:text-sm font-bold shadow transition-colors active:scale-95"
            >
              <Eye className="w-4 h-4" />
              <span>{lang === 'km' ? 'មើលបញ្ជីមុខម្ហូប' : 'View Selection'}</span>
            </button>
          </div>

        </div>
      </div>

      {/* Expanded Selection Drawer Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-40 flex items-end sm:items-center justify-center bg-black/75 p-0 sm:p-4 pb-20 sm:pb-4">
          <div className="bg-white dark:bg-[#1e1e24] border border-zinc-200 dark:border-[#373742] text-zinc-900 dark:text-white w-full max-w-2xl rounded-t-2xl sm:rounded-2xl max-h-[80vh] flex flex-col overflow-hidden shadow-2xl animate-in fade-in duration-150">
            
            {/* Drawer Header */}
            <div className="p-4 bg-zinc-50 dark:bg-[#141416] border-b border-zinc-200 dark:border-[#373742] flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Utensils className="w-5 h-5 text-[#ea580c]" />
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                  {t.mySelection} ({totalItemCount})
                </h3>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={clearSelection}
                  className="text-xs text-zinc-500 hover:text-red-500 dark:text-[#a1a1aa] dark:hover:text-red-400 flex items-center gap-1 px-2 py-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>{t.clearAll}</span>
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded text-zinc-500 hover:text-zinc-800 dark:text-[#a1a1aa] dark:hover:text-white"
                >
                  <ChevronDown className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* List of Selected Items */}
            <div className="p-4 overflow-y-auto flex-1 divide-y divide-zinc-100 dark:divide-[#272730]">
              {selectedItems.map((entry) => {
                const dishTitle = lang === 'km' ? entry.item.nameKh : entry.item.nameEn;
                const itemTotalUsd = entry.item.priceUsd * entry.quantity;

                return (
                  <div key={entry.selectionId} className="py-3.5 flex items-start justify-between gap-3 first:pt-0 last:pb-0">
                    
                    {/* Item Details */}
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-zinc-900 dark:text-white">{dishTitle}</h4>
                      
                      {/* Options & Customizations */}
                      <div className="text-xs text-zinc-500 dark:text-[#a1a1aa] mt-1 space-y-0.5">
                        {entry.selectedCooking && (
                          <div>• របៀបចម្អិន: <span className="text-zinc-800 dark:text-[#d4d4d8] font-medium">{entry.selectedCooking}</span></div>
                        )}
                        {entry.selectedSpicy && (
                          <div>• កម្រិតហឹរ: <span className="text-[#ea580c] font-medium">{entry.selectedSpicy}</span></div>
                        )}
                        {entry.selectedSauce && (
                          <div>• ទឹកជ្រលក់: <span className="text-zinc-800 dark:text-[#d4d4d8]">{entry.selectedSauce}</span></div>
                        )}
                        {entry.specialNotes && (
                          <div>• ចំណាំ: <span className="text-[#c2410c] dark:text-amber-300 italic font-medium">{entry.specialNotes}</span></div>
                        )}
                      </div>

                      {/* Item Total Price */}
                      <div className="mt-2 text-xs font-mono font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                        <span>{formatUsd(itemTotalUsd)}</span>
                        <span className="text-[#c2410c] dark:text-[#d97706] font-normal">
                          ≈ {formatKhr(convertUsdToKhr(itemTotalUsd))}
                        </span>
                      </div>
                    </div>

                    {/* Quantity Controls & Delete */}
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1 bg-zinc-100 dark:bg-[#141416] border border-zinc-200 dark:border-[#373742] rounded-lg p-0.5">
                        <button
                          onClick={() => updateQuantity(entry.selectionId, -1)}
                          className="w-7 h-7 rounded flex items-center justify-center text-zinc-700 dark:text-white hover:bg-zinc-200 dark:hover:bg-[#272730] transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold font-mono text-zinc-900 dark:text-white">
                          {entry.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(entry.selectionId, 1)}
                          className="w-7 h-7 rounded flex items-center justify-center text-zinc-700 dark:text-white hover:bg-zinc-200 dark:hover:bg-[#272730] transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(entry.selectionId)}
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
            <div className="p-4 bg-zinc-50 dark:bg-[#141416] border-t border-zinc-200 dark:border-[#373742] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-500 dark:text-[#a1a1aa] font-medium">{t.totalEstimated}</span>
                <div className="text-right">
                  <div className="text-lg font-bold text-zinc-900 dark:text-white font-mono">{formatUsd(totalUsd)}</div>
                  <div className="text-xs font-bold text-[#c2410c] dark:text-[#d97706] font-mono">≈ {formatKhr(totalKhr)}</div>
                </div>
              </div>

              {/* Action Button: Show Waiter Order Sheet */}
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenShowOrder();
                }}
                className="w-full py-3 px-4 rounded-lg bg-[#ea580c] hover:bg-[#c2410c] text-white text-sm font-bold flex items-center justify-center gap-2 transition-colors shadow active:scale-[0.98]"
              >
                <Eye className="w-4 h-4" />
                <span>{lang === 'km' ? 'បង្ហាញបញ្ជីមុខម្ហូបទៅកាន់អ្នករត់តុ' : 'Show Selection to Waiter'}</span>
              </button>

            </div>

          </div>
        </div>
      )}
    </>
  );
}
