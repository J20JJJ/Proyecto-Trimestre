import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest'
import HomePage from "@/assets/pg/HomePage.vue"

const flushPromises = () => new Promise(setImmediate)

describe('HomePage.vue', () => {
    let wrapper

    beforeEach(() => {
        // Resetea fetch antes de cada test para aislarlos
        global.fetch = vi.fn()
        wrapper = mount(HomePage, {
            global: {
                stubs: {
                    mainNewComponent: true,
                    boton_cargarMas: true,
                    'router-link': true
                }
            }
        })
    })

    afterEach(() => {
        // Desmonta para evitar que onMounted() siga corriendo asincronamente
        wrapper.unmount()
        vi.restoreAllMocks()
    })

    it('se monta correctamente con buscador', async () => {
        await flushPromises()
        expect(wrapper.exists()).toBe(true)
        expect(wrapper.find('.search-input').exists()).toBe(true)
    })

    it('query inicial está vacío', async () => {
        await flushPromises()
        expect(wrapper.vm.query).toBe('')
    })

    it('cargarMasPokemons añade pokemons a las listas', async () => {
        // Preparamos un mock de fetch consistente
        global.fetch = vi.fn()
            // Primera llamada: lista general
            .mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve({
                    results: [
                        { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25' },
                        { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4' }
                    ]
                })
            })
            // Segunda llamada: detalle de Pikachu
            .mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve({
                    sprites: { front_default: '25.png' },
                    name: 'pikachu',
                    id: 25
                })
            })
            // Tercera llamada: detalle de Charmander
            .mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve({
                    sprites: { front_default: '4.png' },
                    name: 'charmander',
                    id: 4
                })
            })

        const wrapper = mount(HomePage, {
            global: {
                stubs: {
                    mainNewComponent: true,
                    boton_cargarMas: true,
                    'router-link': true
                }
            }
        })

        // Espera a que onMounted cargue las promesas
        await flushPromises()

        // Ejecuta de nuevo cargarMasPokemons manualmente
        await wrapper.vm.cargarMasPokemons()
        await flushPromises()

        // Verificamos que sí se agregaron pokemons
        expect(wrapper.vm.pokemonName).toContain('pikachu')
        expect(wrapper.vm.pokemonName).toContain('charmander')
        expect(wrapper.vm.pokemonImg).toContain('4.png')
        expect(wrapper.vm.pokemonID).toContain(25)
    })


    it('filtrarPokemons filtra por nombre', async () => {
        await flushPromises()
        wrapper.vm.pokemonName = ['pikachu', 'charmander', 'bulbasaur']
        wrapper.vm.pokemonImg = ['25.png', '4.png', '1.png']
        wrapper.vm.pokemonID = [25, 4, 1]

        wrapper.vm.query = 'pika'
        wrapper.vm.filtrarPokemons()

        expect(wrapper.vm.pokemonsFiltradosName[0]).toBe('pikachu')
        expect(wrapper.vm.pokemonsFiltradosName.length).toBe(1)
    })

    it('filtrarPokemons filtra por ID', async () => {
        await flushPromises()
        wrapper.vm.pokemonName = ['pikachu', 'charmander']
        wrapper.vm.pokemonID = [25, 4]

        wrapper.vm.query = '25'
        wrapper.vm.filtrarPokemons()

        expect(wrapper.vm.pokemonsFiltradosID[0]).toBe(25)
    })
})
