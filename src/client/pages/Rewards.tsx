import React, { useEffect } from 'react'
import useRewardStore from '../stores/rewardStore'

function Rewards() {
  const { rewards, stats, fetchRewards, fetchStats, loading } = useRewardStore()

  useEffect(() => {
    fetchRewards()
    fetchStats()
  }, [])

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Rewards</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-600 font-semibold mb-2">Total Earned</h3>
          <p className="text-3xl font-bold text-blue-600">
            {(stats.totalEarned || 0).toFixed(4)} BTC
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-600 font-semibold mb-2">Total Payouts</h3>
          <p className="text-3xl font-bold text-green-600">{stats.count || 0}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-600 font-semibold mb-2">Pending</h3>
          <p className="text-3xl font-bold text-yellow-600">
            {rewards.filter((r) => r.status === 'pending').length}
          </p>
        </div>
      </div>

      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">Amount</th>
                <th className="px-6 py-3 text-left font-semibold">Currency</th>
                <th className="px-6 py-3 text-left font-semibold">Status</th>
                <th className="px-6 py-3 text-left font-semibold">Date</th>
              </tr>
            </thead>
            <tbody>
              {rewards.map((reward) => (
                <tr key={reward._id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-3 font-semibold">{reward.amount}</td>
                  <td className="px-6 py-3">{reward.currency}</td>
                  <td className="px-6 py-3">
                    <span
                      className={`px-3 py-1 rounded text-xs font-semibold ${
                        reward.status === 'distributed'
                          ? 'bg-green-100 text-green-800'
                          : reward.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {reward.status}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    {new Date(reward.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Rewards
