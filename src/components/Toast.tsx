import React from 'react';

interface ToastProps {
  message: string;
  icon?: string;
  visible: boolean;
}

export const Toast: React.FC<ToastProps> = ({ message, icon = 'check_circle', visible }) => {
  if (!visible) return null;

  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-[#25342c] text-[#e3f5e9] px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2 text-sm z-50 transition-all duration-300 animate-in fade-in slide-in-from-bottom-3 pointer-events-none border border-[#3b5245]">
      <span className="material-symbols-outlined text-[#aceec4] text-[18px]">
        {icon}
      </span>
      <span className="font-medium text-[13px]">{message}</span>
    </div>
  );
};
