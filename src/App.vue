<script setup>
import titulo from './components/elementos/titulo.vue';
</script>

<template>
  <header>
    <titulo></titulo>
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
