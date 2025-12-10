import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import HomePage from "@/assets/pg/HomePage.vue"

// Mock fetch para evitar llamadas reales a PokeAPI
global.fetch = vi.fn()

describe('HomePage.vue', () => {
    it('se monta correctamente con buscador', () => {
        const wrapper = mount(HomePage, {
            global: {
                stubs: {
                    mainNewComponent: true,
                    boton_cargarMas: true
                }
            }
        })
        expect(wrapper.exists()).toBe(true)
        expect(wrapper.find('.search-input').exists()).toBe(true)
    })

    it('query inicial está vacío', () => {
        const wrapper = mount(HomePage)
        expect(wrapper.vm.query).toBe('')
    })

    it('cargarMasPokemons añade pokemons a las listas', async () => {
        const wrapper = mount(HomePage, {
            global: { stubs: { mainNewComponent: true, boton_cargarMas: true } }
        })

        // Poblar listaCompletaPokemons manualmente (simula onBeforeMount)
        wrapper.vm.listaCompletaPokemons = Array(10).fill({ name: 'test' })

        const initialLength = wrapper.vm.pokemonName.length

        // Mock getPokemonData (esto SÍ se usa)
        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: () => Promise.resolve({
                sprites: { front_default: '25.png' },
                name: 'pikachu',
                id: 25
            })
        })

        await wrapper.vm.cargarMasPokemons()

        expect(wrapper.vm.pokemonName.length).toBeGreaterThan(initialLength)
    })

    it('filtrarPokemons filtra por nombre', () => {
        const wrapper = mount(HomePage)
        wrapper.vm.pokemonName = ['pikachu', 'charmander', 'bulbasaur']
        wrapper.vm.pokemonImg = ['25.png', '4.png', '1.png']
        wrapper.vm.pokemonID = [25, 4, 1]

        wrapper.vm.query = 'pika'
        wrapper.vm.filtrarPokemons()

        expect(wrapper.vm.pokemonsFiltradosName[0]).toBe('pikachu')
        expect(wrapper.vm.pokemonsFiltradosName.length).toBe(1)
    })

    it('filtrarPokemons filtra por ID', () => {
        const wrapper = mount(HomePage)
        wrapper.vm.pokemonName = ['pikachu', 'charmander']
        wrapper.vm.pokemonID = [25, 4]

        wrapper.vm.query = '25'
        wrapper.vm.filtrarPokemons()

        expect(wrapper.vm.pokemonsFiltradosID[0]).toBe(25)
    })

    it('botón cargar más existe inicialmente', () => {
        const wrapper = mount(HomePage, {
            global: { stubs: { mainNewComponent: true } }
        })
        expect(wrapper.find('boton_cargarMas').exists()).toBe(false)
    })
})
