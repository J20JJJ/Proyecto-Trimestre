<style scoped>
  .container {
    width: 100%;
    height: 100%;
    --s: 200px; /* control the size */
    --c1: #1d1d1d;
    --c2: #4e4f51;
    --c3: #3c3c3c;

    background: repeating-conic-gradient(
          from 30deg,
          #0000 0 120deg,
          var(--c3) 0 180deg
        )
        calc(0.5 * var(--s)) calc(0.5 * var(--s) * 0.577),
      repeating-conic-gradient(
        from 30deg,
        var(--c1) 0 60deg,
        var(--c2) 0 120deg,
        var(--c3) 0 180deg
      );
    background-size: var(--s) calc(var(--s) * 0.577);
  }
</style>

<template>
  <div class="container"></div>
</template>
