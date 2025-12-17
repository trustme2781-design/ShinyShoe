import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Plus, Trash, Package, DollarSign, Users, Sparkles, RefreshCw } from 'lucide-react';
import { generateProductDescription } from '../services/geminiService';
import { supabase } from '../services/supabaseClient';
import { Product, Order } from '../types';

const AdminDashboard: React.FC = () => {
  const { products, deleteProduct, addProduct, user } = useStore();
  const [activeTab, setActiveTab] = useState<'overview' | 'products'>('overview');
  
  // Real DB State
  const [dbOrders, setDbOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  // Product Form State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    brand: '',
    price: 0,
    category: 'men',
    sizes: [7, 8, 9, 10, 11],
    description: '',
    imageUrl: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80'
  });
  const [generatingDesc, setGeneratingDesc] = useState(false);

  // Fetch orders from Supabase
  const fetchOrders = async () => {
    setLoadingOrders(true);
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data) {
      setDbOrders(data as Order[]);
    }
    setLoadingOrders(false);
  };

  useEffect(() => {
    if (user?.isAdmin && activeTab === 'overview') {
      fetchOrders();
    }
  }, [user, activeTab]);

  if (!user?.isAdmin) {
    return <div className="pt-24 text-center text-white">Access Denied. Admin only.</div>;
  }

  // Stats
  const totalRevenue = dbOrders.reduce((acc, order) => acc + (order.total_amount || 0), 0);
  const totalOrders = dbOrders.length;
  
  // Prepare Chart Data (Mock aggregation for demo)
  const salesData = [
    { name: 'Mon', sales: 0 },
    { name: 'Tue', sales: 0 },
    { name: 'Wed', sales: 0 },
    { name: 'Thu', sales: 0 },
    { name: 'Fri', sales: 0 },
    { name: 'Sat', sales: 0 },
    { name: 'Sun', sales: 0 },
  ];

  if (totalRevenue > 0) {
     salesData[6].sales = totalRevenue * 0.4; // Today
     salesData[5].sales = totalRevenue * 0.3; // Yesterday
     salesData[4].sales = totalRevenue * 0.2;
     salesData[3].sales = totalRevenue * 0.1;
  }

  const handleGenerateDesc = async () => {
    if (!newProduct.name) return;
    setGeneratingDesc(true);
    const desc = await generateProductDescription(newProduct.name, newProduct.brand || 'sneaker');
    setNewProduct(prev => ({ ...prev, description: desc }));
    setGeneratingDesc(false);
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const product: Product = {
      id: Date.now().toString(),
      name: newProduct.name!,
      brand: newProduct.brand!,
      price: Number(newProduct.price),
      description: newProduct.description || '',
      imageUrl: newProduct.imageUrl!,
      sizes: newProduct.sizes!,
      category: newProduct.category as 'men'|'women'|'unisex',
      rating: 0,
      reviews: 0,
      isNew: true
    };
    addProduct(product);
    setIsFormOpen(false);
    // Reset form
    setNewProduct({
      name: '',
      brand: '',
      price: 0,
      category: 'men',
      sizes: [7, 8, 9, 10, 11],
      description: '',
      imageUrl: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80'
    });
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-shiny-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-display font-bold">Admin Dashboard</h1>
          {activeTab === 'overview' && (
            <button 
              onClick={fetchOrders} 
              className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
              title="Refresh Data"
            >
              <RefreshCw className={`w-5 h-5 ${loadingOrders ? 'animate-spin' : ''}`} />
            </button>
          )}
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-white/10">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`pb-4 px-2 font-bold transition-colors ${activeTab === 'overview' ? 'text-shiny-accent border-b-2 border-shiny-accent' : 'text-gray-400 hover:text-white'}`}
          >
            Overview & Orders
          </button>
          <button 
            onClick={() => setActiveTab('products')}
            className={`pb-4 px-2 font-bold transition-colors ${activeTab === 'products' ? 'text-shiny-accent border-b-2 border-shiny-accent' : 'text-gray-400 hover:text-white'}`}
          >
            Products
          </button>
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-shiny-dark p-6 rounded-xl border border-white/5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-400">Total Revenue</h3>
                  <DollarSign className="text-green-400 w-5 h-5" />
                </div>
                <p className="text-3xl font-bold">${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              </div>
              <div className="bg-shiny-dark p-6 rounded-xl border border-white/5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-400">Total Orders</h3>
                  <Package className="text-blue-400 w-5 h-5" />
                </div>
                <p className="text-3xl font-bold">{totalOrders}</p>
              </div>
              <div className="bg-shiny-dark p-6 rounded-xl border border-white/5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-400">Total Products</h3>
                  <Users className="text-purple-400 w-5 h-5" />
                </div>
                <p className="text-3xl font-bold">{products.length}</p>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-shiny-dark p-6 rounded-xl border border-white/5 h-80">
                <h3 className="font-bold mb-6">Recent Activity (Revenue)</h3>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="name" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1c1c1c', border: '1px solid #333' }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Bar dataKey="sales" fill="#CCFF00" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="bg-shiny-dark p-6 rounded-xl border border-white/5 h-80 overflow-y-auto">
                <h3 className="font-bold mb-4 sticky top-0 bg-shiny-dark py-2">Recent Orders</h3>
                {dbOrders.length === 0 ? (
                  <p className="text-gray-500 text-sm">No orders yet.</p>
                ) : (
                  <div className="space-y-4">
                    {dbOrders.map(order => (
                      <div key={order.id} className="flex justify-between items-center border-b border-white/5 pb-2">
                        <div>
                          <p className="text-sm font-bold text-white">
                            {order.first_name} {order.last_name}
                          </p>
                          <p className="text-xs text-gray-500">{new Date(order.created_at).toLocaleDateString()}</p>
                          <p className="text-xs text-shiny-gray">
                             {order.items?.length || 0} items
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-shiny-accent">${(order.total_amount || 0).toFixed(2)}</p>
                          <span className="text-[10px] uppercase bg-white/10 px-2 py-0.5 rounded text-gray-300">{order.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div>
            <div className="flex justify-end mb-6">
              <button 
                onClick={() => setIsFormOpen(true)}
                className="flex items-center gap-2 bg-shiny-accent text-black font-bold px-4 py-2 rounded-lg hover:bg-white transition-colors"
              >
                <Plus className="w-4 h-4" /> Add Product
              </button>
            </div>

            <div className="bg-shiny-dark rounded-xl border border-white/5 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-black/20 text-gray-400 text-sm">
                  <tr>
                    <th className="p-4 font-medium">Product</th>
                    <th className="p-4 font-medium">Price</th>
                    <th className="p-4 font-medium">Category</th>
                    <th className="p-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {products.map(product => (
                    <tr key={product.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img src={product.imageUrl} alt="" className="w-10 h-10 rounded object-cover" />
                          <div>
                            <div className="font-bold">{product.name}</div>
                            <div className="text-xs text-gray-400">{product.brand}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">${product.price.toFixed(2)}</td>
                      <td className="p-4 capitalize">{product.category}</td>
                      <td className="p-4 text-right">
                        <button 
                          onClick={() => deleteProduct(product.id)}
                          className="text-red-400 hover:text-red-300 p-2 hover:bg-red-400/10 rounded"
                        >
                          <Trash className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Add Product Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-shiny-dark w-full max-w-lg rounded-2xl p-6 border border-white/10 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-1">Name</label>
                <input 
                  type="text" 
                  required
                  value={newProduct.name}
                  onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                  className="w-full bg-black/30 border border-white/20 rounded-lg p-3 focus:border-shiny-accent outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold mb-1">Brand</label>
                  <input 
                    type="text" 
                    required
                    value={newProduct.brand}
                    onChange={e => setNewProduct({...newProduct, brand: e.target.value})}
                    className="w-full bg-black/30 border border-white/20 rounded-lg p-3 focus:border-shiny-accent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">Price</label>
                  <input 
                    type="number" 
                    required
                    value={newProduct.price}
                    onChange={e => setNewProduct({...newProduct, price: Number(e.target.value)})}
                    className="w-full bg-black/30 border border-white/20 rounded-lg p-3 focus:border-shiny-accent outline-none"
                  />
                </div>
              </div>
              <div>
                 <label className="block text-sm font-bold mb-1">Description</label>
                 <div className="relative">
                   <textarea 
                      value={newProduct.description}
                      onChange={e => setNewProduct({...newProduct, description: e.target.value})}
                      className="w-full bg-black/30 border border-white/20 rounded-lg p-3 h-24 focus:border-shiny-accent outline-none"
                   />
                   <button
                     type="button"
                     onClick={handleGenerateDesc}
                     disabled={generatingDesc || !newProduct.name}
                     className="absolute bottom-2 right-2 text-xs bg-shiny-accent text-black px-2 py-1 rounded font-bold flex items-center gap-1 hover:bg-white disabled:opacity-50"
                   >
                     {generatingDesc ? <Sparkles className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                     AI Generate
                   </button>
                 </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button 
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="bg-white text-black font-bold px-6 py-2 rounded-lg hover:bg-shiny-accent"
                >
                  Create Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;