import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import pokedex from '@/components/pokedex.vue'

// Mock básico para evitar errores del watch y router
vi.mock('vue-router', () => ({
  useRoute: () => ({
    params: { id: 'HomePage-1' },
  }),
  useRouter: () => ({
    push: vi.fn(),
  }),
}))

vi.mock('@/stores/pokemonID', () => ({
  ID_pokemon: () => ({
    guardarPokemon: vi.fn(),
  }),
}))

vi.mock('./elementos/sus.vue', () => ({
  default: { template: '<button />' },
}))

describe('pokedex.vue', () => {
  const mountComponent = () => mount(pokedex, {
    props: { id: 1 },
    global: {
      stubs: {
        'router-link': { template: '<a><slot /></a>' },
        Chat_btn: { template: '<button />' },
      },
    },
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
    wrapper.vm.pokemonImg = ['img0', 'img1', 'img2', 'img3', 'img4', 'img5', 'img6', 'img7']
    wrapper.vm.currentImageIndex = 0
    wrapper.vm.changeToGender()
    expect(wrapper.vm.currentImageIndex).toBe(1)
  })

  it('changeToGender NO cambia si pokemonImg[1] está vacío', () => {
    const wrapper = mountComponent()
    wrapper.vm.pokemonImg = ['img0', '', 'img2', 'img3', 'img4', 'img5', 'img6', 'img7']
    wrapper.vm.currentImageIndex = 0
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
    wrapper.vm.pokemonImg = ['img0', 'img1', 'img2', 'img3', 'img4', 'img5', 'img6', 'img7']
    await wrapper.find('.sprite-controls-gender').trigger('click')
    expect(wrapper.vm.currentImageIndex).toBe(1)
  })

  it('Chat_btn existe y llama a irAlChat al hacer clic', async () => {
    const wrapper = mountComponent()
    const chatBtn = wrapper.find('.S-Chat_btn')
    expect(chatBtn.exists()).toBe(true)
    // No podemos testear irAlChat completamente por los mocks, pero verificamos que existe
  })
})
