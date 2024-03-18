<template>
<header :class="{ 'scrolled-nav': scrollPosition }">
  <nav class="nav-main">
    <div class="nav-logo">
      <router-link to="/"
          ><img class="nav-img" src="@/assets/img/board2play-logo.png" alt=""
        /></router-link>
    </div>
    <ul v-show="!mobile" class="nav-list">
      <li class="nav-item">
        <router-link to="/">Inicio</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/boardgames">Lista de juegos</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/publishers">Editoriales</router-link>
      </li>
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
            <p class="nav-item-hasaccount">¿Ya tienes cuenta?</p>
          </router-link>
        </div>
      </li>
    </ul>
    <div class="mobile-menu">
      <button @click="toggleMobileNav" v-show="mobile" class="mobile-menu-togglebutton" :class="{'icon-active' : mobileNav}"><img class="mobile-vector-icon" src="/src/assets/img/bars-solid.svg"/></button>
    </div>

    <transition name="mobile-nav">
      <ul v-show="mobileNav" class="dropdown-nav">
        <li class="nav-item">
          <router-link to="/">Inicio</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/boardgames">Lista de juegos</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/publishers">Editoriales</router-link>
        </li>
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
              <p class="nav-item-hasaccount">¿Ya tienes cuenta?</p>
            </router-link>
          </div>
        </li>
      </ul>
    </transition>
  </nav>
</header>
</template>

<script>
import { useUserStore } from "@/stores/UserStore.js";

export default {
  data(){
    return{
      scrollPosition: null,
      mobile: null,
      mobileNav: null,
      windowWith: null,
    }
  },
  created() {
    window.addEventListener('resize', this.checkScreen)
    this.checkScreen()
  },
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
    toggleMobileNav() {
      this.mobileNav = !this.mobileNav
    },
    checkScreen() {
      this.windowWith = window.innerWidth;
      if (this.windowWith <= 750) {
        this.mobile = true
        return
      }
      this.mobile = false
      this.mobileNav = false
      return
    }
  },
};
</script>

<style lang="scss" scoped>
.nav-img {
  width: 10rem;
}

header {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #ffffff;
}
.mobile-menu{
  display: flex;
}
.mobile-vector-icon {
  width: 50px;
}
.logo {
  display: block;
  margin: 0 auto 2rem;
}
.dropdown-nav{
  display: flex;
  flex-direction: column;
  border-style: solid;
  border-width: thin;
  border-radius: 5px;
  width: 100%;
  max-width: 250px;
  height: 100%;
  position: fixed;
  background-color: #f7f7f7;
  top: 0;
  left: 0;

  li {
    margin-left: 0;
    .link {
      color: #000;
    }
  }
}
.nav-item-hasaccount{
  margin-left: 10px;
}
.dropdown-nav > .nav-item{
  margin-bottom: 5px;
  display: flex;
  justify-content: center;
}
.mobile-nav-enter-active,
.mobile-nav-leave-active {
    transition: 1s ease-in-out;
}

  .mobile-nav-enter-from,
  .mobile-nav-leave-to {
    transform: translateX(-250px);
}

  .mobile-nav-enter-to {
    transform: translateX(0px)
}
.nav-list > .nav-item {
  list-style: none;
  margin-right: 2rem;
}

@media (min-width: 751px) {
    .mobile-menu {
    display: none;
  }
}
</style>
