<template>
  <div class="login-container">
    <div class="login-left">
      <div class="login-overlay">
        <h2 class="login-subtitle">¡ Bienvenido de vuelta al</h2>
        <h1 class="login-title">Gran Bazar !</h1>
      </div>
    </div>

    <div class="login-right">
      <h2 class="login-welcome">Iniciar sesión</h2>
      <form class="login-form" @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="email" class="em">Correo electrónico: </label>
          <input type="email" id="email" v-model="email" @input="handleEmailChange" autocomplete="email" />
          <span v-if="emailValid" class="valid-check">✔️</span>
        </div>
        <div class="form-group">
          <label for="password" class="ps">Contraseña:</label>
          <input type="password" id="password" v-model="password" @input="handlePasswordChange" autocomplete="current-password" />
          <span v-if="passwordValid" class="valid-check">✔️</span>
        </div>
        <div class="form-options">
          <div>
            <input type="checkbox" id="remember-me" />
            <label for="remember-me">Recordarme</label>
          </div>
          <router-link to="#" class="forgot-password">
            Olvidaste tu contraseña?
          </router-link>
        </div>
        <button type="submit" class="login-button">Iniciar sesión</button>
        <p class="signup-text">
          ¿No tienes una cuenta? <router-link to="/register" class="signup-link">Registrarse</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import { auth } from '../../src/services/Api'; // Aquí importas la API de autenticación

const email = ref('');
const password = ref('');
const emailValid = ref(false);
const passwordValid = ref(false);

const store = useStore();
const router = useRouter();

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

const handleEmailChange = (e) => {
  email.value = e.target.value;
  emailValid.value = validateEmail(email.value);
};

const handlePasswordChange = (e) => {
  password.value = e.target.value;
  passwordValid.value = password.value.length >= 8;
};

const handleSubmit = async () => {
  if (!email.value || !password.value) {
    Swal.fire('Error', 'Todos los campos deben ser llenados', 'error');
    return;
  }
  if (!emailValid.value) {
    Swal.fire('Error', 'El correo electrónico no es válido', 'error');
    return;
  }
  if (!passwordValid.value) {
    Swal.fire('Error', 'La contraseña debe tener al menos 8 caracteres', 'error');
    return;
  }
  try {
    const response = await auth(email.value, password.value); // Aquí se usa la API que importaste

    // Extrae el token de los headers y lo agrega a la respuesta
    const { token, user } = response;

    // Ahora pasa el token junto con los datos del usuario al store
    store.dispatch('logIn', { ...user, token });

    // Guarda el token y los datos del usuario en el localStorage
    const authData = { token, user };
    localStorage.setItem("authData", JSON.stringify(authData));
    console.log("Datos guardados en localStorage:", authData);

    Swal.fire('Éxito', 'Inicio de sesión exitoso', 'success');
    router.push('/Home');
  } catch (error) {
    Swal.fire('Error', error.message, 'error');
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  height: 100vh;
  font-family: 'Arial', sans-serif;
}

.login-left {
  flex: 1;
  background: url('../../../images/gifLoginS.gif') no-repeat center center;
  background-size: cover;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-left::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(81, 75, 243, 0.5);
  z-index: 1;
}

.login-overlay {
  position: relative;
  z-index: 2;
  color: white;
  text-align: center;
  padding: 30px;
}

.login-title {
  font-size: 50px;
  font-weight: bold;
  margin-bottom: 10px;
}

.login-subtitle {
  font-size: 36px;
  margin: 10px 0;
}

.login-right {
  flex: 1;
  background: white;
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.login-welcome {
  font-size: 28px;
  font-weight: bold;
  color: black;
  margin-bottom: 20px;
}

.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.form-group {
  margin-bottom: 20px;
  width: 100%;
  max-width: 400px;
}

.form-group label {
  display: block;
  font-size: 14px;
  color: #6e6e6e;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.form-options {
  width: 100%;
  max-width: 400px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.forgot-password {
  font-size: 14px;
  color: var(--primary-color);
  text-decoration: none;
}

.login-button {
  width: 100%;
  max-width: 400px;
  padding: 15px 20px;
  font-size: 16px;
  color: white;
  background: var(--secondary-color);
  border: none;
  border-radius: 15px;
  cursor: pointer;
  transition: background 0.3s;
  margin-top: 10px;
}

.login-button:hover {
  background: var(--primary-color);
}

.google-button {
  width: 100%;
  max-width: 400px;
  padding: 10px 20px;
  font-size: 16px;
  color: 'white';
  background: var(--secondary-color);
  border: 1px solid #ccc;
  border-radius: 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s;
  margin-top: 10px;
}

.google-button:hover {
  background: var(--primary-color);
}

.google-icon {
  width: 25px;
  height: 25px;
  margin-right: 10px;
}

.signup-text {
  margin-top: 20px;
  font-size: 14px;
  text-align: center;
}

.signup-link {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: bold;
}

/* Media Queries */
@media (max-width: 799px) {
  .login-container {
    flex-direction: column;
    overflow-y: auto;
  }

  .login-left {
    height: 50vh;
  }
}




























































































</style>}  }    color: var(--secondary-color);  .signup-link {  }    background: var(--secondary-color);  .google-button:hover {  }    background: var(--primary-color);  .google-button {  }    background: var(--secondary-color);  .login-button:hover {  }    background: var(--primary-color);  .login-button {  }    border: 1px solid #777;    color: white;    background: #555;  .form-group input {  }    color: #ccc;  .form-group label {  }    color: white;    background: #333;  .login-right {  }    background-color: rgba(81, 75, 243, 0.7);  .login-left::before {@media (prefers-color-scheme: dark) {}  }    align-items: center;    padding: 10px;    max-width: 80%;  .login-button {  }    align-items: center;    padding: 5px;    max-width: 80%;  .google-button {  }    text-align: center;    margin: -1px;    padding: 13px;    max-width: 80%;  .form-options {  .form-group input,  }    margin-right: 160px;  .form-group .em {  }    margin-right: 200px;  .form-group .ps {  }    width: 100%;    align-items: center;    flex-direction: column;    display: flex;  .form-group {  }    font-size: 26px;  .login-subtitle {  }    font-size: 30px;  .login-title {  }    padding: 20px;  .login-right {@media (max-width: 580px) {
