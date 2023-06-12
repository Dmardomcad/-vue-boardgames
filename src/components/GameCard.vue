<template>
  <div class="game-card">
    <router-link :to="'/boardgames/' + game.id">
      <h2>{{ game.name }}</h2>
    </router-link>
    <p>{{ game.description }}</p>
    <p>Dificultad: {{ game.difficulty }}</p>
  </div>
</template>

<script>
    export default {
        props: {
            game: {
                Type: Object,
                required: true,
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>