<template>
  <nav class="nav-main">
    <ul class="nav-list">
      <li class="nav-item">
        <router-link to="/"
          ><img class="nav-img" src="@/assets/img/dice-game-icon.png" alt=""
        /></router-link>
      </li>
      <li class="nav-item">
        <router-link to="/boardgames">Lista de juegos</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/publishers">Editoriales</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/community">Comunidades</router-link>
      </li>
      <li class="nav-item" v-if="isLoggedIn">
        <router-link to="/profile"> Perfil</router-link>
      </li>
      <li class="nav-item" v-else>
        <router-link to="/register">
          <button class="btn-primary">REGISTRARSE</button></router-link
        >
        <router-link to="/login"> <sub>¿Ya tienes cuenta?...</sub></router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import { computed, onMounted } from "vue";
import { useUserStore } from "@/stores/UserStore.js";

export default {
  setup() {
    const userStore = useUserStore();
    const isLoggedIn = computed(() => userStore.isLoggedIn);

    onMounted(() => {
      if (localStorage.getItem("token")) {
        userStore.login();
      }
    });
    return {
      isLoggedIn,
    };
  },
};
</script>

<style lang="scss" scoped>
.nav-img {
  width: 3rem;
}
</style>
