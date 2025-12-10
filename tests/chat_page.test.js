import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import chat_page from '@/assets/pg/chat_page.vue'

// Mocks mínimos para que no falle nada
vi.mock('vue-router', () => ({
  useRouter: () => ({ push: vi.fn() })
}))

vi.mock('@/stores/gemini_api', () => ({
  preguntar: vi.fn(() => Promise.resolve('Respuesta mock')),
  sacarPromt: vi.fn(() => Promise.resolve('Prompt mock'))
}))

vi.mock('@/bbdd/bbdd', () => ({
  getPokemon: vi.fn(() => Promise.resolve(null)),
  guardarPokemon: vi.fn(() => Promise.resolve())
}))

vi.mock('@/stores/pokemonID', () => ({
  ID_pokemon: () => ({
    getID: () => 'pikachu',
    pokemon: { id: 25 },
    getComponente: () => 'mock'
  })
}))

vi.mock('@/stores/conversaciones_SAVE', () => ({
  useConversacionesStore: () => ({
    eliminarConversaciones: vi.fn(),
    añadirConversacion: vi.fn()
  })
}))

describe('chat_page.vue', () => {
  const mountComponent = () => mount(chat_page, {
    global: {
      stubs: {
        btn_return: true
      }
    }
  })

  it('se monta correctamente', () => {
    const wrapper = mountComponent()
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('.container').exists()).toBe(true)
  })

  it('toggleDarkMode cambia el estado', () => {
    const wrapper = mountComponent()
    wrapper.vm.isDarkMode = false
    wrapper.vm.toggleDarkMode()
    expect(wrapper.vm.isDarkMode).toBe(true)
  })

  it('envía mensaje del usuario', async () => {
    const wrapper = mountComponent()
    wrapper.vm.newMessage = 'Hola'
    wrapper.vm.sendMessage()
    
    await vi.waitFor(() => {
      expect(wrapper.vm.messages[0]?.user).toBe('You')
    })
  })

  it('input existe y botón send existe', () => {
    const wrapper = mountComponent()
    expect(wrapper.find('input').exists()).toBe(true)
    expect(wrapper.find('button.btn-primary').exists()).toBe(true)
  })
})
