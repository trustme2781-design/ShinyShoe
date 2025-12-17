import React from 'react';
import { Product } from '../types';
import { Heart, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { toggleWishlist, wishlist, addToCart } = useStore();
  const isWishlisted = wishlist.includes(product.id);

  return (
    <div className="group relative bg-shiny-dark rounded-xl overflow-hidden hover:-translate-y-1 transition-transform duration-300 shadow-lg">
      <Link to={`/product/${product.id}`} className="block relative aspect-[4/5] overflow-hidden bg-white/5">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        {product.isNew && (
          <span className="absolute top-2 left-2 bg-shiny-accent text-black text-xs font-bold px-2 py-1 uppercase tracking-widest">
            New
          </span>
        )}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
      </Link>

      <button 
        onClick={(e) => {
          e.preventDefault();
          toggleWishlist(product.id);
        }}
        className={`absolute top-2 right-2 p-2 rounded-full transition-colors z-10 ${isWishlisted ? 'text-red-500 bg-white' : 'text-white bg-black/30 hover:bg-white hover:text-black'}`}
      >
        <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
      </button>

      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <p className="text-shiny-gray text-xs font-bold uppercase tracking-wider">{product.brand}</p>
          <div className="flex items-center text-yellow-400 text-xs">
            <span>★</span>
            <span className="ml-1 text-white">{product.rating}</span>
          </div>
        </div>
        <Link to={`/product/${product.id}`}>
          <h3 className="text-white font-bold text-lg leading-tight mb-2 group-hover:text-shiny-accent transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center justify-between mt-3">
          <span className="text-white font-bold text-lg">${product.price.toFixed(2)}</span>
          <button 
            onClick={() => addToCart(product, product.sizes[0])} // Quick add defaults to first size
            className="p-2 bg-white/10 rounded-lg hover:bg-shiny-accent hover:text-black transition-colors"
            title="Quick Add"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;