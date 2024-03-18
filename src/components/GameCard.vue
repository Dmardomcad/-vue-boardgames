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
.game-card {
  box-sizing: border-box;
  width: 21%;
  background: white;
  border: 1px solid white;
  box-shadow: 12px 17px 51px rgba(0, 0, 0, 0.22);
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
  transition: all 0.5s;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  font-weight: bolder;
  color: black;
}

.game-card:hover {
  border: 1px solid black;
  transform: scale(1.05);
}

.game-card:active {
  transform: scale(0.95);
}
</style>
