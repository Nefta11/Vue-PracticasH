<template>
  <div>
    <h1>Iniciar Sesión</h1>
    <form @submit.prevent="login">
      <div>
        <label for="email">Correo Electrónico:</label>
        <input type="email" v-model="email" autocomplete="email" required />
      </div>
      <div>
        <label for="password">Contraseña:</label>
        <input type="password" v-model="password" autocomplete="current-password" required />
      </div>
      <button type="submit">Iniciar Sesión</button>
    </form>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import { loginUser } from '../services/Api';
export default {
  data() {
    return {
      email: '',
      password: '',
      error: ''
    };
  },
  methods: {
    async login() {
      try {
        const user = { email: this.email, password: this.password };
        await loginUser(user);
        this.$router.push('/home');
      } catch (err) {
        this.error = err.message;
      }
    }
  }
};
</script>
