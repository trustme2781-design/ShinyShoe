export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  description: string;
  imageUrl: string;
  sizes: number[];
  category: 'men' | 'women' | 'unisex';
  isNew?: boolean;
  rating: number;
  reviews: number;
}

export interface CartItem extends Product {
  selectedSize: number;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

// Updated to match Supabase Table Structure
export interface Order {
  id: number;
  created_at: string;
  first_name: string;
  last_name: string;
  email: string;
  address: string;
  city: string;
  zip_code: string;
  items: CartItem[];
  total_amount: number;
  status: 'processing' | 'shipped' | 'delivered';
}

export enum SortOption {
  NEWEST = 'NEWEST',
  PRICE_LOW = 'PRICE_LOW',
  PRICE_HIGH = 'PRICE_HIGH',
  POPULAR = 'POPULAR'
}