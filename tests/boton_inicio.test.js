import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import boton_inicio from "@/components/elementos/boton_inicio.vue"

describe('boton_inicio.vue', () => {
  it('se monta correctamente con texto del prop', () => {
    const wrapper = mount(boton_inicio, {
      props: { button_text: 'HomePage' }
    })
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('.btn').text()).toBe('HomePage')
  })

  it('renderiza botón con clase btn', () => {
    const wrapper = mount(boton_inicio, {
      props: { button_text: 'Test' }
    })
    expect(wrapper.find('.btn').exists()).toBe(true)
  })

  it('pasa prop button_text al botón interno', () => {
    const wrapper = mount(boton_inicio, {
      props: { button_text: 'mis pokemons' }
    })
    expect(wrapper.find('.btn').text()).toContain('mis pokemons')
  })
})
