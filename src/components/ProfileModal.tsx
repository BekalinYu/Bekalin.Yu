import React from 'react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string, icon?: string) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, onShowToast }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300">
      <div className="absolute inset-0 bg-[#25342c]/70 backdrop-blur-xs" onClick={onClose} />
      <div className="relative bg-[#ecfef1] rounded-2xl w-full max-w-sm p-5 shadow-2xl z-10 border border-[#b2f0cf] animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between pb-3 border-b border-[#dbece0]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#00442d] flex items-center justify-center text-white font-bold text-lg shadow-sm">
              SK
            </div>
            <div>
              <h4 className="font-display text-sm font-bold text-[#00442d]">Sobat Kos Bekalin</h4>
              <p className="text-[11px] text-[#404943]">Mahasiswa Aktif Kampus • Gold Member</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#707973] hover:text-[#101f17] p-1 rounded-full"
            aria-label="Tutup Profil"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="py-3 space-y-2 text-xs">
          <div className="flex items-center justify-between py-1 border-b border-[#e1f2e6]">
            <span className="text-[#404943]">Poin Bekalin</span>
            <span className="font-bold text-[#2a6a48] flex items-center gap-0.5">
              <span className="material-symbols-outlined text-[16px]">stars</span> 2.450 Poin
            </span>
          </div>
          <div className="flex items-center justify-between py-1 border-b border-[#e1f2e6]">
            <span className="text-[#404943]">Alamat Antar</span>
            <span className="font-medium text-right text-[#101f17] max-w-[170px] truncate">
              Kos Melati No. 12, Gg. 3
            </span>
          </div>
          <div className="flex items-center justify-between py-1">
            <span className="text-[#404943]">Voucher Tersedia</span>
            <span className="font-bold text-[#00442d]">3 Kupon Aktif</span>
          </div>
        </div>

        <div className="pt-2 flex flex-col gap-2">
          <button
            onClick={() => {
              onClose();
              onShowToast('Riwayat pesanan dibuka', 'history');
            }}
            className="w-full bg-[#00442d] hover:bg-[#205c43] text-white py-2.5 rounded-xl font-bold text-xs active:scale-95 transition-transform"
          >
            Lihat Riwayat Pesanan
          </button>
          <button
            onClick={onClose}
            className="w-full bg-white text-[#101f17] border border-[#dbece0] py-2 rounded-xl font-semibold text-xs active:scale-95 transition-transform hover:bg-[#e1f2e6]"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
