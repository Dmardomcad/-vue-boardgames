<template>
  <h1 class="principal-title">CONTACTO</h1>
  <section class="contact-section">
    <form class="contact-form" @submit.prevent="submitForm">
      <div class="contact-form-field">
        <label class="contact-label-email" for="email">Email:</label>
        <input
          class="contact-input-email"
          placeholder="Email..."
          type="email"
          id="email"
          v-model.trim="email"
          @input="validateEmail"
        />
        <span v-if="emailError" class="error-message">{{ emailError }}</span>
      </div>
      <div class="contact-form-field-textarea">
        <label class="contact-label-message" for="message">Mensaje:</label>
        <textarea
          class="contact-textarea"
          placeholder="Por favor introduce un mensaje..."
          id="message"
          v-model="message"
          @input="validateMessage"
        ></textarea>
        <span v-if="messageError" class="error-message">{{
          messageError
        }}</span>
      </div>
      <button class="btn-primary" type="submit">Enviar</button>
    </form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      message: "",
      emailError: "",
      messageError: "",
    };
  },
  methods: {
    validateEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,40}$/;
      if (!emailRegex.test(this.email)) {
        this.emailError = "Por favor, escribe un correo electrónico válido.";
      } else {
        this.emailError = "";
      }
    },
    validateMessage() {
      if (!this.message) {
        this.messageError = "Por favor, escribe un mensaje.";
      } else if (this.message.length > 500) {
        this.messageError = "El mensaje es demasiado largo.";
      } else {
        this.messageError = "";
      }
    },
    submitForm() {
      this.validateEmail();
      this.validateMessage();
      if (!this.email && !this.emailError) {
        this.emailError = "Por favor, escribe un correo electrónico.";
      }
      if (!this.emailError && !this.messageError) {
        this.email = "";
        this.message = "";
        this.emailError = "";
        this.messageError = "";
      }
    },
  },
};
</script>

<style>
.error-message {
  color: red;
  display: flex;
  justify-content: center;
  font-family: "Ubuntu", sans-serif;
}
</style>
