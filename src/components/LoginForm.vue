<template>
  <h1>LOGIN</h1>
  <form @submit.prevent="submitForm">
    <div>
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
    <button type="submit">Registrarse</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        email: "",
        password: "",
      },
      formErrors: {
        emailError: "",
        passwordError: "",
      },
    };
  },
  methods: {
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
      // Si no hay errores, enviar el formulario
      if (!this.formErrors.emailError && !this.formErrors.passwordError) {
        console.log("Formulario válido, logeando usuario...");
        console.log(this.formData);
      }
    },
  },
};
</script>

<style>
.error {
  color: red;
}
</style>
