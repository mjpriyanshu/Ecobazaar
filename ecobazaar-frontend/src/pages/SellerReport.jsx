import { useState, useEffect } from 'react';
import { Download, TrendingUp, ShoppingBag, Award, Sparkles, Lightbulb, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Loader from '../components/Loader';
import MonthSelector from '../components/MonthSelector';
import { getSellerSalesReport } from '../services/reportAPI';
import { STORAGE_KEYS } from '../utils/constants';

export default function SellerReport() {
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState('');

  // Get current month in YYYY-MM format
  const getCurrentMonth = () => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  };

  useEffect(() => {
    // Check if user is seller
    const userStr = localStorage.getItem(STORAGE_KEYS.USER);
    if (!userStr) {
      navigate('/login');
      return;
    }

    const user = JSON.parse(userStr);
    if (user.role !== 'SELLER') {
      navigate('/');
      return;
    }

    // Set default month
    const currentMonth = getCurrentMonth();
    setSelectedMonth(currentMonth);
  }, [navigate]);

  useEffect(() => {
    if (selectedMonth) {
      fetchReport();
    }
  }, [selectedMonth]);

  const fetchReport = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get seller ID from localStorage
      const userStr = localStorage.getItem(STORAGE_KEYS.USER);
      const user = userStr ? JSON.parse(userStr) : null;
      const sellerId = user?.id || localStorage.getItem('userId');

      console.log('=== SELLER REPORT FRONTEND ===');
      console.log('User from storage:', user);
      console.log('Seller ID:', sellerId);
      console.log('Selected Month:', selectedMonth);

      if (!sellerId) {
        throw new Error('User not logged in. Please login again.');
      }

      console.log('Calling API:', `/api/reports/seller/${sellerId}/sales?month=${selectedMonth}`);
      const data = await getSellerSalesReport(sellerId, selectedMonth);
      
      console.log('=== API RESPONSE ===');
      console.log('Full response:', data);
      console.log('Total Orders:', data.totalOrders);
      console.log('Total Items Sold:', data.totalItemsSold);
      console.log('Total Revenue:', data.totalRevenue);
      console.log('Items Sold Count:', data.itemsSold?.length);
      console.log('==================');
      
      setReport(data);
    } catch (err) {
      console.error('Error fetching seller report:', err);
      setError(err.response?.data?.message || err.message || 'Failed to load report');
    } finally {
      setLoading(false);
    }
  };

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20">
          <Loader />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Seller Sales Report
          </h1>
          <p className="text-gray-600">
            View your sold items and revenue performance
          </p>
        </div>

        {/* Month Selector */}
        <div className="flex justify-between items-center mb-8">
          <MonthSelector
            selectedMonth={selectedMonth}
            onMonthChange={handleMonthChange}
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg mb-8">
            {error}
          </div>
        )}

        {report && (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Total Orders */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-2">
                  <ShoppingBag className="text-blue-600" size={32} />
                </div>
                <p className="text-gray-600 text-sm">Total Orders</p>
                <p className="text-3xl font-bold text-gray-800">
                  {report.totalOrders || 0}
                </p>
              </div>

              {/* Items Sold */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-2">
                  <TrendingUp className="text-purple-600" size={32} />
                </div>
                <p className="text-gray-600 text-sm">Items Sold</p>
                <p className="text-3xl font-bold text-gray-800">
                  {report.totalItemsSold || 0}
                </p>
              </div>

              {/* Revenue */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-2">
                  <DollarSign className="text-green-600" size={32} />
                </div>
                <p className="text-gray-600 text-sm">Total Revenue</p>
                <p className="text-3xl font-bold text-gray-800">
                  ₹{parseFloat(report.totalRevenue || 0).toFixed(2)}
                </p>
              </div>

              {/* Carbon Impact */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-2">
                  <Award className="text-yellow-600" size={32} />
                </div>
                <p className="text-gray-600 text-sm">Carbon Impact</p>
                <p className="text-2xl font-bold text-gray-800">
                  {parseFloat(report.totalCarbonImpact || 0).toFixed(2)} kg
                </p>
              </div>
            </div>

            {/* Items Sold Table */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-800">Items Sold This Month</h3>
              </div>
              
              {report.itemsSold && report.itemsSold.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Product Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Quantity
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Price/Unit
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Total Revenue
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Carbon Impact
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Order Date
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {report.itemsSold.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {item.productName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {item.quantitySold}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            ₹{parseFloat(item.pricePerUnit).toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                            ₹{parseFloat(item.totalRevenue).toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {parseFloat(item.totalCarbonImpact).toFixed(2)} kg
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {item.orderDate}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-12 text-center">
                  <p className="text-gray-600">No items sold this month.</p>
                </div>
              )}
            </div>
          </>
        )}

        {!loading && !report && !error && (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-600 text-lg">
              No sales data available for the selected month. Try a different month!
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}
