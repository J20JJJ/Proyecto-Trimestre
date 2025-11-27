import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import MainNewComponent from '@/components/visual/mainNewComponent.vue';

// Mock del store de Pinia
vi.mock('@/stores/pokemonID', () => ({
  ID_pokemon: () => ({
    guardarComponente: vi.fn() // spy vacío
  })
}));

describe('mainNewComponent.vue - tests híbridos', () => {
  const props = {
    pokemonImg: ['pikachu.png', 'bulbasaur.png'],
    pokemonName: ['Pikachu', 'Bulbasaur'],
    pokemonID: [25, 1],
    componente_actual: 'HomePage',
    misPokemons: [25]
  };

  it('simula click en router-link sin romper nada (router siempre OK) y ejecuta guardarPosicion', async () => {
    const wrapper = mount(MainNewComponent, {
      props,
      global: {
        stubs: {
          'router-link': {
            template: '<button @click="$emit(\'click\')"><slot /></button>'
          },
          boton_inicio: true,
          cargando: true,
          volver_arriba: true
        }
      }
    });

    const spy = vi.spyOn(wrapper.vm, 'guardarPosicion');

    window.scrollY = 200;

    const links = wrapper.findAll('button');
    for (const link of links) {
      await link.trigger('click');
    }

    expect(spy).toHaveBeenCalled();
    expect(wrapper.vm.scrollPosicion).toBe(200);
    expect(localStorage.getItem('posicionScroll')).toBe('200');
  });

  it('devuelve la clase correcta para misPokemons', () => {
    const wrapper = mount(MainNewComponent, {
      props,
      global: {
        stubs: ['router-link', 'boton_inicio', 'cargando', 'volver_arriba']
      }
    });

    const clasePikachu = wrapper.vm.getClase(25);
    const claseBulbasaur = wrapper.vm.getClase(1);

    expect(clasePikachu.pokemon_bloquedao).toBe(false);
    expect(claseBulbasaur.pokemon_bloquedao).toBe(true);
  });
});
