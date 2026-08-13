import { create } from 'zustand'
import axios from 'axios'

interface MiningContract {
  _id: string
  poolName: string
  poolUrl: string
  contractValue: number
  hashRate: number
  status: string
  startDate: string
}

interface MiningState {
  contracts: MiningContract[]
  loading: boolean
  fetchContracts: () => Promise<void>
  addContract: (
    poolName: string,
    poolUrl: string,
    contractValue: number,
    hashRate: number
  ) => Promise<void>
}

const useMiningStore = create<MiningState>((set) => ({
  contracts: [],
  loading: false,

  fetchContracts: async () => {
    set({ loading: true })
    try {
      const { data } = await axios.get('/api/mining')
      set({ contracts: data })
    } catch (error) {
      console.error('Fehler beim Laden der Verträge:', error)
    } finally {
      set({ loading: false })
    }
  },

  addContract: async (poolName, poolUrl, contractValue, hashRate) => {
    try {
      const { data } = await axios.post('/api/mining', {
        poolName,
        poolUrl,
        contractValue,
        hashRate,
      })
      set((state) => ({ contracts: [...state.contracts, data] }))
    } catch (error) {
      throw new Error('Fehler beim Erstellen des Vertrags')
    }
  },
}))

export default useMiningStore
