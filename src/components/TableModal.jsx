import React, { useState } from 'react';
import { Utensils, X, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useSelection } from '../context/SelectionContext';

const TABLE_PRESETS = [
  '01', '02', '03', '04', '05',
  '06', '07', '08', '09', '10',
  '11', '12', '15', '18', '20'
];

export default function TableModal({ isOpen, onClose }) {
  const { t, lang } = useLanguage();
  const { tableNumber, setTableNumber } = useSelection();
  const [customTable, setCustomTable] = useState('');

  if (!isOpen) return null;

  const handleSelect = (num) => {
    setTableNumber(num);
    onClose();
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (customTable.trim()) {
      setTableNumber(customTable.trim());
      setCustomTable('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75">
      <div className="bg-[#1e1e24] border border-[#373742] w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl">
        
        {/* Header */}
        <div className="p-4 bg-[#141416] border-b border-[#373742] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Utensils className="w-5 h-5 text-[#ea580c]" />
            <h3 className="text-base font-bold text-white">{t.selectTable}</h3>
          </div>
          <button onClick={onClose} className="p-1 text-[#a1a1aa] hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          <p className="text-xs text-[#a1a1aa]">
            {lang === 'km' 
              ? 'ជ្រើសរើសលេខតុដែលអ្នកកំពុងអង្គុយ ដើម្បីឱ្យបុគ្គលិកដឹងច្បាស់លាស់៖' 
              : 'Select your current table number so our staff knows where you are seated:'}
          </p>

          {/* Quick Table Grid */}
          <div className="grid grid-cols-5 gap-2">
            {TABLE_PRESETS.map((num) => {
              const isCurrent = tableNumber === num;
              return (
                <button
                  key={num}
                  onClick={() => handleSelect(num)}
                  className={`py-2 rounded-lg font-mono text-sm font-bold transition-all border ${
                    isCurrent
                      ? 'bg-[#ea580c] text-white border-[#ea580c]'
                      : 'bg-[#141416] text-[#d4d4d8] border-[#373742] hover:border-[#ea580c] hover:text-white'
                  }`}
                >
                  {num}
                </button>
              );
            })}
          </div>

          {/* Custom Table Input */}
          <form onSubmit={handleCustomSubmit} className="pt-2 border-t border-[#272730] flex gap-2">
            <input
              type="text"
              value={customTable}
              onChange={(e) => setCustomTable(e.target.value)}
              placeholder={lang === 'km' ? 'បញ្ចូលលេខតុផ្សេងទៀត...' : 'Other table no...'}
              className="flex-1 px-3 py-2 rounded-lg bg-[#141416] border border-[#373742] text-xs text-white placeholder-[#71717a] focus:outline-none focus:border-[#ea580c]"
            />
            <button
              type="submit"
              className="px-3 py-2 rounded-lg bg-[#ea580c] hover:bg-[#c2410c] text-white text-xs font-bold transition-colors"
            >
              <Check className="w-4 h-4" />
            </button>
          </form>

        </div>

      </div>
    </div>
  );
}
