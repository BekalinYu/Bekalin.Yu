import React, { useState } from 'react';
import { ScreenType, MenuItem } from '../types';
import {
  LOGO_URL,
  MENU_ITEMS,
  DESKTOP_GALLERY_IMAGES,
} from '../data/menuData';

interface WebBerandaScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onOpenCheckout: (item: { title: string; price: number; image?: string }) => void;
  onShowToast: (msg: string, icon?: string) => void;
  cartCount: number;
  onAddToCart: (itemName: string) => void;
  onOpenProfile: () => void;
}

export const WebBerandaScreen: React.FC<WebBerandaScreenProps> = ({
  onNavigate,
  onOpenCheckout,
  onShowToast,
  cartCount,
  onAddToCart,
  onOpenProfile,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [openAccordions, setOpenAccordions] = useState<{ [key: number]: boolean }>({
    0: true,
    1: true,
    2: false,
    3: false,
    4: false,
  });

  const basePrice = 17000;
  const subtotal = basePrice * quantity;

  const toggleAccordion = (index: number) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleMinusQty = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handlePlusQty = () => {
    if (quantity < 30) {
      setQuantity((prev) => prev + 1);
    }
  };

  return (
    <div className="bg-[#ecfef1] min-h-screen text-[#101f17] flex flex-col w-full antialiased">
      {/* Top Standard Web Header */}
      <header className="sticky top-0 left-0 right-0 z-40 bg-[#ecfef1]/95 backdrop-blur-xl border-b border-[#dbece0] shadow-[0_1px_8px_rgba(38,53,45,0.06)]">
        <div className="h-20 w-full px-4 lg:px-8 max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo & Brand Zone */}
          <div className="flex items-center gap-3 shrink-0">
            <div
              className="flex items-center gap-2.5 cursor-pointer group"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <img
                alt="Bekalin.yu Logo"
                className="h-8 w-auto object-contain"
                src={LOGO_URL}
              />
              <div className="flex flex-col">
                <span className="font-display text-lg font-bold text-[#00442d] tracking-tight">
                  Bekalin.yu
                </span>
                <span className="hidden sm:inline text-[11px] text-[#404943] font-medium">
                  Bekal Hemat untuk Hari yang Padat
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links (Clean 4-5 text links) */}
          <nav className="hidden xl:flex items-center gap-2 bg-white/80 px-3 py-1.5 rounded-full border border-[#dbece0] shadow-[0_1px_4px_rgba(38,53,45,0.04)]">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-xs font-bold bg-[#00442d] text-white rounded-full px-3.5 py-1.5 transition-colors"
            >
              Beranda
            </button>
            <a
              href="#section-rekomendasi"
              className="text-xs font-medium text-[#404943] hover:text-[#00442d] px-3 py-1.5 rounded-full transition-colors"
            >
              Semua Menu
            </a>
            <a
              href="#section-rekomendasi"
              className="text-xs font-medium text-[#404943] hover:text-[#00442d] px-3 py-1.5 rounded-full transition-colors"
            >
              Catering & Frozen
            </a>
            {/* Quick Link to Screen 2 */}
            <button
              onClick={() => onNavigate('mobile-qr')}
              className="text-xs font-semibold text-[#00442d] hover:bg-[#e6f8ec] px-3 py-1.5 rounded-full transition-colors flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[15px]">qr_code_scanner</span>
              <span>Info QR Produk (Layar 2)</span>
            </button>
            <a
              href="#footer-tentang"
              className="text-xs font-medium text-[#404943] hover:text-[#00442d] px-3 py-1.5 rounded-full transition-colors"
            >
              Tentang Kami
            </a>
            <a
              href="#footer-tentang"
              className="text-xs font-medium text-[#404943] hover:text-[#00442d] px-3 py-1.5 rounded-full transition-colors"
            >
              FAQ
            </a>
          </nav>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              aria-label="Cari Menu"
              onClick={() => onShowToast('Cari menu bento favoritmu')}
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#404943] hover:text-[#00442d] hover:bg-[#e1f2e6] transition-colors border border-[#dbece0] shadow-xs"
            >
              <span className="material-symbols-outlined text-[20px]">search</span>
            </button>

            <button
              onClick={() => {
                onOpenCheckout({
                  title: 'Chicken Teriyaki Bento',
                  price: subtotal,
                  image: DESKTOP_GALLERY_IMAGES[0],
                });
              }}
              className="flex items-center gap-1.5 bg-[#205c43] text-white hover:bg-[#00442d] px-3.5 py-2 rounded-full transition-all shadow-sm active:scale-95"
            >
              <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
              <span className="text-xs font-bold">
                Rp {subtotal.toLocaleString('id-ID')} ({cartCount || 1})
              </span>
            </button>

            <button
              onClick={onOpenProfile}
              className="hidden md:inline-flex items-center text-xs font-semibold bg-white text-[#00442d] hover:bg-[#e1f2e6] px-3.5 py-2 rounded-full transition-colors border border-[#dbece0]"
            >
              Masuk / Daftar
            </button>

            <button
              onClick={onOpenProfile}
              className="w-9 h-9 rounded-full bg-[#00442d] hover:bg-[#205c43] flex items-center justify-center text-white"
            >
              <span className="material-symbols-outlined text-[18px]">person</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Desktop Container */}
      <main className="w-full bg-[#ecfef1] flex-1 py-6 lg:py-10">
        <div className="w-full px-4 lg:px-8 max-w-7xl mx-auto flex flex-col">
          {/* Breadcrumbs Navigation */}
          <nav className="flex items-center gap-1 text-[#404943] text-xs pb-6">
            <button
              onClick={() => onNavigate('mobile-beranda')}
              className="hover:text-[#00442d] transition-colors flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[16px]">home</span>
              <span>Beranda</span>
            </button>
            <span className="material-symbols-outlined text-[14px] text-[#c0c9c1]">
              chevron_right
            </span>
            <span className="hover:text-[#00442d] transition-colors cursor-pointer">Menu Harian</span>
            <span className="material-symbols-outlined text-[14px] text-[#c0c9c1]">
              chevron_right
            </span>
            <span className="hover:text-[#00442d] transition-colors cursor-pointer">Catering</span>
            <span className="material-symbols-outlined text-[14px] text-[#c0c9c1]">
              chevron_right
            </span>
            <span className="text-[#00442d] font-bold">Chicken Teriyaki</span>
          </nav>

          {/* Two-Column Product Detail Layout (5 cols left, 7 cols right on Desktop) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* LEFT COLUMN: Gallery & Showcase (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-4 lg:sticky lg:top-28">
              {/* Main Food Card Showcase */}
              <div className="relative bg-white rounded-2xl shadow-md border border-[#dbece0] overflow-hidden group">
                {/* Badges overlay */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                  <span className="bg-[#00442d] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">lunch_dining</span>
                    Catering Siap Santap
                  </span>
                  <span className="bg-white/90 backdrop-blur-md text-[#2a6a48] text-[11px] px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1 font-bold">
                    <span className="material-symbols-outlined text-[14px] text-[#2a6a48]">verified</span>
                    Fresh Daily
                  </span>
                </div>

                {/* Favorite button toggle */}
                <button
                  aria-label="Simpan ke favorit"
                  onClick={() => {
                    setIsFavorite(!isFavorite);
                    onShowToast(
                      isFavorite
                        ? 'Dihapus dari menu favorit'
                        : 'Disimpan ke menu favorit! ❤️'
                    );
                  }}
                  className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#404943] hover:text-[#ba1a1a] transition-all shadow-xs active:scale-90"
                >
                  <span
                    className={`material-symbols-outlined text-[20px] ${
                      isFavorite ? 'text-[#ba1a1a]' : ''
                    }`}
                  >
                    {isFavorite ? 'favorite' : 'favorite_border'}
                  </span>
                </button>

                {/* Main Image */}
                <div className="relative aspect-square w-full bg-[#e1f2e6] overflow-hidden">
                  <img
                    id="main-product-img"
                    alt="Chicken Teriyaki Bento Bekalin.yu"
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    src={DESKTOP_GALLERY_IMAGES[selectedImageIndex]}
                  />
                </div>

                {/* Bottom image metadata ribbon */}
                <div className="p-3 bg-white flex items-center justify-between text-[#404943] text-xs border-t border-[#e1f2e6]">
                  <div className="flex items-center gap-1.5 text-[#2a6a48] font-semibold">
                    <span className="material-symbols-outlined text-[18px]">verified_user</span>
                    <span>100% Halal MUI & Higienis</span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-[#404943]">
                    <span className="material-symbols-outlined text-[16px] text-[#00442d]">eco</span>
                    <span>Kemasan Ramah Lingkungan</span>
                  </div>
                </div>
              </div>

              {/* Thumbnail Row (4 interactive thumbnails) */}
              <div className="grid grid-cols-4 gap-2">
                {DESKTOP_GALLERY_IMAGES.map((imgSrc, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative aspect-square rounded-xl overflow-hidden bg-white shadow-xs transition-all focus:outline-none border ${
                      selectedImageIndex === idx
                        ? 'ring-2 ring-[#00442d] border-transparent opacity-100 scale-102'
                        : 'border-[#dbece0] opacity-75 hover:opacity-100'
                    }`}
                  >
                    <img
                      alt={`Thumbnail bento ${idx + 1}`}
                      className="w-full h-full object-cover"
                      src={imgSrc}
                    />
                  </button>
                ))}
              </div>

              {/* QR Scan Education Card */}
              <div
                onClick={() => onNavigate('mobile-qr')}
                className="bg-white rounded-2xl p-4 shadow-xs border border-[#dbece0] flex items-center gap-3.5 cursor-pointer hover:border-[#00442d] transition-colors group"
              >
                <div className="w-14 h-14 rounded-xl bg-[#e1f2e6] flex items-center justify-center shrink-0 text-[#00442d] group-hover:bg-[#aceec4] transition-colors">
                  <span className="material-symbols-outlined text-[32px]">qr_code_2</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1 text-[#00442d]">
                    <span className="font-display text-sm font-bold">QR Kemasan Pintar</span>
                    <span className="material-symbols-outlined text-[16px]">touch_app</span>
                  </div>
                  <p className="text-xs text-[#404943] line-clamp-2 mt-0.5">
                    Pindai kode QR pada tutup kotak makanan untuk membaca panduan nutrisi real-time dan timer pemanasan praktis.
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Details, Price, Macros, Accordions (7 cols) */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              {/* Header Info Card */}
              <div className="bg-white rounded-2xl p-6 shadow-xs border border-[#dbece0] flex flex-col gap-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 bg-[#aceec4] text-[#2f6e4c] text-xs px-3 py-1 rounded-full font-bold">
                    <span className="material-symbols-outlined text-[14px]">restaurant</span>
                    Kategori: Catering Harian
                  </span>

                  <div className="inline-flex items-center gap-1 bg-[#e6f8ec] px-2.5 py-1 rounded-full text-xs border border-[#d5e7db]">
                    <span className="material-symbols-outlined text-[16px] text-amber-500 font-bold">
                      star
                    </span>
                    <span className="text-[#101f17] font-bold">4.9</span>
                    <span className="text-[#404943]">(142 ulasan mahasiswa)</span>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <h1 className="font-display text-2xl lg:text-3xl font-bold text-[#00442d] tracking-tight">
                    Chicken Teriyaki
                  </h1>
                  <p className="text-sm text-[#404943] leading-relaxed">
                    Ayam teriyaki empuk dengan lumuran saus manis gurih racikan khas Bekalin.yu, disajikan lengkap bersama nasi pulen hangat dan sayuran segar (wortel & brokoli kukus). Menu seimbang dengan rasa lezat dan ramah di kantong, siap menemani produktivitas kuliah dan harimu yang padat.
                  </p>
                </div>

                {/* Price & Stock Strip */}
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pt-1 border-t border-[#e1f2e6]">
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-2xl lg:text-3xl font-extrabold text-[#00442d] tracking-tight">
                      Rp17.000
                    </span>
                    <span className="text-sm text-[#707973] line-through">Rp22.000</span>
                    <span className="text-xs bg-[#e6f8ec] text-[#2a6a48] font-bold px-2 py-0.5 rounded-full border border-[#aceec4]">
                      -22%
                    </span>
                  </div>

                  <div className="text-[#404943] text-xs flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-[#2a6a48]">
                      inventory_2
                    </span>
                    <span>
                      Stok hari ini: <strong className="text-[#101f17]">Tersedia (Sisa 18 box)</strong>
                    </span>
                  </div>
                </div>

                {/* Key Metrics Pill Row (4 cards) */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                  <div className="flex items-center gap-2 bg-[#e6f8ec] p-2.5 rounded-xl border border-[#d5e7db]">
                    <span className="material-symbols-outlined text-[#00442d] text-[20px]">
                      local_fire_department
                    </span>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-[#404943]">Energi</span>
                      <span className="text-xs text-[#101f17] font-bold">450 kkal</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 bg-[#e6f8ec] p-2.5 rounded-xl border border-[#d5e7db]">
                    <span className="material-symbols-outlined text-[#00442d] text-[20px]">
                      fitness_center
                    </span>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-[#404943]">Protein</span>
                      <span className="text-xs text-[#101f17] font-bold">25g Protein</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 bg-[#e6f8ec] p-2.5 rounded-xl border border-[#d5e7db]">
                    <span className="material-symbols-outlined text-[#00442d] text-[20px]">scale</span>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-[#404943]">Porsi</span>
                      <span className="text-xs text-[#101f17] font-bold">1 Porsi (350g)</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 bg-[#e6f8ec] p-2.5 rounded-xl border border-[#d5e7db]">
                    <span className="material-symbols-outlined text-[#00442d] text-[20px]">timer</span>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-[#404943]">Sajian</span>
                      <span className="text-xs text-[#101f17] font-bold">Siap Santap</span>
                    </div>
                  </div>
                </div>

                {/* Order Configuration & Interactive Quantity Stepper */}
                <div className="bg-[#e6f8ec] rounded-2xl p-4 flex flex-col gap-3.5 border border-[#d5e7db]">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                    {/* Stepper */}
                    <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
                      <span className="text-xs font-semibold text-[#101f17]">Jumlah Porsi</span>
                      <div className="flex items-center bg-white rounded-full p-1 shadow-xs border border-[#d5e7db]">
                        <button
                          type="button"
                          aria-label="Kurangi porsi"
                          onClick={handleMinusQty}
                          disabled={quantity <= 1}
                          className="w-8 h-8 rounded-full flex items-center justify-center text-[#404943] hover:text-[#00442d] hover:bg-[#e1f2e6] transition-colors disabled:opacity-40"
                        >
                          <span className="material-symbols-outlined text-[18px]">remove</span>
                        </button>
                        <span className="w-10 text-center font-display text-sm font-bold text-[#00442d]">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          aria-label="Tambah porsi"
                          onClick={handlePlusQty}
                          className="w-8 h-8 rounded-full flex items-center justify-center text-[#404943] hover:text-[#00442d] hover:bg-[#e1f2e6] transition-colors"
                        >
                          <span className="material-symbols-outlined text-[18px]">add</span>
                        </button>
                      </div>
                    </div>

                    {/* Subtotal */}
                    <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto">
                      <span className="text-xs text-[#404943]">Subtotal:</span>
                      <span className="font-display text-xl font-bold text-[#00442d]">
                        Rp {subtotal.toLocaleString('id-ID')}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => {
                        onAddToCart('Chicken Teriyaki Bento');
                      }}
                      className="flex items-center justify-center gap-2 bg-[#00442d] hover:bg-[#205c43] text-white px-5 py-3 rounded-xl font-bold text-xs transition-all shadow-md active:scale-[0.98]"
                    >
                      <span className="material-symbols-outlined text-[20px]">add_shopping_cart</span>
                      <span>+ Tambah ke Keranjang</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        onOpenCheckout({
                          title: 'Chicken Teriyaki Bento',
                          price: subtotal,
                          image: DESKTOP_GALLERY_IMAGES[0],
                        });
                      }}
                      className="flex items-center justify-center gap-2 bg-white text-[#00442d] hover:bg-[#e1f2e6] border border-[#d5e7db] px-5 py-3 rounded-xl font-bold text-xs transition-all shadow-xs active:scale-[0.98]"
                    >
                      <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                      <span>Pesan Langsung</span>
                    </button>
                  </div>

                  <p className="text-[11px] text-center text-[#404943] flex items-center justify-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-[#2a6a48]">moped</span>
                    Pengantaran terjadwal: Siang (11.30 WIB) & Sore (17.00 WIB) langsung ke kos/kampus.
                  </p>
                </div>
              </div>

              {/* Macro Nutritional Facts Matrix */}
              <div className="bg-white rounded-2xl p-6 shadow-xs border border-[#dbece0] flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#00442d] text-[22px]">
                      nutrition
                    </span>
                    <h2 className="font-display text-base font-bold text-[#101f17]">
                      Informasi Gizi (per porsi)
                    </h2>
                  </div>
                  <span className="text-[11px] text-[#2a6a48] font-bold bg-[#e6f8ec] px-3 py-1 rounded-full border border-[#aceec4]">
                    AKG 2000 kkal
                  </span>
                </div>

                {/* 5-Column Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                  <div className="bg-[#e6f8ec] p-3 rounded-xl flex flex-col items-center text-center border border-[#d5e7db]">
                    <span className="text-[10px] text-[#404943] uppercase tracking-wider font-semibold">
                      Kalori
                    </span>
                    <span className="font-display text-base font-bold text-[#00442d] mt-1">450</span>
                    <span className="text-[10px] text-[#404943]">kkal (23%)</span>
                  </div>

                  <div className="bg-[#e6f8ec] p-3 rounded-xl flex flex-col items-center text-center border border-[#d5e7db]">
                    <span className="text-[10px] text-[#404943] uppercase tracking-wider font-semibold">
                      Protein
                    </span>
                    <span className="font-display text-base font-bold text-[#2a6a48] mt-1">25</span>
                    <span className="text-[10px] text-[#404943]">gram (42%)</span>
                  </div>

                  <div className="bg-[#e6f8ec] p-3 rounded-xl flex flex-col items-center text-center border border-[#d5e7db]">
                    <span className="text-[10px] text-[#404943] uppercase tracking-wider font-semibold">
                      Karbohidrat
                    </span>
                    <span className="font-display text-base font-bold text-[#101f17] mt-1">60</span>
                    <span className="text-[10px] text-[#404943]">gram (18%)</span>
                  </div>

                  <div className="bg-[#e6f8ec] p-3 rounded-xl flex flex-col items-center text-center border border-[#d5e7db]">
                    <span className="text-[10px] text-[#404943] uppercase tracking-wider font-semibold">
                      Lemak
                    </span>
                    <span className="font-display text-base font-bold text-[#101f17] mt-1">12</span>
                    <span className="text-[10px] text-[#404943]">gram (15%)</span>
                  </div>

                  <div className="bg-[#e6f8ec] p-3 rounded-xl flex flex-col items-center text-center col-span-2 sm:col-span-1 border border-[#d5e7db]">
                    <span className="text-[10px] text-[#404943] uppercase tracking-wider font-semibold">
                      Serat Pangan
                    </span>
                    <span className="font-display text-base font-bold text-[#2a6a48] mt-1">4</span>
                    <span className="text-[10px] text-[#404943]">gram (14%)</span>
                  </div>
                </div>

                {/* Allergen Alert */}
                <div className="bg-[#f8e0ad]/40 rounded-xl p-3 flex items-center gap-2.5 text-[#101f17] border border-[#f8e0ad]">
                  <span className="material-symbols-outlined text-[20px] text-[#ba1a1a] shrink-0">
                    warning
                  </span>
                  <p className="text-xs">
                    <strong className="font-bold">Peringatan Alergen:</strong> Mengandung kedelai (saus teriyaki), biji wijen, dan gluten (gandum kecap jepang). Bebas bahan pengawet sintesis.
                  </p>
                </div>
              </div>

              {/* Detailed Accordions Module */}
              <div className="bg-white rounded-2xl shadow-xs border border-[#dbece0] overflow-hidden flex flex-col divide-y divide-[#e1f2e6]">
                {/* Accordion 1: Komposisi Lengkap */}
                <div>
                  <button
                    type="button"
                    onClick={() => toggleAccordion(0)}
                    className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-[#e6f8ec] transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-[#00442d] text-[20px]">
                        grocery
                      </span>
                      <span className="font-display text-sm font-bold text-[#101f17]">
                        1. Komposisi Lengkap & Bahan Baku
                      </span>
                    </div>
                    <span
                      className={`material-symbols-outlined text-[#404943] transition-transform duration-200 ${
                        openAccordions[0] ? 'rotate-180' : ''
                      }`}
                    >
                      expand_more
                    </span>
                  </button>
                  {openAccordions[0] && (
                    <div className="px-5 pb-4 pt-1 bg-[#e6f8ec]/40 text-xs text-[#404943] leading-relaxed">
                      Fillet paha ayam tanpa kulit (boneless thigh), saus teriyaki racikan rendah natrium, beras putih pandan wangi, brokoli hijau organik kukus, wortel manis lokal, bawang bombay karamelisasi, minyak wijen aromatik, serta taburan biji wijen sangrai. Tanpa MSG berlebih dan tanpa pengawet buatan.
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        <span className="bg-[#e1f2e6] text-[#00442d] text-[10px] px-2.5 py-0.5 rounded-full font-semibold">
                          Fillet Paha Ayam
                        </span>
                        <span className="bg-[#e1f2e6] text-[#00442d] text-[10px] px-2.5 py-0.5 rounded-full font-semibold">
                          Nasi Pandan Wangi
                        </span>
                        <span className="bg-[#e1f2e6] text-[#00442d] text-[10px] px-2.5 py-0.5 rounded-full font-semibold">
                          Brokoli & Wortel
                        </span>
                        <span className="bg-[#e1f2e6] text-[#00442d] text-[10px] px-2.5 py-0.5 rounded-full font-semibold">
                          Minyak Wijen Murni
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Accordion 2: Cara Penyajian & Pemanasan */}
                <div>
                  <button
                    type="button"
                    onClick={() => toggleAccordion(1)}
                    className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-[#e6f8ec] transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-[#00442d] text-[20px]">
                        microwave
                      </span>
                      <span className="font-display text-sm font-bold text-[#101f17]">
                        2. Cara Penyajian & Pemanasan
                      </span>
                    </div>
                    <span
                      className={`material-symbols-outlined text-[#404943] transition-transform duration-200 ${
                        openAccordions[1] ? 'rotate-180' : ''
                      }`}
                    >
                      expand_more
                    </span>
                  </button>
                  {openAccordions[1] && (
                    <div className="px-5 pb-4 pt-1 bg-[#e6f8ec]/40 text-xs text-[#404943] leading-relaxed space-y-2">
                      <div className="flex items-start gap-2">
                        <span className="material-symbols-outlined text-[#2a6a48] text-[16px] mt-0.5">
                          check_circle
                        </span>
                        <span>
                          <strong>Microwave (Praktis):</strong> Buka sedikit tutup wadah (ventilasi uap), hangatkan dengan daya sedang selama 1.5 - 2 menit hingga saus berkilau dan harum.
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="material-symbols-outlined text-[#2a6a48] text-[16px] mt-0.5">
                          check_circle
                        </span>
                        <span>
                          <strong>Kukusan / Magic Com (Anak Kos):</strong> Masukkan wadah tahan panas ke dalam rice cooker saat mode 'Warm' atau kukusan selama 3 - 5 menit.
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="material-symbols-outlined text-[#2a6a48] text-[16px] mt-0.5">
                          check_circle
                        </span>
                        <span>
                          <strong>Langsung Santap:</strong> Makanan siap dinikmati langsung saat baru tiba dalam kondisi hangat.
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Accordion 3: Panduan Penyimpanan */}
                <div>
                  <button
                    type="button"
                    onClick={() => toggleAccordion(2)}
                    className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-[#e6f8ec] transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-[#00442d] text-[20px]">
                        ac_unit
                      </span>
                      <span className="font-display text-sm font-bold text-[#101f17]">
                        3. Panduan Penyimpanan
                      </span>
                    </div>
                    <span
                      className={`material-symbols-outlined text-[#404943] transition-transform duration-200 ${
                        openAccordions[2] ? 'rotate-180' : ''
                      }`}
                    >
                      expand_more
                    </span>
                  </button>
                  {openAccordions[2] && (
                    <div className="px-5 pb-4 pt-1 bg-[#e6f8ec]/40 text-xs text-[#404943] leading-relaxed">
                      <p>Untuk menjaga mutu nutrisi dan cita rasa terbaik:</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                        <div className="p-2.5 bg-white rounded-lg border border-[#d5e7db]">
                          <span className="text-[11px] font-bold text-[#00442d] block">
                            Suhu Ruangan (25°C)
                          </span>
                          <span className="text-[11px] text-[#404943]">
                            Maksimal 4 jam setelah paket diantarkan.
                          </span>
                        </div>
                        <div className="p-2.5 bg-white rounded-lg border border-[#d5e7db]">
                          <span className="text-[11px] font-bold text-[#00442d] block">
                            Kulkas / Chiller (4°C)
                          </span>
                          <span className="text-[11px] text-[#404943]">
                            Tahan hingga 24 jam dalam wadah tertutup rapat.
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Accordion 4: Waktu Produksi */}
                <div>
                  <button
                    type="button"
                    onClick={() => toggleAccordion(3)}
                    className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-[#e6f8ec] transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-[#00442d] text-[20px]">
                        event_available
                      </span>
                      <span className="font-display text-sm font-bold text-[#101f17]">
                        4. Waktu Produksi & Kedaluwarsa
                      </span>
                    </div>
                    <span
                      className={`material-symbols-outlined text-[#404943] transition-transform duration-200 ${
                        openAccordions[3] ? 'rotate-180' : ''
                      }`}
                    >
                      expand_more
                    </span>
                  </button>
                  {openAccordions[3] && (
                    <div className="px-5 pb-4 pt-1 bg-[#e6f8ec]/40 text-xs text-[#404943] leading-relaxed">
                      Seluruh pesanan catering harian diolah pada <strong>hari H pengiriman</strong> (pukul 09:00 WIB untuk slot siang, dan pukul 15:00 WIB untuk slot sore). Disarankan dikonsumsi sebelum pukul 22:00 WIB di hari yang sama demi kesegaran optimal.
                    </div>
                  )}
                </div>

                {/* Accordion 5: Standar Higiene */}
                <div>
                  <button
                    type="button"
                    onClick={() => toggleAccordion(4)}
                    className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-[#e6f8ec] transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-[#00442d] text-[20px]">
                        health_and_safety
                      </span>
                      <span className="font-display text-sm font-bold text-[#101f17]">
                        5. Standar Higiene & Keamanan Pangan
                      </span>
                    </div>
                    <span
                      className={`material-symbols-outlined text-[#404943] transition-transform duration-200 ${
                        openAccordions[4] ? 'rotate-180' : ''
                      }`}
                    >
                      expand_more
                    </span>
                  </button>
                  {openAccordions[4] && (
                    <div className="px-5 pb-4 pt-1 bg-[#e6f8ec]/40 text-xs text-[#404943] leading-relaxed">
                      Diproduksi dalam dapur pusat higienis mahasiswa bersertifikat pembinaan gizi dinas kesehatan. Menggunakan bahan ayam segar bersertifikat Halal resmi, sayur dicuci dengan air berstandar ozonasi food-grade, serta dikemas dengan wadah microwave-safe bersertifikasi BPA Free.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Related Recommendations Section */}
          <div className="mt-12 pt-8 border-t border-[#d5e7db] flex flex-col gap-6" id="section-rekomendasi">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
              <div>
                <span className="text-xs text-[#2a6a48] uppercase tracking-widest font-bold">
                  Pilihan Mahasiswa Lainnya
                </span>
                <h2 className="font-display text-xl lg:text-2xl font-bold text-[#00442d] tracking-tight">
                  Menu Favorit Sekelas Chicken Teriyaki
                </h2>
              </div>
              <button
                onClick={() => onShowToast('Menampilkan seluruh katalog menu')}
                className="text-xs font-bold text-[#00442d] hover:text-[#205c43] flex items-center gap-1 transition-colors"
              >
                <span>Lihat Semua Katalog Menu</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>

            {/* Recommendation Grid (3 Cards) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {MENU_ITEMS.slice(1, 4).map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow-xs border border-[#dbece0] hover:shadow-lg transition-all hover:-translate-y-1 overflow-hidden flex flex-col group"
                >
                  <div className="relative aspect-[4/3] w-full bg-[#e1f2e6] overflow-hidden">
                    <span className="absolute top-3 left-3 z-10 bg-[#00442d] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                      {item.category}
                    </span>
                    <img
                      alt={item.title}
                      src={item.image}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-4 flex flex-col flex-1 justify-between gap-3">
                    <div>
                      <div className="flex items-center justify-between text-[#404943] text-[11px] mb-1">
                        <span>{item.calories} kkal</span>
                        <span>{item.protein}g protein</span>
                      </div>
                      <h3 className="font-display text-sm font-bold text-[#101f17] group-hover:text-[#00442d] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-[#404943] line-clamp-2 mt-1">
                        {item.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-[#e1f2e6]">
                      <span className="font-display text-sm font-bold text-[#00442d]">
                        Rp {item.price.toLocaleString('id-ID')}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          onAddToCart(item.title);
                          onShowToast(`${item.title} ditambahkan!`);
                        }}
                        className="bg-[#e6f8ec] text-[#00442d] hover:bg-[#00442d] hover:text-white px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors flex items-center gap-1 border border-[#d5e7db]"
                      >
                        <span className="material-symbols-outlined text-[16px]">add</span>
                        <span>Tambah</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Full Rich Desktop Footer */}
      <footer className="w-full bg-[#e6f8ec] pt-12 pb-8 border-t border-[#d5e7db]" id="footer-tentang">
        <div className="w-full px-4 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10">
            {/* Bio & Badges */}
            <div className="lg:col-span-2 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <img
                  alt="Bekalin.yu Logo"
                  className="h-8 w-auto object-contain"
                  src={LOGO_URL}
                />
                <span className="font-display text-xl font-bold text-[#00442d]">
                  Bekalin.yu
                </span>
              </div>
              <p className="text-xs text-[#404943] max-w-sm leading-relaxed">
                Solusi meal-prep bernutrisi tinggi dan frozen food siap santap ramah kantong mahasiswa kos dan pekerja aktif. Praktis, higienis, dan lezat tanpa kompromi gizi harian.
              </p>
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <div className="inline-flex items-center gap-1 bg-white px-3 py-1 rounded-full text-[11px] font-semibold border border-[#d5e7db] text-[#101f17]">
                  <span className="material-symbols-outlined text-[#2a6a48] text-[15px]">verified</span>
                  <span>100% Halal Food</span>
                </div>
                <div className="inline-flex items-center gap-1 bg-white px-3 py-1 rounded-full text-[11px] font-semibold border border-[#d5e7db] text-[#101f17]">
                  <span className="material-symbols-outlined text-[#2a6a48] text-[15px]">
                    health_and_safety
                  </span>
                  <span>Standar Higiene BPOM</span>
                </div>
              </div>
            </div>

            {/* Menu & Paket Links */}
            <div className="flex flex-col gap-2">
              <h3 className="font-display text-xs font-bold text-[#101f17] uppercase tracking-wider">
                Menu & Paket
              </h3>
              <ul className="flex flex-col gap-1.5 text-xs text-[#404943]">
                <li>
                  <a href="#section-rekomendasi" className="hover:text-[#00442d]">
                    Semua Menu Harian
                  </a>
                </li>
                <li>
                  <a href="#section-rekomendasi" className="hover:text-[#00442d]">
                    Paket Catering Mingguan
                  </a>
                </li>
                <li>
                  <a href="#section-rekomendasi" className="hover:text-[#00442d]">
                    Frozen Food Siap Masak
                  </a>
                </li>
                <li>
                  <a href="#section-rekomendasi" className="hover:text-[#00442d]">
                    Paket Hemat Mahasiswa
                  </a>
                </li>
              </ul>
            </div>

            {/* Edukasi & Info Links */}
            <div className="flex flex-col gap-2">
              <h3 className="font-display text-xs font-bold text-[#101f17] uppercase tracking-wider">
                Edukasi & Info
              </h3>
              <ul className="flex flex-col gap-1.5 text-xs text-[#404943]">
                <li>
                  <button
                    onClick={() => onNavigate('mobile-qr')}
                    className="hover:text-[#00442d] text-left"
                  >
                    Info Nutrisi & QR Code
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('mobile-qr')}
                    className="hover:text-[#00442d] text-left"
                  >
                    Panduan Simpan & Hangatkan
                  </button>
                </li>
                <li>
                  <a href="#footer-tentang" className="hover:text-[#00442d]">
                    Tentang Bekalin.yu
                  </a>
                </li>
                <li>
                  <a href="#footer-tentang" className="hover:text-[#00442d]">
                    FAQ & Layanan Bantuan
                  </a>
                </li>
              </ul>
            </div>

            {/* Hubungi Kami */}
            <div className="flex flex-col gap-2">
              <h3 className="font-display text-xs font-bold text-[#101f17] uppercase tracking-wider">
                Hubungi Kami
              </h3>
              <div className="flex flex-col gap-1.5 text-xs text-[#404943]">
                <a
                  href="https://wa.me/6281234567890"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 hover:text-[#00442d]"
                >
                  <span className="material-symbols-outlined text-[16px] text-[#00442d]">call</span>
                  <span>+62 812-3456-7890</span>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 hover:text-[#00442d]"
                >
                  <span className="material-symbols-outlined text-[16px] text-[#00442d]">
                    alternate_email
                  </span>
                  <span>@bekalin.yu</span>
                </a>
                <div className="flex items-center gap-1.5 pt-1 text-[11px] text-[#707973]">
                  <span className="material-symbols-outlined text-[16px] text-[#2a6a48]">
                    schedule
                  </span>
                  <span>Setiap Hari: 08.00 - 21.00 WIB</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-[#d5e7db] flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-xs text-[#404943]">
            <p>© 2025 Bekalin.yu - Inovasi Kewirausahaan Mahasiswa Indonesia. Seluruh hak cipta dilindungi.</p>
            <div className="flex items-center gap-4 text-[11px]">
              <span className="hover:text-[#00442d] cursor-pointer">Kebijakan Privasi</span>
              <span className="hover:text-[#00442d] cursor-pointer">Syarat & Ketentuan</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
