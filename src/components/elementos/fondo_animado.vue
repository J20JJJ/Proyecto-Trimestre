<template>

</template>

<script setup>
</script>

<style scoped>
/*
DISCLAIMER: Works best in Chrome! Due to the changes in Chrome's Autoplay Policy, it's likely that you won't hear the nostalgic 8-bit music, though :( You can read up on the details of this over at Google's Developer Blog (https://developers.google.com/web/updates/2017/09/autoplay-policy-changes).

If you want to revisit those settings in your browser you can do this by making changes to the respective Chrome flag here: chrome://flags/#autoplay-policy
*/

// Feel free to play around with the following settings!
$version: "blue"; // Can be "blue" or "red"
$color: false;
$upscale: true;

/*
Due to performance issues I had to cheat a bit and include the pixel maps as precompiled file, if you want to take a look at the uncompressed/uncompiled version you can do so on Pastebin (https://pastebin.com/QvUwGdNp). The technique used, is the same as in my previous pen (https://codepen.io/kai/pen/eWMMmL) ⚡🐭. If you want to read up on how to do pixel art with Sass, you should definitely check Una Kravet's fantastic blogpost (http://una.im/sass-pixel-art) 🙏.

To generate the pixel maps in a more convenient way, Alex (https://twitter.com/cilice) invested some of his spare time to create a generator that does basically everything for you: https://pokedecss-generator.glitch.me 🎉.
*/

$asset-path : "https://s3-us-west-2.amazonaws.com/s.cdpn.io/142927";
$scene-1-length: 4.8;
$scene-2-length: 9.4;

@import url("#{$asset-path}/pokemon-pixelart-precompiled.css");

@font-face {
  font-family:'Pokemon GB';
  src: url('#{$asset-path}/Pokemon_GB.eot?#iefix') format('embedded-opentype'),
       url('#{$asset-path}/Pokemon_GB.woff') format('woff'),
       url('#{$asset-path}/Pokemon_GB.ttf') format('truetype'),
       url('#{$asset-path}/Pokemon_GB.svg#PokemonGB') format('svg');
  font-weight: 400;
}

audio { visibility: hidden; }

.wrapper {
  background: black;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.composition {
  position: relative;
  width: 192px;
  height: 144px;
  overflow: hidden;
  
  @if $upscale == true {
    transform: scale(4);
  }
}

.scene {
  position: absolute;
  background: #F9F9F9;
  top: 20px;
  bottom: 20px;
  left: 0;
  right: 0;

  @if $color == false {
    filter: grayscale(100);
  }

  &--1 {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    animation: fade 0s ($scene-1-length + 0.5)+s linear reverse;
    animation-fill-mode: forwards;

    .shooting-star {
      width: 16px;
      height: 16px;
      position: absolute;
      right: -16px;
      top: -36px;
      animation: starswipe 0.9s linear;
      z-index: 3;
    }

    .gamefreak-logo {
      position: relative;
      width: 11px;
      height: 23px;
      margin-bottom: 8px;
      animation: shine-logo 0.5s 1s steps(2);
      z-index: 2;
    }

    .gamefreak {
      position: relative;
      width: 80px;
      height: 8px;
      animation: shine-title 0.5s 0.7s steps(1);
      z-index: 2;
    }

    .star-shower-mask {
      position: absolute;
      width: 80px;
      top: 70px;
      bottom: 0;
      overflow: hidden;
      height: 34px;
    }

    .star-shower--light {
      position: absolute;
      transform: translateY(-47px);
      width: 81px;
      height: 47px;
      animation: star-shower 2.8s 1.7s linear;
      animation-fill-mode: forwards;
    }

    .star-shower--dark {
      position: absolute;
      transform: translateY(-47px);
      width: 81px;
      height: 47px;
      animation: star-shower 2.8s 1.7s linear, fade 0.1s linear infinite;
      animation-fill-mode: forwards;
    }
  }

  &--2 {
    overflow: hidden;
    opacity: 0;
    z-index: 2;
    animation: fade 0.1s $scene-1-length+s;
    animation-fill-mode: forwards;

    &:before {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      background: #FEFEFE;
      z-index: 1;
      opacity: 0;
      animation: fade 0.8s ($scene-1-length + $scene-2-length - 0.8)+s steps(6);
      animation-fill-mode: forwards;
    }

    .gengar-wrapper {
      width: 58px;
      height: 54px;
      position: absolute;
      bottom: 0;
      right: 0;
      animation: gg-intro 1.2s $scene-1-length+s linear, gg-tackle 1.2s ($scene-1-length + 4.2)+s linear;
      animation-fill-mode: forwards;

      .gengar {
        position: absolute;
        width: 58px;
        height: 54px;
        animation: fade 0s ($scene-1-length + 3.75)+s linear reverse, fade 0s ($scene-1-length + 5.6)+s linear;
        animation-fill-mode: forwards;
      }

      .gengar--scratch1 {
        position: absolute;
        width: 58px;
        height: 54px;
        opacity: 0;
        transform: translateX(-10px);
        animation: fade 0s ($scene-1-length + 3.75)+s linear, fade 0s ($scene-1-length + 4.2)+s linear reverse;
        animation-fill-mode: forwards;
      }

      .gengar--scratch2 {
        position: absolute;
        width: 58px;
        height: 54px;
        opacity: 0;
        animation: fade 0s ($scene-1-length + 4.2)+s linear, fade 0s ($scene-1-length + 5.6)+s linear reverse;
        animation-fill-mode: forwards;
      }
    }
    
    .opponent {
      position: absolute;
      bottom: 0;
      left: 0;
      animation: op-intro 1.2s $scene-1-length+s linear, op-bounce-sm 1s ($scene-1-length + 1.2)+s 2 linear, op-flinch 0.8s ($scene-1-length + 4.6)+s linear, op-bounce-bg 1s ($scene-1-length + 6.4)+s linear, op-slam 0.8s ($scene-1-length + 8.6)+s linear;
      animation-fill-mode: forwards;
    }

    .jigglypuff-wrapper {
      width: 35px;
      height: 35px;

      @if $version == "red" {
        display: none;
      }

      .jigglypuff {
        width: 35px;
        height: 35px;
        position: absolute;
        animation: fade 0s ($scene-1-length + 4.6)+s linear reverse, fade 0s ($scene-1-length + 6.4)+s linear, fade 0s ($scene-1-length + 8)+s linear reverse;
        animation-fill-mode: forwards;
      }

      .jigglypuff--flinch {
        width: 35px;
        height: 35px;
        position: absolute;
        opacity: 0;
        animation: fade 0s ($scene-1-length + 4.6)+s linear, fade 0s ($scene-1-length + 6.4)+s linear reverse, fade 0s ($scene-1-length + 8)+s linear, fade 0s ($scene-1-length + 8.6)+s linear reverse;
        animation-fill-mode: forwards;
      }

      .jigglypuff--tackle {
        width: 48px;
        height: 48px;
        position: absolute;
        opacity: 0;
        animation: fade 0s ($scene-1-length + 8.6)+s linear;
        animation-fill-mode: forwards;
      }
    }

    .nidorino-wrapper {
      width: 44px;
      height: 40px;

      @if $version == "blue" {
        display: none;
      }

      .nidorino {
        width: 44px;
        height: 40px;
        position: absolute;
        animation: fade 0s ($scene-1-length + 4.6)+s linear reverse, fade 0s ($scene-1-length + 6.4)+s linear, fade 0s ($scene-1-length + 8)+s linear reverse;
        animation-fill-mode: forwards;
      }

      .nidorino--flinch {
        width: 44px;
        height: 40px;
        position: absolute;
        opacity: 0;
        animation: fade 0s ($scene-1-length + 4.6)+s linear, fade 0s ($scene-1-length + 6.4)+s linear reverse, fade 0s ($scene-1-length + 8)+s linear, fade 0s ($scene-1-length + 8.6)+s linear reverse;
        animation-fill-mode: forwards;
      }

      .nidorino--tackle {
        width: 44px;
        height: 44px;
        position: absolute;
        opacity: 0;
        animation: fade 0s ($scene-1-length + 8.6)+s linear;
        animation-fill-mode: forwards;
      }
    }
  }

  &--3 {
    opacity: 0;
    z-index: 3;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    animation: fade 0s ($scene-1-length + $scene-2-length)+s linear;
    animation-fill-mode: forwards;

    .logo-wrapper {
      position: absolute;
      top: 0;
    }

    .pokemon-logo {
      width: 128px;
      height: 49px;
      animation: logo-entrance 0.3s ($scene-1-length + $scene-2-length + 0.8)+s linear;
      animation-fill-mode: forwards;
      transform: translateX(-3px) translateY(-50px);
    }

    span {
      font-family:'Pokemon GB', monospace;
      font-size: 8px;
      animation: version-entrance 0.5s ($scene-1-length + $scene-2-length + 1.5)+s linear;
      animation-fill-mode: forwards;
      display: block;
      transform: translateX(150px);
    }
  }
}

@keyframes op-intro {
  from { transform: translateX(10px) translateY(8px); }
  to { transform: translateX(110px) translateY(8px); }
}

@keyframes op-bounce-sm {
  0% { transform: translateX(110px) translateY(8px); }
  25% { transform: translateX(115px) translateY(5px); }
  50% { transform: translateX(120px) translateY(8px); }
  75% { transform: translateX(115px) translateY(5px); }
  100% { transform: translateX(110px) translateY(8px); }
}

@keyframes op-flinch {
  0% { transform: translateX(110px) translateY(8px); }
  50% { transform: translateX(120px) translateY(-15px); }
  100% { transform: translateX(130px) translateY(8px); }
}

@keyframes op-bounce-bg {
  0% { transform: translateX(130px) translateY(8px); }
  25% { transform: translateX(125px) translateY(-5px); }
  50% { transform: translateX(120px) translateY(8px); }
  75% { transform: translateX(125px) translateY(-5px); }
  100% { transform: translateX(130px) translateY(8px); }
}

@keyframes op-slam {
  from { transform: translateX(125px) translateY(5px); }
  to { transform: translateX(70px) translateY(-30px); }
}

@keyframes gg-intro {
  from { transform: translateX(-10px); }
  to { transform: translateX(-100px); }
}

@keyframes gg-tackle {
  0% { transform: translateX(-100px); }
  40% { transform: translateX(-70px); }
  75% { transform: translateX(-70px); }
  100% { transform: translateX(-100px); }
}

@keyframes fade {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes starswipe {
  from { transform: translateX(0) translateY(0); }
  to { transform: translateX(-228px) translateY(180px); }
}

@keyframes shine-logo {
  0% { opacity: 1; }
  50% { opacity: 0.35; }
  100% { opacity: 1; }
}

@keyframes shine-title {
  0% { opacity: 1; }
  50% { opacity: 0.1; }
  100% { opacity: 1; }
}

@keyframes star-shower {
  from { transform: translateY(-47px); }
  to { transform: translateY(47px); }
}

@keyframes logo-entrance {
  from { transform: translateX(-3px) translateY(-50px); }
  to { transform: translateX(-3px) translateY(20px); }
}

@keyframes version-entrance {
  from { transform: translateY(25px) translateX(150px); }
  to { transform: translateY(25px) translateX(0); }
}
</style>