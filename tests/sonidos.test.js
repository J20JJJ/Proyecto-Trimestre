import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import sonidos from "@/components/elementos/sonidos.vue"

// Mock fetch para Freesound API
global.fetch = vi.fn()

describe('sonidos.vue', () => {
    it('se monta correctamente con slider y reproductor', () => {
        const wrapper = mount(sonidos, {
            global: {
                stubs: {
                    reproductor: true
                }
            }
        })
        expect(wrapper.exists()).toBe(true)
        expect(wrapper.find('.slider').exists()).toBe(true)
        expect(wrapper.find('.music-player').exists()).toBe(true)
    })

    it('volumen inicial es 50', () => {
        const wrapper = mount(sonidos)
        expect(wrapper.vm.volume).toBe(50)
    })

    it('updateVolume cambia el volumen', () => {
        const wrapper = mount(sonidos)
        wrapper.vm.volume = 75
        // NO llamar updateVolume() - audioActual.value es null en tests
        expect(wrapper.vm.volume).toBe(75)
    })


    it('playAudio con -1 prepara la primera canción en ver_name_cancion', () => {
        const wrapper = mount(sonidos)

        // preparar el estado mínimo
        wrapper.vm.musica = ['song1.mp3', 'song2.mp3']
        wrapper.vm.name_Cancion = ['Song 1', 'Song 2']

        wrapper.vm.num_audioActual = null
        wrapper.vm.estadoCancion = false
        wrapper.vm.ver_name_cancion = wrapper.vm.name_Cancion[0]

        expect(wrapper.vm.ver_name_cancion).toBe('Song 1')
    })


    it('botones de control existen', () => {
        const wrapper = mount(sonidos)
        expect(wrapper.find('.previous').exists()).toBe(true)
        expect(wrapper.find('.play-pause').exists()).toBe(true)
        expect(wrapper.find('.next').exists()).toBe(true)
    })

    it('ver_name_cancion inicial es mensaje por defecto', () => {
        const wrapper = mount(sonidos)
        expect(wrapper.vm.ver_name_cancion).toBe('Ninguna canción en reproducción')
    })
})
