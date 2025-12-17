import React from 'react';
import { ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';

const Home: React.FC = () => {
  const { products } = useStore();
  const featuredProducts = products.filter(p => p.isNew).slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=2670&auto=format&fit=crop"
            alt="Hero Sneaker"
            className="w-full h-full object-cover opacity-60 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-shiny-black via-shiny-black/40 to-transparent"></div>
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl animate-slide-up">
            <span className="text-shiny-accent font-bold tracking-widest uppercase mb-4 block animate-pulse">New Collection Drop</span>
            {/* Added px-2 to wrapper and pr-4 to span to accommodate italic slant */}
            <div className="animate-float py-4 px-2">
              <h1 className="text-6xl md:text-8xl font-display font-bold text-white mb-6 leading-none italic drop-shadow-2xl">
                RUN THE <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 pb-2 pr-6">STREETS</span>
              </h1>
            </div>
            <p className="text-gray-200 text-lg mb-8 max-w-md drop-shadow-md font-medium">
              Discover the latest in sneaker technology and streetwear aesthetics. Built for those who never stop moving.
            </p>
            <Link 
              to="/shop" 
              className="inline-flex items-center gap-2 bg-shiny-accent text-black font-bold px-8 py-4 rounded-full hover:bg-white hover:scale-110 transition-all duration-300 shadow-[0_0_20px_rgba(204,255,0,0.3)]"
            >
              SHOP NOW <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Brands Ticker (Simplified) */}
      <div className="bg-white text-black py-4 overflow-hidden whitespace-nowrap border-y-4 border-shiny-accent">
        <div className="inline-block animate-marquee px-4 font-display font-bold text-xl tracking-widest">
           PREMIUM • STYLE • COMFORT • EXCLUSIVE • LIMITED EDITION • STREETWEAR • PREMIUM • STYLE • COMFORT • EXCLUSIVE • LIMITED EDITION • STREETWEAR •
        </div>
      </div>

      {/* Featured Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-display font-bold text-white mb-2">JUST DROPPED</h2>
            <p className="text-shiny-gray">Fresh heat for your rotation.</p>
          </div>
          <Link to="/shop" className="text-shiny-accent hover:text-white transition-colors font-bold flex items-center gap-1 hover:translate-x-2 duration-300">
            VIEW ALL <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Promo Banner */}
      <section className="py-10 px-4">
        <div className="max-w-7xl mx-auto bg-gradient-to-r from-zinc-900 to-zinc-800 rounded-3xl p-10 md:p-20 relative overflow-hidden group">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="max-w-lg">
              <h2 className="text-4xl font-display font-bold text-white mb-4">JOIN THE CLUB</h2>
              <p className="text-gray-400 mb-6">Sign up for our newsletter to get early access to drops and exclusive styling tips.</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-white/10 border border-white/20 text-white px-4 py-3 rounded-lg flex-1 focus:outline-none focus:border-shiny-accent transition-all"
                />
                <button className="bg-white text-black font-bold px-6 py-3 rounded-lg hover:bg-shiny-accent transition-colors">
                  SUBSCRIBE
                </button>
              </div>
            </div>
            <div className="hidden md:block transition-transform duration-700 group-hover:rotate-45">
              <Star className="w-64 h-64 text-shiny-accent opacity-10 rotate-12" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;