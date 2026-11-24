import React from 'react';
import { Search, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function SearchBar({ searchQuery, onSearchChange }) {
  const { t } = useLanguage();

  return (
    <div className="px-3 sm:px-6 lg:px-10 w-full mt-1 mb-1">
      <div className="relative flex items-center">
        <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 absolute left-3 text-zinc-400 dark:text-[#a1a1aa] pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={t.searchPlaceholder}
          className="w-full pl-9 pr-8 py-2 sm:py-2.5 rounded-lg bg-white dark:bg-[#1e1e24] border border-zinc-300 dark:border-[#373742] text-xs sm:text-sm text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-[#71717a] focus:outline-none focus:border-[#ea580c] transition-colors shadow-sm"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-2.5 text-zinc-400 hover:text-zinc-700 dark:text-[#a1a1aa] dark:hover:text-white p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
