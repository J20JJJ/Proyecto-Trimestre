<template>
    <div class="music-player">
        <div class="track-info">
            <h2 class="track-title">Título de la canción</h2>
            <p class="track-artist">Artista</p>
        </div>
        <div class="controls">
            <button class="btn previous" @click="playPrevious">⏮ Anterior</button>
            <button class="btn play-pause" @click="playAudio()">⏯ Pausa/Play</button>
            <button class="btn next" @click="playNext">⏭ Siguiente</button>
        </div>
        <div class="progress-bar">
            <div class="progress" style="width: 40%;"></div>
        </div>
    </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import reproductor from './reproductor.vue';


let name_Cancion = ref([])
let musica = ref([])



async function buscarCancionesSimilar(idCancion, apiKey) {
    console.log("idCancion2: ", idCancion)

    const response = await fetch(`https://freesound.org/apiv2/sounds/${idCancion}/similar/?format=json&token=${apiKey}`);
    const data = await response.json();
    // console.log(data)
    return {
        similares: data.results.map(a => a.id)
    };
}

async function playCancion(idCancion, apiKey) {
    console.log("idCancion: ", idCancion)

    let nameCancion = []
    let sonido = []
    console.log("idCancion.value.length: ", idCancion.length)

    for (let i = 0; i < idCancion.length; i++) {
        console.log("i: ", i)
        const response = await fetch(`https://freesound.org/apiv2/sounds/${idCancion[i]}/?fields=id%2Cname%2Cpreviews&format=json&token=${apiKey}`);
        const data = await response.json();

        nameCancion = nameCancion.concat(data.name);
        sonido = sonido.concat(data.previews["preview-hq-mp3"]);
    }
    console.log("nameCancion: ", nameCancion)
    console.log("sonido: ", sonido)
    // console.log(data)
    return {
        nameCancion,
        sonido
    };
}
let index = 0;
function playAudio() {
    
    const audio = new Audio(musica.value[index]);

    

    console.log('musica.value[index]', musica.value[index])
    // Añadir un listener para cuando la canción termine
    audio.addEventListener('ended', () => {
        if (index + 1 < musica.value.length) {
            console.log(`Reproduciendo siguiente canción: ${musica.value[index + 1]}`);
            playAudio(index + 1);  // Reproducir la siguiente canción
        } else {
            console.log('No hay más canciones para reproducir.');
            index = 0;
            playAudio(index + 1);
        }
    });

    // Reproducir la canción
    if (audio.paused) {
        audio.play();
        console.log(`Reproduciendo canción: ${musica.value[index]}`);
    } else {
        audio.pause();
        console.log(`Pausando canción: ${musica.value[index]}`);
    }
}

onBeforeMount(async () => {
    try {


        let apiKey = "I0ZjfHJKqlg0PMs3cYXHgAQLWIPRiVDIl929rYrU"

        let idCancion = "467497"

        const cancionesSimilar = await buscarCancionesSimilar(idCancion, apiKey);

        if (cancionesSimilar) {

            let id_musica_similar = ref([])

            id_musica_similar.value = id_musica_similar.value.concat(cancionesSimilar.similares);

            id_musica_similar.value.unshift(idCancion);

            const cancion = await playCancion(id_musica_similar.value, apiKey);

            console.log("cancion.sonido: ", cancion.sonido)
            console.log("cancion.nameCancion: ", cancion.nameCancion)

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

.track-artist {
    font-size: 14px;
    color: #bbb;
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
    transition: width 0.3s ease;
}
</style>