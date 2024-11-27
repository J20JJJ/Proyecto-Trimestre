<template>
    <div class="fondo">

        <router-link :to="'/'" v-if="!bool_HomePage">
            <boton_inicio button_text="HomePage" class="sticky-button" />
        </router-link>

        <router-link :to="{ name: 'gacha' }" v-if="!bool_gacha">
            <boton_inicio button_text="gacha" class="sticky-button" />
        </router-link>

        <router-link :to="{ name: 'mis-pokemons' }" v-if="!bool_mis_pokemons">
            <boton_inicio button_text="mis pokemons" class="sticky-button" />
        </router-link>

        <div class="caja_pokemon">
            <div v-for="(pokemon, index) in pokemonImg" :key="pokemonID[index]" class="pokemon"
                :class="getClase(pokemonID[index])" @click="$emit('toggle', pokemonID[index])">
                <router-link :to="{ name: 'pokedex', params: { id: `${props.componente_actual}-${pokemonID[index]}` } }">
                    <img :src="pokemon" :alt="pokemonName[index]">
                    <p>{{ pokemonName[index] }}</p>
                    <p>{{ pokemonID[index] }}</p>
                </router-link>


            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, defineProps } from 'vue';
import boton_inicio from '../elementos/boton_inicio.vue';

const bool_HomePage = ref(false);
const bool_gacha = ref(false);
const bool_mis_pokemons = ref(false);

// Definir las props que recibe el componente
const props = defineProps({
    pokemonImg: {
        type: Array,
        required: true
    },
    pokemonName: {
        type: Array,
        required: true
    },
    pokemonID: {
        type: Array,
        required: true
    },
    componente_actual: {
        type: String,
        required: true
    },
    misPokemons: {
        type: Array,
        required: true
    }
});

console.log("componente_actual: ", props.componente_actual)
switch (props.componente_actual) {
    case "HomePage": {
        bool_HomePage.value = true;
        bool_mis_pokemons.value = false;
        bool_gacha.value = false;
        break;
    }
    case "mis-pokemons": {
        bool_HomePage.value = false;
        bool_mis_pokemons.value = true;
        bool_gacha.value = false;
        break;
    }
}

function getClase(pokemon) {
    console.log("asas: ", props.misPokemons[0])
    let bloqueado = true;
    if (props.misPokemons.includes(pokemon)) {
        bloqueado = false;
    }
    return {
        'pokemon_bloquedao': bloqueado
    }
};

</script>

<style scoped>
.sticky-button {
    position: sticky;
}
</style>
