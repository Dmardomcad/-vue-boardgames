<template>
  <section class="home">
    <section class="home-video-section">
      <h1 class="home-title">Bienvenidos a Board2Play</h1>
      <video class="home__video" loop="true" autoplay="autoplay" muted>
        <source src="../assets/video/pexels-pavel-danilyuk-shorter.mp4">
        Su navegador no soporta contenido multimedia
      </video>
      <img class="video-image-logo" src="../assets/img/board2play-background.png"/>
    </section>
    <section class="home-info">
      <h2 class="home-info-subtitle">
        Tu portal de juegos de mesa y cada día el de más gente.
      </h2>
      <p class="home-info-text">
        Puedes ir a nuestra sección de juegos para buscar información sobre
        distintos juegos y comentar junto a otros usuarios, buscar distintos
        juegos filtrando por diferentes categorías o usar nuestro buscador.
        Recuerda que puedes consultar tus comentarios desde tu perfil.
        ¡A jugar!
      </p>
      <router-link class="home-btn-primary" to="/boardgames">
        <button class="btn-primary">LISTA DE JUEGOS</button>
      </router-link>
    </section>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
</style>
