import React from 'react';
import { Instagram, Twitter, Facebook, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-shiny-dark border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="font-display font-bold text-2xl tracking-tighter italic mb-4 block">
              SHINY<span className="text-shiny-accent">SHOES</span>
            </Link>
            <p className="text-gray-400 text-sm">
              Premium footwear for the modern era. We curate the best sneakers from top brands and our exclusive private label.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-white">SHOP</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/shop" className="hover:text-shiny-accent">New Arrivals</Link></li>
              <li><Link to="/shop" className="hover:text-shiny-accent">Best Sellers</Link></li>
              <li><Link to="/shop" className="hover:text-shiny-accent">Men</Link></li>
              <li><Link to="/shop" className="hover:text-shiny-accent">Women</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-white">SUPPORT</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-shiny-accent">Order Status</a></li>
              <li><a href="#" className="hover:text-shiny-accent">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-shiny-accent">FAQ</a></li>
              <li><a href="#" className="hover:text-shiny-accent">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-white">FOLLOW US</h4>
            <div className="flex space-x-4">
              <a href="#" className="bg-white/5 p-2 rounded-full hover:bg-shiny-accent hover:text-black transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="bg-white/5 p-2 rounded-full hover:bg-shiny-accent hover:text-black transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="bg-white/5 p-2 rounded-full hover:bg-shiny-accent hover:text-black transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-4">
          <p>&copy; 2024 ShinyShoes Inc. All rights reserved.</p>
          <div className="flex items-center gap-1">
             <span>Made with</span>
             <Heart className="w-3 h-3 text-shiny-accent fill-current" />
             <span>by <span className="text-white font-bold">Sriraj Pillai</span></span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;