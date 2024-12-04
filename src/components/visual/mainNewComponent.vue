<template>
    <div class="fondo_main">
        
        <div id="sticky-button" >
            <router-link :to="'/'" v-if="!bool_HomePage" v-on:click="guardarPosicion">
                <boton_inicio button_text="HomePage" id="sticky-boton" />
            </router-link>
    
            <router-link :to="{ name: 'gacha' }" v-if="!bool_gacha" v-on:click="guardarPosicion">
                <boton_inicio button_text="gacha" id="sticky-boton" />
            </router-link>
    
            <router-link :to="{ name: 'mis-pokemons' }" v-if="!bool_mis_pokemons" v-on:click="guardarPosicion">
                <boton_inicio button_text="mis pokemons" id="sticky-boton"/>
            </router-link>
        </div>
        
        <volver_arriba id="volves_arriba" v-on:click="volverArriba()" v-if="scrollPosicion > 800"/>

        <div class="caja_pokemon">
            <div v-for="(pokemon, index) in pokemonImg" :key="pokemonID[index]" class="pokemon"
                :class="getClase(pokemonID[index])" @click="$emit('toggle', pokemonID[index])">
                <router-link :to="{ name: 'pokedex', params: { id: `${props.componente_actual}-${pokemonID[index]}` } }"
                    v-on:click="guardarPosicion">
                    <img :src="pokemon" :alt="pokemonName[index]">
                    <p>{{ pokemonName[index] }}</p>
                    <p>{{ pokemonID[index] }}</p>
                </router-link>


            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, defineProps, onMounted, onBeforeUnmount } from 'vue';
import volver_arriba from '../elementos/volver_arriba.vue';
import boton_cargarMas from "@/components/elementos/boton_cargarMas.vue";
import boton_inicio from "@/components/elementos/boton_inicio.vue";
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

const scrollPosicion = ref(0);

const guardarPosicion = () => {
    scrollPosicion.value = window.scrollY; // Guardamos la posición actual del scroll
    localStorage.setItem('posicionScroll', scrollPosicion.value); // Guardamos la posición en localStorage
    console.log('Posición guardada:', scrollPosicion.value);
};

const cargarPosicion = () => {

    setTimeout(() => {
        const posicionGuardada = localStorage.getItem('posicionScroll');
        if (posicionGuardada) {
            scrollPosicion.value = parseInt(posicionGuardada); // Recuperamos la posición del scroll desde localStorage
            window.scrollTo(0, scrollPosicion.value); // Desplazamos la página a la posición guardada
            console.log('Posición cargada:', scrollPosicion.value);
        } else {
            console.log('No hay posición guardada');
        }
    }, 2000);

};

const manejarScroll = () => {
    guardarPosicion(); // Llamamos a guardarPosicion cada vez que el usuario hace scroll
};

onMounted(() => {
    cargarPosicion(); // Cargar la posición guardada en el localStorage cuando se monte el componente
    window.addEventListener('scroll', manejarScroll);
});

onBeforeUnmount(() => {
    window.removeEventListener('scroll', manejarScroll); // Eliminar el evento cuando el componente se destruya
});

const volverArriba = () =>{
    window.scrollTo(0, 0);
};
</script>

<style scoped>
.fondo_main {
  /* height: 82vh; */
  /* background: linear-gradient(135deg, #00bcd4, #2196f3, #003366); */
}

.volver_arriba{
    width: 20%;
    transform: translatey(55%);
}
</style>
