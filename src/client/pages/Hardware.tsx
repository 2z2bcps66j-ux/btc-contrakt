import React, { useEffect, useState } from 'react'
import useHardwareStore from '../stores/hardwareStore'

function Hardware() {
  const { devices, fetchDevices, addDevice, updateDeviceStatus, loading } = useHardwareStore()
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    model: '',
    type: 'ASIC',
    hashRate: 0,
    power: 0,
  })
  const [error, setError] = useState('')

  useEffect(() => {
    fetchDevices()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      await addDevice(
        formData.name,
        formData.model,
        formData.type,
        formData.hashRate,
        formData.power
      )
      setFormData({ name: '', model: '', type: 'ASIC', hashRate: 0, power: 0 })
      setShowForm(false)
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Hardware Management</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {showForm ? 'Abbrechen' : 'Gerät Hinzufügen'}
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
              placeholder="Device Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
            <input
              type="text"
              placeholder="Model"
              value={formData.model}
              onChange={(e) => setFormData({ ...formData, model: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option>ASIC</option>
              <option>GPU</option>
              <option>CPU</option>
            </select>
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
            <input
              type="number"
              placeholder="Power (W)"
              value={formData.power}
              onChange={(e) =>
                setFormData({ ...formData, power: parseFloat(e.target.value) })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
            >
              {loading ? 'Adding...' : 'Gerät Hinzufügen'}
            </button>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {devices.map((device) => (
          <div key={device._id} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-gray-800 mb-2">{device.name}</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>
                <span className="font-semibold">Model:</span> {device.model}
              </p>
              <p>
                <span className="font-semibold">Type:</span> {device.type}
              </p>
              <p>
                <span className="font-semibold">Hash Rate:</span> {device.hashRate} TH/s
              </p>
              <p>
                <span className="font-semibold">Power:</span> {device.power}W
              </p>
              <p>
                <span className="font-semibold">Temp:</span> {device.temperature}°C
              </p>
              <p>
                <span className="font-semibold">Status:</span>
                <span
                  className={`ml-2 px-2 py-1 rounded text-xs font-semibold ${
                    device.status === 'online'
                      ? 'bg-green-100 text-green-800'
                      : device.status === 'offline'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {device.status}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Hardware
