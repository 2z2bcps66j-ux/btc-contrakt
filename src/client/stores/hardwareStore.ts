import { create } from 'zustand'
import axios from 'axios'

interface Hardware {
  _id: string
  name: string
  model: string
  type: string
  hashRate: number
  power: number
  temperature: number
  status: string
}

interface HardwareState {
  devices: Hardware[]
  loading: boolean
  fetchDevices: () => Promise<void>
  addDevice: (
    name: string,
    model: string,
    type: string,
    hashRate: number,
    power: number
  ) => Promise<void>
  updateDeviceStatus: (id: string, status: string, temperature: number) => Promise<void>
}

const useHardwareStore = create<HardwareState>((set) => ({
  devices: [],
  loading: false,

  fetchDevices: async () => {
    set({ loading: true })
    try {
      const { data } = await axios.get('/api/hardware')
      set({ devices: data })
    } catch (error) {
      console.error('Fehler beim Laden der Hardware:', error)
    } finally {
      set({ loading: false })
    }
  },

  addDevice: async (name, model, type, hashRate, power) => {
    try {
      const { data } = await axios.post('/api/hardware', {
        name,
        model,
        type,
        hashRate,
        power,
      })
      set((state) => ({ devices: [...state.devices, data] }))
    } catch (error) {
      throw new Error('Fehler beim Hinzufügen der Hardware')
    }
  },

  updateDeviceStatus: async (id, status, temperature) => {
    try {
      const { data } = await axios.put(`/api/hardware/${id}`, {
        status,
        temperature,
      })
      set((state) => ({
        devices: state.devices.map((d) => (d._id === id ? data : d)),
      }))
    } catch (error) {
      throw new Error('Fehler beim Aktualisieren der Hardware')
    }
  },
}))

export default useHardwareStore
