import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { Check, CreditCard, Loader2, AlertCircle } from 'lucide-react';
import { supabase } from '../services/supabaseClient';

const Checkout: React.FC = () => {
  const { cart, clearCart, user } = useStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiry: '',
    cvc: ''
  });

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Prepare flat data structure for Supabase
      // Mapping camelCase form data to snake_case DB columns
      const orderPayload = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        address: formData.address,
        city: formData.city,
        zip_code: formData.zipCode,
        items: cart, // Stores array of products including names/prices
        total_amount: total,
        status: 'processing'
      };

      const { error: supabaseError } = await supabase
        .from('orders')
        .insert([orderPayload]);

      if (supabaseError) {
        throw supabaseError;
      }

      setSuccess(true);
      clearCart();
      setTimeout(() => {
        navigate('/');
      }, 3000);

    } catch (err: any) {
      console.error("Checkout Error:", err);
      setError(err.message || "Failed to process order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0 && !success) {
    return (
      <div className="pt-24 text-center text-white">
        <p>Your cart is empty.</p>
        <button onClick={() => navigate('/shop')} className="mt-4 text-shiny-accent underline">Shop Now</button>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center bg-shiny-black px-4">
        <div className="bg-shiny-dark p-8 rounded-2xl border border-white/10 text-center max-w-md w-full animate-fade-in">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Order Confirmed!</h2>
          <p className="text-gray-400 mb-6">Thank you for your purchase. We've sent a confirmation email to {formData.email}.</p>
          <p className="text-sm text-gray-500">Redirecting to home...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 min-h-screen bg-shiny-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-display font-bold mb-8">Checkout</h1>
        
        {error && (
          <div className="mb-6 bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-shiny-dark p-6 rounded-xl border border-white/5">
              <h2 className="text-xl font-bold mb-4">Shipping Info</h2>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <input 
                  type="text" name="firstName" placeholder="First Name" required 
                  value={formData.firstName} onChange={handleInputChange}
                  className="bg-black/30 border border-white/20 p-3 rounded-lg focus:border-shiny-accent outline-none" 
                />
                <input 
                  type="text" name="lastName" placeholder="Last Name" required 
                  value={formData.lastName} onChange={handleInputChange}
                  className="bg-black/30 border border-white/20 p-3 rounded-lg focus:border-shiny-accent outline-none" 
                />
              </div>
              <div className="space-y-4">
                <input 
                  type="email" name="email" placeholder="Email" required 
                  value={formData.email} onChange={handleInputChange}
                  className="w-full bg-black/30 border border-white/20 p-3 rounded-lg focus:border-shiny-accent outline-none" 
                />
                <input 
                  type="text" name="address" placeholder="Address" required 
                  value={formData.address} onChange={handleInputChange}
                  className="w-full bg-black/30 border border-white/20 p-3 rounded-lg focus:border-shiny-accent outline-none" 
                />
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    type="text" name="city" placeholder="City" required 
                    value={formData.city} onChange={handleInputChange}
                    className="bg-black/30 border border-white/20 p-3 rounded-lg focus:border-shiny-accent outline-none" 
                  />
                  <input 
                    type="text" name="zipCode" placeholder="Zip Code" required 
                    value={formData.zipCode} onChange={handleInputChange}
                    className="bg-black/30 border border-white/20 p-3 rounded-lg focus:border-shiny-accent outline-none" 
                  />
                </div>
              </div>
            </div>

            <div className="bg-shiny-dark p-6 rounded-xl border border-white/5">
              <h2 className="text-xl font-bold mb-4">Payment</h2>
              <div className="space-y-4">
                <div className="relative">
                  <CreditCard className="absolute top-3.5 left-3 text-gray-400 w-5 h-5" />
                  <input 
                    type="text" name="cardNumber" placeholder="Card Number" required 
                    value={formData.cardNumber} onChange={handleInputChange}
                    className="w-full pl-10 bg-black/30 border border-white/20 p-3 rounded-lg focus:border-shiny-accent outline-none" 
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    type="text" name="expiry" placeholder="MM/YY" required 
                    value={formData.expiry} onChange={handleInputChange}
                    className="bg-black/30 border border-white/20 p-3 rounded-lg focus:border-shiny-accent outline-none" 
                  />
                  <input 
                    type="text" name="cvc" placeholder="CVC" required 
                    value={formData.cvc} onChange={handleInputChange}
                    className="bg-black/30 border border-white/20 p-3 rounded-lg focus:border-shiny-accent outline-none" 
                  />
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-shiny-accent text-black font-bold py-4 rounded-xl hover:bg-white transition-colors flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : `PAY $${total.toFixed(2)}`}
            </button>
          </form>

          {/* Order Summary */}
          <div className="bg-shiny-dark p-6 rounded-xl border border-white/5 h-fit">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-4 mb-6">
              {cart.map(item => (
                <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4">
                  <img src={item.imageUrl} alt="" className="w-16 h-16 rounded object-cover bg-white/5" />
                  <div className="flex-1">
                    <p className="font-bold text-sm">{item.name}</p>
                    <p className="text-xs text-gray-400">Size: {item.selectedSize} | Qty: {item.quantity}</p>
                  </div>
                  <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-white/10 pt-4 space-y-2">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-white font-bold text-xl pt-2">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;