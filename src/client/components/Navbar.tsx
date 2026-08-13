import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuthStore from '../stores/authStore'

function Navbar() {
  const { logout, user } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center gap-2">
          <span className="text-yellow-400">₿</span> BTC Contrakt
        </Link>
        <div className="flex gap-6 items-center">
          <Link to="/" className="hover:text-yellow-400 transition">
            Dashboard
          </Link>
          <Link to="/mining" className="hover:text-yellow-400 transition">
            Mining
          </Link>
          <Link to="/rewards" className="hover:text-yellow-400 transition">
            Rewards
          </Link>
          <Link to="/hardware" className="hover:text-yellow-400 transition">
            Hardware
          </Link>
          <Link to="/wallet" className="hover:text-yellow-400 transition">
            Wallet
          </Link>
          <div className="border-l border-blue-400 pl-4">
            <span className="text-sm text-gray-200">{user?.username}</span>
            <button
              onClick={handleLogout}
              className="ml-4 px-3 py-1 bg-red-600 rounded hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
