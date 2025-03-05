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
      <p class="login-signup">¿Ya tienes cuenta?<a href="/"> Inicia sesión</a></p>
      <p v-if="error" class="register-error">{{ error }}</p>
    </div>
    <div class="register-right-section">
      <img src="/src/assets/reg.jpg" alt="Imagen de Registro" class="register-image" />
    </div>
  </div>
</template>

<script>
import { createUser } from "../services/Api";
import Swal from "sweetalert2";

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
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
          text: 'El usuario ha sido registrado correctamente',
        });
        this.$router.push("/");
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

<style scoped>
body {
  background-color: #0b1522; /* Color de fondo original */
  margin: 0; /* Eliminar márgenes */
  height: 100vh; /* Asegurar que el body ocupe toda la altura de la pantalla */
  width: 100vw; /* Asegurar que el body ocupe toda la anchura de la pantalla */
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

a {
  display: block;
  text-align: center;
  margin-top: 10px;
  color: #4cc9f0;
  text-decoration: none;
}

a:hover {
  color: #3bb2d9;
  text-decoration: underline;
}

.login-signup {
  text-align: center;
  margin-top: 10px;
  color: black;
}

.login-signup a {
  color: #4cc9f0;
  text-decoration: none;
}

.login-signup a:hover {
  color: #3bb2d9;
  text-decoration: underline;
}
</style>
