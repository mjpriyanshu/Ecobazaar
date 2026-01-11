import { Link } from 'react-router-dom'
import { ShoppingCart, Leaf } from 'lucide-react'

export default function Home() {
  const products = [
    {
      id: 1,
      name: 'Organic Cotton T-Shirt',
      price: '₹1,499',
      image: '/img_assets/Tshirt.jpg',
      description: 'Sustainable and comfortable',
    },
    {
      id: 2,
      name: 'Bamboo Toothbrush Set',
      price: '₹499',
      image: '/img_assets/bambbrush.jpg',
      description: 'Eco-friendly dental care',
    },
    {
      id: 3,
      name: 'Reusable Water Bottle',
      price: '₹899',
      image: '/img_assets/bottle.jpg',
      description: 'Stainless steel construction',
    },
    {
      id: 4,
      name: 'Bamboo Cutting Board',
      price: '₹1,199',
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
          <div className="flex gap-6">
            <Link
              to="/login"
              className="px-6 py-2 text-gray-700 hover:text-green-600 transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section 
        className="text-white py-20 bg-cover bg-no-repeat"
        style={{ backgroundImage: "url('/img_assets/main_bg.jpg')" }}
      >
        <div className="max-w-7xl mx-auto px-4 text-center py-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}>
            Welcome to EcoBazaar
          </h1>
          <p className="text-xl mb-8" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}>
            Discover sustainable products for a better tomorrow
          </p>
          <Link
            to="/signup"
            className="inline-block px-8 py-3 bg-white text-green-600 font-bold rounded-lg hover:bg-gray-100 transition shadow-lg"
          >
            Start Shopping
          </Link>
        </div>
      </section>

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
          <p>being developed as a part of Infosys Springboard internship</p>
        </div>
      </footer>
    </div>
  )
}
