import React, { useState, useEffect } from 'react';
import { ScreenType } from '../types';
import { LOGO_URL, CHICKEN_TERIYAKI_WOOD, MENU_ITEMS } from '../data/menuData';

interface MobileQrScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onOpenCheckout: (item: { title: string; price: number; image?: string }) => void;
  onShowToast: (msg: string, icon?: string) => void;
}

export const MobileQrScreen: React.FC<MobileQrScreenProps> = ({
  onNavigate,
  onOpenCheckout,
  onShowToast,
}) => {
  const [activeTab, setActiveTab] = useState<'nutrisi' | 'hangatkan' | 'komposisi' | 'keamanan'>('nutrisi');
  const [starRating, setStarRating] = useState<number>(0);
  const [ratingSubmitted, setRatingSubmitted] = useState<boolean>(false);

  // Reheat timer state
  const [timerSeconds, setTimerSeconds] = useState<number>(120);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            onShowToast('Ting! Makanan kamu sudah hangat & siap disantap nikmat! 😋', 'lunch_dining');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds, onShowToast]);

  const toggleTimer = () => {
    if (timerSeconds === 0) {
      setTimerSeconds(120);
      setIsTimerRunning(true);
      return;
    }
    setIsTimerRunning(!isTimerRunning);
  };

  const handleRate = (stars: number) => {
    setStarRating(stars);
    setRatingSubmitted(true);
    onShowToast(`Terima kasih! Kamu memberi ${stars} bintang 💚`, 'star');
  };

  const timerMinutes = Math.floor(timerSeconds / 60);
  const timerSecs = timerSeconds % 60;
  const timerFormatted = `${timerMinutes.toString().padStart(2, '0')}:${timerSecs.toString().padStart(2, '0')}`;

  return (
    <div className="bg-[#f8f7f1] min-h-screen text-[#2d3748] flex flex-col relative max-w-md mx-auto shadow-2xl border-x border-[#e8ede0] pb-24">
      {/* Sticky Top Bar */}
      <header className="sticky top-0 z-40 bg-[#f8f7f1]/95 backdrop-blur-md border-b border-[#e8ede0]/80 px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <div
            onClick={() => onNavigate('mobile-beranda')}
            className="flex items-center gap-2 cursor-pointer"
          >
            <img
              alt="Bekalin.yu Logo"
              className="h-8 w-auto object-contain"
              src={LOGO_URL}
            />
          </div>

          {/* Quick Context Actions */}
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 shadow-xs">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Resmi QR Scan
            </span>

            <button
              aria-label="Kembali ke Beranda"
              onClick={() => onNavigate('mobile-beranda')}
              className="p-1.5 text-slate-500 hover:text-[#205c43] bg-white rounded-full border border-[#e8ede0] shadow-sm active:scale-90 transition-transform"
              title="Kembali ke Beranda Mobile"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Body */}
      <main className="px-4 pt-3 space-y-4">
        {/* Verification Banner */}
        <section className="bg-gradient-to-r from-emerald-800 to-[#205c43] text-white rounded-2xl p-3.5 shadow-md flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[22px] text-[#f2d99a]">
                verified
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] uppercase tracking-wider font-bold text-[#f2d99a]">
                  Batch Hari Ini
                </span>
                <span className="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded-full font-mono">
                  #BKL-2024-TK09
                </span>
              </div>
              <p className="text-xs text-white/90 font-medium">Terverifikasi Dapur Higienis Mahasiswa</p>
            </div>
          </div>
          <span className="inline-flex items-center text-[10px] bg-emerald-950/40 text-emerald-200 px-2.5 py-1 rounded-lg font-bold border border-white/10">
            Fresh Cooked
          </span>
        </section>

        {/* Product Hero Card */}
        <article className="bg-white rounded-3xl p-4 shadow-sm border border-[#e8ede0]/80 overflow-hidden">
          {/* Product Image with Floating Indicators */}
          <div className="relative rounded-2xl overflow-hidden bg-slate-100 aspect-[16/10] mb-3.5">
            <img
              alt="Chicken Teriyaki Bento Bekalin.yu"
              className="w-full h-full object-cover"
              src={CHICKEN_TERIYAKI_WOOD}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Live status chips */}
            <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
              <span className="bg-[#205c43]/90 backdrop-blur text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
                Catering Siap Santap
              </span>
            </div>

            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
              <span className="font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px] text-[#f2d99a]">
                  schedule
                </span>
                Dibuat: Pagi ini (09:30 WIB)
              </span>
              <span className="text-amber-300 font-bold bg-black/40 backdrop-blur px-2 py-0.5 rounded-md text-[11px]">
                Batas Hangat: 21:00 WIB
              </span>
            </div>
          </div>

          {/* Food Title & Quick Macros */}
          <div>
            <div className="flex items-start justify-between gap-2">
              <div>
                <h1 className="font-display text-lg font-bold text-[#205c43] leading-snug">
                  Chicken Teriyaki Bento
                </h1>
                <p className="text-xs text-slate-500 mt-0.5">
                  Nasi pandan wangi, ayam fillet teriyaki gurih manis & tumis brokoli wortel.
                </p>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-[#e8ede0] text-[#205c43] shrink-0">
                1 Porsi
              </span>
            </div>

            {/* Metric Highlights */}
            <div className="grid grid-cols-3 gap-2 mt-3.5 pt-3 border-t border-dashed border-slate-200">
              <div className="text-center p-2 rounded-xl bg-[#f8f7f1] border border-[#e8ede0]">
                <span className="block text-[11px] text-slate-500 font-medium">Energi</span>
                <span className="font-display text-sm font-extrabold text-[#205c43]">
                  450 <span className="text-[10px] font-normal">kkal</span>
                </span>
              </div>
              <div className="text-center p-2 rounded-xl bg-[#f8f7f1] border border-[#e8ede0]">
                <span className="block text-[11px] text-slate-500 font-medium">Protein</span>
                <span className="font-display text-sm font-extrabold text-[#205c43]">
                  25 <span className="text-[10px] font-normal">gram</span>
                </span>
              </div>
              <div className="text-center p-2 rounded-xl bg-[#f8f7f1] border border-[#e8ede0]">
                <span className="block text-[11px] text-slate-500 font-medium">Lemak Sehat</span>
                <span className="font-display text-sm font-extrabold text-[#205c43]">
                  12 <span className="text-[10px] font-normal">gram</span>
                </span>
              </div>
            </div>
          </div>
        </article>

        {/* Quick Navigation Tabs */}
        <nav aria-label="Informasi Produk Tab" className="flex gap-2 overflow-x-auto no-scrollbar py-1">
          <button
            onClick={() => setActiveTab('nutrisi')}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-all ${
              activeTab === 'nutrisi'
                ? 'bg-[#205c43] text-white shadow-sm'
                : 'bg-white text-slate-600 border border-[#e8ede0] hover:bg-slate-50'
            }`}
          >
            🥗 Nutrisi & AKG
          </button>

          <button
            onClick={() => setActiveTab('hangatkan')}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-all ${
              activeTab === 'hangatkan'
                ? 'bg-[#205c43] text-white shadow-sm'
                : 'bg-white text-slate-600 border border-[#e8ede0] hover:bg-slate-50'
            }`}
          >
            ♨️ Cara Hangatkan
          </button>

          <button
            onClick={() => setActiveTab('komposisi')}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-all ${
              activeTab === 'komposisi'
                ? 'bg-[#205c43] text-white shadow-sm'
                : 'bg-white text-slate-600 border border-[#e8ede0] hover:bg-slate-50'
            }`}
          >
            🌾 Bahan & Alergen
          </button>

          <button
            onClick={() => setActiveTab('keamanan')}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-all ${
              activeTab === 'keamanan'
                ? 'bg-[#205c43] text-white shadow-sm'
                : 'bg-white text-slate-600 border border-[#e8ede0] hover:bg-slate-50'
            }`}
          >
            🛡️ Sertifikasi & Kos
          </button>
        </nav>

        {/* Tab Contents */}
        <section className="space-y-3">
          {/* TAB 1: Nutrisi & AKG */}
          {activeTab === 'nutrisi' && (
            <div className="bg-white rounded-3xl p-4 border border-[#e8ede0] shadow-sm animate-in fade-in duration-200">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-display text-sm font-bold text-[#205c43] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-emerald-600 text-[18px]">
                    check_circle
                  </span>
                  Kandungan Makronutrisi Terukur
                </h2>
                <span className="text-[11px] font-medium text-slate-500">Standar AKG 2.000 kkal</span>
              </div>

              {/* AKG Summary Bar */}
              <div className="bg-[#f8f7f1] p-3 rounded-2xl mb-3.5 border border-[#e8ede0]">
                <div className="flex justify-between items-center text-xs mb-1.5 font-bold">
                  <span className="text-slate-700">Porsi Kalori Bekal</span>
                  <span className="text-[#205c43]">22.5% Kebutuhan Harian</span>
                </div>
                <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-[#205c43] h-full rounded-full transition-all duration-500" style={{ width: '22.5%' }} />
                </div>
                <p className="text-[11px] text-slate-500 mt-2">
                  Diformulasikan agar tidak bikin kantuk saat kelas kuliah siang dan kenyang lebih lama.
                </p>
              </div>

              {/* Detailed Nutrient Items */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-600 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    Protein Berkualitas
                  </span>
                  <span className="font-bold text-slate-800">
                    25g <span className="font-normal text-slate-400">(Ayam Utuh)</span>
                  </span>
                </div>

                <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-600 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    Karbohidrat Kompleks
                  </span>
                  <span className="font-bold text-slate-800">
                    58g <span className="font-normal text-slate-400">(Nasi Wangi)</span>
                  </span>
                </div>

                <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-600 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-orange-400" />
                    Lemak Sehat
                  </span>
                  <span className="font-bold text-slate-800">
                    12g <span className="font-normal text-slate-400">(Minyak Wijen & Paha Ayam)</span>
                  </span>
                </div>

                <div className="flex items-center justify-between py-1.5">
                  <span className="text-slate-600 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-teal-500" />
                    Serat Pangan Sayur
                  </span>
                  <span className="font-bold text-slate-800">
                    4.2g <span className="font-normal text-slate-400">(Brokoli & Wortel)</span>
                  </span>
                </div>
              </div>

              {/* Allergen Alert */}
              <div className="mt-3.5 p-3 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-2.5 text-[11px]">
                <span className="text-amber-600 text-sm">⚠️</span>
                <div>
                  <strong className="font-bold text-amber-900 block">Informasi Alergen Penting:</strong>
                  <p className="text-amber-800 mt-0.5 leading-relaxed">
                    Mengandung <strong>kedelai (shoyu Jepang)</strong> dan <strong>biji wijen</strong>. Bebas MSG sintetis berlebih dan 0% bahan pengawet kimia.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Cara Hangatkan */}
          {activeTab === 'hangatkan' && (
            <div className="bg-white rounded-3xl p-4 border border-[#e8ede0] shadow-sm animate-in fade-in duration-200">
              <h2 className="font-display text-sm font-bold text-[#205c43] mb-1">
                Panduan Hangatkan Khusus Anak Kos
              </h2>
              <p className="text-xs text-slate-500 mb-3.5">
                Pilih metode yang paling mudah tersedia di kamar kos kamu:
              </p>

              <div className="space-y-2.5">
                {/* Method 1: Magic Com */}
                <div className="p-3 rounded-2xl bg-[#f8f7f1] border border-[#e8ede0]">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-[#205c43] flex items-center gap-1.5">
                      🍚 Magic Com Kos (Paling Mudah)
                    </span>
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md">
                      3 - 5 Menit
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Letakkan bento (tutup sedikit dibuka) di atas saringan kukusan magic com dalam mode <em>'Warm'</em> selama 3-5 menit sampai uap hangat merata.
                  </p>
                </div>

                {/* Method 2: Microwave */}
                <div className="p-3 rounded-2xl bg-[#f8f7f1] border border-[#e8ede0]">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-[#205c43] flex items-center gap-1.5">
                      ⚡ Microwave
                    </span>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                      1.5 - 2 Menit
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Wadah Bekalin.yu sudah <em>Microwave-Safe (PP 5)</em>. Buka ventilasi udara di sudut tutup, hangatkan dengan daya sedang (700-800W) selama 90 detik.
                  </p>
                </div>

                {/* Method 3: Langsung Santap */}
                <div className="p-3 rounded-2xl bg-[#f8f7f1] border border-[#e8ede0]">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-[#205c43] flex items-center gap-1.5">
                      🥢 Langsung Santap
                    </span>
                    <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-md">
                      Optimal &lt; 4 Jam
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Jika kemasan masih terasa hangat dari kurir kami, langsung buka dan nikmati tanpa perlu dipanaskan kembali.
                  </p>
                </div>
              </div>

              {/* Interactive Countdown Reheat Timer */}
              <div className="mt-4 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
                <span className="text-[11px] uppercase tracking-wider font-bold text-emerald-800 block mb-1">
                  Timer Pengingat Hangat
                </span>
                <div className="font-mono text-3xl font-black text-[#205c43] my-1 tracking-wider">
                  {timerFormatted}
                </div>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <button
                    onClick={toggleTimer}
                    className="text-xs font-bold bg-[#205c43] hover:bg-[#174431] text-white px-4 py-2 rounded-xl transition shadow-sm inline-flex items-center gap-1.5 active:scale-95"
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      {isTimerRunning ? 'pause' : 'play_arrow'}
                    </span>
                    <span>
                      {isTimerRunning ? 'Jeda Timer' : timerSeconds === 0 ? 'Ulangi Timer' : 'Mulai Timer 2 Menit'}
                    </span>
                  </button>
                  {timerSeconds < 120 && (
                    <button
                      onClick={() => {
                        setIsTimerRunning(false);
                        setTimerSeconds(120);
                      }}
                      className="text-xs font-semibold bg-white text-slate-600 border border-slate-200 px-3 py-2 rounded-xl hover:bg-slate-100"
                    >
                      Reset
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Komposisi & Bahan */}
          {activeTab === 'komposisi' && (
            <div className="bg-white rounded-3xl p-4 border border-[#e8ede0] shadow-sm animate-in fade-in duration-200">
              <h2 className="font-display text-sm font-bold text-[#205c43] mb-1">
                Komposisi Bahan Segar
              </h2>
              <p className="text-xs text-slate-500 mb-3">
                Dipilih langsung dari pasar petani lokal setiap subuh:
              </p>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-start gap-2.5 p-2 rounded-xl bg-[#f8f7f1]/70 border border-[#e8ede0]/60">
                  <span className="text-[#205c43] font-bold text-base">🍗</span>
                  <div>
                    <strong>Daging Ayam Fillet (Paha Juicy):</strong> Bebas hormon tambahan, dipotong higienis bersertifikasi Halal resmi.
                  </div>
                </li>
                <li className="flex items-start gap-2.5 p-2 rounded-xl bg-[#f8f7f1]/70 border border-[#e8ede0]/60">
                  <span className="text-[#205c43] font-bold text-base">🍚</span>
                  <div>
                    <strong>Beras Pandan Wangi Cianjur:</strong> Nasi pulen alami tanpa pemutih & pewangi kimiawi.
                  </div>
                </li>
                <li className="flex items-start gap-2.5 p-2 rounded-xl bg-[#f8f7f1]/70 border border-[#e8ede0]/60">
                  <span className="text-[#205c43] font-bold text-base">🥦</span>
                  <div>
                    <strong>Sayuran Segar:</strong> Brokoli hijau renyah, wortel manis lokal ditumis cepat dengan sedikit minyak zaitun.
                  </div>
                </li>
                <li className="flex items-start gap-2.5 p-2 rounded-xl bg-[#f8f7f1]/70 border border-[#e8ede0]/60">
                  <span className="text-[#205c43] font-bold text-base">🍯</span>
                  <div>
                    <strong>Saus Teriyaki Spesial:</strong> Gula kelapa murni, bawang bombay karamel, jahe segar, shoyu rendah garam.
                  </div>
                </li>
              </ul>
            </div>
          )}

          {/* TAB 4: Keamanan & Sanitasi */}
          {activeTab === 'keamanan' && (
            <div className="bg-white rounded-3xl p-4 border border-[#e8ede0] shadow-sm animate-in fade-in duration-200">
              <h2 className="font-display text-sm font-bold text-[#205c43] mb-1">
                Jaminan Kualitas & Kemasan
              </h2>
              <p className="text-xs text-slate-500 mb-3">
                Keamanan pangan kamu adalah prioritas pertama Bekalin.yu:
              </p>
              <div className="grid grid-cols-2 gap-2 text-left">
                <div className="p-3 rounded-2xl bg-[#f8f7f1] border border-[#e8ede0]">
                  <span className="text-xl mb-1 block">🌿</span>
                  <strong className="text-xs text-[#205c43] block font-bold">BPA Free & Food Grade</strong>
                  <span className="text-[10px] text-slate-500 leading-tight block mt-0.5">
                    Wadah plastik jenis PP 5 aman terhadap panas dan makanan berminyak.
                  </span>
                </div>
                <div className="p-3 rounded-2xl bg-[#f8f7f1] border border-[#e8ede0]">
                  <span className="text-xl mb-1 block">✅</span>
                  <strong className="text-xs text-[#205c43] block font-bold">100% Halal Certified</strong>
                  <span className="text-[10px] text-slate-500 leading-tight block mt-0.5">
                    Semua bahan olahan bersertifikasi MUI & terjamin kebersihannya.
                  </span>
                </div>
                <div className="p-3 rounded-2xl bg-[#f8f7f1] border border-[#e8ede0]">
                  <span className="text-xl mb-1 block">🧤</span>
                  <strong className="text-xs text-[#205c43] block font-bold">Kitchen Sanitized</strong>
                  <span className="text-[10px] text-slate-500 leading-tight block mt-0.5">
                    Kru dapur menggunakan masker, hairnet, dan sarung tangan standar food handler.
                  </span>
                </div>
                <div className="p-3 rounded-2xl bg-[#f8f7f1] border border-[#e8ede0]">
                  <span className="text-xl mb-1 block">♻️</span>
                  <strong className="text-xs text-[#205c43] block font-bold">Dapat Didaur Ulang</strong>
                  <span className="text-[10px] text-slate-500 leading-tight block mt-0.5">
                    Bisa dicuci ulang untuk wadah serbaguna di kosan kamu.
                  </span>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Quick Feedback Card (Interactive Star Rating) */}
        <section className="bg-white rounded-3xl p-4 border border-[#e8ede0] shadow-sm text-center">
          <h3 className="font-display text-xs font-bold text-[#205c43]">Gimana rasa bekal hari ini?</h3>
          <p className="text-[11px] text-slate-500 mt-0.5 mb-2.5">
            Bantu dapur mahasiswa kami makin berkembang:
          </p>

          <div className="flex justify-center items-center gap-2 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                aria-label={`${star} Bintang`}
                onClick={() => handleRate(star)}
                className={`text-2xl transition-transform active:scale-125 hover:text-amber-400 ${
                  star <= starRating ? 'text-amber-400' : 'text-slate-300'
                }`}
              >
                ★
              </button>
            ))}
          </div>

          {ratingSubmitted && (
            <p className="text-[11px] text-[#205c43] font-bold animate-in fade-in">
              Terima kasih atas penilaian jujurmu! 💚
            </p>
          )}
        </section>

        {/* Tomorrow Menu Teaser */}
        <section className="bg-white rounded-3xl p-4 border border-[#e8ede0] shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs shrink-0">
              BESOK
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-amber-700">
                Menu Rekomendasi Besok
              </span>
              <h4 className="font-display text-xs font-bold text-slate-800">Ayam Sambal Matah Bali</h4>
              <span className="text-[11px] text-slate-500">Mulai Rp17.000 (Slot terbatas)</span>
            </div>
          </div>
          <button
            onClick={() => onShowToast('Slot Ayam Sambal Matah besok tersedia!')}
            className="px-3 py-1.5 bg-[#e8ede0] text-[#205c43] text-xs font-bold rounded-xl hover:bg-[#205c43] hover:text-white transition"
          >
            Lihat
          </button>
        </section>

        {/* Brand Footer Small */}
        <footer className="text-center py-3 text-slate-400 text-[11px]">
          <p>Bekalin.yu • Makan Sehat, Kuliah Semangat 🎓</p>
          <p className="text-[10px] mt-0.5 text-slate-400/80">
            Platform Katering & Frozen Sehat Ramah Kantong Mahasiswa
          </p>
        </footer>
      </main>

      {/* Sticky Bottom CTA */}
      <aside className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 backdrop-blur-md border-t border-[#e8ede0] shadow-lg z-40 px-4 py-2.5">
        <div className="flex items-center gap-3">
          <div className="shrink-0">
            <span className="text-[10px] text-slate-400 block leading-tight">Harga Khusus Kos</span>
            <span className="font-display text-base font-extrabold text-[#205c43] leading-tight">
              Rp17.000
            </span>
          </div>

          <div className="flex-1 flex items-center gap-2">
            <button
              onClick={() => {
                onOpenCheckout({
                  title: 'Chicken Teriyaki Bento',
                  price: 17000,
                  image: MENU_ITEMS[0].image,
                });
              }}
              className="flex-1 bg-[#205c43] hover:bg-[#174431] text-white font-bold py-2.5 px-3 rounded-2xl text-xs transition shadow flex items-center justify-center gap-1.5 active:scale-95"
            >
              <span className="material-symbols-outlined text-[17px]">shopping_bag</span>
              <span>Pesan Menu Ini Lagi</span>
            </button>

            <button
              onClick={() => onNavigate('mobile-beranda')}
              title="Buka Menu Lengkap Bekalin.yu"
              className="p-2.5 rounded-2xl bg-[#f8f7f1] border border-[#e8ede0] text-slate-700 hover:text-[#205c43] font-bold text-xs flex items-center justify-center shrink-0"
            >
              <span className="material-symbols-outlined text-[18px]">menu</span>
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
};
