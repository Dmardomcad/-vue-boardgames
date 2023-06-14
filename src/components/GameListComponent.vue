<template>
  <section>
    <div v-if="loading"><Spinner /></div>
    <div v-else>
      <SearchBar @search="performSearch"/>
      <GameCard v-for="game in filteredGames" :key="game.id" :game="game" />
    </div>
  </section>
</template>

<script>
import GameCard from "./GameCard.vue";
import Spinner from "./Spinner.vue";
import axios from "axios";
import SearchBar from './SearchBar.vue'

export default {
  components: {
    GameCard,
    Spinner,
    SearchBar,
  },
  data() {
    return {
      loading: true,
      games: [],
      filteredGames: []
    };
  },
  mounted() {
    axios
      .get("https://boardgameapi-production.up.railway.app/boardgames")
      .then((response) => {
        this.loading = false;
        this.games = response.data;
        this.filteredGames = response.data
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    performSearch(searchTerm) {
      if(searchTerm) {
        this.filteredGames = this.games.filter(game => 
        game.name.toLowerCase().includes(searchTerm.toLowerCase()))
      }
      else {
        this.filteredGames = this.games
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
