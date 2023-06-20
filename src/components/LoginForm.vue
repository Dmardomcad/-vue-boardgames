<template>
  <h1>LOGIN</h1>
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
    <button class="btn-primary" type="submit">Login</button>
    <p><router-link to="/register">No tengo una cuenta...</router-link></p>
  </form>
</template>

<script>
import axios from "axios";
import { useUserStore } from "../stores/UserStore";

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
      const passwordRegex = /^(?=.*[0-9]).{5,10}$/;
      if (!passwordRegex.test(this.formData.password)) {
        this.formErrors.passwordError =
          "La contraseña debe tener de 5 a 10 caracteres, y al menos debe tener un número.";
      } else {
        this.formErrors.passwordError = "";
      }
    },

    submitForm() {
      if (!this.formData.username.trim() && !this.formErrors.usernameError) {
        this.formErrors.usernameError =
          "Por favor, introduce tu nombre de usuario.";
      }

      if (!this.formData.password.trim() && !this.formErrors.passwordError) {
        this.formErrors.passwordError = "Por favor, introduce tu contraseña.";
      }
      // if there are no errors send the data
      if (!this.formErrors.usernameError && !this.formErrors.passwordError) {
        axios
          .post(
            "https://boardgameapi-production.up.railway.app/token",
            {},
            {
              auth: {
                username: this.formData.username,
                password: this.formData.password,
              },
            }
          )
          .then((response) => {
            const token = response.data;
            // Save data using the UserStore
            const userStore = useUserStore();
            userStore.login();
            userStore.setToken(token);
            userStore.setUsername(this.formData.username);
            this.$router.push("/"); // redirect to home after registering
          })
          .catch(
            () =>
              (this.formErrors.passwordError =
                "Tu contraseña o nombre de usuario no coinciden")
          );
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
  margin: 0 auto;
}
</style>
