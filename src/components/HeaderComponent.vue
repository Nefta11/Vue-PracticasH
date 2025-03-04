<template>
  <div class="header">
    <h1>Bienvenido, {{ userName }}</h1>
    <div class="user-menu">
      <font-awesome-icon icon="user" @click="toggleMenu" />
      <div v-if="menuVisible" class="dropdown-menu">
        <ul>
          <li @click="viewData">Ver mis datos</li>
          <li @click="logout">Cerrar sesión</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser } from '@fortawesome/free-solid-svg-icons';

library.add(faUser);

export default {
  name: 'HeaderComponent',
  components: {
    FontAwesomeIcon
  },
  data() {
    return {
      userName: '',
      menuVisible: false
    };
  },
  created() {
    this.userName = this.getUserNameFromToken();
  },
  methods: {
    getUserNameFromToken() {
      const token = localStorage.getItem('token');
      if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return `${payload.nombre}` || 'Usuario';
      }
      return 'Usuario';
    },
    toggleMenu() {
      this.menuVisible = !this.menuVisible;
    },
    viewData() {
      // Implementar lógica para ver datos del usuario
    },
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #4cc9f0;
  border-bottom: 2px solid #ddd;
  width: 100%;
  position: fixed;
  top: 0;
  left: 120;
  z-index: 1000;
}

.header h1 {
  flex: 1;
  text-align: center;
}


.user-menu {
  position: relative;
  margin-right: 100px; /* Ajustar margen derecho para que el icono no se desplace tanto */
}

.user-menu .fa-icon {
  cursor: pointer;
  font-size: 50px;
}

.dropdown-menu {
  position: absolute;
  top: 50px;
  right: 0;
  height: 80px;
  width: 120px;
  background-color: white;
  border: 1px solid #ddd;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.dropdown-menu ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.dropdown-menu li {
  padding: 10px;
  cursor: pointer;
}

.dropdown-menu li:hover {
  background-color: #f0f0f0;
}
</style>
