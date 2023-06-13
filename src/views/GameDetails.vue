<template>
  <div>
    <h1>Detalles del juego</h1>
    <h2>{{ game.name }}</h2>
    <img :src="game.detailImage" :alt="game.name">
    <h3>Dificultad: {{ game.difficulty }}</h3>
    <p>Descripcion: {{ game.description }}</p>
    <h2>ID del juego: {{ $route.params.id }}</h2>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      game: "",
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
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
