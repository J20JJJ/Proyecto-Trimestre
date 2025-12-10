import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import gacha from "@/assets/pg/gacha.vue"

describe('gacha.vue', () => {
    it('se monta correctamente', () => {
        const wrapper = mount(gacha, {
            global: {
                stubs: {
                    'boton_inicio': true,
                    'boton_GO': true,
                    'whosthatPokemon': true,
                    Splide: true,
                    'SplideSlide': true
                }
            }
        })
        expect(wrapper.exists()).toBe(true)
    })

    it('dinero inicial es 200 por defecto', () => {
        const wrapper = mount(gacha)
        expect(wrapper.vm.dinero).toBe(200)
    })

    it('verRegion devuelve clase válida', () => {
        const wrapper = mount(gacha)
        const regionClass = wrapper.vm.verRegion()
        expect(regionClass).toMatch(/^img-/)
    })

    it('tirar con dinero insuficiente no ejecuta gacha', async () => {
        const wrapper = mount(gacha)
        wrapper.vm.dinero = 50
        await wrapper.vm.tirar()
        expect(wrapper.vm.dinero).toBe(50)
    })

    it('tirar con dinero suficiente resta 100', async () => {
        const wrapper = mount(gacha)
        wrapper.vm.dinero = 200
        await wrapper.vm.tirar()
        expect(wrapper.vm.dinero).toBe(100)
    }, 10000)

})
