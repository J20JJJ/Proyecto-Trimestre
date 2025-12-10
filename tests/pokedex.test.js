import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import pokedex from '@/components/pokedex.vue'

// ✅ Mock SUS.vue corregido: acepta String Y Object
vi.mock('@/components/elementos/sus.vue', () => ({
  default: {
    name: 'Sus',
    props: {
      imgBTN: {
        type: String,
        default: ''
      },
      style: {
        type: [String, Object],  // ✅ FIX: acepta ambos tipos
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

// ✅ Fetch mock POR URL (NO por contador) - FIX principal
global.fetch = vi.fn((url) => {
  console.log('🔍 Mock fetch llamado para:', url) // Debug opcional
  
  // Primera llamada: pokemon/1 (sprites, types, etc)
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
  
  // Segunda llamada: pokemon-species/25
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
  
  // Tercera llamada: evolution-chain/10
  if (url.includes('/evolution-chain/')) {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ 
        chain: { species: { name: 'pikachu' } } 
      })
    })
  }
  
  // Fallback para cualquier otra llamada
  return Promise.resolve({
    ok: true,
    json: () => Promise.resolve({})
  })
})

describe('pokedex.vue', () => {
  const mountComponent = () => mount(pokedex, {
    props: { id: 1 },
    global: {
      stubs: {
        'router-link': { template: '<a><slot /></a>' },
        Chat_btn: { template: '<button class="S-Chat_btn" />' }
      }
    }
  })

  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('se monta y muestra el contenedor principal', () => {
    const wrapper = mountComponent()
    expect(wrapper.find('.pokedex').exists()).toBe(true)
  })

  it('rotateImage cambia el índice de 0 a 4 correctamente', () => {
    const wrapper = mountComponent()
    wrapper.vm.currentImageIndex = 0
    wrapper.vm.rotateImage()
    expect(wrapper.vm.currentImageIndex).toBe(4)
  })

  it('rotateImage cambia de 4 a 0 correctamente', () => {
    const wrapper = mountComponent()
    wrapper.vm.currentImageIndex = 4
    wrapper.vm.rotateImage()
    expect(wrapper.vm.currentImageIndex).toBe(0)
  })

  it('changeToShiny cambia de normal (0) a shiny (2)', () => {
    const wrapper = mountComponent()
    wrapper.vm.currentImageIndex = 0
    wrapper.vm.changeToShiny()
    expect(wrapper.vm.currentImageIndex).toBe(2)
  })

  it('changeToShiny cambia de shiny (2) a normal (0)', () => {
    const wrapper = mountComponent()
    wrapper.vm.currentImageIndex = 2
    wrapper.vm.changeToShiny()
    expect(wrapper.vm.currentImageIndex).toBe(0)
  })

  it('changeToGender cambia de 0 a 1 si pokemonImg[1] existe', () => {
    const wrapper = mountComponent()
    wrapper.vm.pokemonImg = ['img0', 'img1', 'img2']
    wrapper.vm.currentImageIndex = 0
    wrapper.vm.changeToGender()
    expect(wrapper.vm.currentImageIndex).toBe(1)
  })

  it('changeToGender NO cambia si pokemonImg[1] está vacío', () => {
    const wrapper = mountComponent()
    wrapper.vm.pokemonImg = ['img0', '', 'img2']
    const initialIndex = wrapper.vm.currentImageIndex
    wrapper.vm.changeToGender()
    expect(wrapper.vm.currentImageIndex).toBe(initialIndex)
  })

  it('el botón de rotación existe y llama a rotateImage al hacer clic', async () => {
    const wrapper = mountComponent()
    await wrapper.find('.sprite-controls-rotate').trigger('click')
    expect(wrapper.vm.currentImageIndex).toBe(4)
  })

  it('el botón shiny existe y llama a changeToShiny al hacer clic', async () => {
    const wrapper = mountComponent()
    await wrapper.find('.sprite-controls-shiny').trigger('click')
    expect(wrapper.vm.currentImageIndex).toBe(2)
  })

  it('el botón de género existe y llama a changeToGender al hacer clic', async () => {
    const wrapper = mountComponent()
    wrapper.vm.pokemonImg = ['img0', 'img1', 'img2']
    await wrapper.find('.sprite-controls-gender').trigger('click')
    expect(wrapper.vm.currentImageIndex).toBe(1)
  })

  it('Chat_btn existe', async () => {
    const wrapper = mountComponent()
    expect(wrapper.find('.S-Chat_btn').exists()).toBe(true)
  })
})
