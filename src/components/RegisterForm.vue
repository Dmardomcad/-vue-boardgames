<template>
  <h1>REGISTRO</h1>
  <form class="register-form" @submit.prevent="submitForm">
    <div class="register-container">
      <label for="username">Nombre de usuario:</label>
      <input
        type="text"
        id="username"
        v-model="formData.username"
        @input="validateUsername"
        @keydown.space.prevent
      />
      <div v-if="formErrors.usernameError" class="error">
        {{ formErrors.usernameError }}
      </div>
    </div>

    <div class="register-container">
      <label for="email">Email:</label>
      <input
        type="email"
        id="email"
        v-model="formData.email"
        @input="validateEmail"
        @keydown.space.prevent
      />
      <div v-if="formErrors.emailError" class="error">
        {{ formErrors.emailError }}
      </div>
    </div>

    <div class="register-container">
      <label for="password">Contraseña:</label>
      <input
        type="password"
        id="password"
        v-model="formData.password"
        @input="validatePassword"
        @keydown.space.prevent
      />
      <div v-if="formErrors.passwordError" class="error">
        {{ formErrors.passwordError }}
      </div>
    </div>
    <button class="btn-primary" type="submit">Registrarse</button>

  </form>
</template>

<script>

import axios from 'axios'

export default {
  data() {
    return {
      formData: {
        username: "",
        email: "",
        password: "",
      },
      formErrors: {
        usernameError: "",
        emailError: "",
        passwordError: "",
      },
    };
  },
  methods: {
    validateUsername() {
      if (this.formData.username.length > 20) {
        this.formErrors.usernameError =
          "El nombre de usuario no puede tener más de 20 caracteres.";
      } else {
        this.formErrors.usernameError = "";
      }
    },

    validateEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.formData.email)) {
        this.formErrors.emailError =
          "Por favor, introduce una dirección de email válida.";
      } else {
        this.formErrors.emailError = "";
      }
    },

    validatePassword() {
      const passwordRegex = /^(?=.*[0-9]).{1,8}$/;
      if (!passwordRegex.test(this.formData.password)) {
        this.formErrors.passwordError =
          "La contraseña debe tener entre 1 y 8 caracteres, y al menos debe tener un número.";
      } else {
        this.formErrors.passwordError = "";
      }
    },

    submitForm() {
      // If there are no errors, send the data
      if (
        !this.formErrors.usernameError &&
        !this.formErrors.emailError &&
        !this.formErrors.passwordError
      ) {
        console.log("Formulario válido, registrando usuario...");
        console.log(this.formData);
        axios.post('https://boardgameapi-production.up.railway.app/users/create', this.formData)
        .then(response =>
          (console.log(response.data)
        ))
        .catch(error=>
          (console.log(error)
        ))
        this.$router.push('/') // redirect to home after registering
      }
    },
  },
};
</script>

<style>
h1{
  display: flex;
  justify-content: center;
  padding: 20px;
}
.error {
  color: red;
}
</style>
