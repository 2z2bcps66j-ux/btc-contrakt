import { create } from 'zustand'
import axios from 'axios'

interface Reward {
  _id: string
  amount: number
  currency: string
  status: string
  createdAt: string
}

interface RewardState {
  rewards: Reward[]
  stats: any
  loading: boolean
  fetchRewards: () => Promise<void>
  fetchStats: () => Promise<void>
}

const useRewardStore = create<RewardState>((set) => ({
  rewards: [],
  stats: {},
  loading: false,

  fetchRewards: async () => {
    set({ loading: true })
    try {
      const { data } = await axios.get('/api/rewards')
      set({ rewards: data })
    } catch (error) {
      console.error('Fehler beim Laden der Rewards:', error)
    } finally {
      set({ loading: false })
    }
  },

  fetchStats: async () => {
    try {
      const { data } = await axios.get('/api/rewards/stats')
      set({ stats: data })
    } catch (error) {
      console.error('Fehler beim Laden der Statistiken:', error)
    }
  },
}))

export default useRewardStore
