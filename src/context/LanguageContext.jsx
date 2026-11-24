import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const UI_TRANSLATIONS = {
  km: {
    restaurantName: 'គ្រឿងសមុទ្រអាំងធម្មជាតិ',
    restaurantTagline: 'ស្រស់ៗរាល់ថ្ងៃ • អាំងលើចង្ក្រានធ្យូង • ទឹកត្រីកោះកុងពិសេស',
    table: 'តុលេខ',
    selectTable: 'ជ្រើសរើសលេខតុ',
    searchPlaceholder: 'ស្វែងរកមុខម្ហូប (ក្តាម, មឹក, បង្កង, ត្រី...)...',
    all: 'ទាំងអស់',
    price: 'តម្លៃ',
    approx: 'ប្រហាក់ប្រហែល',
    callWaiter: 'ហៅអ្នករត់តុ',
    callWaiterDesc: 'ចុចទីនេះដើម្បីហៅអ្នករត់តុមកកត់ត្រាការកម្មង់នៅតុរបស់អ្នក',
    callingWaiterTitle: 'កំពុងហៅអ្នករត់តុមកកាន់តុ',
    callingNotice: 'បុគ្គលិកបានដឹងហើយ និងកំពុងដើរមកកាន់តុរបស់អ្នកក្នុងពេលបន្តិចទៀតនេះ!',
    showWaiterBtn: 'បង្ហាញមុខម្ហូបទៅកាន់អ្នករត់តុ',
    showWaiterTitle: 'បញ្ជីម្ហូបសម្រាប់អ្នករត់ទុកត់ត្រា',
    showWaiterInstruction: 'សូមបង្ហាញអេក្រង់ទូរស័ព្ទនេះទៅកាន់អ្នករត់តុ',
    mySelection: 'ម្ហូបដែលបានរើស',
    emptySelection: 'មិនទាន់មានម្ហូបក្នុងបញ្ជីនៅឡើយទេ',
    emptySelectionHint: 'សូមជ្រើសរើសមុខម្ហូបពីបញ្ជីខាងលើ ដើម្បីកត់ត្រាទុក',
    addToSelection: 'ដាក់ក្នុងបញ្ជីម្ហូប',
    spiciness: 'កម្រិតហឹរ',
    cookingStyle: 'របៀបចម្អិន',
    sauceOption: 'ទឹកជ្រលក់',
    specialNotes: 'ចំណាំបន្ថែម (ឧ. មិនដាក់ប៊ីចេង, ផ្អែមតិច...)',
    notesPlaceholder: 'សរសេរបន្ថែមនៅទីនេះ...',
    quantity: 'ចំនួន',
    totalEstimated: 'តម្លៃប៉ាន់ស្មានសរុប',
    exchangeRateTitle: 'អត្រាប្តូរប្រាក់ (Exchange Rate)',
    rateLabel: '១ ដុល្លារ ($1 USD) =',
    riel: 'រៀល (៛)',
    currencyMode: 'ទម្រង់បង្ហាញតម្លៃ',
    modeDual: 'បង្ហាញទាំងពីរ ($ & ៛)',
    modeUsd: 'ដុល្លារ ($)',
    modeKhr: 'រៀល (៛)',
    save: 'រក្សាទុក',
    close: 'បិទ',
    clearAll: 'លុបទាំងអស់',
    tableQrTitle: 'បង្កើត QR Code សម្រាប់តុ',
    tableQrDesc: 'ឧបករណ៍សម្រាប់ម្ចាស់ហាង បោះពុម្ព QR ដាក់តាមតុនីមួយៗ',
    printQr: 'បោះពុម្ព QR Code',
    downloadQr: 'ទាញយក QR Code',
    confirmCall: 'បញ្ជាក់ការហៅអ្នករត់តុ',
    cancel: 'ថយក្រោយ',
    popularBadge: 'លក់ដាច់',
    grillBadge: 'អាំងធ្យូង'
  },
  en: {
    restaurantName: 'Natural Charcoal Seafood',
    restaurantTagline: 'Daily Fresh Catch • Charcoal Embers • Signature Koh Kong Dip',
    table: 'Table No.',
    selectTable: 'Select Table Number',
    searchPlaceholder: 'Search seafood (crab, squid, prawns, fish...)...',
    all: 'All',
    price: 'Price',
    approx: 'Approx',
    callWaiter: 'Call Waiter',
    callWaiterDesc: 'Tap here to call a waiter to take your order directly at your table',
    callingWaiterTitle: 'Calling Waiter to Table',
    callingNotice: 'Our staff has been notified and is on the way to your table!',
    showWaiterBtn: 'Show Waiter My Selection',
    showWaiterTitle: 'Order Sheet for Waiter',
    showWaiterInstruction: 'Please show this screen directly to the waiter',
    mySelection: 'My Selection',
    emptySelection: 'No dishes selected yet',
    emptySelectionHint: 'Browse the menu above and pick dishes to build your order note',
    addToSelection: 'Add to Selection',
    spiciness: 'Spice Level',
    cookingStyle: 'Cooking Style',
    sauceOption: 'Dipping Sauce',
    specialNotes: 'Special Requests (e.g. no MSG, less sweet...)',
    notesPlaceholder: 'Type special instructions here...',
    quantity: 'Quantity',
    totalEstimated: 'Estimated Total',
    exchangeRateTitle: 'Exchange Rate Settings',
    rateLabel: '$1 USD =',
    riel: 'KHR (៛)',
    currencyMode: 'Price Display Mode',
    modeDual: 'Dual ($ & ៛)',
    modeUsd: 'USD ($)',
    modeKhr: 'KHR (៛)',
    save: 'Save',
    close: 'Close',
    clearAll: 'Clear All',
    tableQrTitle: 'Table QR Code Generator',
    tableQrDesc: 'Manager tool to generate and print QR codes for restaurant tables',
    printQr: 'Print QR Code',
    downloadQr: 'Download QR',
    confirmCall: 'Confirm Call Waiter',
    cancel: 'Cancel',
    popularBadge: 'Popular',
    grillBadge: 'Charcoal Grilled'
  }
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('seafood_menu_lang') || 'km';
  });

  useEffect(() => {
    localStorage.setItem('seafood_menu_lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleLanguage = () => {
    setLang(prev => (prev === 'km' ? 'en' : 'km'));
  };

  const t = UI_TRANSLATIONS[lang] || UI_TRANSLATIONS.km;

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
