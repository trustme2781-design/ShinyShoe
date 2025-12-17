import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { Star, Truck, ShieldCheck, ArrowLeft, MessageSquare, Loader2 } from 'lucide-react';
import { getStylingAdvice } from '../services/geminiService';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, addToCart } = useStore();
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  
  // AI Stylist State
  const [aiAdvice, setAiAdvice] = useState<string>('');
  const [isLoadingAdvice, setIsLoadingAdvice] = useState(false);
  const [showAdvice, setShowAdvice] = useState(false);

  const product = products.find(p => p.id === id);

  useEffect(() => {
    // Reset state when product changes
    setSelectedSize(null);
    setAiAdvice('');
    setShowAdvice(false);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center text-white">
        <p>Product not found.</p>
        <button onClick={() => navigate('/shop')} className="ml-4 text-shiny-accent underline">Go Back</button>
      </div>
    );
  }

  const handleAskAI = async () => {
    if (aiAdvice) {
      setShowAdvice(true);
      return;
    }
    
    setIsLoadingAdvice(true);
    setShowAdvice(true);
    const advice = await getStylingAdvice(product.name, product.description);
    setAiAdvice(advice);
    setIsLoadingAdvice(false);
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-shiny-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <button onClick={() => navigate(-1)} className="flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Image Section */}
          <div className="space-y-4">
            <div className="aspect-square bg-white/5 rounded-2xl overflow-hidden relative">
              <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
              {product.isNew && (
                <div className="absolute top-4 left-4 bg-shiny-accent text-black font-bold px-3 py-1 text-sm uppercase">
                  New Arrival
                </div>
              )}
            </div>
            <div className="grid grid-cols-4 gap-4">
               {/* Mock thumbnails */}
               {[1, 2, 3, 4].map((i) => (
                 <div key={i} className="aspect-square bg-white/5 rounded-lg overflow-hidden cursor-pointer hover:ring-2 ring-shiny-accent transition-all">
                    <img src={product.imageUrl} alt="thumbnail" className="w-full h-full object-cover opacity-80 hover:opacity-100" />
                 </div>
               ))}
            </div>
          </div>

          {/* Details Section */}
          <div className="flex flex-col">
            <h1 className="text-4xl font-display font-bold uppercase tracking-wide mb-2">{product.name}</h1>
            <div className="flex items-center gap-2 mb-6">
              <span className="text-gray-400">{product.brand}</span>
              <span className="text-gray-600">•</span>
              <div className="flex items-center text-yellow-400 text-sm">
                <Star className="w-4 h-4 fill-current" />
                <span className="ml-1 text-white">{product.rating}</span>
                <span className="ml-1 text-gray-500">({product.reviews} reviews)</span>
              </div>
            </div>

            <p className="text-3xl font-bold mb-6">${product.price.toFixed(2)}</p>

            <p className="text-gray-300 leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Size Selector */}
            <div className="mb-8">
              <div className="flex justify-between mb-2">
                <span className="font-bold text-sm">Select Size (US)</span>
                <button className="text-xs text-shiny-gray underline">Size Guide</button>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 rounded-lg border text-sm font-bold transition-all ${
                      selectedSize === size 
                        ? 'bg-white text-black border-white' 
                        : 'border-white/20 text-gray-400 hover:border-white hover:text-white'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-4 mb-8">
              <button 
                onClick={() => selectedSize && addToCart(product, selectedSize)}
                disabled={!selectedSize}
                className="w-full bg-shiny-accent text-black font-bold py-4 rounded-xl uppercase tracking-wider hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {selectedSize ? `Add to Cart - $${product.price.toFixed(2)}` : 'Select a Size'}
              </button>
            </div>

            {/* AI Stylist Feature */}
            <div className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border border-white/10 rounded-xl p-6 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-20">
                 <MessageSquare className="w-12 h-12" />
               </div>
               <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                 AI Stylist <span className="bg-gradient-to-r from-pink-500 to-violet-500 text-xs px-2 py-0.5 rounded text-white">BETA</span>
               </h3>
               <p className="text-sm text-gray-300 mb-4">Not sure how to rock these? Ask our AI for a quick outfit check.</p>
               
               {!showAdvice ? (
                 <button 
                   onClick={handleAskAI}
                   className="text-sm bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                 >
                   <MessageSquare className="w-4 h-4" /> Get Styling Tips
                 </button>
               ) : (
                 <div className="bg-black/30 p-4 rounded-lg border border-white/5 animate-fade-in">
                   {isLoadingAdvice ? (
                     <div className="flex items-center gap-2 text-sm text-gray-400">
                       <Loader2 className="w-4 h-4 animate-spin" /> Thinking...
                     </div>
                   ) : (
                     <p className="text-sm italic text-gray-200">"{aiAdvice}"</p>
                   )}
                 </div>
               )}
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-white/10">
              <div className="flex items-center gap-3">
                <Truck className="w-6 h-6 text-shiny-gray" />
                <div className="text-sm">
                  <p className="font-bold">Free Shipping</p>
                  <p className="text-gray-500">On orders over $150</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-shiny-gray" />
                <div className="text-sm">
                  <p className="font-bold">Authenticity Guaranteed</p>
                  <p className="text-gray-500">Verified by experts</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;