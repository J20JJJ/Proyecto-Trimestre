<template>
  <div class="music-player">
    <div class="track-info">
      <h2 class="track-title">{{ ver_name_cancion }}</h2>
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
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import reproductor from "./reproductor.vue";

let name_Cancion = ref([]);
let musica = ref([]);

let ver_name_cancion = ref("NULL");

async function buscarCancionesSimilar(idCancion, apiKey) {
  console.log("idCancion2: ", idCancion);

  const response = await fetch(
    `https://freesound.org/apiv2/sounds/${idCancion}/similar/?format=json&token=${apiKey}`
  );
  const data = await response.json();
  // console.log(data)
  return {
    similares: data.results.map((a) => a.id),
  };
}

async function playCancion(idCancion, apiKey) {
  console.log("idCancion: ", idCancion);

  let nameCancion = [];
  let sonido = [];
  console.log("idCancion.value.length: ", idCancion.length);

  for (let i = 0; i < idCancion.length; i++) {
    console.log("i: ", i);
    const response = await fetch(
      `https://freesound.org/apiv2/sounds/${idCancion[i]}/?fields=id%2Cname%2Cpreviews&format=json&token=${apiKey}`
    );
    const data = await response.json();

    nameCancion = nameCancion.concat(data.name);
    sonido = sonido.concat(data.previews["preview-hq-mp3"]);
  }
  console.log("nameCancion: ", nameCancion);
  console.log("sonido: ", sonido);
  // console.log(data)
  return {
    nameCancion,
    sonido,
  };
}

let estadoCancion = false;
let audioActual = null; // Variable para almacenar la instancia de audio actual
let num_audioActual = null;
let progresoInterval = null;

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
        if(num_audioActual<0){
            num_audioActual = 0;
        }
        index = num_audioActual;
        audioActual.pause();
        audioActual = new Audio(musica.value[index]);
        // clearInterval(progresoInterval.value);
        estadoCancion = false;
        break;
      }
      case -3: {
        num_audioActual += 1;
        console.log("musica.value: ",musica.value.length-1)
        if(num_audioActual > musica.value.length-1){
            num_audioActual = musica.value.length-1;
        }
        index = num_audioActual;
        audioActual.pause();
        audioActual = new Audio(musica.value[index]);
        // clearInterval(progresoInterval.value);
        estadoCancion = false;
        break;
      }
    }
  } else  if (num_audioActual !== null && (index !== -2 || index !== -3)) {
    index += 1;
    num_audioActual = index;
  }

  console.log("index: ", index);
  ver_name_cancion.value = name_Cancion.value[index];

  const progressBar = document.getElementById("bar");
  if (!audioActual) {
    // Crear una nueva instancia de audio si no existe
    audioActual = new Audio(musica.value[index]);
    ver_name_cancion.value = name_Cancion.value[index];
    // Añadir un listener para cuando la canción termine
    audioActual.addEventListener("ended", () => {
      if (index + 1 < musica.value.length && estadoCancion) {
        console.log(`Reproduciendo siguiente canción: ${musica.value[index]}`);
        estadoCancion = false;
        console.log("index44: ", index);
        playAudio(index); // Reproducir la siguiente canción
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
    audioActual.play();
    console.log(`Reproduciendo canción: ${musica.value[index]}`);
    console.log("index2: ", index);
    // Iniciar un intervalo para mostrar el progreso
    progresoInterval.value = setInterval(() => {
      if (audioActual) {
        let progreso = Math.floor(
          (audioActual.currentTime / audioActual.duration) * 100
        );
        console.log(`Progreso: ${progreso}%`);

        progressBar.style.width = `${progreso}%`;

        // Detener el intervalo si la canción se pausa o termina
        if (!estadoCancion || audioActual.ended) {
          clearInterval(progresoInterval.value);
        }
      }
    }, 1000); // Actualizar cada segundo
  } else {
    estadoCancion = false;
    audioActual.pause();
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

<style>
.music-player {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  background: #282c34;
  border-radius: 10px;
  color: #fff;
  font-family: Arial, sans-serif;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  text-align: center;
}

.track-info {
  margin-bottom: 20px;
}

.track-title {
  font-size: 18px;
  font-weight: bold;
  margin: 0;
}

.controls {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

.btn {
  background: #444;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s ease;
}

.btn:hover {
  background: #555;
}

.progress-bar {
  width: 100%;
  height: 10px;
  background: #444;
  border-radius: 5px;
  overflow: hidden;
}

.progress {
  height: 100%;
  background: #61dafb;
  /* transition: width 0.2s ease-in-out; Transición más rápida */
}
</style>
