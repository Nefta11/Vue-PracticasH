<template>
  <div class="register-container">
    <div class="register-left">
      <h2 class="register-welcome">Regístrate</h2>
      <form class="register-form">
        <div class="form-group">
          <label for="first_name" class="fn">Nombre:</label>
          <input type="text" id="first_name" />
        </div>
        <div class="form-group">
          <label for="last_name" class="ln">Apellido:</label>
          <input type="text" id="last_name" />
        </div>
        <div class="form-group">
          <label for="email" class="em">Correo electrónico:</label>
          <input type="email" id="email" />
        </div>
        <div class="form-group">
          <label for="phone" class="ph">Teléfono:</label>
          <input type="text" id="phone" />
        </div>
        <div class="form-group">
          <label for="birthday" class="bd">Fecha de nacimiento:</label>
          <input type="date" id="birthday" />
        </div>
        <div class="form-group">
          <label for="password" class="ps">Contraseña:</label>
          <input type="password" id="password" />
        </div>
        <button type="submit" class="register-button">Registrarse</button>
        <p class="login-text">
          ¿Ya tienes una cuenta? <router-link to="/" class="login-link">Inicia sesión</router-link>
        </p>
      </form>
    </div>

    <div class="register-right">
      <div class="register-overlay">
        <h2 class="register-subtitle">¡Únete al</h2>
        <h1 class="register-title">Gran Bazar!</h1>
      </div>
    </div>
  </div>
</template>

<script setup>
// No se requiere lógica adicional en este componente
</script>

<style scoped>
.register-container {
  display: flex;
  height: 100vh;
  font-family: 'Arial', sans-serif;
}

.register-left {
  flex: 1;
  background: white;
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.register-right {
  flex: 1;
  background: url('../../../images/registerImage.jpg') no-repeat center center;
  background-size: cover;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.register-right::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(81, 75, 243, 0.5);
  z-index: 1;
}

.register-overlay {
  position: relative;
  z-index: 2;
  color: white;
  text-align: center;
  padding: 30px;
}

.register-title {
  font-size: 50px;
  font-weight: bold;
  margin-bottom: 10px;
}

.register-subtitle {
  font-size: 36px;
  margin: 10px 0;
}

.register-welcome {
  font-size: 28px;
  font-weight: bold;
  color: var(--primary-color);
  margin-bottom: 20px;
}

.register-form {
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

.register-button {
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

.register-button:hover {
  background: var(--primary-color);
}

.login-text {
  margin-top: 20px;
  font-size: 14px;
  text-align: center;
}

.login-link {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: bold;
}

/* Media Queries */
@media (max-width: 799px) {
  .register-container {
    flex-direction: column;
    overflow-y: auto;
  }

  .register-right {
    height: 50vh;
    order: -1;
  }
}

@media (max-width: 580px) {
  .register-container {
    flex-direction: column;
  }

  .register-right {
    order: -1;
    width: 100%;
    height: 40vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .register-left {
    padding: 20px;
    width: 100%;
  }

  .register-title {
    font-size: 30px;
  }

  .register-subtitle {
    font-size: 26px;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .form-group .fn {
    margin-right: 200px;
  }

  .form-group .ln {
    margin-left: -200px;
  }

  .form-group .em {
    margin-left: 20px;
  }

  .form-group .ph {
    margin-left: -200px;
  }

  .form-group .bd {
    margin-left: -120px;
  }

  .form-group .ps {
    margin-left: 20px;
  }

  .form-group input {
    max-width: 80%;
    padding: 8px;
    margin: -1px;
    text-align: center;
  }

  .register-button {
    max-width: 80%;
    padding: 9px;
    align-items: center;
  }
}

@media (prefers-color-scheme: dark) {
  .register-left {
    background: #333;
    color: white;
  }

  .register-right::before {
    background-color: rgba(81, 75, 243, 0.7);
  }

  .form-group label {
    color: #ccc;
  }

  .form-group input {
    background: #555;
    color: white;
    border: 1px solid #777;
  }

  .register-button {
    background: var(--primary-color);
  }

  .register-button:hover {
    background: var(--secondary-color);
  }

  .login-link {
    color: var(--secondary-color);
  }
}
</style>
