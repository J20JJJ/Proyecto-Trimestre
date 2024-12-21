<template>
  <div :class="{ 'poke-classic': classic }" class="container">
    <!-- Pantalla de introducción -->

    <section v-if="!isPlaying && !isDone" class="poke-section">
      <h2>What type of trainer are you?</h2>
      <div class="poke-intro-trainer">
        <div class="poke-ball"></div>
        <img :class="{ active: trainerHovered === 'classic' }" class="poke-trainer-img poke-trainer-img-classic"
          src="https://raw.githubusercontent.com/tiffachoo/pokesprites/master/trainers/red-rb.png" alt="Trainer red">
        <img :class="{ active: trainerHovered === 'master' }" class="poke-trainer-img poke-trainer-img-master"
          src="https://raw.githubusercontent.com/tiffachoo/pokesprites/master/trainers/red-sm.png"
          alt="Trainer red again">
      </div>
      <button class="button11 spacer" @click="startGame(151)" @mouseover="trainerHover('classic')"
        @mouseout="trainerHover">
        Classic
      </button>
      <button class="button11" @click="startGame(0)" @mouseover="trainerHover('master')" @mouseout="trainerHover">
        Master
      </button>
    </section>


    <!-- Pantalla de juego en progreso -->

    <section v-if="isPlaying && !isDone" class="poke-section">
      <div class="header">
        <span class="question-number">{{ score * 10 }}/100 pts</span>
      </div>
      <h2>Who's that Pokémon?</h2>
      <div class="poke-question">
        <img :src="currentQuestion.image" alt="Pokémon image" class="poke-question-image"
          :style="{ backgroundColor: bgColor }">
      </div>
      <div class="poke-options">
        <button v-for="(option, index) in currentQuestion.options" :key="index" @click="checkAnswer(option)">
          {{ option.name }}
        </button>
      </div>
    </section>



    <!-- Pantalla de fin de juego -->

    <section v-if="isDone" class="poke-section">
      <h2>Game Over!</h2>
      <p>Ganas: {{ score * 10 }} Pokécoins</p>
      <button class="button11" @click="restartGame">Play Again</button>
    </section>

  </div>
</template>

<script setup>
import { ref } from 'vue';
import Cookies from "js-cookie";

// States
const classic = ref(false);
const trainerHovered = ref(null);
const isPlaying = ref(false);
const isDone = ref(false);
const score = ref(0);
const currentQuestion = ref({});
const questions = ref([]);
const currentQuestionIndex = ref(0);

const bgColor = ref('white');

// Functions
const startGame = (val) => {
  questions.value = [];
  currentQuestion.value = {};
  classic.value = val === 151;
  isPlaying.value = true;
  score.value = 0;
  currentQuestionIndex.value = 0;
  fetchQuestions();
};

const trainerHover = (val) => {
  trainerHovered.value = val;
};

const fetchQuestions = () => {
  // Definir el rango según la opción seleccionada (Classic o Master)
  const maxId = classic.value ? 151 : 898; // Si es Classic, el rango es 1-151, si es Master, el rango es 1-898
  const pokemonIds = Array.from({ length: 10 }, () => Math.floor(Math.random() * maxId) + 1); // IDs aleatorios según el rango

  const pokemonPromises = pokemonIds.map(id => fetchPokemonData(id));

  Promise.all(pokemonPromises)
    .then(results => {
      questions.value = results;
      loadQuestion();
    })
    .catch(err => {
      // console.error('Error fetching Pokémon data:', err);
    });
};


const fetchPokemonData = (id) => {
  return new Promise((resolve, reject) => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(response => response.json())
      .then(async (data) => {
        const correctAnswer = {
          name: data.name,
          id: data.id
        };

        const options = [correctAnswer, ...await generateRandomOptions(correctAnswer.id)];
        resolve({
          image: data.sprites.front_default,
          correctAnswer: correctAnswer.name,
          options: shuffle(options)
        });
      })
      .catch(reject);
  });
};

async function generateRandomOptions(correctId) {
  let options = [];

  // Función auxiliar para obtener el nombre de un Pokémon dado su ID
  const getPokemonNameById = async (id) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();
    return data.name;  // Retorna el nombre del Pokémon
  };

  while (options.length < 3) {
    const randomId = Math.floor(Math.random() * 898) + 1;
    if (randomId !== correctId && !options.some(option => option.id === randomId)) {
      // Llamar a la API para obtener el nombre del Pokémon
      const randomName = await getPokemonNameById(randomId);
      options.push({ name: `${randomName}`, id: randomId });
    }
  }
  return options;
}



const shuffle = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

const loadQuestion = () => {
  if (currentQuestionIndex.value < questions.value.length) {
    currentQuestion.value = questions.value[currentQuestionIndex.value];
  } else {
    endGame();
  }
};

const checkAnswer = (selectedOption) => {
  if (selectedOption.name === currentQuestion.value.correctAnswer) {
    bgColor.value = "#1db12a";
    let dinero = Cookies.get("dinero");
    dinero = parseInt(dinero, 10);
    // console.log("dinero0: ", dinero);
    if (dinero) {
      // console.log("dinero1: ", dinero);
      dinero += 10;
      // console.log("dinero2: ", dinero);

      Cookies.set("dinero", dinero, { expires: 36500 });
    }

    score.value++;
  } else {
    bgColor.value = "#cf0000";
  }

  setTimeout(() => {
    currentQuestionIndex.value++;
    bgColor.value = 'white';
    loadQuestion();
  }, 1000);
};

const endGame = () => {
  isDone.value = true;
  isPlaying.value = false;
};

const restartGame = () => {
  isDone.value = false;
  isPlaying.value = false;
  classic.value = false;
};

</script>


<style scoped>
@import 'https://fonts.googleapis.com/css?family=VT323';

.poke-section {
  margin: 0 auto;
  width: 80%;
  padding: 20px;
  background-color: #f65a52;
  color: #000;
  border-radius: 10px;
}

.poke-question {
  margin-bottom: 20px;
}

.poke-question-image {
  width: 200px;
  height: auto;
  border: 5px solid #000;
  border-radius: 10px;
}

.poke-options {
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
}

.poke-options button {
  width: 100%;
  background-color: #c5d5ee;
  color: black;
  border: 2px solid black;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.poke-options button:hover {
  background-color: #af5050;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}

.header .question-number {
  font-size: 1.2em;
}

/* dssdsd */
* {
  box-sizing: border-box;
}

body {
  background-color: #f65a52;
  font-family: "VT323", monospace;
  font-size: 16px;
  line-height: 1.875em;
  color: #333;
}

.container {
  width: 100%;
  max-width: 400px;
  position: relative;
  margin: 50px auto;
}

h2 {
  font-size: 1.25rem;
  white-space: nowrap;
}

.spacer {
  margin-bottom: 0.5rem;
}

.button11 {
  padding: 0.5em 1.5em;
  border-radius: 1rem;
  border: solid 1px transparent;
  font-family: "VT323", monospace;
  font-size: 1.5rem;
  background-color: #f32c22;
  color: #333;
  cursor: pointer;
  transition: 0.35s;
}

.button11:focus {
  outline: none;
  border: 1px dotted #f87f79;
}

.button11:not([disabled]):hover {
  background-color: #333;
  color: #f65a52;
}

.poke-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  max-width: 500px;
  margin: auto;
}

.poke-intro-trainer {
  position: relative;
  margin-bottom: 1rem;
  height: 200px;
  width: 200px;
}

.poke-intro-trainer .poke-trainer-img {
  position: absolute;
  left: 50%;
  bottom: 0;
  height: 200px;
  opacity: 0;
  transition: 0.4s cubic-bezier(0.22, 0.75, 0.53, 0.99);
}

@media (max-width: 479px) {
  .poke-intro-trainer .poke-trainer-img {
    display: none;
  }
}

.poke-intro-trainer .poke-trainer-img.active {
  transform: translateX(-50%);
  opacity: 1;
}

.poke-ball {
  position: absolute;
  top: 50%;
  left: 50%;
  height: 150px;
  width: 150px;
  border-radius: 50%;
  background-color: #f32c22;
  transform: translate(-50%, -50%);
  overflow: hidden;
}

.poke-ball::before,
.poke-ball::after {
  content: "";
  position: absolute;
}

.poke-ball::before {
  z-index: 2;
  top: 50%;
  left: 50%;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  border: solid 6px #f65a52;
  background-color: #fa9f9b;
  transform: translate(-50%, -50%);
}

.poke-ball::after {
  z-index: 1;
  top: 50%;
  height: 50%;
  width: 100%;
  border-top: solid 6px #f65a52;
  background-color: #fa9f9b;
}
</style>
