<template>
  <div class="login-container">
    <div class="login-left-section">
      <img src="/src/assets/log.jpg" alt="Imagen de Publicidad" class="login-image" />
    </div>
    <div class="login-right-section">
      <h2 class="login-hello">¡Hola!</h2>
      <p class="login-subtitle">
        Bienvenido de nuevo, por favor ingresa tus datos para continuar.
      </p>
      <form @submit.prevent="login" class="login-form">
        <div class="login-input-group">
          <label for="email">Correo Electrónico</label>
          <input type="email" v-model="email" required />
        </div>
        <div class="login-input-group">
          <label for="password">Contraseña</label>
          <input type="password" v-model="password" required />
        </div>
        <div class="login-options">
          <label><input type="checkbox" v-model="rememberMe" /> Recuérdame</label>
          <a href="#" class="login-forgot-password">¿Olvidaste tu contraseña?</a>
        </div>
        <button type="submit" class="login-btn">Iniciar Sesión</button>
      </form>
      <p class="login-signup">¿No tienes una cuenta? <a href="/register">Regístrate</a></p>
      <p v-if="error" class="login-error">{{ error }}</p>
    </div>
  </div>
</template>

<script>
import { loginUser } from "../services/Api";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      email: "",
      password: "",
      rememberMe: false,
      error: "",
    };
  },
  methods: {
    async login() {
      try {
        const user = { email: this.email, password: this.password };
        await loginUser(user);
        Swal.fire({
          icon: 'success',
          title: 'Inicio de sesión exitoso',
          text: 'Has iniciado sesión correctamente',
        });
        this.$store.commit('setLoggedIn', true);
        this.$router.push("/home");
      } catch (err) {
        this.error = err.message;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: this.error,
        });
      }
    },
  },
};
</script>

<style>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #0b1522;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-container {
  display: flex;
  width: 1100px;
  height: 600px;
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}

.login-left-section {
  width: 80%;
  background-color: #0b1522;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-image {
  max-width: 1200px;
  max-height: 900px;
  border-radius: 10px;
}

.login-right-section {
  width: 60%;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.login-hello {
  font-size: 40px;
  margin-bottom: 10px;
  align-items: center;
  text-align: center;
}

.login-subtitle {
  color: gray;
  font-size: 14px;
}

.login-form {
  margin-top: 20px;
}

.login-input-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

.login-input-group label {
  font-size: 14px;
  margin-bottom: 5px;
}

.login-input-group input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
}

.login-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  margin-bottom: 15px;
}

.login-options input {
  margin-right: 5px;
}

.login-forgot-password {
  color: #4cc9f0;
  text-decoration: none;
}

.login-btn {
  width: 100%;
  background-color: #4cc9f0;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

.login-btn:hover {
  background-color: #3bb2d9;
}

.login-signup {
  text-align: center;
  margin-top: 15px;
  font-size: 14px;
}

.login-signup a {
  color: #4cc9f0;
  text-decoration: none;
}

.login-error {
  color: red;
  text-align: center;
  margin-top: 10px;
}
</style>
