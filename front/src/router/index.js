// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'home',
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
      {
        path: 'boarddetail',
        name: 'boarddetail',
        component: () => import('@/views/BoardDetail.vue'),
      },
      {
        path: 'boardlist',
        name: 'boardlist',
        component: () => import('@/views/BoardList.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
