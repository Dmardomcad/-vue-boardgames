import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import GameList from "../views/GameList.vue";
import PublishersList from "../views/PublishersList.vue";
import PublisherDetails from "../views/PublisherDetails.vue";
import GameDetails from "../views/GameDetails.vue";
import Profile from "../views/Profile.vue";
import Register from "../views/Register.vue";
import Login from "../views/Login.vue";
import NotFound from "../components/shared/NotFound.vue";
import Contact from "../views/Contact.vue";
import { useUserStore } from "../stores/UserStore";

const routes = [
  { path: "/", component: Home },
  { path: "/boardgames", component: GameList },
  { path: "/boardgames/:id", component: GameDetails },
  { path: "/publishers", component: PublishersList },
  { path: "/publishers/:id", component: PublisherDetails },
  { path: "/contact", component: Contact },
  { path: 
    "/profile", 
    component: Profile,
    meta:{requiresAuth: true}
  },
  { path: "/register", component: Register },
  { path: "/login", component: Login },
  { path: "/:pathMatch(.*)*", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  if(userStore.isLoggedIn && (to.path === '/login' || to.path === '/register')){
    next('/profile')
  }
  else if(to.meta.requiresAuth && !userStore.isLoggedIn) {
    next('/login')
  } else {
    next()
  }
})

export default router;
