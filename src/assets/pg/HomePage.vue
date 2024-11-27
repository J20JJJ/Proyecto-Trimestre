<template>
    <mainNewComponent 
      :pokemonImg="pokemonImg"
      :pokemonName="pokemonName"
      :pokemonID="pokemonID"
      componente_actual="HomePage"
      :misPokemons="misPokemons"
    />
    <boton_cargarMas @click="cargarMasPokemons" v-if="botonDEcargarMas"/>

  </template>
  
  <script setup>
  import { ref, onBeforeMount } from 'vue';
  import mainNewComponent from '@/components/visual/mainNewComponent.vue';
  import boton_cargarMas from '@/components/elementos/boton_cargarMas.vue';
  import Cookies from 'js-cookie';
  
  let pokemonImg = ref([]);
  let pokemonName = ref([]);
  let pokemonID = ref([]);
  let misPokemons = ref([]);
  
  const pokemonsPorPagina = 300; 
  let paginaActual = ref(0); 
  let listaCompletaPokemons = ref([]);
  let botonDEcargarMas = ref(true);
  
  // Función para cargar datos de un Pokémon individual
  async function getPokemonData(ind) {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${ind}/`);
      const data = await response.json();
      return {
          img: data.sprites.front_default,
          name: data.name,
          id: data.id
      };
  }
  
  // Cargar datos iniciales (lista completa de Pokémon)
  onBeforeMount(async () => {
      try {


        const savedPokemons = Cookies.get('misPokemons');

        if (savedPokemons) {
            misPokemons.value = JSON.parse(savedPokemons);
            console.log("Cookies leidas")
        }

          const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1025&offset=0");
          const data = await response.json();
          listaCompletaPokemons.value = data.results;
          cargarMasPokemons();
      } catch (error) {
          console.error("Error al cargar:", error);
      }
  });
  
  // Función para cargar más Pokémon
  async function cargarMasPokemons() {
      const inicio = paginaActual.value * pokemonsPorPagina;
      const fin = inicio + pokemonsPorPagina;
      const pokemonsAProcesar = listaCompletaPokemons.value.slice(inicio, fin);
  
      const pokemonPromises = pokemonsAProcesar.map((_, index) =>
          getPokemonData(inicio + index + 1)
      );
      const nuevosPokemons = await Promise.all(pokemonPromises);
  
      nuevosPokemons.forEach(pokemon => {
          if (pokemon) {
              pokemonImg.value.push(pokemon.img);
              pokemonName.value.push(pokemon.name);
              pokemonID.value.push(pokemon.id);
          }
      });
  
      paginaActual.value++; 
      console.log("paginaActual: ",paginaActual.value)
      console.log("listaCompletaPokemons: ",listaCompletaPokemons.value.length)
      console.log("paginas que faltan: ", (listaCompletaPokemons.value.length)/pokemonsPorPagina)
      if((paginaActual.value)>(listaCompletaPokemons.value.length)/pokemonsPorPagina){
        botonDEcargarMas.value = false;
      }

  }
  </script>
  