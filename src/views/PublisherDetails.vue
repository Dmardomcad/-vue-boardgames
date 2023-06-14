<template>
  <div>
    <h1>{{ publisher.name }}</h1>
    <h2>Juegos:</h2>
    <div v-for="game in publisher.boardgame" :key="game.id">
      <h3>{{ game.name }}</h3>
      <p>{{ game.description }}</p>
      <img :src="game.detailImage" :alt="game.name" />
      <p>Duración: {{ game.duration }} minutos</p>
      <p>Dificultad: {{ game.difficulty }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      publisher: '',
    };
  },
  mounted() {
    this.fetchPublisherDetails();
  },
  methods: {
    fetchPublisherDetails() {
      const publisherID = this.$route.params.id;
      axios
        .get(`https://boardgameapi-production.up.railway.app/publishers/${publisherID}`)
        .then((response) => {
          this.publisher = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
