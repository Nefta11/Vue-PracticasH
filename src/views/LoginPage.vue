<template>
  <div class="container">
    <div class="left-section">
      <h2 class="branding">Blokchain</h2>
      <h1 class="title">Revolución en Publicidad</h1>
      <p class="features">BAJAS TARIFAS • RESISTENTE A LA CENSURA • LISTO PARA IA</p>
      <div class="logo">ADSHARES</div>
    </div>
    <div class="right-section">
      <h2>¡Hola!</h2>
      <p class="subtitle">
        Etiam pretium dapibus congue. Praesent a lorem erat. Morbi mollis
        posuere lacus, vel semper risus.
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
      <p class="signup">¿No tienes una cuenta? <a href="#">Regístrate</a></p>
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
  width: 900px;
  height: 500px;
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}

.left-section {
  width: 40%;
  background-color: #0b1522;
  color: white;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.branding {
  color: rgba(255, 255, 255, 0.3);
  font-size: 24px;
  margin: 0;
}

.title {
  font-size: 28px;
  font-weight: bold;
  margin: 10px 0;
}

.features {
  font-size: 12px;
  color: #4cc9f0;
}

.logo {
  margin-top: auto;
  font-size: 16px;
  font-weight: bold;
}

.right-section {
  width: 60%;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
