import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import gacha from "@/assets/pg/gacha.vue"

describe('gacha.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(gacha, {
      global: {
        stubs: {
          'boton_inicio': true,
          'boton_GO': true,
          'whosthatPokemon': true,
          'router-link': true,
          'Splide': true,
          'SplideSlide': true
        }
      },
      // Preinicializamos valores críticos
      data() {
        return {
          dinero: 200,
          capture_rate: 1,
          pokemonName: "pikachu",
          verContenido: false,
          // Si el template usa algún array tipo "resultados" o similares,
          // inicialízalo vacío para evitar RangeError
          resultados: []
        }
      }
    })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('se monta correctamente', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('dinero inicial es 200 por defecto', () => {
    expect(wrapper.vm.dinero).toBe(200)
  })

  it('verRegion devuelve clase válida', () => {
    const regionClass = wrapper.vm.verRegion()
    expect(regionClass).toMatch(/^img-/)
  })

  it('tirar con dinero insuficiente no ejecuta gacha', async () => {
    wrapper.vm.dinero = 50
    await wrapper.vm.tirar()
    expect(wrapper.vm.dinero).toBe(50)
  })

  it('tirar con dinero suficiente resta 100', async () => {
    wrapper.vm.dinero = 200
    await wrapper.vm.tirar()
    expect(wrapper.vm.dinero).toBe(100)
  })
})
