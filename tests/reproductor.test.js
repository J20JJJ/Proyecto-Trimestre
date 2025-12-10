import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import reproductor from "@/components/elementos/reproductor.vue"

describe('reproductor.vue', () => {
  it('se monta correctamente con estructura del reproductor', () => {
    const wrapper = mount(reproductor)
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('#player-container').exists()).toBe(true)
    expect(wrapper.find('#player').exists()).toBe(true)
  })

  it('inicializa datos correctamente en mounted', () => {
    const wrapper = mount(reproductor)
    expect(wrapper.vm.currentIndex).toBe(1)
    expect(wrapper.vm.currentTime).toBe('00:00')
    expect(wrapper.vm.playPauseIcon).toBe('fas fa-play')
  })

  it('botones de control existen', () => {
    const wrapper = mount(reproductor)
    expect(wrapper.find('#play-previous').exists()).toBe(true)
    expect(wrapper.find('#play-pause-button').exists()).toBe(true)
    expect(wrapper.find('#play-next').exists()).toBe(true)
  })

  it('playPause cambia icono correctamente', () => {
    const wrapper = mount(reproductor)
    wrapper.vm.playPause()
    expect(wrapper.vm.playPauseIcon).toBe('fas fa-pause')
  })

  it('nextTrack incrementa currentIndex', () => {
    const wrapper = mount(reproductor)
    const initialIndex = wrapper.vm.currentIndex
    wrapper.vm.nextTrack()
    expect(wrapper.vm.currentIndex).toBeGreaterThan(initialIndex)
  })

  it('prevTrack decrementa currentIndex', () => {
    const wrapper = mount(reproductor)
    wrapper.vm.nextTrack() // Primero next para tener algo que prev
    const indexAfterNext = wrapper.vm.currentIndex
    wrapper.vm.prevTrack()
    expect(wrapper.vm.currentIndex).toBeLessThan(indexAfterNext)
  })
})
