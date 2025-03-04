<template>
  <div class="register-container">
    <div class="register-left-section">
      <h1>Registrar Usuario</h1>
      <form @submit.prevent="register" class="register-form">
        <div class="register-input-group">
          <div>
            <label for="nombre">Nombre:</label>
            <input type="text" v-model="nombre" required />
          </div>
          <div>
            <label for="primerApellido">Primer Apellido:</label>
            <input type="text" v-model="primerApellido" required />
          </div>
        </div>
        <div class="register-input-group">
          <div>
            <label for="segundoApellido">Segundo Apellido:</label>
            <input type="text" v-model="segundoApellido" required />
          </div>
          <div>
            <label for="tipoUsuario">Tipo de Usuario:</label>
            <select v-model="tipoUsuario" required>
              <option>Alumno</option>
              <option>Profesor</option>
              <option>Secretaria</option>
              <option>Laboratorista</option>
              <option>Director</option>
              <option>Administrativo</option>
            </select>
          </div>
        </div>
        <div class="register-input-group">
          <div>
            <label for="nombreUsuario">Nombre de Usuario:</label>
            <input type="text" v-model="nombreUsuario" required />
          </div>
          <div>
            <label for="email">Correo Electrónico:</label>
            <input type="email" v-model="email" required />
          </div>
        </div>
        <div class="register-input-group">
          <div>
            <label for="password">Contraseña:</label>
            <input type="password" v-model="password" required />
          </div>
          <div>
            <label for="numeroTelefono">Número de Teléfono:</label>
            <input type="text" v-model="numeroTelefono" required />
          </div>
        </div>
        <button type="submit" class="register-btn">Registrar</button>
      </form>
      <p v-if="error" class="register-error">{{ error }}</p>
    </div>
    <div class="register-right-section">
      <img src="/src/assets/log.jpg" alt="Imagen de Registro" class="register-image" />
    </div>
  </div>
</template>

<script>
import { createUser } from "../services/Api";
export default {
  data() {
    return {
      nombre: "",
      primerApellido: "",
      segundoApellido: "",
      tipoUsuario: "Alumno",
      nombreUsuario: "",
      email: "",
      password: "",
      numeroTelefono: "",
      error: "",
    };
  },
  methods: {
    async register() {
      try {
        const user = {
          nombre: this.nombre,
          primerApellido: this.primerApellido,
          segundoApellido: this.segundoApellido,
          tipoUsuario: this.tipoUsuario,
          nombreUsuario: this.nombreUsuario,
          correoElectronico: this.email,
          contrasena: this.password,
          numeroTelefono: this.numeroTelefono,
          estatus: "Activo",
          fechaRegistro: new Date(),
          fechaActualizacion: new Date(),
        };
        await createUser(user);
        this.$router.push("/");
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

.register-container {
  display: flex;
  width: 1100px;
  height: 600px;
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}

.register-left-section {
  width: 60%;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.register-right-section {
  width: 40%;
  background-color: #0b1522;
  display: flex;
  justify-content: center;
  align-items: center;
}

.register-image {
  max-width: 100%;
  max-height: 100%;
  border-radius: 10px;
}

.register-form {
  margin-top: 20px;
}

.register-input-group {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}

.register-input-group div {
  width: 48%;
}

.register-input-group label {
  font-size: 14px;
  margin-bottom: 5px;
}

.register-input-group input,
.register-input-group select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
}

.register-btn {
  width: 100%;
  background-color: #4cc9f0;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

.register-btn:hover {
  background-color: #3bb2d9;
}

.register-error {
  color: red;
  text-align: center;
  margin-top: 10px;
}
</style>
