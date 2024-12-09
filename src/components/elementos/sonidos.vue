<template>
  <div class="caja_musica">
    <label class="slider">
      <input type="range" class="level" v-model="volume" @input="updateVolume" />
      <svg class="volume" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink"
        width="512" height="512" x="0" y="0" viewBox="0 0 24 24" style="enable-background:new 0 0 512 512"
        xml:space="preserve">
        <g>
          <path
            d="M18.36 19.36a1 1 0 0 1-.705-1.71C19.167 16.148 20 14.142 20 12s-.833-4.148-2.345-5.65a1 1 0 1 1 1.41-1.419C20.958 6.812 22 9.322 22 12s-1.042 5.188-2.935 7.069a.997.997 0 0 1-.705.291z"
            fill="currentColor" data-original="#000000"></path>
          <path
            d="M15.53 16.53a.999.999 0 0 1-.703-1.711C15.572 14.082 16 13.054 16 12s-.428-2.082-1.173-2.819a1 1 0 1 1 1.406-1.422A6 6 0 0 1 18 12a6 6 0 0 1-1.767 4.241.996.996 0 0 1-.703.289zM12 22a1 1 0 0 1-.707-.293L6.586 17H4c-1.103 0-2-.897-2-2V9c0-1.103.897-2 2-2h2.586l4.707-4.707A.998.998 0 0 1 13 3v18a1 1 0 0 1-1 1z"
            fill="currentColor" data-original="#000000"></path>
        </g>
      </svg>
    </label>


    <!-- ddd -->
    <div class="music-player">
      <div class="track-info">
        <h2 class="track-title">
          {{ ver_name_cancion }}
        </h2>
      </div>
      <div class="controls">




        <button class="btn previous" @click="playAudio(-2)">⏮ Anterior</button>
        <button class="btn play-pause" @click="playAudio(-1)">
          ⏯ Pausa/Play
        </button>
        <button class="btn next" @click="playAudio(-3)">⏭ Siguiente</button>
      </div>
      <div class="progress-bar">
        <div id="bar" class="progress"></div>
      </div>
    </div>
  </div>

</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import reproductor from "./reproductor.vue";

let name_Cancion = ref([]);
let musica = ref([]);

let ver_name_cancion = ref("Ninguna canción en reproducción");

async function buscarCancionesSimilar(idCancion, apiKey) {
  try {
    console.log("idCancion2: ", idCancion);

    const response = await fetch(
      `https://freesound.org/apiv2/sounds/${idCancion}/similar/?format=json&token=${apiKey}`
    );

    // Verificar si la respuesta es correcta (status 200)
    if (!response.ok) {
      throw new Error(`Error en la respuesta: ${response.statusText}`);
    }

    const data = await response.json();

    return {
      similares: data.results.map((a) => a.id),
    };
  } catch (error) {
    console.error("Error al buscar canciones similares:", error);
    return { similares: [], error: error.message };  // Retorna un objeto con el error
  }
}




async function playCancion(idCancion, apiKey) {
  try {
    console.log("idCancion: ", idCancion);

    let nameCancion = [];
    let sonido = [];
    console.log("idCancion.value.length: ", idCancion.length);

    for (let i = 0; i < idCancion.length; i++) {
      console.log("i: ", i);
      
      const response = await fetch(
        `https://freesound.org/apiv2/sounds/${idCancion[i]}/?fields=id%2Cname%2Cpreviews&format=json&token=${apiKey}`
      );

      // Verificar si la respuesta es correcta (status 200)
      if (!response.ok) {
        throw new Error(`Error en la respuesta para id ${idCancion[i]}: ${response.statusText}`);
      }

      const data = await response.json();

      nameCancion = nameCancion.concat(data.name);
      sonido = sonido.concat(data.previews["preview-hq-mp3"]);
    }

    console.log("nameCancion: ", nameCancion);
    console.log("sonido: ", sonido);

    return {
      nameCancion,
      sonido,
    };
  } catch (error) {
    console.error("Error al obtener la canción:", error);
    return { nameCancion: [], sonido: [], error: error.message };  // Retorna un objeto con el error
  }
}


let estadoCancion = false;
let audioActual = ref(null); // Variable para almacenar la instancia de audio actual
let num_audioActual = null;
let progresoInterval = null;

const volume = ref(50); // Valor inicial del slider (porcentaje 0-100)

const updateVolume = () => {
  // Aquí calculamos el porcentaje y lo mostramos en consola
  const porcentage = volume.value / 100;
  audioActual.value.volume = porcentage;
  console.log(`Volumen: ${porcentage}%`);
};

function playAudio(index) {
  if (num_audioActual === null && index === -1) {
    index += 1;
    num_audioActual = index;
  } else if (num_audioActual !== null && index === -1) {
    index = num_audioActual;
  } else if (num_audioActual === null && (index === -2 || index === -3)) {
    index = 0;
    num_audioActual = index;
  } else if (num_audioActual !== null && (index === -2 || index === -3)) {
    switch (index) {
      case -2: {
        num_audioActual -= 1;
        if (num_audioActual < 0) {
          num_audioActual = 0;
        }
        index = num_audioActual;
        audioActual.value.pause();
        audioActual.value = new Audio(musica.value[index]);
        // clearInterval(progresoInterval.value);
        estadoCancion = false;
        break;
      }
      case -3: {
        num_audioActual += 1;
        console.log("musica.value: ", musica.value.length - 1)
        if (num_audioActual > musica.value.length - 1) {
          num_audioActual = musica.value.length - 1;
        }
        index = num_audioActual;
        audioActual.value.pause();
        audioActual.value = new Audio(musica.value[index]);
        // clearInterval(progresoInterval.value);
        estadoCancion = false;
        break;
      }
    }
  } else if (num_audioActual !== null && (index !== -2 || index !== -3)) {
    index += 1;
    num_audioActual = index;
  }

  console.log("index: ", index);
  ver_name_cancion.value = name_Cancion.value[index];

  const progressBar = document.getElementById("bar");
  if (!audioActual.value) {
    // Crear una nueva instancia de audio si no existe
    audioActual.value = new Audio(musica.value[index]);
    ver_name_cancion.value = name_Cancion.value[index];
    // Añadir un listener para cuando la canción termine
    audioActual.value.addEventListener("ended", () => {
      if (index + 1 < musica.value.length && estadoCancion) {
        console.log(`Reproduciendo siguiente canción: ${musica.value[index]}`);
        estadoCancion = false;
        console.log("index44: ", index);
        playAudio(-3); // Reproducir la siguiente canción
      } else if (estadoCancion) {
        estadoCancion = false;
        console.log("No hay más canciones para reproducir.");
      } else {
        console.log("Canción en pausa");
      }
    });
  }

  // Controlar reproducción y pausa
  if (!estadoCancion) {
    estadoCancion = true;
    audioActual.value.play();
    console.log(`Reproduciendo canción: ${musica.value[index]}`);
    console.log("index2: ", index);
    // Iniciar un intervalo para mostrar el progreso
    progresoInterval.value = setInterval(() => {
      if (audioActual.value) {
        let progreso = Math.floor(
          (audioActual.value.currentTime / audioActual.value.duration) * 100
        );
        console.log(`Progreso: ${progreso}%`);

        progressBar.style.width = `${progreso}%`;

        // Detener el intervalo si la canción se pausa o termina
        if (!estadoCancion || audioActual.value.ended) {
          clearInterval(progresoInterval.value);
        }
      }
    }, 1000); // Actualizar cada segundo
  } else {
    estadoCancion = false;
    audioActual.value.pause();
    console.log(`Pausando canción: ${musica.value[index]}`);
  }
}

onBeforeMount(async () => {
  try {
    let apiKey = "I0ZjfHJKqlg0PMs3cYXHgAQLWIPRiVDIl929rYrU";
    let idCancion = "467497";
    const cancionesSimilar = await buscarCancionesSimilar(idCancion, apiKey);
    if (cancionesSimilar) {
      let id_musica_similar = ref([]);
      id_musica_similar.value = id_musica_similar.value.concat(
        cancionesSimilar.similares
      );
      //   id_musica_similar.value.unshift(idCancion);
      const cancion = await playCancion(id_musica_similar.value, apiKey);
      console.log("cancion.sonido: ", cancion.sonido);
      console.log("cancion.nameCancion: ", cancion.nameCancion);
      if (cancion) {
        // Asigna el nuevo valor al array
        name_Cancion.value = name_Cancion.value.concat(...cancion.nameCancion);
        musica.value = musica.value.concat(...cancion.sonido); // Si quieres agregar el sonido a musica
        console.log("musica.value[0]: ", musica.value[0]);
        // playAudio(0);
      }
    }
  } catch (error) {
    console.error("Error al cargar:", error);
  }
  //   playAudio(0);
});
</script>

<style scoped>
.caja_musica {
  display: flex;
}

.music-player {
  width: 350px;
  
  background-color: #121212;
  border-radius: 10px;
  padding: 20px;
  color: #fff;
  font-family: 'Arial', sans-serif;
}

.track-info {
  text-align: center;
  margin-bottom: 20px;
}

.track-title {
  font-size: 20px;
  font-weight: bold;
  color: #f1f1f1;
}

.controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.btn {
  background-color: #1db954;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #1ed760;
}

.progress-bar {
  width: 100%;
  height: 10px;
  background-color: #333;
  border-radius: 5px;
  overflow: hidden;
}

.progress {
  height: 100%;
  width: 0%;
  background-color: #1db954;
  border-radius: 5px;
  transition: width 0.3s;
}

/* level settings 👇 */

.slider {
  /* slider */
  --slider-width: 100%;
  --slider-height: 15px;
  --slider-bg: rgba(82, 82, 82, 0.322);
  --slider-border-radius: 5px;
  /* level */
  --level-color: #92ff77;
  --level-transition-duration: 5s;
  /* icon */
  --icon-margin: 15px;
  --icon-color: var(--slider-bg);
  --icon-size: 30px;
}

.slider {
  position: relative;
  cursor: pointer;
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: reverse;
  -ms-flex-direction: row-reverse;
  flex-direction: row-reverse;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.slider .volume {
  display: inline-block;
  vertical-align: top;
  margin-right: var(--icon-margin);
  color: var(--icon-color);
  width: var(--icon-size);
  height: auto;
  position: absolute;
  left: 18px;
  pointer-events: none;
  transition-duration: 0.5s;
}

.slider .level {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: var(--slider-width);
  height: var(--slider-height);
  background: var(--slider-bg);
  overflow: hidden;
  border-radius: var(--slider-border-radius);
  -webkit-transition: height var(--level-transition-duration);
  -o-transition: height var(--level-transition-duration);
  transition: height var(--level-transition-duration);
  cursor: inherit;
  transform: rotate(270deg);
}

.slider .level::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 0px;
  height: 0px;
  -webkit-box-shadow: -200px 0 0 200px var(--level-color);
  box-shadow:
    -100px 0 5px 100px var(--level-color),
    -100px 0px 20px 100px var(--level-color);
}

.slider .level:hover~.volume {
  color: var(--level-color);
  opacity: 0.6;
}

.slider .level::-moz-range-thumb {
  width: 0;
  height: 0;
  border-radius: 0;
  border: none;
  box-shadow:
    -100px 0 5px 100px var(--level-color),
    -100px 0px 20px 100px var(--level-color);
}
</style>
