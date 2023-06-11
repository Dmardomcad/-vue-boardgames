<script setup>
import Navbar from './components/shared/Navbar.vue';
import FooterNav from './components/shared/FooterNav.vue';
import Home from './views/Home.vue';
</script>

<template>
  <header>
    <Navbar/>
  </header>

  <main>
    <router-view/>
  </main>
  <footer>
    <FooterNav/>
  </footer>
</template>

<style scoped>
header {
  line-height: 1.5;
  display: flex;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
