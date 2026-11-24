import React, { useState, useEffect } from 'react';
import { Flame, Globe, Maximize, Minimize, Sun, Moon } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const { lang, toggleLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error('Error attempting to enable fullscreen:', err);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch((err) => {
          console.error('Error attempting to exit fullscreen:', err);
        });
      }
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white dark:bg-[#141416] border-b border-zinc-200 dark:border-[#373742] shadow-sm w-full h-16 sm:h-[68px] flex items-center transition-colors duration-150">
      {/* Container with fixed full-height and strictly aligned items */}
      <div className="w-full h-full px-3.5 sm:px-6 lg:px-10 flex items-center justify-between">
        
        {/* Brand & Charcoal Grill Identity */}
        <div className="flex items-center space-x-2.5 min-w-0 mr-2">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#ea580c] flex items-center justify-center text-white shadow-sm flex-shrink-0">
            <Flame className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div className="min-w-0">
            <h1 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white tracking-tight truncate leading-snug">
              {t.restaurantName}
            </h1>
            <p className="text-[10px] sm:text-xs text-zinc-500 dark:text-[#a1a1aa] truncate leading-tight mt-0.5">
              {t.restaurantTagline}
            </p>
          </div>
        </div>

        {/* Action Controls - Fixed dimensional buttons */}
        <div className="flex items-center space-x-1.5 sm:space-x-2 flex-shrink-0">
          
          {/* Theme Switcher (Dark / Light) with locked square size */}
          <button
            onClick={toggleTheme}
            className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-lg bg-zinc-100 dark:bg-[#1e1e24] border border-zinc-300 dark:border-[#373742] text-zinc-700 dark:text-[#d4d4d8] hover:text-[#ea580c] dark:hover:text-[#ea580c] hover:border-[#ea580c] transition-colors flex-shrink-0"
            title={theme === 'dark' ? (lang === 'km' ? 'ប្តូរទៅ Light Mode' : 'Switch to Light Mode') : (lang === 'km' ? 'ប្តូរទៅ Dark Mode' : 'Switch to Dark Mode')}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-zinc-800" />
            )}
          </button>

          {/* Language Switcher with locked height and width */}
          <button
            onClick={toggleLanguage}
            className="h-8 sm:h-9 px-2.5 sm:px-3 flex items-center justify-center gap-1.5 rounded-lg bg-zinc-100 dark:bg-[#1e1e24] border border-zinc-300 dark:border-[#373742] text-xs font-semibold text-zinc-800 dark:text-white hover:border-[#ea580c] transition-colors whitespace-nowrap min-w-[78px] sm:min-w-[88px]"
            title="Toggle Language (ភាសាខ្មែរ / English)"
          >
            <Globe className="w-3.5 h-3.5 text-[#ea580c] flex-shrink-0" />
            <span className="leading-none">{lang === 'km' ? 'English' : 'ខ្មែរ'}</span>
          </button>

          {/* Fullscreen Toggle Button with locked square size */}
          <button
            onClick={toggleFullscreen}
            className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-lg bg-zinc-100 dark:bg-[#1e1e24] border border-zinc-300 dark:border-[#373742] text-zinc-700 dark:text-[#d4d4d8] hover:text-[#ea580c] dark:hover:text-white hover:border-[#ea580c] transition-colors flex-shrink-0"
            title={isFullscreen ? (lang === 'km' ? 'បិទ Fullscreen' : 'Exit Fullscreen') : (lang === 'km' ? 'បើក Fullscreen' : 'Enable Fullscreen')}
          >
            {isFullscreen ? <Minimize className="w-4 h-4 text-[#ea580c]" /> : <Maximize className="w-4 h-4" />}
          </button>

        </div>

      </div>
    </header>
  );
}
