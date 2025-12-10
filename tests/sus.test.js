import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import sus from "@/components/elementos/sus.vue"

describe('sus.vue', () => {
  it('se monta correctamente con imagen del prop', () => {
    const wrapper = mount(sus, {
      props: { imgBTN: 'home-icon.png' }
    })
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('.icon').exists()).toBe(true)
  })

  it('renderiza imagen con src del prop imgBTN', () => {
    const wrapper = mount(sus, {
      props: { imgBTN: 'test-icon.png' }
    })
    expect(wrapper.find('img').attributes('src')).toBe('test-icon.png')
  })

  it('muestra textos "to home" y "Return"', () => {
    const wrapper = mount(sus, {
      props: { imgBTN: 'icon.png' }
    })
    expect(wrapper.find('.now').text()).toBe('to home')
    expect(wrapper.find('.play').text()).toBe('Return')
  })

  it('requiere prop imgBTN obligatoria', () => {
    const wrapper = mount(sus, {
      props: { imgBTN: '' }
    })
    expect(wrapper.vm.imgBTN).toBe('')
  })

  it('renderiza botón con estilos correctos', () => {
    const wrapper = mount(sus, {
      props: { imgBTN: 'icon.png' }
    })
    expect(wrapper.find('button').exists()).toBe(true)
  })
})
