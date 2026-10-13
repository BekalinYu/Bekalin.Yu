import React, { useState, useEffect } from 'react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemName: string;
  itemPrice: number;
  itemImage?: string;
  onSuccessReturnHome: () => void;
  onViewQrDetails: () => void;
  onShowToast: (msg: string, icon?: string) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  itemName,
  itemPrice,
  itemImage,
  onSuccessReturnHome,
  onViewQrDetails,
  onShowToast,
}) => {
  const [step, setStep] = useState<'payment' | 'success'>('payment');
  const [secondsRemaining, setSecondsRemaining] = useState(14 * 60 + 59);

  // Timer countdown
  useEffect(() => {
    if (!isOpen) {
      setStep('payment');
      setSecondsRemaining(14 * 60 + 59);
      return;
    }

    if (step === 'payment') {
      const interval = setInterval(() => {
        setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isOpen, step]);

  if (!isOpen) return null;

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const formattedTimer = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  const formattedPrice = `Rp ${itemPrice.toLocaleString('id-ID')}`;

  const copyAmount = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(itemPrice.toString()).catch(() => {});
    }
    onShowToast(`Nominal ${formattedPrice} disalin!`, 'content_copy');
  };

  const handleSimulateSuccess = () => {
    onShowToast('Memverifikasi QRIS...', 'sync');
    setTimeout(() => {
      setStep('success');
      onShowToast('Pembayaran QRIS Berhasil!', 'check_circle');
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end transition-opacity duration-300">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#25342c]/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Bottom Sheet Panel */}
      <div className="relative w-full max-h-[92vh] bg-[#ecfef1] rounded-t-3xl shadow-2xl flex flex-col overflow-hidden z-10 max-w-lg mx-auto border-t border-[#b2f0cf]">
        {step === 'payment' ? (
          <div className="flex flex-col h-full max-h-[92vh]">
            {/* Header */}
            <div className="pt-3 pb-2.5 px-4 flex items-center justify-between bg-white border-b border-[#d5e7db] shrink-0">
              <div className="flex items-center gap-2">
                <button
                  aria-label="Kembali"
                  onClick={onClose}
                  className="w-9 h-9 -ml-1 rounded-full flex items-center justify-center text-[#00442d] hover:bg-[#e1f2e6] active:scale-90 transition-transform"
                >
                  <span className="material-symbols-outlined text-[22px]">arrow_back</span>
                </button>
                <div>
                  <h3 className="font-display text-base text-[#00442d] font-bold leading-tight">
                    Checkout Kilat
                  </h3>
                  <span className="text-[11px] text-[#2a6a48] font-medium">Praktis & Bebas Ribet</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="bg-[#aceec4] text-[#2f6e4c] text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider flex items-center gap-1">
                  <span className="material-symbols-outlined text-[13px]">bolt</span> Instan
                </span>
                <button
                  aria-label="Tutup Checkout"
                  onClick={onClose}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[#404943] hover:bg-[#e1f2e6] active:scale-90 transition-transform"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>
            </div>

            {/* Scrollable Checkout Content */}
            <div className="overflow-y-auto px-4 py-4 space-y-3.5 flex-1">
              {/* Order Summary */}
              <div className="bg-white rounded-xl p-3.5 border border-[#dbece0] shadow-xs">
                <div className="flex items-center justify-between pb-2 border-b border-[#e1f2e6]">
                  <span className="text-xs text-[#00442d] font-bold flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[18px] text-[#2a6a48]">receipt_long</span>
                    Ringkasan Pesanan
                  </span>
                  <span className="text-[11px] text-[#707973]">1 Menu Siap Antar</span>
                </div>

                <div className="py-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-11 h-11 rounded-lg overflow-hidden bg-[#e1f2e6] shrink-0 border border-[#d5e7db]">
                      <img
                        alt={itemName}
                        className="w-full h-full object-cover"
                        src={
                          itemImage ||
                          'https://lh3.googleusercontent.com/aida-public/AB6AXuAwsq1zUmqmbALCHqPBJ4CygeHCw0dr0053Is8kr5ZWY7FgQFFDO_BqX6nPTf8sp6MaQcngzEr4nLhefu1poK4gNsHflq3suikcAwxfKtXrK7pdWehRy6bBnOWnRdsHYMrphZZC7VonkHqJlEshKydpDdWn0IBo3hjj-lSMBA8jrYlRY2QjshOX3iAuT_vwS-JhQbGJ0LuD9129HUcA8fVRR8SkcargSaI_2ZAiEKLg8H1fMbk5VivE'
                        }
                      />
                    </div>
                    <div className="min-w-0">
                      <h5 className="font-display text-sm font-semibold text-[#101f17] truncate">
                        {itemName}
                      </h5>
                      <span className="text-[11px] text-[#404943]">1x Porsi Lengkap + Nasi Pulen</span>
                    </div>
                  </div>
                  <span className="font-display text-sm text-[#00442d] font-bold shrink-0">
                    {formattedPrice}
                  </span>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-[#e6f8ec] text-xs text-[#404943]">
                  <div className="flex items-center justify-between text-[11px]">
                    <span>Ongkos Kirim Kos (Promo Kampus)</span>
                    <span className="text-[#2a6a48] font-bold">GRATIS (Rp 0)</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span>Biaya Layanan & Kemasan Ramah Lingkungan</span>
                    <span className="text-[#101f17]">Rp 0</span>
                  </div>
                  <div className="flex items-center justify-between pt-1.5 border-t border-[#dbece0]">
                    <span className="font-semibold text-[#101f17]">Total Tagihan</span>
                    <span className="font-display text-base text-[#00442d] font-bold">
                      {formattedPrice}
                    </span>
                  </div>
                </div>
              </div>

              {/* Delivery Details */}
              <div className="bg-white rounded-xl p-3.5 border border-[#dbece0] shadow-xs space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#00442d] font-bold flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[18px] text-[#2a6a48]">location_on</span>
                    Tujuan Pengantaran
                  </span>
                  <button
                    onClick={() => onShowToast('Alamat kos mahasiswa telah tersimpan')}
                    className="text-[11px] text-[#2a6a48] font-semibold hover:underline"
                  >
                    Ubah
                  </button>
                </div>

                <div className="bg-[#e6f8ec] p-2.5 rounded-lg flex items-start gap-2 border border-[#d5e7db]">
                  <span className="material-symbols-outlined text-[#00442d] text-[20px] mt-0.5">home</span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-[#101f17] font-semibold truncate">
                      Kos Putri Melati (Gg. Mawar No. 12)
                    </p>
                    <p className="text-[11px] text-[#404943]">Dekat Gerbang Belakang Kampus Utama</p>
                    <div className="mt-1 flex items-center gap-1 text-[11px] text-[#707973]">
                      <span className="material-symbols-outlined text-[13px]">notes</span>
                      <input
                        className="bg-transparent border-none text-[11px] text-[#101f17] w-full p-0 focus:ring-0 placeholder:text-[#707973] outline-none"
                        defaultValue="Catatan: Taruh di pagar depan kos ya Kak"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between bg-[#e6f8ec] px-3 py-2 rounded-lg text-xs">
                  <div className="flex items-center gap-1.5 text-[#101f17] font-medium">
                    <span className="material-symbols-outlined text-[#2a6a48] text-[17px]">lunch_dining</span>
                    <span>Slot: Makan Siang (11.30 - 12.00 WIB)</span>
                  </div>
                  <span className="bg-[#00442d] text-white text-[10px] px-2 py-0.5 rounded-full font-semibold">
                    Siap Hangat
                  </span>
                </div>
              </div>

              {/* QRIS Code Payment Box */}
              <div className="bg-white rounded-2xl p-4 border-2 border-[#aceec4] shadow-md flex flex-col items-center text-center relative overflow-hidden">
                <div className="w-full flex items-center justify-between pb-3 border-b border-[#e1f2e6]">
                  <div className="flex items-center gap-1.5 bg-[#e6f8ec] px-2.5 py-1 rounded-md">
                    <span className="font-extrabold text-[15px] tracking-wider text-[#ba1a1a]">QRIS</span>
                    <span className="text-[10px] text-[#c0c9c1] font-bold">|</span>
                    <span className="font-bold text-[11px] text-[#00442d]">GPN</span>
                  </div>
                  <div className="flex items-center gap-1 bg-[#f8e0ad] text-[#251a00] px-2 py-0.5 rounded-full text-[11px] font-bold">
                    <span className="material-symbols-outlined text-[14px]">timer</span>
                    <span>{formattedTimer}</span>
                  </div>
                </div>

                {/* QR Matrix SVG with Logo */}
                <div
                  className="mt-3.5 p-3 bg-white rounded-xl shadow-inner border border-[#d5e7db] relative group cursor-pointer hover:scale-102 transition-transform"
                  onClick={copyAmount}
                  title="Klik untuk salin nominal"
                >
                  <svg className="w-44 h-44 text-[#101f17]" fill="currentColor" viewBox="0 0 100 100">
                    {/* Finder 1 */}
                    <rect x="6" y="6" width="28" height="28" rx="3" />
                    <rect x="10" y="10" width="20" height="20" rx="2" fill="#ffffff" />
                    <rect x="14" y="14" width="12" height="12" rx="1.5" />
                    {/* Finder 2 */}
                    <rect x="66" y="6" width="28" height="28" rx="3" />
                    <rect x="70" y="10" width="20" height="20" rx="2" fill="#ffffff" />
                    <rect x="74" y="14" width="12" height="12" rx="1.5" />
                    {/* Finder 3 */}
                    <rect x="6" y="66" width="28" height="28" rx="3" />
                    <rect x="10" y="70" width="20" height="20" rx="2" fill="#ffffff" />
                    <rect x="14" y="74" width="12" height="12" rx="1.5" />
                    {/* Pattern bits */}
                    <rect x="38" y="10" width="4" height="4" />
                    <rect x="46" y="10" width="4" height="4" />
                    <rect x="54" y="10" width="4" height="4" />
                    <rect x="42" y="18" width="4" height="4" />
                    <rect x="50" y="18" width="4" height="4" />
                    <rect x="38" y="26" width="4" height="4" />
                    <rect x="46" y="26" width="4" height="4" />
                    <rect x="58" y="26" width="4" height="4" />
                    <rect x="10" y="38" width="4" height="4" />
                    <rect x="18" y="38" width="4" height="4" />
                    <rect x="26" y="38" width="4" height="4" />
                    <rect x="10" y="46" width="4" height="4" />
                    <rect x="22" y="46" width="4" height="4" />
                    <rect x="14" y="54" width="4" height="4" />
                    <rect x="26" y="54" width="4" height="4" />
                    <rect x="38" y="38" width="4" height="4" />
                    <rect x="46" y="42" width="4" height="4" />
                    <rect x="54" y="38" width="4" height="4" />
                    <rect x="62" y="42" width="4" height="4" />
                    <rect x="38" y="50" width="4" height="4" />
                    <rect x="50" y="50" width="4" height="4" />
                    <rect x="58" y="54" width="4" height="4" />
                    <rect x="70" y="38" width="4" height="4" />
                    <rect x="78" y="42" width="4" height="4" />
                    <rect x="86" y="38" width="4" height="4" />
                    <rect x="74" y="50" width="4" height="4" />
                    <rect x="82" y="54" width="4" height="4" />
                    <rect x="38" y="66" width="4" height="4" />
                    <rect x="46" y="70" width="4" height="4" />
                    <rect x="54" y="66" width="4" height="4" />
                    <rect x="42" y="78" width="4" height="4" />
                    <rect x="50" y="82" width="4" height="4" />
                    <rect x="58" y="74" width="4" height="4" />
                    <rect x="38" y="86" width="4" height="4" />
                    <rect x="54" y="86" width="4" height="4" />
                    <rect x="70" y="66" width="4" height="4" />
                    <rect x="78" y="70" width="4" height="4" />
                    <rect x="86" y="66" width="4" height="4" />
                    <rect x="74" y="78" width="4" height="4" />
                    <rect x="82" y="82" width="4" height="4" />
                    <rect x="70" y="86" width="4" height="4" />
                    <rect x="86" y="86" width="4" height="4" />
                    {/* Brand Center */}
                    <rect x="41" y="41" width="18" height="18" rx="4" fill="#00442d" />
                    <text x="50" y="53.5" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="Plus Jakarta Sans">
                      BY
                    </text>
                  </svg>
                  <span className="mt-1 block text-[10px] text-[#707973] font-mono">
                    NMID: ID102488921029
                  </span>
                </div>

                {/* Amount and Copy */}
                <div className="mt-3 w-full bg-[#e6f8ec] p-2.5 rounded-xl flex items-center justify-between border border-[#d5e7db]">
                  <div className="text-left">
                    <span className="block text-[11px] text-[#404943]">Nominal Pas Bayar</span>
                    <span className="font-display text-base text-[#00442d] font-bold">
                      {formattedPrice}
                    </span>
                  </div>
                  <button
                    onClick={copyAmount}
                    className="bg-white text-[#00442d] px-3 py-1.5 rounded-lg border border-[#d5e7db] text-xs font-semibold flex items-center gap-1 active:scale-95 transition-all shadow-xs hover:bg-[#e1f2e6]"
                  >
                    <span className="material-symbols-outlined text-[16px]">content_copy</span>
                    <span>Salin</span>
                  </button>
                </div>

                <p className="text-[11px] text-[#404943] mt-2.5 leading-snug">
                  Scan pakai <strong>GoPay, OVO, ShopeePay, BCA, Livin'</strong>, atau M-Banking berlogo QRIS.
                </p>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-4 bg-white border-t border-[#dbece0] flex flex-col gap-2 shrink-0">
              <button
                onClick={handleSimulateSuccess}
                className="w-full bg-[#00442d] hover:bg-[#205c43] text-white py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 active:scale-98 transition-all shadow-md"
              >
                <span className="material-symbols-outlined text-[20px]">check_circle</span>
                <span>Simulasi Bayar Berhasil (Cek Status)</span>
              </button>
              <button
                onClick={onClose}
                className="w-full text-[#707973] hover:text-[#101f17] text-xs py-1"
              >
                Batal dan kembali ke menu
              </button>
            </div>
          </div>
        ) : (
          /* Step 2: Payment Success Screen State */
          <div className="flex flex-col h-full max-h-[92vh] overflow-y-auto px-4 py-6 items-center text-center justify-between">
            <div className="w-full flex flex-col items-center">
              {/* Animated Green Checkmark Hero */}
              <div className="w-20 h-20 rounded-full bg-[#aceec4] text-[#2f6e4c] flex items-center justify-center shadow-lg my-2 animate-success-bounce">
                <span className="material-symbols-outlined text-[44px]">task_alt</span>
              </div>

              <span className="inline-block mt-3 bg-[#b2f0cf] text-[#002114] text-[11px] px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                Pembayaran Berhasil
              </span>

              <h3 className="font-display text-xl text-[#00442d] font-bold mt-2 leading-tight">
                Pesanan Dikonfirmasi!
              </h3>
              <p className="text-sm text-[#404943] mt-1">
                Dapur sedang menyiapkan bekal hangatmu 🍱
              </p>

              {/* Order Detail Card */}
              <div className="mt-4 w-full bg-white rounded-2xl p-4 border border-[#dbece0] text-left shadow-xs space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-[#e1f2e6]">
                  <div>
                    <span className="text-[11px] text-[#707973]">Nomor Pesanan</span>
                    <span className="block font-display text-sm text-[#00442d] font-bold">
                      #BKL-8921-QRS
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-[#707973]">Estimasi Sampai</span>
                    <span className="block font-display text-sm text-[#2a6a48] font-bold">
                      11:30 WIB
                    </span>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#404943]">Menu Dipilih</span>
                    <span className="font-semibold text-[#101f17]">{itemName} (1x)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#404943]">Alamat Kos</span>
                    <span className="font-semibold text-[#101f17] text-right max-w-[180px] truncate">
                      Kos Melati (Gg. Mawar 12)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#404943]">Metode Bayar</span>
                    <span className="font-semibold text-[#2a6a48] flex items-center gap-1">
                      <span className="material-symbols-outlined text-[15px]">qr_code_scanner</span>
                      QRIS (Lunas {formattedPrice})
                    </span>
                  </div>
                </div>

                {/* Status tracker progress bar */}
                <div className="mt-2 pt-2.5 border-t border-[#e1f2e6]">
                  <div className="flex items-center justify-between text-[11px] text-[#00442d] mb-1 font-semibold">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-[#2a6a48] animate-ping" />
                      Sedang Dimasak
                    </span>
                    <span className="text-[#707973]">Diantar Kurir</span>
                    <span className="text-[#707973]">Sampai Kos</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#d5e7db] rounded-full overflow-hidden">
                    <div className="h-full bg-[#00442d] rounded-full w-1/3" />
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Buttons on Success Screen */}
            <div className="w-full pt-6 flex flex-col gap-2">
              <button
                onClick={onSuccessReturnHome}
                className="w-full bg-[#00442d] hover:bg-[#205c43] text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 active:scale-98 transition-all shadow-md"
              >
                <span className="material-symbols-outlined text-[20px]">home</span>
                <span>Kembali ke Beranda</span>
              </button>
              <button
                onClick={onViewQrDetails}
                className="w-full bg-white text-[#00442d] py-2.5 rounded-xl border border-[#dbece0] text-xs font-semibold flex items-center justify-center gap-1.5 active:scale-98 transition-all shadow-xs hover:bg-[#e1f2e6]"
              >
                <span className="material-symbols-outlined text-[18px]">qr_code_2</span>
                <span>Lihat Info QR Bekal Ini</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
