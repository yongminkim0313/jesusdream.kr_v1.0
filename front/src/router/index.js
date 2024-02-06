// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
      },
      {
        path: 'camplive',
        name: 'camplive',
        component: () => import('@/views/CampLive.vue'),
      },
      {
        path: 'newscast',
        name: 'newscast',
        component: () => import('@/views/NewsCast.vue'),
      },
      {
        path: 'admin',
        name: 'admin',
        component: () => import('@/views/Admin.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
