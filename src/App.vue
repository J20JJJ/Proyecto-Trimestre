<script setup>
import titulo from './components/elementos/titulo.vue';
import sonidos from './components/elementos/sonidos.vue';
import '@splidejs/vue-splide/css';
</script>

<template>
  <header class="fondo">
    <titulo></titulo>
    <!-- <sonidos/> -->
    <transition name="bounce">
      
      <RouterView/>
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
