<template>
  <h1 class="home-title">Bienvenidos a GameHub</h1>
  <section class="home">
    <section class="home-video-section">
      <video class="home__video" loop="true" autoplay="autoplay" muted>
        <source src="../assets/video/pexels-pavel-danilyuk-shorter.mp4">
        Su navegador no soporta contenido multimedia
      </video>
    </section>
    <section class="home-info">
      <h1 class="home-info-title">Bienvenido a GameHub</h1>
      <h2 class="home-info-subtitle">
        Tu portal de juegos de mesa y cada día el de más gente.
      </h2>
      <p class="home-info-text">
        Proximamente podrás encontrar personas en tu zona para jugar a juegos de
        mesa.
      </p>
      <p class="home-info-text">
        Puedes ir a nuestra sección de juegos para buscar información sobre
        distintos juegos y comentar junto a otros usuarios, buscar distintos
        juegos con categorías y comprobar la dificultad de cada uno.
      </p>
      <router-link to="/boardgames">
        <button class="btn-primary">VER LISTA DE JUEGOS</button>
      </router-link>
    </section>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
</style>
