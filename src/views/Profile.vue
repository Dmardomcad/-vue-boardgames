<template>
  <h1 class="principal-title">Perfil</h1>
  <section class="user-page">
    <h1>Datos del usuario</h1>
    <section class="user-info">
      <p><strong>Nombre de usuario:</strong> {{ username }}</p>
      <p><strong>Email:</strong> {{ email }}</p>
    </section>

    <section class="user-comments" v-if="comments.length === 0">
      <h2>Comentarios:</h2>
      <h2>Este usuario no ha realizado ningún comentario...</h2>
    </section>
    <section class="user-comments" v-else-if="comments && comments.length > 0">
      <h1>Comentarios de este usuario:</h1>
      <ul class="profile-comments-list">
        <li
          class="profile-comments-list-item"
          v-for="comment in comments"
          :key="comment.id"
        >
          <router-link :to="'/boardgames/' + comment.boardgameId">
            <p>{{ comment.content }}</p>
          </router-link>
        </li>
      </ul>
    </section>
  </section>
</template>

<script>
import axios from "axios";
import { useUserStore } from "../stores/UserStore";

export default {
  computed: {
    username() {
      const userStore = useUserStore();
      return userStore.username;
    },
  },

  data() {
    return {
      email: "",
      comments: [],
    };
  },

  mounted() {
    this.fetchUserData();
  },

  methods: {
    fetchUserData() {
      axios
        .get(
          `https://boardgameapi-production.up.railway.app/users/${this.username}`
        )
        .then((response) => {
          const userData = response.data;
          this.email = userData.email;
          this.comments = userData.comments;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>
