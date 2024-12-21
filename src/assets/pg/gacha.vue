<template>
  <div class="fondo fondo_gacha">



    <div class="d-flex justify-content-center mb-4 py-2">
      <router-link :to="'/'" class="mx-2">
        <boton_inicio button_text="HomePage" />
      </router-link>
      <router-link :to="{ name: 'mis-pokemons' }" class="mx-2">
        <boton_inicio button_text="mis pokemons" />
      </router-link>
    </div>

    <!-- Button trigger modal -->
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
      Consigue Pokécoins
    </button>

    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content" style="background-color: #f65a52;">
          <div class="modal-header">
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <whosthatPokemon />
          </div>
        </div>
      </div>
    </div>

    <div class="container my-3 alola-container" :class="verRegion()">

      <!-- Contenido del contenedor -->
      <div v-if="showConfetti">
        <div v-confetti="{ particleCount: 200, force: 0.3 }" class="confetti-container-arriba"></div>
      </div>

      <div class="d-flex justify-content-center mb-4">

      </div>

      <div class="text-center mb-4">
        <div ref="animatedDiv" class="text-stroke fs-1 fw-bold text-uppercase text-shadow">
          {{ dinero }} Pokécoins
        </div>
      </div>



      <div class="text-center mb-4" v-if="!verResultado">
        <img src="../img/pokeballCarga1.gif" alt="Cargando..." class="img-fluid" />
      </div>

      <div v-if="tirarGacha" class="mb-4">
        <Splide :options="{
          width: '100%',
          perPage: 1,
          gap: 1,
          height: '100%',
          type: 'loop',
          pagination: false,
          arrows: false,
          speed: 800,
          rewind: false,
          autoplay: true,
          interval: 200,
          drag: false,
          pauseOnHover: false
        }">
          <SplideSlide v-for="i in pokemonsEscapadosIMG.length - 1" :key="i">
            <img :src="pokemonsEscapadosIMG[i]" alt="Pokémon" class="img-fluid" />
          </SplideSlide>
        </Splide>
      </div>

      <div v-if="!tirarGacha && verResultado" class="text-center">
        <div v-if="verContenido">
          <p class="h4 fw-bold text-uppercase text-primary text-shadow">{{ pokemonID }}</p>
          <img :src="pokemonImg" alt="Imagen del Pokémon" class="img-fluid mb-3" />
          <p class="h4 fw-bold text-uppercase text-primary text-shadow">{{ pokemonName }}</p>
          <p class="h6 fw-bold text-uppercase text-primary text-shadow">Probabilidad de captura: {{ capture_rate }}%</p>
        </div>

        <div class="mt-4">
          <boton_GO @click="tirar" v-if="!tirarGacha && verResultado" />
        </div>

        <!-- Texto superpuesto al fondo -->
        <div class="overlay-text"
          v-if="regiones[regionesNUM] !== 'NULL' && regionesNUM < regiones.length && regionesNUM >= 1">
          Probabilidad de {{ regiones[regionesNUM] }} incrementada
        </div>

      </div>
    </div>

  </div>
</template>


<script setup>
import { ref, onBeforeMount, onUnmounted, onMounted } from "vue";
import boton_inicio from "@/components/elementos/boton_inicio.vue";
import boton_GO from "@/components/elementos/boton_GO.vue";
import axios from "axios";
import { vConfetti } from "@neoconfetti/vue";
import Cookies from "js-cookie";
import whosthatPokemon from "@/components/elementos/whosthatPokemon.vue";

import 'bootstrap/dist/css/bootstrap.min.css'; // Importar Bootstrap solo en este componente
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const regiones = ref(['NULL', 'Alola', 'Hoenn', 'Johto', 'Kalos', 'Kanto', 'Sinnoh', 'Unova']);
const regionesNUM = ref(0);

const showConfetti = ref(false);

const tirarGacha = ref(false);

const verResultado = ref(true);

const verContenido = ref(false);

let dinero = ref(Cookies.get("dinero") ? parseInt(Cookies.get("dinero"), 10) : 200);

let pokemonImg = ref([]);
let pokemonName = ref([]);
let pokemonID = ref([]);
let capture_rate = ref([]);

let misPokemons = ref([]);

let pokemonsEscapadosIMG = ref([]);

const actualizarCookies = (idWin) => {
  if (idWin !== -1) {
    const savedPokemons = Cookies.get("misPokemons");
    if (savedPokemons) {
      misPokemons.value = JSON.parse(savedPokemons);
      misPokemons.value.push(idWin);

      if (misPokemons.value.includes(idWin)) {
        dinero.value += 20;
      }
    } else {
      misPokemons.value.push(idWin);
    }

  } else {
    let dinero1 = parseInt(Cookies.get("dinero"), 10);
    // console.log("dinero1dinero1dinero1: ", dinero1)
    if(dinero1>0){
      // console.log("dinero1dinero1dinero3: ", dinero1)
      dinero.value = dinero1;
    }
   }

  misPokemons.value = [...new Set(misPokemons.value)].sort((a, b) => a - b);
  Cookies.set("misPokemons", JSON.stringify(misPokemons.value), {
    expires: 36500,
  });

  Cookies.set("dinero", dinero.value, { expires: 36500 });

  // console.log("Cookies actualizadas");
};

function buscarLocalizaciones(pokemonId, regionBuscada) {

  regionBuscada = regionBuscada.toLowerCase();

  return new Promise((resolve, reject) => {
    // Validamos que el Pokémon ID o nombre no esté vacío
    if (!pokemonId) {
      reject("Por favor ingresa un nombre o ID de Pokémon.");
      return;
    }

    // Realizamos la solicitud a la API de PokeAPI
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/encounters`)
      .then((response) => {
        // Extraemos las localizaciones de encuentro
        const localizaciones = response.data.map(
          (encounter) => encounter.location_area.name
        );

        // Filtramos las localizaciones que contienen 'alola'
        const alolaLocations = localizaciones.filter((location) =>
          location.toLowerCase().includes(regionBuscada)
        );

        // Resolvemos la promesa con las localizaciones
        resolve(alolaLocations);
      })
      .catch((error) => {
        // En caso de error, rechazamos la promesa con el mensaje de error
        reject("Error al obtener los datos del Pokémon: " + error.message);
      });
  });
}

async function tirarRuleta() {
  showConfetti.value = false;
  verResultado.value = false;
  verContenido.value = false;

  // console.log("entra!!!");

  let pokemonsEscapados = [];

  let index;
  let porcentaje;
  let esDeLaRegion = false;

  let regionEVENTO = regiones.value[regionesNUM.value];
  // console.log("gato génesis de CryptoKitties", regionEVENTO)

  while (true) {
    index = Math.floor(Math.random() * 1025);
    // console.log("index: ", index);

    try {
      if(index < 807){

        if (regionEVENTO !== 'NULL') {
          // Esperamos la respuesta de buscarLocalizaciones
          const localizaciones = await buscarLocalizaciones(index, regionEVENTO);
  
          // Comprobamos si tiene alguna localización 'alola'
          if (localizaciones.length > 0) {
            // console.log("ALOLA");
            esDeLaRegion = true;
          } else {
            // console.log("No ALOLA");
            esDeLaRegion = false;
            pokemonsEscapados.push(index);
          }
        } else {
          esDeLaRegion = true;
        }
      }

      // Si es de la región, realizamos el cálculo del porcentaje
      if (esDeLaRegion) {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon-species/${index}/`
        );
        const data = await response.json();
        let capture_rate = data.capture_rate;

        porcentaje = (capture_rate / 255) * 100;

        // console.log("capture_rate: ", capture_rate);
        // console.log("porcentaje: ", porcentaje);

        let win = Math.random() * 100;
        // console.log("win: ", win);

        // Si el número aleatorio es menor que el porcentaje, se gana
        if (win < porcentaje) {
          // console.log("GANAS!!!");
          pokemonsEscapados.push(index);

          getPokemonEscapados(pokemonsEscapados, index);
          break;
        } else {
          pokemonsEscapados.push(index);
        }
      }
    } catch (error) {
      // console.error(error);
    }
  }

  // console.log("Sales!!!");
  let idWin = index;
  return {
    idWin,
    porcentaje,
  };
}
// ddd
async function getPokemonEscapados(pokemonsEscapados, idWin) {
  pokemonsEscapadosIMG.value = []; // Reiniciar las imágenes al empezar a cargar

  // Cargar cada imagen
  for (let i = 0; i < pokemonsEscapados.length; i++) {
    // console.log(`Cargando Pokémon con ID: ${pokemonsEscapados[i]}`);
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonsEscapados[i]}/`
    );

    if (!response.ok) {
      // console.error(`Error al cargar Pokémon con ID: ${pokemonsEscapados[i]}`);
      continue;
    }

    const data = await response.json();
    // console.log("Respuesta de la API:", data); 

    if (data.sprites && data.sprites.front_default) {
      pokemonsEscapadosIMG.value.push(data.sprites.front_default);
    } //else {
      // console.warn(`No se encontró la imagen para el Pokémon ID: ${pokemonsEscapados[i]}`);
    // }
  }

  // Verifica que se hayan agregado las imágenes
  // console.log("Imágenes cargadas: ", pokemonsEscapadosIMG.value);
  tirarGacha.value = true;

  setTimeout(() => {
    tirarGacha.value = false;
    showConfetti.value = true;
    actualizarCookies(idWin);
  }, (pokemonsEscapadosIMG.value.length) * 500);
  verResultado.value = true;
  verContenido.value = true;
}

async function getPokemonData(misPokemons) {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${misPokemons}/`
  );
  const data = await response.json();

  return {
    img: data.sprites.front_default,
    name: data.name,
    id: data.id,
  };
}
import audioFile from "../sonido/ganar-tonos.mp3";
import audioNoDinero from "../sonido/chicharra-error-incorrecto-.mp3";
async function tirar() {
  if (dinero.value < 100) {
    const audio = new Audio(audioNoDinero);
    audio.play();
    animateText();
  } else {
    dinero.value -= 100;
    const audio = new Audio(audioFile);
    audio.play();

    pokemonImg = [];
    pokemonName.value = [];
    pokemonID.value = [];
    capture_rate.value = [];
    try {
      const pokemonWin = await tirarRuleta();
      if (pokemonWin) {
        // console.log("pokemonWin.idWin: ", pokemonWin.idWin);
        const pokemonPromises = await getPokemonData(pokemonWin.idWin);

        capture_rate.value = pokemonWin.porcentaje;

        if (pokemonPromises) {
          pokemonImg = pokemonPromises.img;
          pokemonName.value = pokemonPromises.name;
          pokemonID.value = pokemonPromises.id;
        }
      }
    } catch (error) {
      // console.error("Error al cargar:", error);
    }
  }
}
const animatedDiv = ref(null); // Referencia al div que se va a animar

function animateText() {
  if (animatedDiv.value) {
    // Añade la clase animada
    animatedDiv.value.classList.add("animated-text");
    animatedDiv.value.classList.remove("text-white");
    // Quita la clase después de 2 segundos
    setTimeout(() => {
      animatedDiv.value.classList.remove("animated-text");
      animatedDiv.value.classList.add("text-white");
    }, 1000); // Duración de la animación
  }
}

function handleModalClose() {
  // alert('Cerrado');
  actualizarCookies(-1);
}

onMounted(() => {
  // Añadir el listener al evento hidden.bs.modal
  const modalElement = document.getElementById('exampleModal');
  modalElement?.addEventListener('hidden.bs.modal', handleModalClose);
});

onUnmounted(() => {
  // Limpiar el listener para evitar fugas de memoria
  const modalElement = document.getElementById('exampleModal');
  modalElement?.removeEventListener('hidden.bs.modal', handleModalClose);
});

function verRegion() {
  const eventos = Cookies.get("eventos");
  if (eventos) {
    regionesNUM.value = parseInt(Cookies.get("eventos"), 10);
    // console.log(`si hay cookie`)
  } else {
    const eventos_random = Math.floor(Math.random() * regiones.value.length);
    regionesNUM.value = eventos_random;
    
    const fin_evento_random = Math.floor(Math.random() * (31 - 15 + 1) + 15);
    // let treinta_segundos = (((1/24)/60)/60)/2;
    Cookies.set("eventos", eventos_random, { expires: fin_evento_random });
    // console.log(`no hay cookie`)
  }

  // console.log(`img-${regiones.value[regionesNUM.value]}`)

  return `img-${regiones.value[regionesNUM.value]}`

}
</script>

<style>
.img-Alola {
  background-image: url('../img/portadas_gacha/Alola.jpg');
}

.img-Galar {
  background-image: url('../img/portadas_gacha/Galar.jpg');
}

.img-Hoenn {
  background-image: url('../img/portadas_gacha/Hoenn.jpg');
}

.img-Johto {
  background-image: url('../img/portadas_gacha/Johto.jpg');
}

.img-Kalos {
  background-image: url('../img/portadas_gacha/Kalos.jpg');
}

.img-Kanto {
  background-image: url('../img/portadas_gacha/Kanto.jpg');
}

.img-Sinnoh {
  background-image: url('../img/portadas_gacha/Sinnoh.jpg');
}

.img-Unova {
  background-image: url('../img/portadas_gacha/Unova.jpg');
}

.fondo_gacha {
  height: 82vh;
  background: linear-gradient(135deg, #00bcd4, #2196f3, #003366);
}

.confetti-container-arriba {
  position: fixed;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  z-index: 9999;
}

.alola-container {
  position: relative;
  background-size: cover;
  background-position: center;
  color: white;
  padding: 20px;
  border-radius: 10px;
}

.overlay-text {
  background-color: rgba(0, 0, 0, 0.6);
  /* Fondo semitransparente */
  color: white;
  padding: 10px 20px;
  font-size: 1.5rem;
  font-weight: bold;
  border-radius: 5px;
  display: inline-block;
  /* Ajuste al tamaño del contenido */
  margin-top: 15px;
  /* Espaciado desde el botón */
  text-align: center;
}

.text-shadow {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  /* Sombra suave en el texto */
}

.fondo{

  /* height: 82vh; */
  background: linear-gradient(135deg, #00bcd4, #2196f3, #003366);
}

.text-stroke {
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;
}

@keyframes animacionTexto {
    1% {
        transform: scale(1);
        color: black;
    }

    25% {
        transform: scale(1.5);
        color: red;
    }

    50% {
        transform: scale(1.5);
        color: red;
    }

    75% {
        transform: scale(1.5);
        color: red;
        /* transform: scale(1.5) rotate(5deg); */
    }

    100% {
        transform: scale(1);
        color: black;
    }
}

.animated-text {
    font-size: 2rem;
    animation: animacionTexto 1s ease-in-out;
}

</style>