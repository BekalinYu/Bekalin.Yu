export type ScreenType = 'mobile-beranda' | 'mobile-qr' | 'web-beranda';

export interface MenuItem {
  id: string;
  title: string;
  category: 'Catering' | 'Frozen Food' | 'Paket Hemat';
  price: number;
  originalPrice?: number;
  image: string;
  tag?: string;
  tagType?: 'catering' | 'frozen' | 'hemat' | 'popular';
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  description: string;
  batchInfo?: string;
  madeTime?: string;
  bestBefore?: string;
}

export interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
}
