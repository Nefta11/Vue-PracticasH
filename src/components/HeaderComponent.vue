<template>
  <div class="header-component">
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
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Swal from 'sweetalert2';

library.add(faUser);

export default {
  name: "HeaderComponent",
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      userName: "",
      menuVisible: false,
    };
  },
  created() {
    this.userName = this.getUserNameFromToken();
  },
  methods: {
    getUserNameFromToken() {
      const token = localStorage.getItem("token");
      if (token) {
        const payload = JSON.parse(atob(token.split(".")[1]));
        return `${payload.nombre}` || "Usuario";
      }
      return "Usuario";
    },
    toggleMenu() {
      this.menuVisible = !this.menuVisible;
    },
    viewData() {
      // Implementar lógica para ver datos del usuario
    },
    logout() {
      Swal.fire({
        title: '¿Estás seguro de cerrar sesión?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, cerrar sesión',
        cancelButtonText: 'No, cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem("token");
          this.$router.push("/");
        }
      });
    },
  },
};
</script>

<style scoped>
.header-component {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #4cc9f0;
  border-bottom: 1px solid #ddd;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
}

.header-component h1 {
  flex: 1;
  text-align: center;
}

.user-menu {
  position: relative;
  margin-right: 70px;
  font-size: 34px; /* Aplica solo al contenedor */
}

.user-menu .fa-icon {
  cursor: pointer;
  font-size: 34px; /* Aplica solo al icono */
}

.dropdown-menu {
  position: absolute;
  top: 50px;
  right: -10px;
  height: auto;
  align-items: center;
  width: 120px;
  background-color: white;
  border: 1px solid #ddd;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.dropdown-menu ul {
  list-style: none;
  margin: 0;
  padding: 0;
  text-align: center;
}

.dropdown-menu li {
  padding: 10px;
  cursor: pointer;
  font-size: 14px; /* Tamaño de fuente más pequeño para los textos del menú */
}

.dropdown-menu li:hover {
  background-color: #f0f0f0;
}
</style>
