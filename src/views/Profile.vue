<template>
  <h1 class="principal-title">Perfil</h1>
  <section class="user-page">
    <section class="user-info">
      <h2>{{ username }}</h2>
      <img class="profile-picture" src="../assets/img/profile-picture-1.png">
      <p>Email: {{ email }}</p>
    </section>

    <section class="user-comments" v-if="comments.length === 0">
      <h2>Comentarios:</h2>
      <h2>Este usuario no ha realizado ningún comentario...</h2>
    </section>
    <section class="user-comments" v-else-if="comments && comments.length > 0">
      <h2 class="profile-comments-title">Comentarios:</h2>
      <ul class="profile-comments-list">
        <li
          class="profile-comments-list-item"
          v-for="comment in comments"
          :key="comment.id"
        >
          <h2>{{ comment.name }}</h2>
          <router-link class="profile-comment-link" :to="'/boardgames/' + comment.boardgameId">
            <p class="profile-comment-content">{{ comment.content }}</p>
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
      country: "",
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
