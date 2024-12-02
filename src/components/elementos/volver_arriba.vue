<style scoped>
  .container1 {
    padding: 5px;
    display: flex;
    justify-content: center;
  }

  .button2 {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: rgb(20, 20, 20);
    border: none;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 0px 0px 4px rgba(180, 160, 255, 0.253);
    cursor: pointer;
    transition-duration: 0.3s;
    overflow: hidden;
    position: relative;
  }

  .svgIcon2 {
    width: 12px;
    transition-duration: 0.3s;
  }

  .svgIcon2 path {
    fill: white;
  }

  .button2:hover {
    width: 140px;
    border-radius: 50px;
    transition-duration: 0.3s;
    background-color: rgb(181, 160, 255);
    align-items: center;
  }

  .button2:hover .svgIcon2 {
    /* width: 20px; */
    transition-duration: 0.3s;
    transform: translateY(-200%);
  }

  .button2::before {
    position: absolute;
    bottom: -20px;
    content: "Volver Arriba";
    color: white;
    /* transition-duration: .3s; */
    font-size: 0px;
  }

  .button2:hover::before {
    font-size: 13px;
    opacity: 1;
    bottom: unset;
    /* transform: translateY(-30px); */
    transition-duration: 0.3s;
  }
</style>

<template>
  <div class="container1">
    <button class="button2">
      <svg class="svgIcon2" viewBox="0 0 384 512">
        <path
          d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"
        ></path>
      </svg>
    </button>
  </div>
</template>
