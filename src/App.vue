<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import Cookies from 'js-cookie';
import titulo from './components/elementos/titulo.vue';
import sonidos from './components/elementos/sonidos.vue';
import ver_galletas from './components/elementos/ver_galletas.vue';
import switches from './components/elementos/switches.vue';
import '@splidejs/vue-splide/css';

// Función que se ejecutará cuando el evento sea capturado
const mostrarSonidos = ref('sonidos');
const manejarBotonPulsado = () => {
  //console.log(mostrarSonidos.value);
  switch (mostrarSonidos.value) {
    case 'sonidos': {
      mostrarSonidos.value = '';
      break;
    }
    case '': {
      mostrarSonidos.value = 'sonidos';
      break;
    }
  }
};


const sonidosClick = () => {
 
};
const mostrarGalletas = ref(true);

const checkCookie = () => {
  const estadoCookie = Cookies.get('estado_cookie');
  mostrarGalletas.value = estadoCookie !== 'true';
};

onMounted(() => {
  checkCookie();

  const interval = setInterval(() => {
    checkCookie();
  }, 500);

  onBeforeUnmount(() => {
    clearInterval(interval);
  });
});
</script>

<template>

  <header class="fondo fondoApp">
    <titulo></titulo>
    <ver_galletas v-if="mostrarGalletas" />
    <div class="sonidos_switches">
      <switches @boton-pulsado="manejarBotonPulsado" />
      <!-- @mouseup="sonidosClick" -->
    </div>
    <sonidos :id="mostrarSonidos" />
    <transition name="bounce">
      <RouterView v-if="!mostrarGalletas" />
    </transition>
  </header>
</template>

<style>
@import "./../src/assets/styles.scss";

#sonidos {
  display: none;
}

.sonidos_switches {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.bounce-enter-active {
  animation: bounce-in .5s;
}

.bounce-leave-active {
  animation: bounce-in .5s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1.5);
  }

  100% {
    transform: scale(1);
  }
}
</style>
