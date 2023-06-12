import { createRouter, createWebHashHistory } from "vue-router";

import Home from "../views/Home.vue";
import GameList from "../views/GameList.vue";
import PublishersList from "../views/PublishersList.vue";
import GameDetails from "../views/GameDetails.vue";
import Profile from "../views/Profile.vue";
import Community from "../views/Community.vue";
import Register from "../views/Register.vue";
import Login from "../views/Login.vue";
import NotFound from "../components/shared/NotFound.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/boardgames", component: GameList },
  { path: "/boardgames/:id", component: GameDetails },
  { path: "/publishers", component: PublishersList },
  { path: "/community", component: Community },
  { path: "/profile", component: Profile },
  { path: "/register", component: Register },
  { path: "/login", component: Login },
  { path: "/:pathMatch(.*)*", component: NotFound },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
