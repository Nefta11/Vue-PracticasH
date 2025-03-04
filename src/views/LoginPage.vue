<template>
  <div class="container">
    <div class="left-section">
      <img src="/src/assets/log.jpg" alt="Imagen de Publicidad" class="image" />
    </div>
    <div class="right-section">
      <h2 class="hello">¡Hola!</h2>
      <p class="subtitle">
        Bienvenido de nuevo, por favor ingresa tus datos para continuar.
      </p>
      <form @submit.prevent="login" class="form">
        <div class="input-group">
          <label for="email">Correo Electrónico</label>
          <input type="email" v-model="email" required />
        </div>
        <div class="input-group">
          <label for="password">Contraseña</label>
          <input type="password" v-model="password" required />
        </div>
        <div class="options">
          <label
            ><input type="checkbox" v-model="rememberMe" /> Recuérdame</label
          >
          <a href="#" class="forgot-password">¿Olvidaste tu contraseña?</a>
        </div>
        <button type="submit" class="btn">Iniciar Sesión</button>
      </form>
      <p class="signup">¿No tienes una cuenta? <a href="/register">Regístrate</a></p>
      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </div>
</template>

<script>
import { loginUser } from "../services/Api";

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
        this.$router.push("/home");
      } catch (err) {
        this.error = err.message;
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

.container {
  display: flex;
  width: 1100px;
  height: 600px;
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}

.left-section {
  width: 80%;
  background-color: #0b1522;
  display: flex;
  justify-content: center;
  align-items: center;
}

.image {
  max-width: 1200px;
  max-height: 900px;
  border-radius: 10px;
}

.right-section {
  width: 60%;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.hello{
  font-size: 40px;
  margin-bottom: 10px;
  align-items: center;
  text-align: center;
}

.subtitle {
  color: gray;
  font-size: 14px;
}

.form {
  margin-top: 20px;
}

.input-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

.input-group label {
  font-size: 14px;
  margin-bottom: 5px;
}

.input-group input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
}

.options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  margin-bottom: 15px;
}

.options input {
  margin-right: 5px;
}

.forgot-password {
  color: #4cc9f0;
  text-decoration: none;
}

.btn {
  width: 100%;
  background-color: #4cc9f0;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

.btn:hover {
  background-color: #3bb2d9;
}

.signup {
  text-align: center;
  margin-top: 15px;
  font-size: 14px;
}

.signup a {
  color: #4cc9f0;
  text-decoration: none;
}

.error {
  color: red;
  text-align: center;
  margin-top: 10px;
}
</style>
