import React, { useState } from 'react';
import { ScreenType, MenuItem } from './types';
import { NavigationSwitcher } from './components/NavigationSwitcher';
import { MobileBerandaScreen } from './components/MobileBerandaScreen';
import { MobileQrScreen } from './components/MobileQrScreen';
import { WebBerandaScreen } from './components/WebBerandaScreen';
import { CheckoutModal } from './components/CheckoutModal';
import { ProfileModal } from './components/ProfileModal';
import { Toast } from './components/Toast';
import { MENU_ITEMS } from './data/menuData';

export default function App() {
  // Screen 1 is the Initial Screen as defined in Prototype Navigation Spec
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('mobile-beranda');
  const [cartCount, setCartCount] = useState<number>(2);

  // Toast feedback state
  const [toast, setToast] = useState<{ message: string; icon: string; visible: boolean }>({
    message: '',
    icon: 'check_circle',
    visible: false,
  });

  // Modal states
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [checkoutItem, setCheckoutItem] = useState<{
    title: string;
    price: number;
    image?: string;
  }>({
    title: 'Chicken Teriyaki Bento',
    price: 17000,
    image: MENU_ITEMS[0].image,
  });

  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);

  // Helper for displaying toast notifications
  const showToast = (message: string, icon: string = 'check_circle') => {
    setToast({ message, icon, visible: true });
    window.clearTimeout((window as any)._toastTimer);
    (window as any)._toastTimer = window.setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 2400);
  };

  const handleAddToCart = (itemName: string) => {
    setCartCount((prev) => prev + 1);
    showToast(`${itemName} berhasil ditambahkan!`, 'shopping_cart');
  };

  const handleOpenCheckout = (item: MenuItem | { title: string; price: number; image?: string }) => {
    setCheckoutItem({
      title: item.title,
      price: item.price,
      image: item.image,
    });
    setIsCheckoutOpen(true);
  };

  const handleSuccessReturnHome = () => {
    setIsCheckoutOpen(false);
    setCartCount(0);
    setCurrentScreen('mobile-beranda');
    showToast('Pesanan berhasil dibuat & diantar ke kos!', 'celebration');
  };

  const handleViewQrFromSuccess = () => {
    setIsCheckoutOpen(false);
    setCurrentScreen('mobile-qr');
    showToast('Melihat informasi batch & QR produk');
  };

  return (
    <div className="min-h-screen bg-[#ecfef1] flex flex-col font-sans">
      {/* Prototype Navigation Switcher Bar (Always accessible to test all 3 screens) */}
      <NavigationSwitcher
        currentScreen={currentScreen}
        onSelectScreen={(screen) => {
          setCurrentScreen(screen);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Screen Renderings */}
      <div className="flex-1 w-full">
        {currentScreen === 'mobile-beranda' && (
          <MobileBerandaScreen
            onNavigate={(screen) => {
              setCurrentScreen(screen);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenCheckout={handleOpenCheckout}
            onShowToast={showToast}
            cartCount={cartCount}
            onAddToCart={handleAddToCart}
            onOpenProfile={() => setIsProfileOpen(true)}
          />
        )}

        {currentScreen === 'mobile-qr' && (
          <MobileQrScreen
            onNavigate={(screen) => {
              setCurrentScreen(screen);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenCheckout={handleOpenCheckout}
            onShowToast={showToast}
          />
        )}

        {currentScreen === 'web-beranda' && (
          <WebBerandaScreen
            onNavigate={(screen) => {
              setCurrentScreen(screen);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenCheckout={handleOpenCheckout}
            onShowToast={showToast}
            cartCount={cartCount}
            onAddToCart={handleAddToCart}
            onOpenProfile={() => setIsProfileOpen(true)}
          />
        )}
      </div>

      {/* Shared Interactive Modals */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        itemName={checkoutItem.title}
        itemPrice={checkoutItem.price}
        itemImage={checkoutItem.image}
        onSuccessReturnHome={handleSuccessReturnHome}
        onViewQrDetails={handleViewQrFromSuccess}
        onShowToast={showToast}
      />

      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        onShowToast={showToast}
      />

      {/* Shared Toast Feedback */}
      <Toast message={toast.message} icon={toast.icon} visible={toast.visible} />
    </div>
  );
}
