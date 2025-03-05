<template>
  <HeaderComponent />
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue';

export default {
  name: 'HomePage',
  components: {
    HeaderComponent
  }
};
</script>

<style scoped>
body {
  background-color: white; /* Cambiar el fondo de toda la web a blanco */
}
</style>
