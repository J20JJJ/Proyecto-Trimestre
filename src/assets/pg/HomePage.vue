<template>
  <div>
    <!-- Buscador -->
    <div class="search-container">
      <input type="text" class="search-input" v-model="query" placeholder="Buscar Pokémon..."
        @input="filtrarPokemons" />
    </div>

    <!-- Componente principal -->
    <mainNewComponent :pokemonImg="pokemonsFiltradosImg" :pokemonName="pokemonsFiltradosName"
      :pokemonID="pokemonsFiltradosID" componente_actual="HomePage" :misPokemons="misPokemons" />
    <!-- Botón de cargar más -->
    <boton_cargarMas @click="cargarMasPokemons" v-if="botonDEcargarMas" />
  </div>
</template>

<script setup>
import { ref, onBeforeMount, onMounted, onBeforeUnmount, watch } from "vue";
import mainNewComponent from "@/components/visual/mainNewComponent.vue";
import boton_cargarMas from "@/components/elementos/boton_cargarMas.vue";
import Cookies from "js-cookie";

let pokemonImg = ref([]);
let pokemonName = ref([]);
let pokemonID = ref([]);
let misPokemons = ref([]);

const pokemonsPorPagina = 300;
let paginaActual = ref(0);
let listaCompletaPokemons = ref([]);
let botonDEcargarMas = ref(true);

let query = ref("");

let pokemonsFiltradosImg = ref([]);
let pokemonsFiltradosName = ref([]);
let pokemonsFiltradosID = ref([]);

async function getPokemonData(ind) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${ind}/`);
  const data = await response.json();
  return {
    img: data.sprites.front_default,
    name: data.name,
    id: data.id,
  };
}

onBeforeMount(async () => {
  try {
    const savedPokemons = Cookies.get("misPokemons");
    if (savedPokemons) {
      misPokemons.value = JSON.parse(savedPokemons);
      console.log("Cookies leídas");
    }

    const response = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=1025&offset=0"
    );
    const data = await response.json();
    listaCompletaPokemons.value = data.results;
    cargarMasPokemons();
  } catch (error) {
    console.error("Error al cargar:", error);
  }
});

async function cargarMasPokemons() {
  const inicio = paginaActual.value * pokemonsPorPagina;
  const fin = inicio + pokemonsPorPagina;
  const pokemonsAProcesar = listaCompletaPokemons.value.slice(inicio, fin);

  const pokemonPromises = pokemonsAProcesar.map((_, index) =>
    getPokemonData(inicio + index + 1)
  );
  const nuevosPokemons = await Promise.all(pokemonPromises);

  nuevosPokemons.forEach((pokemon) => {
    if (pokemon) {
      pokemonImg.value.push(pokemon.img);
      pokemonName.value.push(pokemon.name);
      pokemonID.value.push(pokemon.id);
    }
  });

  paginaActual.value++;
  if (
    paginaActual.value >
    listaCompletaPokemons.value.length / pokemonsPorPagina
  ) {
    botonDEcargarMas.value = false;
  }

  filtrarPokemons();
}

function filtrarPokemons() {
  const queryLower = query.value.toLowerCase();
  pokemonsFiltradosImg.value = [];
  pokemonsFiltradosName.value = [];
  pokemonsFiltradosID.value = [];

  for (let i = 0; i < pokemonName.value.length; i++) {
    if (pokemonName.value[i].toLowerCase().includes(queryLower) || (pokemonID.value[i].toString().includes(queryLower))) {
      pokemonsFiltradosImg.value.push(pokemonImg.value[i]);
      pokemonsFiltradosName.value.push(pokemonName.value[i]);
      pokemonsFiltradosID.value.push(pokemonID.value[i]);
    }
  }
}

filtrarPokemons();
</script>

<style>
.search-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
}

.search-input {
  width: 100%;
  max-width: 400px;
  padding: 10px 15px;
  font-size: 16px;
  border: 2px solid #ddd;
  border-radius: 8px;
  outline: none;
  transition: all 0.3s ease;
}

.search-input:focus {
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

.search-input::placeholder {
  color: #aaa;
  font-style: italic;
}

</style>