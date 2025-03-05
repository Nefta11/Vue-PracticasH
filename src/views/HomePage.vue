<template>
  <HeaderComponent />
  <body>
    <div class="home-page-content">
      <h1>Bienvenido, ¡Que guapo te vez el dia de hoy!</h1>
      <h2>Realiza Tu Conculta Guapo De Las Que Deces:</h2>
      <div class="table-container">
        <MaterialesTable />
      </div>
      <div class="table-container">
        <PrestamosTable />
      </div>
    </div>
  </body>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue';
import MaterialesTable from '@/components/tables/MaterialesTable.vue';
import PrestamosTable from '@/components/tables/PrestamosTable.vue';

export default {
  name: 'HomePage',
  components: {
    HeaderComponent,
    MaterialesTable,
    PrestamosTable
  }
};
</script>

<style scoped>
body {
  background-color: white; /* Cambiar el fondo de toda la web a blanco */
  margin: 0; /* Eliminar márgenes */
  height: 100vh; /* Asegurar que el body ocupe toda la altura de la pantalla */
  width: 100vw; /* Asegurar que el body ocupe toda la anchura de la pantalla */
  overflow-y: auto; /* Habilitar scroll vertical */
}

.table-container {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
