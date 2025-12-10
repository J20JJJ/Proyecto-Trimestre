import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import titulo from "@/components/elementos/titulo.vue"

describe('titulo.vue', () => {
  it('se monta correctamente con título y subtítulo', () => {
    const wrapper = mount(titulo)
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('h1').text()).toBe('Puchadex')
  })

  it('renderiza subtítulo correctamente', () => {
    const wrapper = mount(titulo)
    expect(wrapper.find('.subtitle').text()).toBe('¡Tu enciclopedia gacha de Pokémon!')
  })

  it('aplica clase puchadex-title al header', () => {
    const wrapper = mount(titulo)
    expect(wrapper.find('.puchadex-title').exists()).toBe(true)
  })

  it('estructura HTML correcta', () => {
    const wrapper = mount(titulo)
    expect(wrapper.find('header').exists()).toBe(true)
    expect(wrapper.find('h1').exists()).toBe(true)
    expect(wrapper.find('p.subtitle').exists()).toBe(true)
  })
})
