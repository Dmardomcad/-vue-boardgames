<template>
    <h1>{{ publisher.name }}</h1>
    <p>{{ publisher.info }}</p>
    <section>
      <h2>Juegos:</h2>
        <div class="game-card-container">
          <GameCard v-for="game in publisher.boardgame" :key="game.id" :game="game" />
        </div>
    </section>
</template>

<script>
import GameCard from "../components/GameCard.vue";
import axios from "axios";

export default {
  components: {
    GameCard
  },
  data() {
    return {
      publisher: "",
    };
  },
  mounted() {
    this.fetchPublisherDetails();
  },
  methods: {
    fetchPublisherDetails() {
      const publisherID = this.$route.params.id;
      axios
        .get(
          `https://boardgameapi-production.up.railway.app/publishers/${publisherID}`
        )
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
  h2 {
    display: flex;
    justify-content: center;
    margin: 1rem;
  }
</style>
