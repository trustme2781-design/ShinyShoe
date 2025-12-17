import React from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Link, useNavigate } from 'react-router-dom';

const CartDrawer: React.FC = () => {
  const { isCartOpen, setIsCartOpen, cart, updateQuantity, removeFromCart } = useStore();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-[60] flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      ></div>

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-shiny-dark h-full shadow-2xl flex flex-col transform transition-transform duration-300 animate-slide-in-right">
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <h2 className="text-xl font-display font-bold uppercase tracking-wide">Your Cart ({cart.length})</h2>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="p-2 hover:bg-white/5 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <ShoppingBag className="w-16 h-16 text-shiny-gray mb-4 opacity-50" />
              <p className="text-shiny-gray">Your cart is empty.</p>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="mt-4 text-shiny-accent underline underline-offset-4 font-bold"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4">
                <div className="w-24 h-24 bg-white/5 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-white">{item.name}</h3>
                      <p className="text-sm text-shiny-gray">{item.brand}</p>
                      <p className="text-xs text-shiny-gray mt-1">Size: {item.selectedSize}</p>
                    </div>
                    <p className="font-bold">${item.price.toFixed(2)}</p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-2 bg-white/5 rounded-md">
                      <button 
                        onClick={() => updateQuantity(item.id, item.selectedSize, -1)}
                        className="p-1 hover:text-shiny-accent disabled:opacity-50"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                      <button 
                         onClick={() => updateQuantity(item.id, item.selectedSize, 1)}
                         className="p-1 hover:text-shiny-accent"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id, item.selectedSize)}
                      className="text-xs text-red-400 hover:text-red-300 underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-4 border-t border-white/10 bg-shiny-black">
            <div className="flex justify-between items-center mb-4">
              <span className="text-shiny-gray">Subtotal</span>
              <span className="font-bold text-xl">${subtotal.toFixed(2)}</span>
            </div>
            <p className="text-xs text-shiny-gray mb-4 text-center">Shipping & taxes calculated at checkout.</p>
            <button 
              onClick={handleCheckout}
              className="w-full bg-shiny-accent text-black font-bold py-4 uppercase tracking-wider hover:bg-white transition-colors"
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;