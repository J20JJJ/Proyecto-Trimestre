<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import Cookies from 'js-cookie';
import titulo from './components/elementos/titulo.vue';
import sonidos from './components/elementos/sonidos.vue';
import ver_galletas from './components/elementos/ver_galletas.vue';
import '@splidejs/vue-splide/css';

// verificar el estado de la cookie
const mostrarGalletas = ref(true);

const checkCookie = () => {
  const estadoCookie = Cookies.get('estado_cookie');
  mostrarGalletas.value = estadoCookie !== 'true';
};

onMounted(() => {
  // Verifica la cookie al montarse el componente
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
  <header class="fondo">
    <titulo></titulo>
    <ver_galletas v-if="mostrarGalletas" />
    <!-- <sonidos/> -->
    <transition name="bounce">
      <RouterView v-if="!mostrarGalletas"/>
    </transition>
  </header>
</template>

<style>
@import "./../src/assets/styles.scss";

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
