import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import AdminPage from '../pages/AdminPage.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Admin',
    component: AdminPage
  },
  // Add more routes here as needed
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
