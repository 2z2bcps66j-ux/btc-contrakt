import React, { useEffect, useState } from 'react'
import useMiningStore from '../stores/miningStore'

function Mining() {
  const { contracts, fetchContracts, addContract, loading } = useMiningStore()
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    poolName: '',
    poolUrl: '',
    contractValue: 0,
    hashRate: 0,
  })
  const [error, setError] = useState('')

  useEffect(() => {
    fetchContracts()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      await addContract(
        formData.poolName,
        formData.poolUrl,
        formData.contractValue,
        formData.hashRate
      )
      setFormData({ poolName: '', poolUrl: '', contractValue: 0, hashRate: 0 })
      setShowForm(false)
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Mining Verträge</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {showForm ? 'Abbrechen' : 'Neuer Vertrag'}
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Pool Name"
              value={formData.poolName}
              onChange={(e) =>
                setFormData({ ...formData, poolName: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
            <input
              type="url"
              placeholder="Pool URL"
              value={formData.poolUrl}
              onChange={(e) =>
                setFormData({ ...formData, poolUrl: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
            <input
              type="number"
              placeholder="Contract Value (BTC)"
              value={formData.contractValue}
              onChange={(e) =>
                setFormData({ ...formData, contractValue: parseFloat(e.target.value) })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
              step="0.01"
            />
            <input
              type="number"
              placeholder="Hash Rate (TH/s)"
              value={formData.hashRate}
              onChange={(e) =>
                setFormData({ ...formData, hashRate: parseFloat(e.target.value) })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Vertrag Erstellen'}
            </button>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {contracts.map((contract) => (
          <div key={contract._id} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-gray-800 mb-2">{contract.poolName}</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>
                <span className="font-semibold">URL:</span> {contract.poolUrl}
              </p>
              <p>
                <span className="font-semibold">Value:</span> {contract.contractValue} BTC
              </p>
              <p>
                <span className="font-semibold">Hash Rate:</span> {contract.hashRate} TH/s
              </p>
              <p>
                <span className="font-semibold">Status:</span>
                <span
                  className={`ml-2 px-2 py-1 rounded text-xs font-semibold ${
                    contract.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {contract.status}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Mining
