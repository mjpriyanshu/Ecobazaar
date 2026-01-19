import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import ProductList from '../../features/products/ProductList';
import { getMyProducts, deleteProduct } from '../../features/products/productAPI';
import { STORAGE_KEYS } from '../../utils/constants';

const SellerDashboard = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is seller
    const userData = localStorage.getItem(STORAGE_KEYS.USER);
    if (!userData) {
      navigate('/login');
      return;
    }

    const parsedUser = JSON.parse(userData);
    if (parsedUser.role !== 'SELLER') {
      navigate('/');
      return;
    }

    setUser(parsedUser);
    fetchMyProducts();
  }, [navigate]);

  const fetchMyProducts = async () => {
    try {
      setLoading(true);
      const data = await getMyProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      if (error.response?.status === 401) {
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = () => {
    navigate('/seller/product/new');
  };

  const handleEdit = (product) => {
    navigate(`/seller/product/edit/${product.id}`);
  };

  const handleDelete = async (product) => {
    if (!window.confirm(`Are you sure you want to delete "${product.name}"?`)) {
      return;
    }

    try {
      await deleteProduct(product.id);
      alert('Product deleted successfully!');
      fetchMyProducts(); // Refresh list
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product: ' + (error.response?.data || error.message));
    }
  };

  const approvedCount = products.filter(p => p.approved).length;
  const pendingCount = products.filter(p => !p.approved).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Seller Dashboard</h1>
          <p className="text-gray-600">Manage your products and track sales</p>
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

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-4">
              <div className="text-4xl">✅</div>
              <div>
                <p className="text-gray-500 text-sm">Approved</p>
                <p className="text-3xl font-bold text-green-600">{approvedCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-4">
              <div className="text-4xl">⏳</div>
              <div>
                <p className="text-gray-500 text-sm">Pending Approval</p>
                <p className="text-3xl font-bold text-yellow-600">{pendingCount}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions Bar */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">My Products</h2>
          <button
            onClick={handleAddProduct}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold flex items-center gap-2"
          >
            <span className="text-xl">+</span>
            Add New Product
          </button>
        </div>

        {/* Products List */}
        <ProductList
          products={products}
          loading={loading}
          showActions={true}
          onEdit={handleEdit}
          onDelete={handleDelete}
          emptyMessage="You haven't added any products yet. Click 'Add New Product' to get started!"
        />
      </div>
    </div>
  );
};

export default SellerDashboard;
