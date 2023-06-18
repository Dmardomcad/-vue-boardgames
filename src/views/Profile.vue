<template>
  <div>
    <h1>Profile</h1>
    <div>
      <p><strong>Username:</strong> {{ username }}</p>
      <p><strong>Email:</strong> {{ email }}</p>
    </div>
    <div v-if="!comments">
      <h2>Este usuario no ha realizado ningún comentario...</h2>
    </div>
    <div v-else-if="comments && comments.length > 0">
      <h2>Comentarios:</h2>
      <ul>
        <li v-for="comment in comments" :key="comment.id">
          {{ comment.text }}
        </li>
      </ul>
    </div>
    <button @click="logout">Logout</button>
  </div>
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
          console.log(userData);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    logout() {
      const userStore = useUserStore();
      userStore.logout();
      this.$router.push("/");
    },
  },
};
</script>
