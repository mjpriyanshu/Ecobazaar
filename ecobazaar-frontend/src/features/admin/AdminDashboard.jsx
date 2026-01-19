import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import ProductList from '../../features/products/ProductList';
import { getPendingProducts, getAllProducts, approveProduct, unapproveProduct } from '../../features/products/productAPI';
import { STORAGE_KEYS } from '../../utils/constants';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all', 'pending', 'approved'

  useEffect(() => {
    // Check if user is admin
    const userData = localStorage.getItem(STORAGE_KEYS.USER);
    if (!userData) {
      navigate('/login');
      return;
    }

    const parsedUser = JSON.parse(userData);
    if (parsedUser.role !== 'ADMIN') {
      navigate('/');
      return;
    }

    fetchProducts();
  }, [navigate]);

  useEffect(() => {
    // Apply filter
    if (filter === 'pending') {
      setFilteredProducts(products.filter(p => !p.approved));
    } else if (filter === 'approved') {
      setFilteredProducts(products.filter(p => p.approved));
    } else {
      setFilteredProducts(products);
    }
  }, [filter, products]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getAllProducts();
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      if (error.response?.status === 401) {
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (productId) => {
    try {
      await approveProduct(productId);
      alert('Product approved successfully!');
      fetchProducts();
    } catch (error) {
      console.error('Error approving product:', error);
      alert('Failed to approve product');
    }
  };

  const handleUnapprove = async (productId) => {
    try {
      await unapproveProduct(productId);
      alert('Product unapproved successfully!');
      fetchProducts();
    } catch (error) {
      console.error('Error unapproving product:', error);
      alert('Failed to unapprove product');
    }
  };

  const pendingCount = products.filter(p => !p.approved).length;
  const approvedCount = products.filter(p => p.approved).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage product approvals and platform content</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-4">
              <div className="text-4xl">📦</div>
              <div>
                <p className="text-gray-500 text-sm">Total Products</p>
                <p className="text-3xl font-bold text-gray-800">{products.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 cursor-pointer hover:shadow-lg transition" onClick={() => setFilter('pending')}>
            <div className="flex items-center gap-4">
              <div className="text-4xl">⏳</div>
              <div>
                <p className="text-gray-500 text-sm">Pending Approval</p>
                <p className="text-3xl font-bold text-yellow-600">{pendingCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 cursor-pointer hover:shadow-lg transition" onClick={() => setFilter('approved')}>
            <div className="flex items-center gap-4">
              <div className="text-4xl">✅</div>
              <div>
                <p className="text-gray-500 text-sm">Approved</p>
                <p className="text-3xl font-bold text-green-600">{approvedCount}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              filter === 'all'
                ? 'bg-green-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            All Products ({products.length})
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              filter === 'pending'
                ? 'bg-yellow-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Pending ({pendingCount})
          </button>
          <button
            onClick={() => setFilter('approved')}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              filter === 'approved'
                ? 'bg-green-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Approved ({approvedCount})
          </button>
        </div>

        {/* Products Grid with Approval Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-md overflow-hidden">
              {/* Product Image */}
              <div className="h-48 bg-gray-100">
                <img
                  src={product.imageUrl || 'https://via.placeholder.com/400x300?text=No+Image'}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2 text-gray-800">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{product.category}</p>
                <p className="text-xl font-bold text-green-600 mb-4">${product.price}</p>

                {/* Approval Actions */}
                {product.approved ? (
                  <button
                    onClick={() => handleUnapprove(product.id)}
                    className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-medium"
                  >
                    ✕ Unapprove
                  </button>
                ) : (
                  <button
                    onClick={() => handleApprove(product.id)}
                    className="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition font-medium"
                  >
                    ✓ Approve
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {loading && (
          <div className="flex justify-center items-center py-16">
            <div className="text-lg text-gray-500">Loading products...</div>
          </div>
        )}

        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📦</div>
            <p className="text-xl text-gray-600">No products found in this category</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
