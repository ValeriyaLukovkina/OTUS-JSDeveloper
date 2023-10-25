import { createRouter, createWebHistory } from "vue-router"
import Setting from "./components/Setting.vue"
import Game from "./components/Game.vue"

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Setting',
      component: Setting
    },
    {
      path: '/game',
      name: 'Game',
      component: Game
    }
  ]
})
