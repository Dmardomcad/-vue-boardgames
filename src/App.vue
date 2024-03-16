<script setup>
import Navbar from "./components/shared/Navbar.vue";
import FooterNav from "./components/shared/FooterNav.vue";
import Home from "./views/Home.vue";
</script>

<template>
    <Navbar />
  <main>
    <router-view />
  </main>
  <footer>
    <FooterNav />
  </footer>
</template>

<style scoped>


</style>
