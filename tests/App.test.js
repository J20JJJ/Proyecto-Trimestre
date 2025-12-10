import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import Cookies from 'js-cookie'
import AppLayout from '@/App.vue' // ajusta la ruta si el archivo se llama distinto

vi.mock('js-cookie', () => ({
    default: {
        get: vi.fn(),
    },
}))

describe('AppLayout (sonidos, cookies y switches)', () => {
    const mountComponent = () =>
        mount(AppLayout, {
            global: {
                stubs: {
                    titulo: { template: '<div />' },
                    sonidos: { template: '<div />', props: ['id'] },
                    'ver_galletas': { template: '<div />' },
                    switches: { template: '<button @click="$emit(\'boton-pulsado\')" />' },
                    RouterView: { template: '<div />' },
                },
            },
        })

    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('maneja correctamente el switch de sonidos y cookies, ya que se me caduco la api', async () => {
        Cookies.get.mockReturnValue(undefined)
        const wrapper = mountComponent()

        // Verificamos estado inicial de refs directamente
        expect(wrapper.vm.mostrarSonidos).toBe('sonidos')
        expect(wrapper.vm.mostrarGalletas).toBe(true)

        // Test del switch con evento
        const switchBtn = wrapper.find('.sonidos_switches button')
        await switchBtn.trigger('click')
        expect(wrapper.vm.mostrarSonidos).toBe('')

        // Segundo clic vuelve al estado inicial
        await switchBtn.trigger('click')
        expect(wrapper.vm.mostrarSonidos).toBe('sonidos')
    })


    it('oculta el componente de galletas cuando la cookie es "true"', () => {
        Cookies.get.mockReturnValue('true')

        const wrapper = mountComponent()

        expect(wrapper.findComponent({ name: 'ver_galletas' }).exists()).toBe(false)
    })

    it('al pulsar el switch alterna mostrarSonidos entre "sonidos" y ""', async () => {
        Cookies.get.mockReturnValue(undefined)
        const wrapper = mountComponent()

        // estado inicial de la ref
        expect(wrapper.vm.mostrarSonidos).toBe('sonidos')

        // el stub de switches es un botón (según cómo lo definimos)
        const switchBtn = wrapper.find('button')
        expect(switchBtn.exists()).toBe(true)

        // primer clic: debería poner mostrarSonidos = ''
        await switchBtn.trigger('click')
        expect(wrapper.vm.mostrarSonidos).toBe('')

        // segundo clic: debería volver a 'sonidos'
        await switchBtn.trigger('click')
        expect(wrapper.vm.mostrarSonidos).toBe('sonidos')
    })

})
