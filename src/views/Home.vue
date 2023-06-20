<template>
  <h1 class="home-title">Bienvenidos a GameHub</h1>
  <section class="home">
    <img
      class="home-img"
      src="https://images.pexels.com/photos/8111328/pexels-photo-8111328.jpeg?cs=srgb&dl=pexels-pavel-danilyuk-8111328.jpg&fm=jpg"
      alt=""
    />
    <div class="home-info">
      <h1 class="home-info-title">Bienvenido a GameHub</h1>
      <h2 class="home-info-subtitle">Tu portal de juegos de mesa y cada día el de más gente.</h2>
      <p class="home-info-text">
        Proximamente podrás encontrar personas en tu zona para jugar a juegos de
        mesa.
      </p>
      <p class="home-info-text">
        Puedes ir a nuestra sección de juegos para buscar información sobre
        distintos juegos y comentar junto a otros usuarios, buscar distintos juegos con categorías y comprobar la dificultad de cada uno.
      </p>
      <router-link to="/boardgames">
        <button class="btn-primary">VER LISTA DE JUEGOS</button>
      </router-link>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
  .home-info-text{
    padding: 1rem;
  }
</style>
