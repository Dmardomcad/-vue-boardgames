<template>
  <article class="game-card">
    <router-link :to="'/boardgames/' + game.id" class="game-card-link">
      <img class="game-img" :src="game.listImage" :alt="game.name" />
      <section class="game-card-details">
        <h2 class="game-card-details-name">{{ game.name }}</h2>
        <p class="game-category">{{ game.category }}</p>
        <p class="game-card-commentary">Comentarios: {{ game.comment.length }}</p>
      </section>
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

<style lang="scss" scoped>

</style>
