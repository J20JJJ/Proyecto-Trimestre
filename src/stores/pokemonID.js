import { ref, watch } from 'vue';
import { defineStore } from 'pinia';

export const ID_pokemon = defineStore('ID_pokemon', () => {

    const pokemon = ref(
        JSON.parse(localStorage.getItem('pokemon_selected')) || null
    );

    // Guardar Pokémon
    const guardarPokemon = (data) => {
        pokemon.value = data;  // data = { id, name, img }
        localStorage.setItem('pokemon_selected', JSON.stringify(data));
    };

    // Eliminar Pokémon
    const removePokemon = () => {
        pokemon.value = null;
        localStorage.removeItem('pokemon_selected');
    };

    // Función para obtener el ID (simula lo que usa chat)
    const getID = () => {
        return pokemon.value?.name || 'unknown';
    };

    // Función para obtener un "componente" (simulación para que no tire error)
    const getComponente = () => {
        return pokemon.value || {};
    };

    watch(pokemon, (newVal) => {
        if (newVal) {
            localStorage.setItem('pokemon_selected', JSON.stringify(newVal));
        } else {
            localStorage.removeItem('pokemon_selected');
        }
    }, { deep: true });

    return { pokemon, guardarPokemon, removePokemon, getID, getComponente };
});
