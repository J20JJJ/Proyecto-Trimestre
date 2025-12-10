import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach, afterEach, beforeAll, afterAll } from 'vitest'
import pokedex from '@/components/pokedex.vue'

// ✅ Mock SUS.vue - acepta String y Object
vi.mock('@/components/elementos/sus.vue', () => ({
  default: {
    name: 'Sus',
    props: {
      imgBTN: {
        type: String,
        default: ''
      },
      style: {
        type: [String, Object],  // ✅ FIX: Acepta ambos tipos
        default: ''
      }
    },
    template: '<div class="sus-mock"><slot /></div>',
    setup(props) {
      const styleString = typeof props.style === 'object' 
        ? Object.entries(props.style).map(([k, v]) => `${k}:${v}`).join(';') 
        : props.style
      return { styleString }
    }
  }
}))

// ✅ Mocks básicos
vi.mock('vue-router', () => ({
  useRoute: () => ({ params: { id: 'HomePage-1' } }),
  useRouter: () => ({ push: vi.fn() })
}))

vi.mock('@/stores/pokemonID', () => ({
  ID_pokemon: () => ({ guardarPokemon: vi.fn() })
}))

// ✅ Fetch mock COMPLETO por URL - NUNCA falla
const mockFetch = vi.fn((url) => {
  console.log('🔍 Mock fetch:', url) // Debug opcional
  
  // 1. Pokemon principal: /pokemon/1
  if (url.includes('/pokemon/') && !url.includes('species')) {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve({
        id: 25,
        name: 'pikachu',
        sprites: { 
          back_default: 'back_default.png',
          back_female: null,
          back_shiny: 'back_shiny.png',
          back_shiny_female: null,
          front_default: 'front_default.png',
          front_female: null,
          front_shiny: 'front_shiny.png',
          front_shiny_female: null,
        },
        types: [{ type: { name: 'electric' } }],
        moves: [{ move: { name: 'thunderbolt' } }],
        height: 40,
        weight: 60
      })
    })
  }
  
  // 2. Pokemon-species: /pokemon-species/25
  if (url.includes('/pokemon-species/')) {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve({
        evolution_chain: { 
          url: 'https://pokeapi.co/api/v2/evolution-chain/10/' 
        },
        flavor_text_entries: [{
          flavor_text: 'Pikachu es eléctrico.',
          language: { name: 'es' }
        }]
      })
    })
  }
  
  // 3. Evolution-chain: /evolution-chain/10
  if (url.includes('/evolution-chain/')) {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ 
        chain: { 
          species: { name: 'pikachu' },
          evolves_to: [] // ✅ Array vacío
        } 
      })
    })
  }
  
  // 4. Evoluciones adicionales: /pokemon/25
  if (url.includes('/pokemon/25')) {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve({
        id: 25,
        name: 'pikachu',
        sprites: { front_default: 'pikachu-front.png' }
      })
    })
  }
  
  // ✅ Fallback para TODO lo demás
  return Promise.resolve({
    ok: true,
    json: () => Promise.resolve({
      evolution_url: [] // ✅ Array vacío para .map() en línea 405
    })
  })
})

// ✅ Configuración global de mocks
beforeAll(() => {
  global.fetch = mockFetch
  vi.useFakeTimers() // ✅ Evita setTimeout de gacha.vue
})

afterAll(() => {
  vi.useRealTimers()
})

describe('pokedex.vue', () => {
  const mountComponent = async () => {
    const wrapper = mount(pokedex, {
      props: { id: 1 },
      global: {
        stubs: {
          'router-link': { template: '<a><slot /></a>' },
          Chat_btn: { template: '<button class="S-Chat_btn" />' },
          // ✅ Stubs defensivos
          gacha: false,
          '*': true // Stub genérico para TODO lo demás
        }
      }
    })
    
    // ✅ Espera todas las promesas y timers
    await vi.advanceTimersByTime(0)
    await vi.waitFor(() => wrapper.vm.$nextTick())
    return wrapper
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('se monta y muestra el contenedor principal', async () => {
    const wrapper = await mountComponent()
    expect(wrapper.find('.pokedex').exists()).toBe(true)
  })

  it('rotateImage cambia el índice de 0 a 4 correctamente', async () => {
    const wrapper = await mountComponent()
    wrapper.vm.currentImageIndex = 0
    wrapper.vm.rotateImage()
    expect(wrapper.vm.currentImageIndex).toBe(4)
  })

  it('rotateImage cambia de 4 a 0 correctamente', async () => {
    const wrapper = await mountComponent()
    wrapper.vm.currentImageIndex = 4
    wrapper.vm.rotateImage()
    expect(wrapper.vm.currentImageIndex).toBe(0)
  })

  it('changeToShiny cambia de normal (0) a shiny (2)', async () => {
    const wrapper = await mountComponent()
    wrapper.vm.currentImageIndex = 0
    wrapper.vm.changeToShiny()
    expect(wrapper.vm.currentImageIndex).toBe(2)
  })

  it('changeToShiny cambia de shiny (2) a normal (0)', async () => {
    const wrapper = await mountComponent()
    wrapper.vm.currentImageIndex = 2
    wrapper.vm.changeToShiny()
    expect(wrapper.vm.currentImageIndex).toBe(0)
  })

  it('changeToGender cambia de 0 a 1 si pokemonImg[1] existe', async () => {
    const wrapper = await mountComponent()
    wrapper.vm.pokemonImg = ['img0', 'img1', 'img2']
    wrapper.vm.currentImageIndex = 0
    wrapper.vm.changeToGender()
    expect(wrapper.vm.currentImageIndex).toBe(1)
  })

  it('changeToGender NO cambia si pokemonImg[1] está vacío', async () => {
    const wrapper = await mountComponent()
    wrapper.vm.pokemonImg = ['img0', '', 'img2']
    const initialIndex = wrapper.vm.currentImageIndex
    wrapper.vm.changeToGender()
    expect(wrapper.vm.currentImageIndex).toBe(initialIndex)
  })

  it('el botón de rotación existe y llama a rotateImage al hacer clic', async () => {
    const wrapper = await mountComponent()
    await wrapper.find('.sprite-controls-rotate').trigger('click')
    expect(wrapper.vm.currentImageIndex).toBe(4)
  })

  it('el botón shiny existe y llama a changeToShiny al hacer clic', async () => {
    const wrapper = await mountComponent()
    await wrapper.find('.sprite-controls-shiny').trigger('click')
    expect(wrapper.vm.currentImageIndex).toBe(2)
  })

  it('el botón de género existe y llama a changeToGender al hacer clic', async () => {
    const wrapper = await mountComponent()
    wrapper.vm.pokemonImg = ['img0', 'img1', 'img2']
    await wrapper.find('.sprite-controls-gender').trigger('click')
    expect(wrapper.vm.currentImageIndex).toBe(1)
  })

  it('Chat_btn existe', async () => {
    const wrapper = await mountComponent()
    expect(wrapper.find('.S-Chat_btn').exists()).toBe(true)
  })
})
