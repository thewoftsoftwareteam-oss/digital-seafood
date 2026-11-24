import React from 'react';
import { X, Utensils, AlertCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import { useSelection } from '../context/SelectionContext';

export default function CallWaiterModal({ isOpen, onClose }) {
  const { lang, t } = useLanguage();
  const { formatUsd, formatKhr, convertUsdToKhr } = useCurrency();
  const { selectedItems, totalUsd, totalItemCount } = useSelection();

  if (!isOpen) return null;

  const totalKhr = convertUsdToKhr(totalUsd);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85">
      <div className="bg-white dark:bg-[#1e1e24] border border-zinc-200 dark:border-[#373742] text-zinc-900 dark:text-white w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-4 bg-zinc-50 dark:bg-[#141416] border-b border-zinc-200 dark:border-[#373742] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-8 h-8 rounded-lg bg-[#ea580c] flex items-center justify-center text-white">
              <Utensils className="w-4 h-4" />
            </span>
            <h3 className="text-base font-bold text-zinc-900 dark:text-white">
              {lang === 'km' ? 'បញ្ជីមុខម្ហូបដែលបានរើស' : 'Selected Dishes Sheet'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-zinc-500 hover:text-zinc-900 dark:text-[#a1a1aa] dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-[#272730] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* High-Contrast Order Sheet */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4">
          
          {/* Top Instruction Banner */}
          <div className="p-3 rounded-lg bg-orange-50 dark:bg-[#272730] border border-[#ea580c] flex items-center gap-2.5">
            <AlertCircle className="w-5 h-5 text-[#ea580c] flex-shrink-0" />
            <p className="text-xs text-zinc-800 dark:text-white font-medium">
              {lang === 'km' 
                ? 'បង្ហាញអេក្រង់នេះទៅកាន់អ្នករត់តុ ដើម្បីកត់ត្រាយកម្ហូបរបស់អ្នក' 
                : 'Show this screen directly to the waiter to record your order'}
            </p>
          </div>

          {/* Ticket Container */}
          <div className="bg-zinc-50 dark:bg-[#141416] border border-zinc-200 dark:border-[#373742] rounded-xl p-4 divide-y divide-zinc-200 dark:divide-[#272730]">
            
            {/* Header info */}
            <div className="pb-3 flex items-center justify-between">
              <div>
                <span className="text-xs text-zinc-500 dark:text-[#a1a1aa] block font-medium">
                  {lang === 'km' ? 'ចំនួនមុខម្ហូបសរុប' : 'Total Items'}
                </span>
                <span className="text-lg font-bold text-zinc-900 dark:text-white">
                  {totalItemCount} {lang === 'km' ? 'មុខ' : 'dishes'}
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs text-zinc-500 dark:text-[#a1a1aa] block font-medium">
                  {lang === 'km' ? 'តម្លៃប៉ាន់ស្មាន' : 'Estimated Total'}
                </span>
                <span className="text-base font-bold text-[#ea580c] font-mono">
                  {formatUsd(totalUsd)}
                </span>
              </div>
            </div>

            {/* Items List */}
            <div className="py-3 space-y-3">
              {selectedItems.map((entry) => {
                const itemTitleKh = entry.item.nameKh;
                const itemTitleEn = entry.item.nameEn;

                return (
                  <div key={entry.selectionId} className="flex items-start justify-between gap-2">
                    <div className="flex items-start space-x-2">
                      <span className="w-6 h-6 rounded bg-[#ea580c] text-white font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                        {entry.quantity}x
                      </span>
                      <div>
                        <div className="text-sm font-bold text-zinc-900 dark:text-white">{itemTitleKh}</div>
                        <div className="text-[11px] text-zinc-500 dark:text-[#a1a1aa]">{itemTitleEn}</div>
                        
                        {/* Modifiers */}
                        <div className="text-[11px] text-zinc-600 dark:text-[#d4d4d8] mt-0.5 space-x-1.5">
                          {entry.selectedCooking && (
                            <span className="inline-block bg-zinc-200 dark:bg-[#272730] px-1.5 py-0.5 rounded text-zinc-800 dark:text-white font-medium">
                              {entry.selectedCooking}
                            </span>
                          )}
                          {entry.selectedSpicy && (
                            <span className="inline-block bg-orange-100 dark:bg-[#373742] px-1.5 py-0.5 rounded text-[#ea580c] font-bold">
                              {entry.selectedSpicy}
                            </span>
                          )}
                          {entry.selectedSauce && (
                            <span className="inline-block bg-zinc-200 dark:bg-[#272730] px-1.5 py-0.5 rounded text-zinc-800 dark:text-[#d4d4d8]">
                              {entry.selectedSauce}
                            </span>
                          )}
                        </div>

                        {entry.specialNotes && (
                          <div className="text-xs text-[#c2410c] dark:text-amber-300 italic mt-0.5 font-medium">
                            ចំណាំ: "{entry.specialNotes}"
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="text-right font-mono text-xs font-bold text-zinc-900 dark:text-white flex-shrink-0">
                      {formatUsd(entry.item.priceUsd * entry.quantity)}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Total Summary */}
            <div className="pt-3 flex items-center justify-between">
              <span className="text-xs text-zinc-500 dark:text-[#a1a1aa] font-semibold">{t.totalEstimated}:</span>
              <div className="text-right">
                <div className="text-base font-bold text-zinc-900 dark:text-white font-mono">{formatUsd(totalUsd)}</div>
                <div className="text-xs font-bold text-[#c2410c] dark:text-[#d97706] font-mono">≈ {formatKhr(totalKhr)}</div>
              </div>
            </div>

          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-lg bg-zinc-200 dark:bg-[#272730] hover:bg-zinc-300 dark:hover:bg-[#373742] text-xs font-semibold text-zinc-900 dark:text-white transition-colors"
          >
            {lang === 'km' ? 'បិទ' : 'Close'}
          </button>

        </div>

      </div>
    </div>
  );
}
