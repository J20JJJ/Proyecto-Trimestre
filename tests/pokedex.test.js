import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import Pokedex from '@/components/pokedex.vue';

// ========== MOCK GLOBAL DE FETCH ==============
global.fetch = vi.fn((url) => {
  // /pokemon/:id
  if (url.includes('pokemon/') && !url.includes('pokemon-species')) {
    return Promise.resolve({
      json: () =>
        Promise.resolve({
          sprites: {
            back_default: 'x',
            back_female: 'x',
            back_shiny: 'x',
            back_shiny_female: 'x',
            front_default: 'x',
            front_female: 'x',
            front_shiny: 'x',
            front_shiny_female: 'x',
          },
          id: 1,
          name: 'pikachu',
          types: [],
          moves: []
        })
    });
  }

  // /pokemon-species/:id
  if (url.includes('pokemon-species')) {
    return Promise.resolve({
      json: () =>
        Promise.resolve({
          evolution_chain: {
            url: 'https://pokeapi.co/api/v2/evolution-chain/1'
          },
          flavor_text_entries: [
            { flavor_text: "Descripción falsa." }
          ]
        })
    });
  }

  // /evolution-chain/:id
  if (url.includes('evolution-chain')) {
    return Promise.resolve({
      json: () =>
        Promise.resolve({
          chain: {
            species: { name: 'pikachu', url: 'fake-url' },
            evolves_to: []
          }
        })
    });
  }

  // valor por defecto
  return Promise.resolve({
    json: () => Promise.resolve({})
  });
});

// ========== MOCK ROUTER-LINK + ROUTER =============
vi.mock('vue-router', () => ({
  RouterLink: { template: '<a><slot /></a>' },
  useRouter: () => ({ push: vi.fn() }),
  useRoute: () => ({ params: { id: 'HomePage-1' } }),
}));

// ========== MOCK PINIA =============
vi.mock('@/stores/pokemonID', () => ({
  ID_pokemon: () => ({
    guardarPokemon: vi.fn()
  })
}));

// ========== MOCK COMPONENTES HIJOS =============
vi.mock('@/components/elementos/chat_btn.vue', () => ({
  default: { template: '<button class="mock-chat-btn"></button>' }
}));

vi.mock('@/components/elementos/sus.vue', () => ({
  default: { template: '<div class="mock-sus"></div>' }
}));

// =================================================
// ===============   TEST SUITE   ==================
// =================================================

describe('Pokedex.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Pokedex, {
      props: { id: 1 }
    });

    // imágenes fake para no depender de la API
    wrapper.vm.pokemonImg = [
      'front_default',
      'front_female',
      'front_shiny',
      'front_shiny_female',
      'back_default',
      'back_female',
      'back_shiny',
      'back_shiny_female'
    ];
  });

  // ---------- TEST 1: rotateImage ---------------
  it('rotateImage cambia correctamente el índice', () => {
    const vm = wrapper.vm;

    expect(vm.currentImageIndex).toBe(0);

    vm.rotateImage();
    expect(vm.currentImageIndex).toBe(4);

    vm.rotateImage();
    expect(vm.currentImageIndex).toBe(0);
  });
});
