<style scoped>
  .button_cargar_mas {
    width: 110px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
    background-color: rgb(161, 255, 20);
    border-radius: 30px;
    color: rgb(19, 19, 19);
    font-weight: 600;
    border: none;
    position: relative;
    cursor: pointer;
    transition-duration: .2s;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.116);
    padding-left: 8px;
    transition-duration: .5s;
        background: radial-gradient(
        circle farthest-corner at 40% 25%,
        rgb(218, 237, 241) 9%,
        rgb(125, 215, 237) 20%,
        rgb(64, 90, 165) 62%,
        rgb(43, 125, 196) 100%
    );
  }

  .svgIcon {
    height: 25px;
    transition-duration: 1.5s;
  }

  .bell path {
    fill: rgb(19, 19, 19);
  }

  .button_cargar_mas:hover {
    background-color: rgb(192, 255, 20);
    transition-duration: .5s;
  }

  .button_cargar_mas:active {
    transform: scale(0.97);
    transition-duration: .2s;
  }

  .button_cargar_mas:hover .svgIcon {
    transform: rotate(250deg);
    transition-duration: 1.5s;
  }
</style>

<template>
  <button class="button_cargar_mas">
    <img class="svgIcon" src="/src/assets/img/pokeball-pokemon-svgrepo-com (1).svg" alt="">
    Explore
  </button>
</template>
