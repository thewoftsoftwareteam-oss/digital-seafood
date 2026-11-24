import React, { useState, useEffect } from 'react';
import { QrCode, X, Printer, Download, Utensils } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { generateTableQrDataUrl } from '../utils/qrUtils';

export default function QrCodeManagerModal({ isOpen, onClose }) {
  const { t, lang } = useLanguage();
  const [tableInput, setTableInput] = useState('01');
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [tableUrl, setTableUrl] = useState('');

  useEffect(() => {
    if (isOpen) {
      updateQr(tableInput);
    }
  }, [isOpen, tableInput]);

  const updateQr = async (num) => {
    const result = await generateTableQrDataUrl(num);
    if (result.success) {
      setQrDataUrl(result.dataUrl);
      setTableUrl(result.url);
    }
  };

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    if (!qrDataUrl) return;
    const a = document.createElement('a');
    a.href = qrDataUrl;
    a.download = `table-${tableInput}-seafood-menu-qr.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
      <div className="bg-[#1e1e24] border border-[#373742] w-full max-w-md rounded-2xl overflow-hidden shadow-2xl">
        
        {/* Header */}
        <div className="p-4 bg-[#141416] border-b border-[#373742] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <QrCode className="w-5 h-5 text-[#ea580c]" />
            <h3 className="text-base font-bold text-white">{t.tableQrTitle}</h3>
          </div>
          <button onClick={onClose} className="p-1 text-[#a1a1aa] hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          <p className="text-xs text-[#a1a1aa] leading-relaxed">
            {t.tableQrDesc}
          </p>

          {/* Table Number Selector */}
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-white">{t.table}:</span>
            <div className="flex items-center space-x-1 flex-1 overflow-x-auto hide-scrollbar py-1">
              {['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setTableInput(num)}
                  className={`px-2.5 py-1 rounded text-xs font-mono font-bold border transition-colors flex-shrink-0 ${
                    tableInput === num
                      ? 'bg-[#ea580c] text-white border-[#ea580c]'
                      : 'bg-[#141416] text-[#d4d4d8] border-[#373742] hover:border-[#ea580c]'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          {/* Printable QR Tent Card Mockup */}
          <div 
            id="printable-qr-stand"
            className="bg-white text-[#141416] p-6 rounded-xl border-4 border-[#ea580c] text-center shadow-md space-y-3"
          >
            <div className="flex items-center justify-center space-x-1 text-[#ea580c]">
              <Utensils className="w-4 h-4" />
              <span className="text-xs font-extrabold uppercase tracking-widest">
                {lang === 'km' ? 'ស្កេនដើម្បីមើលមុខម្ហូប' : 'Scan for Digital Menu'}
              </span>
            </div>

            <h4 className="text-sm font-black text-black">
              {t.restaurantName}
            </h4>

            {qrDataUrl && (
              <div className="flex justify-center my-2">
                <img
                  src={qrDataUrl}
                  alt={`QR for Table ${tableInput}`}
                  className="w-44 h-44 border-2 border-black p-1"
                />
              </div>
            )}

            <div className="bg-[#141416] text-white py-1 px-3 rounded inline-block">
              <span className="text-xs uppercase font-bold text-amber-400 mr-1.5">{t.table}</span>
              <span className="text-lg font-black font-mono">{tableInput}</span>
            </div>

            <p className="text-[10px] text-zinc-500 font-mono break-all pt-1">
              {tableUrl}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-2">
            <button
              onClick={handleDownload}
              className="py-2.5 px-3 rounded-lg bg-[#272730] hover:bg-[#373742] text-white text-xs font-bold flex items-center justify-center gap-1.5 border border-[#373742] transition-colors"
            >
              <Download className="w-4 h-4 text-amber-400" />
              <span>{t.downloadQr}</span>
            </button>

            <button
              onClick={handlePrint}
              className="py-2.5 px-3 rounded-lg bg-[#ea580c] hover:bg-[#c2410c] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow"
            >
              <Printer className="w-4 h-4" />
              <span>{t.printQr}</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
