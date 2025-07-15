import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import AdminPage from '../pages/AdminPage.vue'

// Lazy load pages
const Dashboard = () => import('@/pages/Dashboard.vue')
const ProfileSettings = () => import('@/pages/settings/profile.vue')
const AccountSettings = () => import('@/pages/settings/account.vue')
const AppearanceSettings = () => import('@/pages/settings/appearance.vue')
const NotificationsSettings = () => import('@/pages/settings/notifications.vue')
const DisplaySettings = () => import('@/pages/settings/display.vue')

// Task pages
const Tasks = () => import('@/pages/tasks/index.vue')
const TaskDetails = () => import('@/pages/tasks/[id].vue')
const TaskForm = () => import('@/pages/tasks/TaskForm.vue')

// Error pages
const Unauthorized = () => import('@/pages/errors/Unauthorized.vue')
const Forbidden = () => import('@/pages/errors/Forbidden.vue')
const NotFound = () => import('@/pages/errors/NotFound.vue')
const InternalServerError = () => import('@/pages/errors/InternalServerError.vue')
const ServiceUnavailable = () => import('@/pages/errors/ServiceUnavailable.vue')

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
