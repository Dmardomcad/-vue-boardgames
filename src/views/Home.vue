<template>
  <h1 class="home-title">Bienvenidos a GameHub</h1>
  <section class="home">
    <img
      class="home-img"
      src="https://images.pexels.com/photos/8111328/pexels-photo-8111328.jpeg?cs=srgb&dl=pexels-pavel-danilyuk-8111328.jpg&fm=jpg"
      alt=""
    />
    <div class="home-info">
      <h1>Bienvenido a GameHub</h1>
      <h2>Tu portal de juegos de mesa y cada día el de más gente.</h2>
      <p>
        Proximamente podrás encontrar personas en tu zona para jugar a juegos de
        mesa.
      </p>
      <p>Puedes ir a nuestra sección de juegos para buscar información sobre distintos juegos y comentar junto a otros usuarios</p>
      <router-link to="/boardgames">
            <button class="btn-primary">AQUÍ</button>
      </router-link>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>

</style>
