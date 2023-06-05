import { createRouter, createWebHashHistory } from 'vue-router'

import Home from '../views/Home.vue'
import GameList from '../views/GameList.vue'
import Profile from '../views/Profile.vue'
import NotFound from '../components/shared/NotFound.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/boardgames', component: GameList },
  { path: '/profile', component: Profile},
  { path: '/:pathMatch(.*)*', component: NotFound },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router