import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Leaf, Mail, User, Shield, ArrowLeft } from 'lucide-react'

export default function Profile() {
  const [userEmail, setUserEmail] = useState('')
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

  const getUserInitial = () => {
    return userEmail ? userEmail.charAt(0).toUpperCase() : 'U'
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-green-50 to-white">
      {/* Navigation */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/dashboard" className="flex items-center gap-2 text-2xl font-bold text-green-600">
            <Leaf size={32} />
            EcoBazaar
          </Link>
          <Link 
            to="/dashboard"
            className="flex items-center gap-2 text-gray-700 hover:text-green-600 transition"
          >
            <ArrowLeft size={20} />
            Back to Dashboard
          </Link>
        </div>
      </nav>

      {/* Profile Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Profile Header */}
          <div className="bg-linear-to-r from-green-500 to-green-600 p-8 text-white">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-white text-green-600 rounded-full flex items-center justify-center font-bold text-4xl">
                {getUserInitial()}
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-2">My Profile</h1>
                <p className="text-green-100">Manage your account information</p>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="p-8 space-y-6">
            {/* Email Section */}
            <div className="border-b border-gray-200 pb-6">
              <div className="flex items-center gap-3 mb-3">
                <Mail className="text-green-600" size={24} />
                <h2 className="text-xl font-bold text-gray-800">Email Address</h2>
              </div>
              <p className="text-gray-700 text-lg ml-9">{userEmail}</p>
            </div>

            {/* Account Type Section */}
            <div className="border-b border-gray-200 pb-6">
              <div className="flex items-center gap-3 mb-3">
                <Shield className="text-green-600" size={24} />
                <h2 className="text-xl font-bold text-gray-800">Account Type</h2>
              </div>
              <p className="text-gray-700 text-lg ml-9">Standard User</p>
            </div>

            {/* Account Status */}
            <div className="pb-6">
              <div className="flex items-center gap-3 mb-3">
                <User className="text-green-600" size={24} />
                <h2 className="text-xl font-bold text-gray-800">Account Status</h2>
              </div>
              <div className="ml-9">
                <span className="inline-block px-4 py-2 bg-green-100 text-green-800 rounded-full font-medium">
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
