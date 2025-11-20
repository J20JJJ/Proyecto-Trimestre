import { ref, watch } from 'vue';
import { defineStore } from 'pinia';

export const ID_pokemon = defineStore('ID_pokemon', () => {

    const pokemon = ref(
        JSON.parse(localStorage.getItem('pokemon_selected')) || null
    );

    // ID_pokemon.js
    const guardarPokemon = (data) => {
        pokemon.value = data;  // data = { id, name, img }
        localStorage.setItem('pokemon_selected', JSON.stringify(data));
    };


    const removePokemon = () => {
        pokemon.value = null;
        localStorage.removeItem('pokemon_selected');
    };

    watch(pokemon, (newVal) => {
        if (newVal) {
            localStorage.setItem('pokemon_selected', JSON.stringify(newVal));
        } else {
            localStorage.removeItem('pokemon_selected');
        }
    }, { deep: true });

    return { pokemon, guardarPokemon, removePokemon };
});
