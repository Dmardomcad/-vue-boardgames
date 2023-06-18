<template>
  <div>
    <h1>Detalles del juego</h1>
    <h2>{{ game.name }}</h2>
    <img :src="game.detailImage" :alt="game.name" />
    <h3>Dificultad: {{ game.difficulty }}</h3>
    <p>Descripcion: {{ game.description }}</p>
    <h2>ID del juego: {{ $route.params.id }}</h2>
  </div>
  <div v-if="comments.length > 0">
    <h2>Comentarios:</h2>
    <label for="comment">Aquí tu comentario</label>
    <input type="text" placeholder="Comentario..." name="comment" />
    <ul>
      <li v-for="comment in comments" :key="comment.id">
        <h4>{{ comment.username }}</h4>
        <p>{{ comment.content }}</p>
      </li>
    </ul>
  </div>
  <div v-else>
    <h2>Este juego no tiene comentarios</h2>
    <label for="comment">Se el primero en comentar...</label>
    <input type="text" placeholder="Comentario..." name="comment" />
  </div>
</template>

<script>
import axios from "axios";
import { useUserStore } from "@/stores/UserStore.js";

export default {
  data() {
    return {
      game: "",
      comments: [],
    };
  },
  mounted() {
    this.fetchGameDetails();
  },
  methods: {
    fetchGameDetails() {
      const gameId = this.$route.params.id;
      axios
        .get(
          `https://boardgameapi-production.up.railway.app/boardgames/${gameId}`
        )
        .then((response) => {
          this.game = response.data;
          this.comments = response.data.comments || [];
          console.log(this.game.comments);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
