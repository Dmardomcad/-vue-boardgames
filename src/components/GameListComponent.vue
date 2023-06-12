<template>
  <section>
    <div v-if="loading"><Spinner /></div>
    <div v-else>
      <GameCard v-for="game in games" :key="game.id" :game="game" />
    </div>
  </section>
</template>

<script>
import GameCard from "./GameCard.vue";
import Spinner from "./Spinner.vue";
import axios from "axios";

export default {
  components: {
    GameCard,
    Spinner,
  },
  data() {
    return {
      loading: true,
      games: [],
    };
  },
  mounted() {
    axios
      .get("https://boardgameapi-production.up.railway.app/boardgames")
      .then((response) => {
        this.loading = false;
        this.games = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style lang="scss" scoped></style>
