<style scoped>
  .loader {
    display: flex;
    position: relative;
    justify-items: center;
    align-items: center;
    gap: 1rem;
    height: 55px;
    width: 200px;
    overflow: hidden;
  }

  .container2 {
    width: 100%;
    display: flex;
    flex-direction: column;
    height: 200px;
    position: relative;
    align-items: center;
  }

  .carousel {
    display: flex;
    gap: 1rem;
    flex-direction: column;
    position: absolute;
    width: 100%;
    transform-origin: center;
    /* Eliminar la animación-delay aquí */
  }

  .loader .container2:nth-child(3) {
    justify-content: flex-start;
    justify-items: flex-start;
    animation: scroll-up 4s infinite ease-in-out;
    /* Eliminar animation-delay */
  }

  .loader .container2:nth-child(2) {
    justify-content: flex-end;
    justify-items: flex-end;
    animation: scroll-down 4s infinite ease-in-out;
    /* Eliminar animation-delay */
  }

  .loader .container2:nth-child(1) {
    justify-content: flex-end;
    justify-items: flex-end;
    animation: scroll-down 3s infinite ease-in-out;
    /* Eliminar animation-delay */
  }

  .loader img {
    width: 30px;
    height: 30px;
    margin: 0.8rem 4px;
  }

  .death {
    display: flex;
    width: 100%;
    height: 55px;
    position: relative;
    align-items: center;
    justify-content: center;
    animation: rotation 3s infinite ease-in-out;
    /* Eliminar animation-delay */
  }

  .robots {
    display: flex;
    width: 100%;
    height: 55px;
    justify-content: space-between;
    background-color: #ff0000;
    border-radius: 0 8px 8px;
    padding: 8px;
    /* Eliminar animation-delay */
  }

  .robots::after {
    content: '';
    width: 12px;
    height: 12px;
    top: 0;
    left: 0;
    background-color: #ffffff;
    border-radius: 50%;
    animation: blink 0.5s 2 forwards;
  }

  .robots::before {
    content: '';
    width: 12px;
    height: 12px;
    top: 0;
    left: 0;
    background-color: #ffffff;
    border-radius: 50%;
    animation: blink 0.5s 2 forwards;
  }

  @keyframes scroll-up {
    0% {
      transform: translateY(0);
      filter: blur(0);
    }

    30% {
      transform: translateY(-150%);
      filter: blur(10px);
    }

    60% {
      transform: translateY(0);
      filter: blur(0px);
    }
  }

  @keyframes scroll-down {
    0% {
      transform: translateY(0);
      filter: blur(0);
    }

    30% {
      transform: translateY(150%);
      filter: blur(10px);
    }

    60% {
      transform: translateY(0);
      filter: blur(0px);
    }
  }

  @keyframes rotation {
    20%, 100% {
      transform: rotate(180deg);
    }
  }

  @keyframes blink {
    0% {
      height: 0;
    }

    20% {
      height: 12px;
    }

    100% {
      height: 12px;
    }
  }
</style>

<template>
  <div class="loader">
    <div class="container2">
      <div class="carousel">
        <!-- Cambiar los <div> por imágenes -->
        <img src="/src/assets/img/pokeball-pokemon-svgrepo-com (1).svg" alt="Heart" />
        <img src="/src/assets/img/pokeball-pokemon-svgrepo-com (1).svg" alt="Heart" />
        <img src="/src/assets/img/pokeball-pokemon-svgrepo-com (1).svg" alt="Heart" />
        <img src="/src/assets/img/pokeball-pokemon-svgrepo-com (1).svg" alt="Heart" />
        <img src="/src/assets/img/pokeball-pokemon-svgrepo-com (1).svg" alt="Heart" />
        <img src="/src/assets/img/pokeball-pokemon-svgrepo-com (1).svg" alt="Heart" />
        <img src="/src/assets/img/pokeball-pokemon-svgrepo-com (1).svg" alt="Heart" />
      </div> 
    </div>
    <div class="container2">
      <div class="carousel">
        <!-- Cambiar los <div> por imágenes -->
        <img src="/src/assets/img/game.png" alt="Death" />
        <img src="/src/assets/img/game.png" alt="Death" />
        <img src="/src/assets/img/game.png" alt="Death" />
        <img src="/src/assets/img/game.png" alt="Death" />
        <img src="/src/assets/img/game.png" alt="Death" />
        <img src="/src/assets/img/game.png" alt="Death" />
        <img src="/src/assets/img/game.png" alt="Death" />
      </div> 
    </div>
    <div class="container2">
      <div class="carousel">
        <!-- Cambiar los <div> por imágenes -->
        <img src="/src/assets/img/icons8-ultra-ball-96.png" alt="Robot" />
        <img src="/src/assets/img/icons8-ultra-ball-96.png" alt="Robot" />
        <img src="/src/assets/img/icons8-ultra-ball-96.png" alt="Robot" />
        <img src="/src/assets/img/icons8-ultra-ball-96.png" alt="Robot" />
        <img src="/src/assets/img/icons8-ultra-ball-96.png" alt="Robot" />
        <img src="/src/assets/img/icons8-ultra-ball-96.png" alt="Robot" />
        <img src="/src/assets/img/icons8-ultra-ball-96.png" alt="Robot" />
      </div> 
    </div>
  </div>
</template>
