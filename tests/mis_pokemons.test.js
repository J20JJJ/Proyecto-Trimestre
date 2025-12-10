import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import mis_pokemons from "@/assets/pg/mis_pokemons.vue"

// Mock fetch para PokeAPI
global.fetch = vi.fn()

describe('mis_pokemons.vue', () => {
    it('se monta correctamente con buscador', () => {
        const wrapper = mount(mis_pokemons, {
            global: {
                stubs: {
                    mainNewComponent: true
                }
            }
        })
        expect(wrapper.exists()).toBe(true)
        expect(wrapper.find('.search-input').exists()).toBe(true)
    })

    it('query inicial está vacío', () => {
        const wrapper = mount(mis_pokemons)
        expect(wrapper.vm.query).toBe('')
    })

    it('carga misPokemons desde cookies en onBeforeMount', async () => {
        const wrapper = mount(mis_pokemons)

        // Simula cookies manualmente
        wrapper.vm.misPokemons = [25, 4, 1]

        // Mock getPokemonData
        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: () => Promise.resolve({ sprites: { front_default: 'img.png' }, name: 'pikachu', id: 25 })
        })

        await wrapper.vm.$nextTick()

        expect(wrapper.vm.pokemonName.length).toBe(0)
    })

    it('filtrarPokemons muestra todos cuando query está vacío', () => {
        const wrapper = mount(mis_pokemons)
        wrapper.vm.pokemonName = ['pikachu', 'charmander']
        wrapper.vm.pokemonImg = ['img1.png', 'img2.png']
        wrapper.vm.pokemonID = [25, 4]

        wrapper.vm.query = ''
        wrapper.vm.filtrarPokemons()

        expect(wrapper.vm.pokemonsFiltradosName.length).toBe(2)
    })

    it('filtrarPokemons filtra por nombre', () => {
        const wrapper = mount(mis_pokemons)
        wrapper.vm.pokemonName = ['pikachu', 'charmander', 'bulbasaur']
        wrapper.vm.pokemonImg = ['img1.png', 'img2.png', 'img3.png']
        wrapper.vm.pokemonID = [25, 4, 1]

        wrapper.vm.query = 'pika'
        wrapper.vm.filtrarPokemons()

        expect(wrapper.vm.pokemonsFiltradosName[0]).toBe('pikachu')
        expect(wrapper.vm.pokemonsFiltradosName.length).toBe(1)
    })

    it('filtrarPokemons filtra por ID', () => {
        const wrapper = mount(mis_pokemons)
        wrapper.vm.pokemonName = ['pikachu', 'charmander']
        wrapper.vm.pokemonID = [25, 4]

        wrapper.vm.query = '25'
        wrapper.vm.filtrarPokemons()

        expect(wrapper.vm.pokemonsFiltradosID[0]).toBe(25)
    })
})
