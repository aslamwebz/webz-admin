import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import AdminPage from '../pages/AdminPage.vue'

// Lazy load pages
const Dashboard = () => import('@/pages/Dashboard.vue')
const ProfileSettings = () => import('@/pages/settings/profile.vue')
const AccountSettings = () => import('@/pages/settings/account.vue')
const AppearanceSettings = () => import('@/pages/settings/appearance.vue')
const NotificationsSettings = () => import('@/pages/settings/notifications.vue')
const DisplaySettings = () => import('@/pages/settings/display.vue')

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: AdminPage,
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: Dashboard,
      },
      {
        path: 'settings/profile',
        name: 'ProfileSettings',
        component: ProfileSettings,
      },
      {
        path: 'settings/account',
        name: 'AccountSettings',
        component: AccountSettings,
      },
      {
        path: 'settings/appearance',
        name: 'AppearanceSettings',
        component: AppearanceSettings,
      },
      {
        path: 'settings/notifications',
        name: 'NotificationsSettings',
        component: NotificationsSettings,
      },
      {
        path: 'settings/display',
        name: 'DisplaySettings',
        component: DisplaySettings,
      },
      // Redirect /settings to /settings/profile
      {
        path: 'settings',
        redirect: 'settings/profile',
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
