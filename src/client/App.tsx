import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import useAuthStore from './stores/authStore'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Mining from './pages/Mining'
import Rewards from './pages/Rewards'
import Hardware from './pages/Hardware'
import Wallet from './pages/Wallet'
import Navbar from './components/Navbar'

function App() {
  const { isAuthenticated, initializeAuth } = useAuthStore()

  useEffect(() => {
    initializeAuth()
  }, [])

  return (
    <Router>
      {isAuthenticated && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/mining"
          element={isAuthenticated ? <Mining /> : <Navigate to="/login" />}
        />
        <Route
          path="/rewards"
          element={isAuthenticated ? <Rewards /> : <Navigate to="/login" />}
        />
        <Route
          path="/hardware"
          element={isAuthenticated ? <Hardware /> : <Navigate to="/login" />}
        />
        <Route
          path="/wallet"
          element={isAuthenticated ? <Wallet /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  )
}

export default App
