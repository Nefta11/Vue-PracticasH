<template>
  <div>
    <h1>Registrar Usuario</h1>
    <form @submit.prevent="register">
      <div>
        <label for="nombre">Nombre:</label>
        <input type="text" v-model="nombre" required />
      </div>
      <div>
        <label for="primerApellido">Primer Apellido:</label>
        <input type="text" v-model="primerApellido" required />
      </div>
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
      <div>
        <label for="nombreUsuario">Nombre de Usuario:</label>
        <input type="text" v-model="nombreUsuario" required />
      </div>
      <div>
        <label for="email">Correo Electrónico:</label>
        <input type="email" v-model="email" required />
      </div>
      <div>
        <label for="password">Contraseña:</label>
        <input type="password" v-model="password" required />
      </div>
      <div>
        <label for="numeroTelefono">Número de Teléfono:</label>
        <input type="text" v-model="numeroTelefono" required />
      </div>
      <button type="submit">Registrar</button>
    </form>
    <p v-if="error">{{ error }}</p>
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
