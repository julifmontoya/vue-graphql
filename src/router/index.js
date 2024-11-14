import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/rocket',
      name: 'RocketList',
      component: () => import('../views/RocketList.vue')
    },
    {
      path: '/rocket/:id',
      name: 'Rocket',
      component: () => import('../views/RocketItem.vue')
    },
    {
      path: '/mutation',
      name: 'Mutation',
      component: () => import('../views/Mutation.vue')
    },
  ]
})

export default router
