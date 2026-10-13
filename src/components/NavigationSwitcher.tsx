import React from 'react';
import { ScreenType } from '../types';

interface NavigationSwitcherProps {
  currentScreen: ScreenType;
  onSelectScreen: (screen: ScreenType) => void;
}

export const NavigationSwitcher: React.FC<NavigationSwitcherProps> = ({
  currentScreen,
  onSelectScreen,
}) => {
  return (
    <div className="bg-[#002d1d] text-white border-b border-[#0a5132] px-3 py-2 z-50 sticky top-0 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="bg-[#aceec4] text-[#00442d] font-bold text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider">
            Prototype Navigation
          </span>
          <span className="text-[12px] font-medium text-emerald-100 hidden sm:inline">
            3 Layar Sesuai Alur Desain:
          </span>
        </div>

        {/* 3 Prototype Screens */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          <button
            onClick={() => onSelectScreen('mobile-beranda')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap ${
              currentScreen === 'mobile-beranda'
                ? 'bg-[#b2f0cf] text-[#00442d] shadow-sm font-bold ring-1 ring-white/40'
                : 'text-emerald-200 hover:text-white hover:bg-emerald-800/60'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">smartphone</span>
            <span>1. Beranda Interaktif (Mobile)</span>
            {currentScreen === 'mobile-beranda' && (
              <span className="text-[9px] bg-[#00442d] text-white px-1.5 py-0.2 rounded-full font-normal">
                Initial
              </span>
            )}
          </button>

          <button
            onClick={() => onSelectScreen('mobile-qr')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap ${
              currentScreen === 'mobile-qr'
                ? 'bg-[#b2f0cf] text-[#00442d] shadow-sm font-bold ring-1 ring-white/40'
                : 'text-emerald-200 hover:text-white hover:bg-emerald-800/60'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">qr_code_scanner</span>
            <span>2. Info QR Produk (Mobile)</span>
          </button>

          <button
            onClick={() => onSelectScreen('web-beranda')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap ${
              currentScreen === 'web-beranda'
                ? 'bg-[#b2f0cf] text-[#00442d] shadow-sm font-bold ring-1 ring-white/40'
                : 'text-emerald-200 hover:text-white hover:bg-emerald-800/60'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">desktop_windows</span>
            <span>3. Beranda (Web)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
