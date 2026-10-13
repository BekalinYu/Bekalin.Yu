import React, { useState } from 'react';
import { MenuItem, ScreenType } from '../types';
import { MENU_ITEMS, WEEKLY_PACKS, LOGO_URL } from '../data/menuData';

interface MobileBerandaScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onOpenCheckout: (item: MenuItem | { title: string; price: number; image?: string }) => void;
  onShowToast: (msg: string, icon?: string) => void;
  cartCount: number;
  onAddToCart: (itemName: string) => void;
  onOpenProfile: () => void;
}

export const MobileBerandaScreen: React.FC<MobileBerandaScreenProps> = ({
  onNavigate,
  onOpenCheckout,
  onShowToast,
  cartCount,
  onAddToCart,
  onOpenProfile,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Catering' | 'Frozen Food'>('All');
  const [detailModalItem, setDetailModalItem] = useState<MenuItem | null>(null);

  // Filter menu items based on search and category
  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleOpenDetail = (item: MenuItem) => {
    setDetailModalItem(item);
  };

  const handleCloseDetail = () => {
    setDetailModalItem(null);
  };

  const handleAddAndAnimate = (e: React.MouseEvent, item: MenuItem) => {
    e.stopPropagation();
    const target = e.currentTarget as HTMLButtonElement;
    const originalText = target.innerHTML;
    target.innerHTML = `<span class="material-symbols-outlined text-[16px] animate-spin">sync</span><span>...</span>`;
    target.disabled = true;

    setTimeout(() => {
      onAddToCart(item.title);
      target.innerHTML = `<span class="material-symbols-outlined text-[16px]">check</span><span>Ditambah</span>`;
      setTimeout(() => {
        target.innerHTML = originalText;
        target.disabled = false;
      }, 1200);
    }, 250);
  };

  const scrollToMenu = (cat?: 'Catering' | 'Frozen Food') => {
    if (cat) {
      setSelectedCategory(cat);
      onShowToast(`Menampilkan kategori ${cat}`);
    }
    const section = document.getElementById('section-menu-andalan');
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToWeekly = () => {
    const section = document.getElementById('section-paket-hemat');
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-[#ecfef1] min-h-screen text-[#101f17] flex flex-col relative max-w-md mx-auto shadow-2xl border-x border-[#d5e7db]">
      {/* Sticky Mobile Header */}
      <header className="sticky top-0 w-full z-40 bg-[#ecfef1]/95 backdrop-blur-xl border-b border-[#dbece0] pt-safe shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="h-16 px-4 flex items-center justify-between gap-2">
          {/* Brand Logo & Tagline */}
          <div
            className="flex items-center gap-2 min-w-0 flex-1 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <img
              alt="Bekalin.yu Logo"
              className="h-8 w-auto object-contain shrink-0"
              src={LOGO_URL}
            />
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1">
                <span className="font-display text-sm font-bold text-[#00442d] truncate leading-none">
                  Bekalin.yu
                </span>
                <span className="text-[11px] text-[#404943] truncate font-medium">• Beranda</span>
              </div>
              <span className="text-[11px] text-[#404943] truncate">Hai, Kak! Mau makan apa hari ini?</span>
            </div>
          </div>

          {/* Quick Actions: Cart & Profile */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              aria-label="Buka Keranjang"
              onClick={() => {
                onOpenCheckout({
                  title: 'Chicken Teriyaki Bento',
                  price: 17000,
                  image: MENU_ITEMS[0].image,
                });
              }}
              className="w-10 h-10 rounded-full flex items-center justify-center text-[#00442d] relative active:scale-95 transition-transform hover:bg-[#e1f2e6]"
            >
              <span className="material-symbols-outlined text-[24px]">shopping_bag</span>
              <span className="absolute top-1.5 right-1.5 bg-[#ba1a1a] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            </button>

            <button
              aria-label="Profil Pengguna"
              onClick={onOpenProfile}
              className="w-8 h-8 rounded-full bg-[#00442d] hover:bg-[#205c43] flex items-center justify-center shadow-sm active:scale-95 transition-transform"
            >
              <span className="material-symbols-outlined text-white text-[18px]">person</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Feed */}
      <main className="flex-1 flex flex-col w-full pb-28 pt-2">
        {/* Section: Greeting & Campus Delivery Banner */}
        <section className="px-4 py-2">
          <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-[#dbece0]">
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-display text-base font-bold text-[#00442d]">
                    Halo, Sobat Kos! 🎓
                  </span>
                </div>
                <div className="flex items-center gap-1 mt-0.5 text-[#404943] text-xs">
                  <span className="material-symbols-outlined text-[15px] text-[#2a6a48]">location_on</span>
                  <span className="truncate">Asrama & Kos Sekitar Kampus</span>
                </div>
              </div>
              <div className="bg-[#aceec4] text-[#2f6e4c] px-2.5 py-1 rounded-full flex items-center gap-1 shrink-0 font-medium">
                <span className="material-symbols-outlined text-[14px]">schedule</span>
                <span className="text-[11px] font-bold">11.30 WIB</span>
              </div>
            </div>

            {/* Search & Filter Bar */}
            <div className="mt-3 flex items-center gap-2">
              <div className="flex-1 bg-[#e6f8ec] rounded-xl px-3 py-2 flex items-center gap-2 border border-[#d5e7db]">
                <span className="material-symbols-outlined text-[#707973] text-[18px]">search</span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari ayam teriyaki, katsu, dori..."
                  className="bg-transparent text-[#101f17] placeholder:text-[#707973] text-xs w-full outline-none"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-[#707973] hover:text-[#101f17]"
                  >
                    <span className="material-symbols-outlined text-[16px]">close</span>
                  </button>
                )}
              </div>

              <button
                aria-label="Filter menu"
                onClick={() => {
                  setSelectedCategory(
                    selectedCategory === 'All'
                      ? 'Catering'
                      : selectedCategory === 'Catering'
                      ? 'Frozen Food'
                      : 'All'
                  );
                  onShowToast(
                    `Filter: ${
                      selectedCategory === 'All'
                        ? 'Catering Siap Santap'
                        : selectedCategory === 'Catering'
                        ? 'Frozen Food'
                        : 'Semua Menu'
                    }`
                  );
                }}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors shrink-0 border ${
                  selectedCategory !== 'All'
                    ? 'bg-[#00442d] text-white border-[#00442d]'
                    : 'bg-[#e6f8ec] text-[#00442d] border-[#d5e7db] hover:bg-[#d5e7db]'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">tune</span>
              </button>
            </div>
          </div>
        </section>

        {/* Section: Interactive Hero Promotional Banner */}
        <section className="px-4 py-1.5">
          <div className="relative overflow-hidden bg-[#205c43] text-white rounded-2xl p-4 shadow-md">
            {/* Ambient Decorative Blob */}
            <div className="absolute -right-12 -bottom-12 w-44 h-44 bg-[#2a6a48]/50 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 flex flex-col gap-1.5">
              <div className="inline-flex items-center gap-1.5 bg-[#f8e0ad] text-[#251a00] text-[11px] font-bold px-2.5 py-0.5 rounded-full w-fit">
                <span className="material-symbols-outlined text-[13px] text-[#e67e22]">
                  local_fire_department
                </span>
                <span>Promo Mahasiswa Baru • Gratis Ongkir Kos</span>
              </div>

              <h2 className="font-display text-lg font-bold leading-tight mt-1 text-white">
                Makan Enak, Tetap Hemat & Praktis!
              </h2>
              <p className="text-xs text-[#95d2b2] leading-snug">
                Mulai Rp16.000 • Nutrisi terhitung • Kemasan ada QR info gizi
              </p>

              {/* Bento Spotlight Preview Card */}
              <div
                onClick={() => handleOpenDetail(MENU_ITEMS[0])}
                className="bg-white text-[#101f17] rounded-xl p-2 mt-2 shadow-sm flex items-center gap-2.5 cursor-pointer active:scale-[0.99] transition-transform hover:ring-2 hover:ring-[#aceec4]"
              >
                <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-[#e1f2e6]">
                  <img
                    alt="Chicken Teriyaki Bento"
                    className="w-full h-full object-cover"
                    src={MENU_ITEMS[0].image}
                  />
                  <span className="absolute bottom-1 left-1 bg-white/90 text-[#00442d] text-[9px] px-1.5 py-0.5 rounded-full font-bold shadow-xs">
                    Terfavorit
                  </span>
                </div>

                <div className="min-w-0 flex-1 flex flex-col justify-between h-20 py-0.5">
                  <div>
                    <span className="font-display text-xs font-bold text-[#101f17] truncate block">
                      Chicken Teriyaki Bento
                    </span>
                    <div className="flex items-center gap-1 mt-0.5 text-[#2a6a48] text-[11px]">
                      <span className="material-symbols-outlined text-[13px]">local_fire_department</span>
                      <span>450 kkal • 25g Protein</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-display text-sm font-bold text-[#00442d]">Rp17.000</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenCheckout(MENU_ITEMS[0]);
                      }}
                      className="bg-[#00442d] hover:bg-[#205c43] text-white px-3 py-1 rounded-full text-xs font-semibold active:scale-95 transition-transform flex items-center gap-1 shadow-xs"
                    >
                      <span>Pesan</span>
                      <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Quick Category Grid */}
        <section className="px-4 py-2">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-display text-sm font-bold text-[#00442d]">Kategori Pilihan</h3>
            <span className="text-[11px] text-[#404943]">Solusi Ramah Kantong</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {/* Category 1: Catering */}
            <div
              role="button"
              tabIndex={0}
              onClick={() => scrollToMenu('Catering')}
              className="bg-white rounded-xl p-3 shadow-xs border border-[#dbece0] active:scale-98 transition-transform flex flex-col justify-between gap-2 cursor-pointer hover:border-[#2a6a48]"
            >
              <div className="w-10 h-10 rounded-full bg-[#aceec4] text-[#2f6e4c] flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">lunch_dining</span>
              </div>
              <div>
                <h4 className="font-display text-xs font-bold text-[#101f17] leading-tight">
                  Catering Siap Santap
                </h4>
                <p className="text-[11px] text-[#404943] mt-0.5 line-clamp-1">Bento hangat harian</p>
              </div>
            </div>

            {/* Category 2: Frozen Food */}
            <div
              role="button"
              tabIndex={0}
              onClick={() => scrollToMenu('Frozen Food')}
              className="bg-white rounded-xl p-3 shadow-xs border border-[#dbece0] active:scale-98 transition-transform flex flex-col justify-between gap-2 cursor-pointer hover:border-[#2a6a48]"
            >
              <div className="w-10 h-10 rounded-full bg-[#d5e7db] text-[#00442d] flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">ac_unit</span>
              </div>
              <div>
                <h4 className="font-display text-xs font-bold text-[#101f17] leading-tight">
                  Frozen Food
                </h4>
                <p className="text-[11px] text-[#404943] mt-0.5 line-clamp-1">Tahan 30 hari di kulkas</p>
              </div>
            </div>

            {/* Category 3: Paket Hemat */}
            <div
              role="button"
              tabIndex={0}
              onClick={scrollToWeekly}
              className="bg-white rounded-xl p-3 shadow-xs border border-[#dbece0] active:scale-98 transition-transform flex flex-col justify-between gap-2 cursor-pointer hover:border-[#2a6a48]"
            >
              <div className="w-10 h-10 rounded-full bg-[#f8e0ad] text-[#54451f] flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">savings</span>
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <h4 className="font-display text-xs font-bold text-[#101f17] leading-tight">
                    Paket Hemat
                  </h4>
                  <span className="bg-[#f8e0ad] text-[#473914] text-[9px] px-1 rounded font-bold">
                    -20%
                  </span>
                </div>
                <p className="text-[11px] text-[#404943] mt-0.5 line-clamp-1">Langganan 3-7 hari</p>
              </div>
            </div>

            {/* Category 4: Scan QR Gizi -> DIRECT JUMP TO SCREEN 2 */}
            <div
              role="button"
              tabIndex={0}
              onClick={() => {
                onNavigate('mobile-qr');
                onShowToast('Membuka Info QR Produk Bekalin.yu');
              }}
              className="bg-white rounded-xl p-3 shadow-xs border-2 border-[#205c43] active:scale-98 transition-transform flex flex-col justify-between gap-2 cursor-pointer bg-gradient-to-br from-white to-[#e6f8ec]"
            >
              <div className="w-10 h-10 rounded-full bg-[#b2f0cf] text-[#002114] flex items-center justify-center shadow-xs">
                <span className="material-symbols-outlined text-[20px]">qr_code_scanner</span>
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <h4 className="font-display text-xs font-bold text-[#00442d] leading-tight">
                    Scan QR Gizi
                  </h4>
                  <span className="bg-[#00442d] text-white text-[8px] px-1 rounded font-semibold uppercase">
                    Buka
                  </span>
                </div>
                <p className="text-[11px] text-[#404943] mt-0.5 line-clamp-1">Cek kalori kemasanmu</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Trust Badges (Horizontal scrollable) */}
        <section className="py-1">
          <div className="flex items-center gap-2 overflow-x-auto px-4 no-scrollbar">
            <div
              onClick={() => onShowToast('Sertifikasi Halal & Standar Dapur Bersih')}
              className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full shadow-xs border border-[#dbece0] shrink-0 cursor-pointer active:scale-95 transition-transform"
            >
              <span className="material-symbols-outlined text-[#2a6a48] text-[16px]">verified</span>
              <span className="text-xs font-medium text-[#101f17]">100% Halal & Higienis</span>
            </div>

            <div
              onClick={() => onShowToast('Menggunakan rempah alami tanpa MSG berlebih')}
              className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full shadow-xs border border-[#dbece0] shrink-0 cursor-pointer active:scale-95 transition-transform"
            >
              <span className="material-symbols-outlined text-[#2a6a48] text-[16px]">eco</span>
              <span className="text-xs font-medium text-[#101f17]">Bebas MSG Berlebih</span>
            </div>

            <div
              onClick={() => onShowToast('Porsi kenyang pas untuk anak kos')}
              className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full shadow-xs border border-[#dbece0] shrink-0 cursor-pointer active:scale-95 transition-transform"
            >
              <span className="material-symbols-outlined text-[#2a6a48] text-[16px]">restaurant</span>
              <span className="text-xs font-medium text-[#101f17]">Porsi Pas Mahasiswa</span>
            </div>

            <div
              onClick={() => onShowToast('Menerima Gopay, OVO, ShopeePay & Tunai')}
              className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full shadow-xs border border-[#dbece0] shrink-0 cursor-pointer active:scale-95 transition-transform"
            >
              <span className="material-symbols-outlined text-[#2a6a48] text-[16px]">payments</span>
              <span className="text-xs font-medium text-[#101f17]">Bisa QRIS / Bayar COD</span>
            </div>
          </div>
        </section>

        {/* Section: Menu Andalan Hari Ini (Popular Best-Seller Bento Cards) */}
        <section className="px-4 py-2.5" id="section-menu-andalan">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="font-display text-sm font-bold text-[#00442d]">
                Menu Andalan Hari Ini
              </h3>
              <p className="text-[11px] text-[#404943]">Favorit mahasiswa pas jam istirahat</p>
            </div>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
                onShowToast('Menampilkan seluruh katalog menu sehat Bekalin.yu');
              }}
              className="text-xs font-semibold text-[#2a6a48] flex items-center gap-0.5 active:scale-95 transition-transform hover:underline"
            >
              <span>Semua</span>
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
          </div>

          {/* 2-Column Responsive Bento Cards */}
          <div className="grid grid-cols-2 gap-2.5">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl overflow-hidden shadow-xs border border-[#dbece0] flex flex-col justify-between hover:shadow-md transition-shadow group"
              >
                {/* Image & Tags */}
                <div
                  className="relative w-full h-32 bg-[#e1f2e6] cursor-pointer overflow-hidden"
                  onClick={() => handleOpenDetail(item)}
                >
                  <img
                    alt={item.title}
                    src={item.image}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span
                    className={`absolute top-2 left-2 text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      item.tagType === 'catering'
                        ? 'bg-[#aceec4] text-[#2f6e4c]'
                        : item.tagType === 'frozen'
                        ? 'bg-[#d5e7db] text-[#00442d]'
                        : 'bg-[#f8e0ad] text-[#251a00]'
                    }`}
                  >
                    {item.tag || item.category}
                  </span>

                  {/* QR info badge indicator */}
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigate('mobile-qr');
                      onShowToast('Membuka detail Info QR');
                    }}
                    className="absolute bottom-2 right-2 bg-white/95 text-[#00442d] text-[10px] font-semibold px-1.5 py-0.5 rounded flex items-center gap-0.5 shadow-xs hover:bg-[#aceec4] transition-colors"
                  >
                    <span className="material-symbols-outlined text-[12px]">qr_code</span> Info Gizi
                  </span>
                </div>

                {/* Details & Price */}
                <div className="p-2.5 flex flex-col flex-1 justify-between gap-2">
                  <div className="cursor-pointer" onClick={() => handleOpenDetail(item)}>
                    <h4 className="font-display text-xs font-bold text-[#101f17] leading-tight line-clamp-1 group-hover:text-[#00442d] transition-colors">
                      {item.title}
                    </h4>
                    <div className="flex items-center gap-1 mt-1 text-[#404943] text-[11px]">
                      <span className="material-symbols-outlined text-[13px] text-[#2a6a48]">bolt</span>
                      <span>
                        {item.calories} kkal • {item.protein}g P
                      </span>
                    </div>
                  </div>

                  <div className="pt-1 flex flex-col gap-1.5">
                    <span className="font-display text-xs font-bold text-[#00442d]">
                      Rp {item.price.toLocaleString('id-ID')}
                    </span>
                    <button
                      onClick={(e) => handleAddAndAnimate(e, item)}
                      className="w-full bg-[#00442d] active:bg-[#205c43] text-white py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 active:scale-95 transition-all shadow-xs hover:bg-[#205c43]"
                    >
                      <span className="material-symbols-outlined text-[15px]">add</span>
                      <span>Tambah</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section: Smart Packaging QR Banner */}
        <section className="px-4 py-2.5" id="section-qr-promo">
          <div className="bg-[#e1f2e6] rounded-2xl p-4 shadow-xs border border-[#d5e7db] flex flex-col gap-2.5">
            <div className="flex items-start gap-3">
              {/* Visual QR Icon Plate */}
              <div
                onClick={() => onNavigate('mobile-qr')}
                className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-[#00442d] shadow-sm shrink-0 cursor-pointer active:scale-95 transition-transform hover:ring-2 hover:ring-[#00442d]"
              >
                <span className="material-symbols-outlined text-[32px]">qr_code_2</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <span className="bg-[#00442d] text-white text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                    Fitur Pintar
                  </span>
                </div>
                <h4 className="font-display text-xs font-bold text-[#00442d] mt-1">
                  Satu Scan QR, Tahu Semua Info
                </h4>
                <p className="text-[11px] text-[#404943] mt-0.5 leading-snug">
                  Pindai stiker QR pada tutup bekal untuk lihat kalkulasi kalori & cara panasin pakai magic com atau microwave.
                </p>
              </div>
            </div>

            <div className="pt-1 flex items-center gap-2">
              <button
                onClick={() => {
                  onNavigate('mobile-qr');
                  onShowToast('Membuka Halaman Interaktif Info QR Produk');
                }}
                className="flex-1 bg-white hover:bg-[#dbece0] text-[#00442d] text-xs font-bold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 shadow-xs text-center transition-colors border border-[#d5e7db]"
              >
                <span className="material-symbols-outlined text-[18px]">play_circle</span>
                <span>Coba Simulasi QR (Layar 2)</span>
              </button>
              <button
                aria-label="Petunjuk singkat scan"
                onClick={() => onShowToast('Arahkan kamera ke barcode stiker kemasan box bekal!')}
                className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#2a6a48] shadow-xs active:scale-95 transition-transform border border-[#d5e7db]"
              >
                <span className="material-symbols-outlined text-[20px]">help_outline</span>
              </button>
            </div>
          </div>
        </section>

        {/* Section: Paket Hemat Mingguan Mahasiswa */}
        <section className="px-4 py-2.5" id="section-paket-hemat">
          <div className="bg-white rounded-2xl p-4 shadow-xs border border-[#dbece0]">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#2a6a48] font-bold uppercase tracking-wide">
                  Langganan Anti-Pusing
                </span>
                <h3 className="font-display text-sm font-bold text-[#00442d] mt-0.5">
                  Paket Hemat Mingguan
                </h3>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#aceec4] text-[#2f6e4c] flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">card_membership</span>
              </div>
            </div>

            <div className="mt-3 flex flex-col gap-2">
              {WEEKLY_PACKS.map((pack) => (
                <div
                  key={pack.id}
                  onClick={() => {
                    onAddToCart(pack.title);
                    onOpenCheckout({
                      title: pack.title,
                      price: pack.price,
                      image: MENU_ITEMS[0].image,
                    });
                  }}
                  className="bg-[#e6f8ec] rounded-xl p-3 flex items-center justify-between gap-2 cursor-pointer active:scale-[0.99] transition-transform border border-[#d5e7db] hover:border-[#2a6a48]"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-display text-xs font-bold text-[#101f17]">
                        {pack.title}
                      </span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${pack.discountColor}`}>
                        {pack.discountTag}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#404943] mt-0.5">{pack.description}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-display text-xs font-bold text-[#00442d] block">
                      Rp {pack.price.toLocaleString('id-ID')}
                    </span>
                    <span className="text-[10px] text-[#707973] line-through">
                      Rp {pack.originalPrice.toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                onShowToast('Membuka seluruh opsi paket langganan kos');
                onOpenCheckout({
                  title: 'Paket 5 Hari Kuliah',
                  price: 70000,
                  image: MENU_ITEMS[0].image,
                });
              }}
              className="mt-3 w-full bg-[#205c43] hover:bg-[#00442d] text-white py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 active:scale-98 transition-transform shadow-xs"
            >
              <span>Lihat Semua Paket Langganan</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </section>

        {/* Section: Switch to Web / Desktop View Link */}
        <section className="px-4 py-2">
          <div className="bg-[#d5e7db]/60 rounded-xl p-3 text-center border border-[#c0c9c1]">
            <p className="text-xs text-[#404943] mb-1.5">Ingin melihat tampilan versi desktop lengkap?</p>
            <button
              onClick={() => onNavigate('web-beranda')}
              className="text-xs font-bold text-[#00442d] hover:underline inline-flex items-center gap-1"
            >
              <span>Buka Layar 3: Beranda (Desktop View)</span>
              <span className="material-symbols-outlined text-[15px]">open_in_new</span>
            </button>
          </div>
        </section>
      </main>

      {/* Quick QR Detail Bottom Sheet Modal for Mobile Screen 1 */}
      {detailModalItem && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end transition-opacity duration-300">
          <div
            className="absolute inset-0 bg-[#25342c]/60 backdrop-blur-sm transition-opacity"
            onClick={handleCloseDetail}
          />
          <div className="relative w-full max-h-[88vh] bg-[#ecfef1] rounded-t-3xl shadow-2xl flex flex-col overflow-hidden z-10 border-t border-[#b2f0cf] max-w-md mx-auto">
            {/* Handle & Close */}
            <div className="pt-3 pb-2 px-4 flex items-center justify-between bg-white border-b border-[#dbece0] shrink-0">
              <div className="w-10" />
              <div
                className="w-12 h-1.5 bg-[#c0c9c1] rounded-full mx-auto cursor-pointer"
                onClick={handleCloseDetail}
              />
              <button
                aria-label="Tutup Detail"
                onClick={handleCloseDetail}
                className="w-10 h-10 rounded-full flex items-center justify-center text-[#404943] hover:bg-[#e1f2e6] active:scale-90 transition-transform"
              >
                <span className="material-symbols-outlined text-[24px]">close</span>
              </button>
            </div>

            {/* Scrollable Modal Body */}
            <div className="overflow-y-auto px-4 py-4 space-y-4">
              {/* Batch & Verification */}
              <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-[#dbece0]">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#00442d] text-[24px]">verified</span>
                  <div>
                    <h5 className="font-display text-xs font-bold text-[#00442d] leading-tight">
                      Batch Dapur Terverifikasi
                    </h5>
                    <p className="text-[10px] text-[#404943]">
                      Dimasak {detailModalItem.madeTime || '09.30 WIB'} • Dapur Kampus 1
                    </p>
                  </div>
                </div>
                <span className="bg-[#aceec4] text-[#2f6e4c] text-[10px] font-bold px-2 py-1 rounded-full">
                  Segar Hari Ini
                </span>
              </div>

              {/* Product Card */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-xs border border-[#dbece0]">
                <div className="relative w-full h-44 bg-[#e1f2e6]">
                  <img
                    alt={detailModalItem.title}
                    src={detailModalItem.image}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => {
                      handleCloseDetail();
                      onNavigate('mobile-qr');
                    }}
                    className="absolute top-2 right-2 bg-white/90 text-[#00442d] text-[10px] px-2.5 py-1 rounded-full flex items-center gap-1 font-bold backdrop-blur-sm hover:bg-[#aceec4]"
                  >
                    <span className="material-symbols-outlined text-[13px]">qr_code_2</span> Buka di Layar 2
                  </button>
                </div>
                <div className="p-3.5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-sm font-bold text-[#00442d]">
                      {detailModalItem.title}
                    </h3>
                    <span className="font-display text-sm text-[#2a6a48] font-bold">
                      Rp {detailModalItem.price.toLocaleString('id-ID')}
                    </span>
                  </div>
                  <p className="text-xs text-[#404943] mt-1 leading-relaxed">
                    {detailModalItem.description}
                  </p>
                </div>
              </div>

              {/* Macro Nutrients */}
              <div>
                <h4 className="font-display text-xs font-bold text-[#00442d] mb-2 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px] text-[#2a6a48]">analytics</span>
                  Informasi Nilai Gizi
                </h4>
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="bg-white p-2.5 rounded-xl border border-[#dbece0] shadow-xs">
                    <span className="block text-[10px] text-[#707973]">Kalori</span>
                    <span className="block font-display text-xs font-bold text-[#00442d] mt-0.5">
                      {detailModalItem.calories}
                    </span>
                    <span className="text-[9px] text-[#404943]">kkal</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-[#dbece0] shadow-xs">
                    <span className="block text-[10px] text-[#707973]">Protein</span>
                    <span className="block font-display text-xs font-bold text-[#2a6a48] mt-0.5">
                      {detailModalItem.protein}g
                    </span>
                    <span className="text-[9px] text-[#404943]">dada ayam</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-[#dbece0] shadow-xs">
                    <span className="block text-[10px] text-[#707973]">Karbo</span>
                    <span className="block font-display text-xs font-bold text-[#101f17] mt-0.5">
                      {detailModalItem.carbs}g
                    </span>
                    <span className="text-[9px] text-[#404943]">nasi pulen</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-[#dbece0] shadow-xs">
                    <span className="block text-[10px] text-[#707973]">Lemak</span>
                    <span className="block font-display text-xs font-bold text-[#101f17] mt-0.5">
                      {detailModalItem.fat}g
                    </span>
                    <span className="text-[9px] text-[#404943]">sehat</span>
                  </div>
                </div>
              </div>

              {/* Allergen info */}
              <div className="bg-white p-3 rounded-xl border border-[#dbece0]">
                <div className="flex items-center gap-1.5 text-[#00442d] text-xs font-bold mb-1">
                  <span className="material-symbols-outlined text-[16px] text-[#2a6a48]">info</span>
                  <span>Catatan Alergen & Bahan</span>
                </div>
                <p className="text-[11px] text-[#404943]">
                  Mengandung: <strong>Kedelai (Kecap Shoyu Jepang), Wijen</strong>. Tanpa MSG sintetis berlebih dan 100% Halal.
                </p>
              </div>

              {/* Heating Guide */}
              <div className="bg-white p-3 rounded-xl border border-[#dbece0]">
                <h4 className="font-display text-xs font-bold text-[#00442d] mb-2 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px] text-[#2a6a48]">microwave</span>
                  Panduan Pemanasan Anak Kos
                </h4>
                <div className="space-y-2 text-xs">
                  <div className="flex items-start gap-2 bg-[#e6f8ec] p-2 rounded-lg">
                    <span className="material-symbols-outlined text-[#00442d] text-[18px] mt-0.5">
                      rice_bowl
                    </span>
                    <div>
                      <strong className="text-[#101f17] font-semibold text-[11px]">
                        Magic Com / Penanak Nasi:
                      </strong>
                      <p className="text-[#404943] text-[11px]">
                        Letakkan box di atas kukusan penanak nasi selama 3-5 menit hingga hangat merata.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 bg-[#e6f8ec] p-2 rounded-lg">
                    <span className="material-symbols-outlined text-[#00442d] text-[18px] mt-0.5">
                      microwave
                    </span>
                    <div>
                      <strong className="text-[#101f17] font-semibold text-[11px]">Microwave:</strong>
                      <p className="text-[#404943] text-[11px]">
                        Buka sedikit penutup, panaskan pada suhu Medium selama 1.5 - 2 menit.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sticky Actions in Modal */}
            <div className="p-4 bg-white border-t border-[#dbece0] flex items-center gap-2 shrink-0">
              <button
                onClick={() => {
                  onAddToCart(detailModalItem.title);
                  handleCloseDetail();
                }}
                className="flex-1 bg-[#dbece0] hover:bg-[#d5e7db] text-[#00442d] py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
                <span>Pesan Menu Ini</span>
              </button>
              <button
                onClick={() => {
                  handleCloseDetail();
                  onOpenCheckout(detailModalItem);
                }}
                className="flex-1 bg-[#00442d] hover:bg-[#205c43] text-white py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-all shadow-md"
              >
                <span>Checkout Langsung</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Fixed Bottom Tab Bar */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto z-40 pb-safe bg-white/95 backdrop-blur-xl border-t border-[#dbece0] shadow-[0_-2px_12px_rgba(38,53,45,0.06)]">
        <div className="flex justify-around items-center h-16 px-1">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex flex-col items-center justify-center w-16 h-12 active:scale-95 transition-all text-[#205c43] font-bold"
          >
            <span className="material-symbols-outlined text-[22px]">home</span>
            <span className="text-[10px] mt-0.5">Beranda</span>
          </button>

          <button
            onClick={() => scrollToMenu()}
            className="flex flex-col items-center justify-center w-16 h-12 text-[#404943] hover:text-[#00442d] active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[22px]">restaurant_menu</span>
            <span className="text-[10px] mt-0.5">Menu</span>
          </button>

          <button
            onClick={() => onNavigate('mobile-qr')}
            className="flex flex-col items-center justify-center w-16 h-12 text-[#404943] hover:text-[#00442d] active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[22px]">qr_code_scanner</span>
            <span className="text-[10px] mt-0.5">QR Scan</span>
          </button>

          <button
            onClick={onOpenProfile}
            className="flex flex-col items-center justify-center w-16 h-12 text-[#404943] hover:text-[#00442d] active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[22px]">person_outline</span>
            <span className="text-[10px] mt-0.5">Akun</span>
          </button>
        </div>
      </nav>
    </div>
  );
};
