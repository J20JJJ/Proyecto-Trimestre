<template>
     <mainNewComponent 
      :pokemonImg="pokemonImg"
      :pokemonName="pokemonName"
      :pokemonID="pokemonID"
      componente_actual="HomePage"
      :misPokemons="misPokemons"
    />
    <button @click="loadMorePokemons" v-if="nextOffset < 1025">Cargar más</button>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import mainNewComponent from '@/components/visual/mainNewComponent.vue';

let pokemonImg = ref([]);
let pokemonName = ref([]);
let pokemonID = ref([]);
let misPokemons = ref(['1', '123', '42', '200', '133']);

async function getPokemonData(ind) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${ind}/`);
    const data = await response.json();
    return {
        img: data.sprites.front_default,
        name: data.name,
        id: data.id
    };
}

onBeforeMount(async () => {
    try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1025&offset=0");
        const data = await response.json();
        const pokemonPromises = data.results.map((_, index) => getPokemonData(index + 1));
        const pokemons = await Promise.all(pokemonPromises);

        pokemons.forEach(pokemon => {
            if (pokemon) {
                pokemonImg.value.push(pokemon.img);
                pokemonName.value.push(pokemon.name);
                pokemonID.value.push(pokemon.id);
            }
        });
    } catch (error) {
        console.error("Error al cargar:", error);
    }
});

</script>