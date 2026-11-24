import React, { useState } from 'react';
import { DollarSign, X, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';

export default function CurrencySettingsModal({ isOpen, onClose }) {
  const { t, lang } = useLanguage();
  const { exchangeRate, setExchangeRate, displayMode, setDisplayMode } = useCurrency();
  
  const [rateInput, setRateInput] = useState(exchangeRate.toString());

  if (!isOpen) return null;

  const handleSaveRate = (e) => {
    e.preventDefault();
    const parsed = parseInt(rateInput, 10);
    if (!isNaN(parsed) && parsed > 0) {
      setExchangeRate(parsed);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75">
      <div className="bg-[#1e1e24] border border-[#373742] w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl">
        
        {/* Header */}
        <div className="p-4 bg-[#141416] border-b border-[#373742] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <DollarSign className="w-5 h-5 text-[#d97706]" />
            <h3 className="text-base font-bold text-white">{t.exchangeRateTitle}</h3>
          </div>
          <button onClick={onClose} className="p-1 text-[#a1a1aa] hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          
          {/* Rate Editor */}
          <form onSubmit={handleSaveRate} className="space-y-2">
            <label className="text-xs font-bold text-[#d4d4d8] block">
              {t.rateLabel}
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                min="1000"
                max="10000"
                step="50"
                value={rateInput}
                onChange={(e) => setRateInput(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#141416] border border-[#373742] font-mono text-sm text-white focus:outline-none focus:border-[#ea580c]"
              />
              <span className="text-xs font-bold text-[#d97706] whitespace-nowrap">{t.riel}</span>
            </div>
            
            {/* Quick preset buttons */}
            <div className="flex gap-1.5 pt-1">
              {[4050, 4100, 4150, 4200].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setRateInput(preset.toString())}
                  className={`px-2 py-1 rounded text-[11px] font-mono border transition-colors ${
                    rateInput === preset.toString()
                      ? 'bg-[#ea580c] text-white border-[#ea580c]'
                      : 'bg-[#141416] text-[#a1a1aa] border-[#373742] hover:text-white'
                  }`}
                >
                  {preset}៛
                </button>
              ))}
            </div>
          </form>

          {/* Display Mode Selection */}
          <div className="pt-3 border-t border-[#272730] space-y-2">
            <label className="text-xs font-bold text-[#d4d4d8] block">
              {t.currencyMode}
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { id: 'dual', label: t.modeDual },
                { id: 'usd', label: t.modeUsd },
                { id: 'khr', label: t.modeKhr },
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setDisplayMode(m.id)}
                  className={`px-2 py-2 rounded-lg text-xs font-medium transition-colors border text-center ${
                    displayMode === m.id
                      ? 'bg-[#ea580c] text-white border-[#ea580c] font-bold'
                      : 'bg-[#141416] text-[#a1a1aa] border-[#373742] hover:text-white'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSaveRate}
            className="w-full py-2.5 rounded-lg bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow"
          >
            <Check className="w-4 h-4" />
            <span>{t.save}</span>
          </button>

        </div>

      </div>
    </div>
  );
}
