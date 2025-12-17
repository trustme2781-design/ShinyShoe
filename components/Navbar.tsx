import React from 'react';
import { ShoppingBag, User, Heart, Menu, X, Search } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

const Navbar: React.FC = () => {
  const { cart, user, setIsCartOpen, login, logout, wishlist } = useStore();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const isActive = (path: string) => location.pathname === path ? "text-shiny-accent" : "text-white hover:text-shiny-accent";

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-shiny-black/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 font-display font-bold text-2xl tracking-tighter italic">
            SHINY<span className="text-shiny-accent">SHOES</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link to="/" className={`font-medium transition-colors ${isActive('/')}`}>HOME</Link>
            <Link to="/shop" className={`font-medium transition-colors ${isActive('/shop')}`}>SHOP</Link>
            <Link to="/about" className={`font-medium transition-colors ${isActive('/about')}`}>ABOUT</Link>
            {user?.isAdmin && (
              <Link to="/admin" className={`font-medium transition-colors ${isActive('/admin')}`}>ADMIN</Link>
            )}
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <button className="text-white hover:text-shiny-accent transition-colors p-1">
              <Search className="w-5 h-5" />
            </button>
            <Link to="/wishlist" className="text-white hover:text-shiny-accent transition-colors p-1 relative">
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <button 
              onClick={() => setIsCartOpen(true)}
              className="text-white hover:text-shiny-accent transition-colors p-1 relative"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-shiny-accent text-black text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                  {totalItems}
                </span>
              )}
            </button>
            
            {user ? (
               <button onClick={logout} className="text-xs font-bold border border-white/20 px-3 py-1 rounded hover:bg-white hover:text-black transition-colors">
                 LOGOUT
               </button>
            ) : (
              <button onClick={login} className="text-white hover:text-shiny-accent transition-colors p-1">
                <User className="w-5 h-5" />
              </button>
            )}

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-white hover:text-shiny-accent"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-shiny-dark border-t border-white/10">
          <div className="px-4 pt-2 pb-3 space-y-1">
            <Link to="/" className="block px-3 py-2 text-base font-medium text-white hover:text-shiny-accent" onClick={() => setIsMenuOpen(false)}>HOME</Link>
            <Link to="/shop" className="block px-3 py-2 text-base font-medium text-white hover:text-shiny-accent" onClick={() => setIsMenuOpen(false)}>SHOP</Link>
            <Link to="/about" className="block px-3 py-2 text-base font-medium text-white hover:text-shiny-accent" onClick={() => setIsMenuOpen(false)}>ABOUT</Link>
            {user?.isAdmin && (
              <Link to="/admin" className="block px-3 py-2 text-base font-medium text-shiny-accent" onClick={() => setIsMenuOpen(false)}>ADMIN PANEL</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;