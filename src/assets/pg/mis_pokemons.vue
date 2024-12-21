<template>
    <!-- Buscador -->
    <div class="search-container">
      <input
        type="text"
        class="search-input"
        v-model="query"
        placeholder="Buscar Pokémon..."
        @input="filtrarPokemons"
      />
    </div>
  
    <mainNewComponent 
      :pokemonImg="pokemonsFiltradosImg" 
      :pokemonName="pokemonsFiltradosName" 
      :pokemonID="pokemonsFiltradosID"
      componente_actual="mis-pokemons" 
      :misPokemons="misPokemons" 
    />
  </template>
  
  <script setup>
  import { ref, onBeforeMount } from 'vue';
  import mainNewComponent from '@/components/visual/mainNewComponent.vue';
  import Cookies from 'js-cookie';
  
  let pokemonImg = ref([]);
  let pokemonName = ref([]);
  let pokemonID = ref([]);
  let misPokemons = ref([]);

  let query = ref("");
  
  let pokemonsFiltradosImg = ref([]);
  let pokemonsFiltradosName = ref([]);
  let pokemonsFiltradosID = ref([]);
  
  async function getPokemonData(misPokemons) {
    let img = [];
    let name = [];
    let id = [];
    
    for (let i = 0; i < misPokemons.value.length; i++) {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${misPokemons.value[i]}/`);
      const data = await response.json();
      img = img.concat(data.sprites.front_default);
      name = name.concat(data.name);
      id = id.concat(data.id);
    }
    
    return { img, name, id };
  }
  
  onBeforeMount(async () => {
    try {
      const savedPokemons = Cookies.get('misPokemons');
  
      if (savedPokemons) {
        misPokemons.value = JSON.parse(savedPokemons);
        
        const pokemonPromises = await getPokemonData(misPokemons);
        if (pokemonPromises) {
          pokemonImg.value.push(...pokemonPromises.img);
          pokemonName.value.push(...pokemonPromises.name);
          pokemonID.value.push(...pokemonPromises.id);
        }
      }
  
      filtrarPokemons();
    } catch (error) {
      // console.error("Error al cargar:", error);
    }
  });
  
  function filtrarPokemons() {
    const queryLower = query.value.toLowerCase(); 
    pokemonsFiltradosImg.value = [];
    pokemonsFiltradosName.value = [];
    pokemonsFiltradosID.value = [];
  
    if (queryLower === "") {
      pokemonsFiltradosImg.value = pokemonImg.value;
      pokemonsFiltradosName.value = pokemonName.value;
      pokemonsFiltradosID.value = pokemonID.value;
    } else {
      for (let i = 0; i < pokemonName.value.length; i++) {
        if (
          pokemonName.value[i].toLowerCase().includes(queryLower) || 
          pokemonID.value[i].toString().includes(queryLower)
        ) {
          pokemonsFiltradosImg.value.push(pokemonImg.value[i]);
          pokemonsFiltradosName.value.push(pokemonName.value[i]);
          pokemonsFiltradosID.value.push(pokemonID.value[i]);
        }
      }
    }
  }
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
  