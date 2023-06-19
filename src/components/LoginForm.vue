<template>
  <h1>LOGIN</h1>
  <form class="register-form" @submit.prevent="submitForm">
    <div class="register-container">
      <label for="username">Username:</label>
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

    <div>
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
    <button type="submit">Login</button>
    <p><router-link to="/register">No tengo una cuenta...</router-link></p>
  </form>
</template>

<script>
import axios from 'axios'
import { useUserStore } from '../stores/UserStore'

export default {
  data() {
    return {
      formData: {
        username: "",
        password: "",
      },
      formErrors: {
        usernameError: "",
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
    validatePassword() {
      //const passwordRegex = /^(?=.*[0-9]).{1,8}$/;
      if (!passwordRegex.test(this.formData.password)) {
        this.formErrors.passwordError =
          "La contraseña debe tener entre 1 y 8 caracteres, y al menos debe tener un número.";
      } else {
        this.formErrors.passwordError = "";
      }
    },

    submitForm() {
      // if there are no errors send the data
      if (!this.formErrors.usernameError && !this.formErrors.passwordError) {
        console.log("Formulario válido, logeando usuario...");
        console.log(this.formData);
        axios.post('https://boardgameapi-production.up.railway.app/token', {}, {
          auth: {
            username: this.formData.username,
            password: this.formData.password
          }
        })
        .then(response => {
          const token = response.data;
          console.log("Token de acceso", token)
          console.log("Usuario...", this.formData.username)
          // Save data using the UserStore
          const userStore = useUserStore()
          userStore.login()
          userStore.setToken(token)
          userStore.setUsername(this.formData.username)
          this.$router.push('/') // redirect to home after registering
        })
        .catch(error=>
          (console.log(error)
        ))
      }
    },
  },
};
</script>

<style>
.error {
  color: red;
}
form {
  margin: 0 auto
}
</style>
