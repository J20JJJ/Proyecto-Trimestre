import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import ver_galletas from "@/components/elementos/ver_galletas.vue"

// Mock sin 'marked' - prueba solo renderizado básico
vi.mock('js-cookie', () => ({
    default: {
        get: vi.fn(() => null),
        set: vi.fn()
    }
}))

describe('ver_galletas.vue', () => {
    it('se monta correctamente con banner de cookies', () => {
        const wrapper = mount(ver_galletas)
        expect(wrapper.exists()).toBe(true)
        expect(wrapper.find('.card1').exists()).toBe(true)
        expect(wrapper.find('#cookieSvg').exists()).toBe(true)
    })

    it('muestra texto de cookies correctamente', () => {
        const wrapper = mount(ver_galletas)
        expect(wrapper.find('.cookieHeading').text()).toContain('Usamos cookies')
    })

    it('botones aceptar y rechazar existen', () => {
        const wrapper = mount(ver_galletas)
        expect(wrapper.find('.acceptButton').exists()).toBe(true)
        expect(wrapper.find('.declineButton').exists()).toBe(true)
    })

    it('aceptarCookies establece cookie', () => {
        const wrapper = mount(ver_galletas, {
            global: {
                provide: {
                    Cookies: {
                        set: vi.fn()
                    }
                }
            }
        })

        wrapper.vm.aceptarCookies()
        expect(wrapper.vm.Cookies.set).toHaveBeenCalledWith('estado_co4okie', 'false', { expires: 36500 })
    })


    it('modal inicialmente cerrado', () => {
        const wrapper = mount(ver_galletas)
        expect(wrapper.find('.modal').exists()).toBe(false)
    })
})
