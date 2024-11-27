<template>
    <mainNewComponent 
    :pokemonImg="pokemonImg" 
    :pokemonName="pokemonName" 
    :pokemonID="pokemonID"
    componente_actual="mis-pokemons" 
    :misPokemons="misPokemons" />
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import mainNewComponent from '@/components/visual/mainNewComponent.vue';
import Cookies from 'js-cookie';

let pokemonImg = ref([]);
let pokemonName = ref([]);
let pokemonID = ref([]);

let misPokemons = ref([]);

async function getPokemonData(misPokemons) {
    let img = []
    let name = []
    let id = []
    for (let i = 0; i < misPokemons.value.length; i++) {
        console.log(misPokemons.value[i])
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${misPokemons.value[i]}/`);
        const data = await response.json();
        img = img.concat(data.sprites.front_default)
        name = name.concat(data.name)
        id = id.concat(data.id)
    }
    return {
        img,
        name,
        id
    };
}

onBeforeMount(async () => {
    try {

        const savedPokemons = Cookies.get('misPokemons');

        if (savedPokemons) {

            misPokemons.value = JSON.parse(savedPokemons);
            console.log("Cookies leidas")
            
            const pokemonPromises = await getPokemonData(misPokemons);
            
            if (pokemonPromises) {
                pokemonImg.value.push(...pokemonPromises.img);
                pokemonName.value.push(...pokemonPromises.name);
                pokemonID.value.push(...pokemonPromises.id);
            }

            console.log("pokemonImg: ", pokemonImg.value)

        }



    } catch (error) {
        console.error("Error al cargar:", error);
    }
});

</script>