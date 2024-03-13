<template>
  <article class="game-card">
    <router-link :to="'/boardgames/' + game.id" class="game-card-link">
      <img class="game-img" :src="game.detailImage" :alt="game.name" />
      <h2>{{ game.name }}</h2>
      <p class="game-category">{{ game.category }}</p>
      <p>Comentarios: {{ game.comment.length }}</p>
    </router-link>
  </article>
</template>

<script>
export default {
  props: {
    game: {
      Type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped></style>
