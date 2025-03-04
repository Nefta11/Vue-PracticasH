<template>
  <div>
    <h1>Registrar Usuario</h1>
    <form @submit.prevent="register">
      <div>
        <label for="email">Correo Electrónico:</label>
        <input type="email" v-model="email" required />
      </div>
      <div>
        <label for="password">Contraseña:</label>
        <input type="password" v-model="password" required />
      </div>
      <button type="submit">Registrar</button>
    </form>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import { createUser } from '../services/Api';
export default {
  data() {
    return {
      email: '',
      password: '',
      error: ''
    };
  },
  methods: {
    async register() {
      try {
        const user = { email: this.email, password: this.password };
        await createUser(user);
        this.$router.push('/');
      } catch (err) {
        this.error = err.message;
      }
    }
  }
};
</script>
