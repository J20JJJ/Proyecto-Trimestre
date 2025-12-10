import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import switches from '@/components/elementos/switches.vue'

describe('switch.vue', () => {
  it('se monta correctamente con toggle switch', () => {
    const wrapper = mount(switches)
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('.switch').exists()).toBe(true)
    expect(wrapper.find('input[type="checkbox"]').exists()).toBe(true)
  })

  it('emite evento boton-pulsado al hacer click', async () => {
    const wrapper = mount(switches)
    await wrapper.find('input').trigger('click')
    expect(wrapper.emitted('boton-pulsado')).toBeTruthy()
    expect(wrapper.emitted('boton-pulsado').length).toBe(1)
  })

  it('renderiza estructura del slider correctamente', () => {
    const wrapper = mount(switches)
    expect(wrapper.find('.slider').exists()).toBe(true)
    expect(wrapper.find('.slider-card').exists()).toBe(true)
    expect(wrapper.find('.slider-card-front').exists()).toBe(true)
    expect(wrapper.find('.slider-card-back').exists()).toBe(true)
  })

  it('checkbox cambia estado al hacer click', async () => {
    const wrapper = mount(switches)
    const checkbox = wrapper.find('input')
    expect(checkbox.element.checked).toBe(false)
    
    await checkbox.trigger('click')
    expect(checkbox.element.checked).toBe(true)
  })

  it('aplica clases CSS correctas', () => {
    const wrapper = mount(switches)
    expect(wrapper.find('.switch').classes()).toContain('switch')
    expect(wrapper.find('.slider').classes()).toContain('slider')
  })
})
