import { vi } from 'vitest'

// Mock global de fetch para evitar llamadas reales a la PokeAPI
global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({})
  })
)
