import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, Leaf, User, LogOut } from 'lucide-react'

export default function Dashboard() {
  const [userEmail, setUserEmail] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    const email = localStorage.getItem('userEmail')
    
    if (!token || !email) {
      navigate('/login')
      return
    }
    
    setUserEmail(email)
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userEmail')
    navigate('/')
  }

  const getUserInitial = () => {
    return userEmail ? userEmail.charAt(0).toUpperCase() : 'U'
  }

  const products = [
    {
      id: 1,
      name: 'Organic Cotton T-Shirt',
      price: '₹2,499',
      image: '/img_assets/Tshirt.jpg',
      description: 'Sustainable and comfortable',
    },
    {
      id: 2,
      name: 'Bamboo Toothbrush Set',
      price: '₹999',
      image: '/img_assets/bambbrush.jpg',
      description: 'Eco-friendly dental care',
    },
    {
      id: 3,
      name: 'Reusable Water Bottle',
      price: '₹3,299',
      image: '/img_assets/bottle.jpg',
      description: 'Stainless steel construction',
    },
    {
      id: 4,
      name: 'Bamboo Cutting Board',
      price: '₹1,999',
      image: '/img_assets/cuttinboard.jpg',
      description: 'Perfect for your kitchen',
    },
  ]

  return (
    <div className="min-h-screen bg-linear-to-b from-green-50 to-white">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 text-2xl font-bold text-green-600">
            <Leaf size={32} />
            EcoBazaar
          </div>
          
          {/* User Profile Section */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-3 px-4 py-2 bg-green-50 rounded-lg hover:bg-green-100 transition"
            >
              <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                {getUserInitial()}
              </div>
              <span className="text-gray-700 font-medium">{userEmail}</span>
            </button>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 border border-gray-200">
                <Link
                  to="/profile"
                  className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-green-50 transition"
                  onClick={() => setShowDropdown(false)}
                >
                  <User size={18} />
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 transition w-full text-left"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
          Featured Products
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden"
            >
              <div className="h-48 overflow-hidden bg-gray-100">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {product.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-green-600">
                    {product.price}
                  </span>
                  <button className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition">
                    <ShoppingCart size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
            Why Choose EcoBazaar?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Eco-Friendly
              </h3>
              <p className="text-gray-600">
                All products are sustainably sourced and environmentally responsible
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Quality Assured
              </h3>
              <p className="text-gray-600">
                We guarantee the highest quality for every product
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="text-4xl mb-4">🚚</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Fast Shipping
              </h3>
              <p className="text-gray-600">
                Quick and reliable delivery to your doorstep
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>&copy; 2026 EcoBazaar. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
