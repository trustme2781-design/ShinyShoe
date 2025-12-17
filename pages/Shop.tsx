import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';
import { SortOption } from '../types';
import { Filter, ChevronDown } from 'lucide-react';

const Shop: React.FC = () => {
  const { products } = useStore();
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [sortOption, setSortOption] = useState<SortOption>(SortOption.NEWEST);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by category
    if (categoryFilter !== 'all') {
      result = result.filter(p => p.category === categoryFilter);
    }

    // Filter by price
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Sort
    switch (sortOption) {
      case SortOption.PRICE_LOW:
        result.sort((a, b) => a.price - b.price);
        break;
      case SortOption.PRICE_HIGH:
        result.sort((a, b) => b.price - a.price);
        break;
      case SortOption.POPULAR:
        result.sort((a, b) => b.reviews - a.reviews);
        break;
      case SortOption.NEWEST:
      default:
        // Assuming higher ID is newer for mock
        result.sort((a, b) => parseInt(b.id) - parseInt(a.id));
        break;
    }

    return result;
  }, [products, categoryFilter, sortOption, priceRange]);

  return (
    <div className="pt-24 min-h-screen bg-shiny-black text-white pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-4 uppercase italic">All Sneakers</h1>
          <p className="text-shiny-gray">Find your perfect pair from our curated collection.</p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 bg-shiny-dark p-4 rounded-xl">
          
          <div className="flex items-center gap-4 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
            <button 
              onClick={() => setCategoryFilter('all')}
              className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${categoryFilter === 'all' ? 'bg-white text-black' : 'bg-white/5 hover:bg-white/10'}`}
            >
              All
            </button>
            <button 
              onClick={() => setCategoryFilter('men')}
              className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${categoryFilter === 'men' ? 'bg-white text-black' : 'bg-white/5 hover:bg-white/10'}`}
            >
              Men
            </button>
            <button 
              onClick={() => setCategoryFilter('women')}
              className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${categoryFilter === 'women' ? 'bg-white text-black' : 'bg-white/5 hover:bg-white/10'}`}
            >
              Women
            </button>
            <button 
              onClick={() => setCategoryFilter('unisex')}
              className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${categoryFilter === 'unisex' ? 'bg-white text-black' : 'bg-white/5 hover:bg-white/10'}`}
            >
              Unisex
            </button>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative group">
              <button className="flex items-center gap-2 text-sm font-bold bg-white/5 px-4 py-2 rounded-lg hover:bg-white/10">
                Sort By <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute right-0 top-full mt-2 w-48 bg-zinc-900 border border-white/10 rounded-lg shadow-xl py-2 hidden group-hover:block z-20">
                {Object.values(SortOption).map((option) => (
                  <button
                    key={option}
                    onClick={() => setSortOption(option)}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-white/5 ${sortOption === option ? 'text-shiny-accent' : 'text-gray-300'}`}
                  >
                    {option.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-2xl font-bold mb-2">No products found</h3>
            <p className="text-gray-400">Try adjusting your filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;