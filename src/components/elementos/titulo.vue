<template>
 
  <header class="puchadex-title">
    <h1>Puchadex</h1>
    <p class="subtitle">¡Tu enciclopedia gacha de Pokémon!</p>
  </header>
</template>

<script setup>
</script>

<style scoped>
.puchadex-title {
  text-align: center;
  background: linear-gradient(45deg, #ffcc00, #ff9900);
  padding: 20px;
  border-radius: 10px;
  color: white;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px; /* Espacio debajo del componente */
}

.puchadex-title h1 {
  font-size: 3rem;
  font-family: 'Pokemon Solid', sans-serif;
  margin: 0;
  text-shadow: 2px 2px #ff6600;
}

.puchadex-title .subtitle {
  font-size: 1.2rem;
  margin-top: 5px;
  font-style: italic;
  color: rgba(255, 255, 255, 0.9);
}
</style>
