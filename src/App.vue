<script setup>
// No se requiere lógica adicional en este componente
</script>

<template>
  <transition name="fade" mode="out-in">
    <router-view />
  </transition>
</template>

<style scoped>
body {
  background-color: #0b1522; /* Color de fondo original */
  margin: 0; /* Eliminar márgenes */
  height: 100vh; /* Asegurar que el body ocupe toda la altura de la pantalla */
  width: 100vw; /* Asegurar que el body ocupe toda la anchura de la pantalla */
}

header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
