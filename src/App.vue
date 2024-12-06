<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import Cookies from 'js-cookie';
import titulo from './components/elementos/titulo.vue';
import sonidos from './components/elementos/sonidos.vue';
import ver_galletas from './components/elementos/ver_galletas.vue';
import switches from './components/elementos/switches.vue';
import '@splidejs/vue-splide/css';

const mostrarSonidos = ref('sonidos');
function sonidosClick() {
  console.log(mostrarSonidos.value);
  console.log("entraaaaaa");
  switch (mostrarSonidos.value) {
    case 'sonidos': {
      mostrarSonidos.value = 'a';
      break;
    }
    case 'a': {
      mostrarSonidos.value = '';
      break;
    }
    case '': {
      mostrarSonidos.value = 'e';
      break;
    }
    case 'e': {
      mostrarSonidos.value = 'sonidos';
      break;
    }
  }
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
    <switches @click="sonidosClick" class="sonidos_switches"/>
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
  position: absolute;
  transform: translateX(-95vh);
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
