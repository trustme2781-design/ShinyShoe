import { Product } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'The Classic Oxford',
    brand: 'ShinyShoes',
    price: 199.99,
    description: 'A timeless black leather shoe with a brilliant shine, perfect for formal occasions.',
    imageUrl: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=2670&auto=format&fit=crop',
    sizes: [7, 8, 9, 10, 11, 12],
    category: 'men',
    isNew: false,
    rating: 4.8,
    reviews: 89
  },
  {
    id: '2',
    name: 'The Modern Loafer',
    brand: 'ShinyShoes',
    price: 149.50,
    description: 'A stylish blue suede loafer with a silver buckle, blending comfort with elegance.',
    imageUrl: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=2669&auto=format&fit=crop',
    sizes: [7, 8, 9, 10, 11],
    category: 'men',
    isNew: true,
    rating: 4.6,
    reviews: 45
  },
  {
    id: '3',
    name: 'The Running Trainer',
    brand: 'ShinyShoes',
    price: 129.99,
    description: 'A sleek white and silver athletic shoe designed for performance and style on the track.',
    imageUrl: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=2574&auto=format&fit=crop',
    sizes: [6, 7, 8, 9, 10, 11, 12],
    category: 'unisex',
    isNew: true,
    rating: 4.9,
    reviews: 210
  },
  {
    id: '4',
    name: 'The Elegant Heel',
    brand: 'ShinyShoes',
    price: 249.00,
    description: 'A glossy red stiletto heel, embodying sophistication and glamour.',
    imageUrl: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=2680&auto=format&fit=crop',
    sizes: [5, 6, 7, 8, 9],
    category: 'women',
    rating: 4.7,
    reviews: 132
  },
  {
    id: '5',
    name: 'The Urban Boot',
    brand: 'ShinyShoes',
    price: 180.00,
    description: 'A rugged brown leather ankle boot with a chunky sole, ideal for a stylish city look.',
    imageUrl: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?q=80&w=2574&auto=format&fit=crop',
    sizes: [7, 8, 9, 10, 11, 12],
    category: 'unisex',
    rating: 4.5,
    reviews: 78
  },
  {
    id: '6',
    name: 'The Casual Slip-on',
    brand: 'ShinyShoes',
    price: 65.00,
    description: 'A relaxed grey canvas shoe, perfect for a day at the beach or a casual outing.',
    imageUrl: 'https://images.unsplash.com/photo-1562183241-b937e95585b6?q=80&w=2665&auto=format&fit=crop',
    sizes: [5, 6, 7, 8, 9, 10, 11],
    category: 'unisex',
    rating: 4.3,
    reviews: 560
  },
  {
    id: '7',
    name: 'The Statement Sneaker',
    brand: 'ShinyShoes',
    price: 220.00,
    description: 'A vibrant, iridescent high-top sneaker that is sure to turn heads.',
    imageUrl: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=2670&auto=format&fit=crop',
    sizes: [8, 9, 10, 11, 12, 13],
    category: 'men',
    isNew: true,
    rating: 5.0,
    reviews: 42
  },
  {
    id: '9',
    name: 'The Performance Sandal',
    brand: 'ShinyShoes',
    price: 85.00,
    description: 'A durable and comfortable sandal designed for outdoor adventures.',
    imageUrl: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=2564&auto=format&fit=crop',
    sizes: [6, 7, 8, 9, 10, 11],
    category: 'unisex',
    rating: 4.4,
    reviews: 156
  },
  {
    id: '10',
    name: "The 'ShinyShoe' Signature",
    brand: 'ShinyShoes',
    price: 350.00,
    description: 'A pair of our formal and elegant styles, presented side-by-side to represent the breadth and quality of the ShinyShoe collection.',
    imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2512&auto=format&fit=crop',
    sizes: [7, 8, 9, 10, 11],
    category: 'unisex',
    isNew: true,
    rating: 4.9,
    reviews: 12
  }
];

export const MOCK_USER = {
  id: 'u1',
  name: 'Alex Shoeman',
  email: 'alex@example.com',
  isAdmin: true
};

export const INITIAL_ORDERS = [
  {
    id: 'ord-123',
    userId: 'u1',
    items: [MOCK_PRODUCTS[0]],
    total: 199.99,
    status: 'delivered',
    date: '2023-10-15'
  },
  {
    id: 'ord-124',
    userId: 'u2',
    items: [MOCK_PRODUCTS[2]],
    total: 129.99,
    status: 'processing',
    date: '2023-10-26'
  }
];