import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import AdminPage from '../pages/AdminPage.vue'

// Lazy load pages with webpackChunkName for better code splitting
const Dashboard = () => import(/* webpackChunkName: "dashboard" */ '@/pages/Dashboard.vue')
const ProfileSettings = () => import(/* webpackChunkName: "settings" */ '@/pages/settings/profile.vue')
const AccountSettings = () => import(/* webpackChunkName: "settings" */ '@/pages/settings/account.vue')
const AppearanceSettings = () => import(/* webpackChunkName: "settings" */ '@/pages/settings/appearance.vue')
const NotificationsSettings = () => import(/* webpackChunkName: "settings" */ '@/pages/settings/notifications.vue')
const DisplaySettings = () => import(/* webpackChunkName: "settings" */ '@/pages/settings/display.vue')

// Task pages
const Tasks = () => import(/* webpackChunkName: "tasks" */ '@/pages/tasks/index.vue')
const TaskDetails = () => import(/* webpackChunkName: "tasks" */ '@/pages/tasks/[id].vue')
const TaskForm = () => import(/* webpackChunkName: "tasks" */ '@/pages/tasks/TaskForm.vue')

// Error pages (grouped together as they're rarely needed)
const Unauthorized = () => import(/* webpackChunkName: "errors" */ '@/pages/errors/Unauthorized.vue')
const Forbidden = () => import(/* webpackChunkName: "errors" */ '@/pages/errors/Forbidden.vue')
const NotFound = () => import(/* webpackChunkName: "errors" */ '@/pages/errors/NotFound.vue')
const InternalServerError = () => import(/* webpackChunkName: "errors" */ '@/pages/errors/InternalServerError.vue')
const ServiceUnavailable = () => import(/* webpackChunkName: "errors" */ '@/pages/errors/ServiceUnavailable.vue')

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
      // Tasks routes
      {
        path: 'tasks',
        name: 'Tasks',
        component: Tasks,
      },
      {
        path: 'tasks/new',
        name: 'NewTask',
        component: TaskForm,
      },
      {
        path: 'tasks/:id',
        name: 'TaskDetails',
        component: TaskDetails,
        props: true,
      },
      {
        path: 'tasks/:id/edit',
        name: 'EditTask',
        component: TaskForm,
        props: true,
      },
      // Error pages
      {
        path: '/401',
        name: 'Unauthorized',
        component: Unauthorized,
        meta: { layout: 'empty' }
      },
      {
        path: '/403',
        name: 'Forbidden',
        component: Forbidden,
        meta: { layout: 'empty' }
      },
      {
        path: '/404',
        name: 'NotFound',
        component: NotFound,
        meta: { layout: 'empty' }
      },
      {
        path: '/500',
        name: 'InternalServerError',
        component: InternalServerError,
        meta: { layout: 'empty' }
      },
      {
        path: '/503',
        name: 'ServiceUnavailable',
        component: ServiceUnavailable,
        meta: { layout: 'empty' }
      },
      // Catch-all route must be at the end
      {
        path: '/:pathMatch(.*)*',
        name: 'NotFoundCatchAll',
        component: NotFound,
        meta: { layout: 'empty' }
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
