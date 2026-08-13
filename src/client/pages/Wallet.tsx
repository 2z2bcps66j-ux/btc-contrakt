import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Wallet() {
  const [walletAddress, setWalletAddress] = useState('')
  const [inputAddress, setInputAddress] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    fetchWalletInfo()
  }, [])

  const fetchWalletInfo = async () => {
    try {
      const { data } = await axios.get('/api/wallet/info')
      setWalletAddress(data.walletAddress || '')
    } catch (err) {
      console.error('Error fetching wallet:', err)
    }
  }

  const handleLinkWallet = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      const { data } = await axios.post('/api/wallet/link', {
        walletAddress: inputAddress,
      })
      setWalletAddress(inputAddress)
      setInputAddress('')
      setSuccess('Wallet erfolgreich verlinkt!')
    } catch (err: any) {
      setError('Fehler beim Verlinken der Wallet')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Wallet Management</h1>

      <div className="max-w-2xl">
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Aktive Wallet</h2>
          {walletAddress ? (
            <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Bitcoin Address:</p>
              <p className="text-lg font-mono break-all text-green-700">{walletAddress}</p>
            </div>
          ) : (
            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
              <p className="text-yellow-700">Keine Wallet verlinkt</p>
            </div>
          )}
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {success}
          </div>
        )}

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Neue Wallet Verlinken</h2>
          <form onSubmit={handleLinkWallet} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Bitcoin Address
              </label>
              <input
                type="text"
                value={inputAddress}
                onChange={(e) => setInputAddress(e.target.value)}
                placeholder="1A1z7agoat2CZSQVG2z5QSgvk5yfRs3mW5"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 font-mono text-sm"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? 'Verlinken...' : 'Wallet Verlinken'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Wallet
