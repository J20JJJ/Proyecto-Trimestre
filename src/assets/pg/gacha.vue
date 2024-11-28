<template>
    <!-- <sonidos /> -->
    <div>
        <!-- Confetti solo se muestra si showConfetti es verdadero -->
        <div v-confetti="{ particleCount: 200, force: 0.3 }" v-if="showConfetti" />
        <div class="confetti-container-arriba" v-confetti="{ particleCount: 200, force: 0.3 }" v-if="showConfetti" />
        <div class="confetti-container-derecha" v-confetti="{ particleCount: 200, force: 0.3 }" v-if="showConfetti" />
    </div>
    <router-link :to="'/'">
        <boton_inicio button_text="HomePage" />
    </router-link>

    <router-link :to="{ name: 'mis-pokemons' }">
        <boton_inicio button_text="mis pokemons" />
    </router-link>
    <div style="
      background-color: #ffcc00;
      color: #ffffff;
      padding: 10px 20px;
      border-radius: 10px;
      font-size: 24px;
      font-weight: bold;
      text-align: center;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    ">
        <div ref="animatedDiv" class="default-text">{{ dinero }} Pokécoins</div>
    </div>

    <div class="pokemon-container">
        <img class="img_captura" src="../img/pokeballCarga.gif" v-if="!verResultado" />


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
        }" v-if="tirarGacha">
            <SplideSlide v-for="i in pokemonsEscapadosIMG.length - 1" :key="i">
                <img class="img_captura" :src="pokemonsEscapadosIMG[i]" alt="">
            </SplideSlide>
        </Splide>

        <div class="pokemon-id" v-if="!tirarGacha && verResultado">{{ pokemonID }}</div>

        <img :src="pokemonImg" alt="Imagen del Pokémon" class="pokemon-image" v-if="!tirarGacha && verResultado" />

        <div class="pokemon-details" v-if="!tirarGacha && verResultado">
            <p class="pokemon-name">{{ pokemonName }}</p>
            <p class="capture-rate">Probabilidad de captura: {{ capture_rate }}%</p>
        </div>

        <button @click="tirar" class="throw-button" v-if="!tirarGacha && verResultado">
            Tirar Pokébola
        </button>
    </div>
    <!-- <fondo_animado></fondo_animado> -->

</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import boton_inicio from "@/components/elementos/boton_inicio.vue";
import axios from "axios";
import { vConfetti } from "@neoconfetti/vue";
import Cookies from "js-cookie";

const showConfetti = ref(false);

const tirarGacha = ref(false);

const verResultado = ref(true);

let dinero = 200;

let pokemonImg = ref([]);
let pokemonName = ref([]);
let pokemonID = ref([]);
let capture_rate = ref([]);

let misPokemons = ref([]);

let pokemonsEscapadosIMG = ref([]);


const actualizarCookies = (idWin) => {
    const savedPokemons = Cookies.get("misPokemons");
    if (savedPokemons) {
        misPokemons.value = JSON.parse(savedPokemons);
        misPokemons.value.push(idWin)

        if (misPokemons.value.includes(idWin)) {
            dinero += 20;
        }
    } else {
        misPokemons.value.push(idWin)
    }



    misPokemons.value = [...new Set(misPokemons.value)].sort((a, b) => a - b);
    Cookies.set("misPokemons", JSON.stringify(misPokemons.value), { expires: 36500 });
    console.log("Cookies actualizadas")
};

function buscarLocalizaciones(pokemonId, regionBuscada) {
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

    console.log("entra!!!");

    let pokemonsEscapados = []

    let index;
    let porcentaje;
    let esDeLaRegion = false;

    let regionBuscada = "alola";

    while (true) {
        index = Math.floor(Math.random() * 1025);
        console.log("index: ", index);

        try {
            // Esperamos la respuesta de buscarLocalizaciones
            const localizaciones = await buscarLocalizaciones(index, regionBuscada);

            // Comprobamos si tiene alguna localización 'alola'
            if (localizaciones.length > 0) {
                console.log("ALOLA");
                esDeLaRegion = true;
            } else {
                console.log("No ALOLA");
                esDeLaRegion = false;
                pokemonsEscapados.push(index);
            }

            // Si es de la región, realizamos el cálculo del porcentaje
            if (esDeLaRegion) {
                const response = await fetch(
                    `https://pokeapi.co/api/v2/pokemon-species/${index}/`
                );
                const data = await response.json();
                let capture_rate = data.capture_rate;

                porcentaje = (capture_rate / 255) * 100;

                console.log("capture_rate: ", capture_rate);
                console.log("porcentaje: ", porcentaje);

                let win = Math.random() * 100;
                console.log("win: ", win);

                // Si el número aleatorio es menor que el porcentaje, se gana
                if (win < porcentaje) {
                    console.log("GANAS!!!");
                    showConfetti.value = true;
                    pokemonsEscapados.push(index);

                    getPokemonEscapados(pokemonsEscapados)
                    break;
                } else {
                    pokemonsEscapados.push(index);

                }
            }
        } catch (error) {
            console.error(error);
        }
    }

    console.log("Sales!!!");
    let idWin = index;
    actualizarCookies(idWin);
    return {
        idWin,
        porcentaje,
    };
}
// ddd
async function getPokemonEscapados(pokemonsEscapados) {
    pokemonsEscapadosIMG.value = [];  // Reiniciar las imágenes al empezar a cargar

    // Cargar cada imagen
    for (let i = 0; i < pokemonsEscapados.length; i++) {
        console.log(`Cargando Pokémon con ID: ${pokemonsEscapados[i]}`);
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonsEscapados[i]}/`);

        if (!response.ok) {
            console.error(`Error al cargar Pokémon con ID: ${pokemonsEscapados[i]}`);
            continue;
        }

        const data = await response.json();
        console.log('Respuesta de la API:', data); // Verifica la respuesta de la API

        if (data.sprites && data.sprites.front_default) {
            pokemonsEscapadosIMG.value.push(data.sprites.front_default);
        } else {
            console.warn(`No se encontró la imagen para el Pokémon ID: ${pokemonsEscapados[i]}`);
        }
    }

    // Verifica que se hayan agregado las imágenes
    console.log("Imágenes cargadas: ", pokemonsEscapadosIMG.value);
    tirarGacha.value = true;

    setTimeout(() => {
        tirarGacha.value = false; // Esto se ejecutará después de 5 segundos
    }, 10000);
    verResultado.value = true;
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
    if (dinero < 100) {
        const audio = new Audio(audioNoDinero);
        audio.play();
        animateText();
    } else {
        dinero -= 100;
        const audio = new Audio(audioFile);
        audio.play();

        pokemonImg = [];
        pokemonName.value = [];
        pokemonID.value = [];
        capture_rate.value = [];
        try {
            const pokemonWin = await tirarRuleta();
            if (pokemonWin) {
                console.log("pokemonWin.idWin: ", pokemonWin.idWin);
                const pokemonPromises = await getPokemonData(pokemonWin.idWin);

                capture_rate.value = pokemonWin.porcentaje;

                if (pokemonPromises) {
                    pokemonImg = pokemonPromises.img;
                    pokemonName.value = pokemonPromises.name;
                    pokemonID.value = pokemonPromises.id;
                }
            }
        } catch (error) {
            console.error("Error al cargar:", error);
        }
    }
}
const animatedDiv = ref(null); // Referencia al div que se va a animar

function animateText() {
    if (animatedDiv.value) {
        // Añade la clase animada
        animatedDiv.value.classList.add("animated-text");
        // Quita la clase después de 2 segundos
        setTimeout(() => {
            animatedDiv.value.classList.remove("animated-text");
        }, 1000); // Duración de la animación
    }
}
</script>

<style scoped>
.img_captura {
    width: 45vh;
    /* Ajusta el ancho */
    height: auto;
    /* Mantiene la proporción */
    margin: 10px 0;
    /* Margen superior e inferior */
}

.confetti-container-derecha {
    position: fixed;
    right: 0;
    /* top: 50%; */
    transform: translateY(-50%);
}

.confetti-container-arriba {
    position: fixed;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
}

@keyframes animacionTexto {
    22% {
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

.pokemon-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    font-family: "Arial", sans-serif;
    padding: 20px;
    background-color: #f4f4f4;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.pokemon-id {
    font-size: 1.2em;
    color: #333;
    font-weight: bold;
}

.pokemon-image {
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 8px;
    margin-top: 10px;
}

.pokemon-details {
    margin-top: 15px;
}

.pokemon-name {
    font-size: 1.5em;
    font-weight: bold;
    color: #4caf50;
}

.capture-rate {
    font-size: 1.1em;
    color: #ff5722;
}

.throw-button {
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 1.1em;
    background-color: #ffeb3b;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.throw-button:hover {
    background-color: #ffc107;
}
</style>
