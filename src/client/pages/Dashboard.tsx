import React, { useEffect } from 'react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import useRewardStore from '../stores/rewardStore'
import useMiningStore from '../stores/miningStore'
import useHardwareStore from '../stores/hardwareStore'

const mockChartData = [
  { name: 'Jan', earnings: 0.05, difficulty: 45 },
  { name: 'Feb', earnings: 0.12, difficulty: 48 },
  { name: 'Mar', earnings: 0.25, difficulty: 52 },
  { name: 'Apr', earnings: 0.18, difficulty: 55 },
  { name: 'May', earnings: 0.32, difficulty: 58 },
  { name: 'Jun', earnings: 0.41, difficulty: 60 },
]

function Dashboard() {
  const { rewards, stats, fetchRewards, fetchStats } = useRewardStore()
  const { contracts, fetchContracts } = useMiningStore()
  const { devices, fetchDevices } = useHardwareStore()

  useEffect(() => {
    fetchRewards()
    fetchStats()
    fetchContracts()
    fetchDevices()
  }, [])

  const totalEarned = stats.totalEarned || 0
  const activeContracts = contracts.filter((c) => c.status === 'active').length
  const onlineDevices = devices.filter((d) => d.status === 'online').length
  const totalHashRate = devices.reduce((sum, d) => sum + d.hashRate, 0)

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <h3 className="text-gray-600 font-semibold mb-2">Total Earned</h3>
          <p className="text-3xl font-bold text-blue-600">{totalEarned.toFixed(4)} BTC</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <h3 className="text-gray-600 font-semibold mb-2">Active Contracts</h3>
          <p className="text-3xl font-bold text-green-600">{activeContracts}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <h3 className="text-gray-600 font-semibold mb-2">Online Devices</h3>
          <p className="text-3xl font-bold text-yellow-600">{onlineDevices}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <h3 className="text-gray-600 font-semibold mb-2">Hash Rate</h3>
          <p className="text-3xl font-bold text-purple-600">{(totalHashRate / 1000).toFixed(2)} TH/s</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Earnings Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="earnings" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Difficulty Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="difficulty" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
