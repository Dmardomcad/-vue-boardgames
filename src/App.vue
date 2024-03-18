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
    <FooterNav />
</template>

<style scoped>


</style>
