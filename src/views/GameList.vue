<template>
  <h1 class="principal-title">LISTA DE JUEGOS</h1>
  <GameListComponent />
</template>

<script>
import GameListComponent from "../components/GameListComponent.vue";

export default {
  mounted() {
      window.scrollTo(0, 0);
  },
  components: { GameListComponent },
};
</script>

<style lang="scss" scoped></style>
