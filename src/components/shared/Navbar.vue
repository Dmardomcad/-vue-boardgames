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
<!--  TFG page    
      <li class="nav-item">
        <router-link to="/community">Comunidades</router-link>
      </li> -->
      <li class="nav-item" v-if="user.isLoggedIn">
        <div>
          <router-link to="/profile"> Perfil</router-link>
          <button class="btn-primary-logout" @click="logout">Logout</button>
        </div>
      </li>
      <li class="nav-item" v-else>
        <div class="nav-item-register">
          <router-link to="/register">
            <button class="btn-primary">REGISTRARSE</button>
          </router-link>
          <router-link to="/login">
            <sub>¿Ya tienes cuenta?...</sub>
          </router-link>
        </div>
      </li>
    </ul>
  </nav>
</template>

<script>
import { useUserStore } from "@/stores/UserStore.js";

export default {
  setup() {
    const user = useUserStore();
    return {
      user,
    };
  },
  methods: {
    logout() {
      const userStore = useUserStore();
      userStore.logout();
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped>
.nav-img {
  width: 3rem;
}
</style>
