<template>
  <section>
    <div v-if="loading">
      <Spinner />
    </div>
    <div v-else>
      <SearchBar @search="performSearch" />
      <div class="category-buttons">
        <button
          v-for="category in categories"
          :key="category"
          :class="{
            'boardgames-category-button': true,
            selected: selectedCategory === category,
          }"
          @click="filterByCategory(category)"
        >
          {{ category }}
        </button>
      </div>
      <div class="game-card-container">
        <GameCard v-for="game in displayedGames" :key="game.id" :game="game" />
      </div>
      <paginate
        :current-page="currentPage"
        :total-pages="totalPages"
        @page-change="changePage"
      ></paginate>
    </div>
  </section>
</template>

<script>
import GameCard from "./GameCard.vue";
import Spinner from "./Spinner.vue";
import axios from "axios";
import SearchBar from "./SearchBar.vue";
import Paginate from "./Paginate.vue";

export default {
  components: {
    GameCard,
    Spinner,
    SearchBar,
    Paginate,
  },
  data() {
    return {
      loading: true,
      games: [],
      filteredGames: [],
      currentPage: 1,
      pageSize: 4,
      categories: ["Miniaturas", "Cartas", "Habilidad", "Social"],
      selectedCategory: "",
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.filteredGames.length / this.pageSize);
    },
    displayedGames() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.filteredGames.slice(startIndex, endIndex);
    },
  },
  mounted() {
    this.fetchBoardgames();
  },
  methods: {
    fetchBoardgames() {
      axios
      .get("https://boardgameapi-production.up.railway.app/boardgames")
      .then((response) => {
        this.loading = false;
        this.games = response.data;
        this.filteredGames = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
    },
    performSearch(searchTerm) {
      if (searchTerm) {
        if (this.selectedCategory === "") {
          this.filteredGames = this.games.filter((game) =>
            game.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
        } else {
          this.filteredGames = this.games.filter(
            (game) =>
              game.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
              game.category === this.selectedCategory
          );
        }
      } else {
        if (this.selectedCategory === "") {
          this.filteredGames = this.games;
        } else {
          this.filteredGames = this.games.filter(
            (game) => game.category === this.selectedCategory
          );
        }
      }
      this.currentPage = 1;
      this.scrollToTop();
    },
    changePage(pageNumber) {
      this.currentPage = pageNumber;
      this.scrollToTop();
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "auto",
      });
    },
    filterByCategory(category) {
      if (this.selectedCategory === category) {
        this.selectedCategory = "";
      } else {
        this.selectedCategory = category;
      }
      this.performSearch("");
    },
  },
};
</script>

<style lang="scss" scoped></style>
