import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import AdminPage from '../pages/AdminPage.vue'

// Lazy load pages with webpackChunkName for better code splitting
const Dashboard = () => import(/* webpackChunkName: "dashboard" */ '@/pages/Dashboard.vue')

// Auth pages
const LoginForm1 = () => import(/* webpackChunkName: "auth" */ '@/pages/Auth/Login/LoginForm1.vue')
const LoginForm2 = () => import(/* webpackChunkName: "auth" */ '@/pages/Auth/Login/LoginForm2.vue')
const LoginForm3 = () => import(/* webpackChunkName: "auth" */ '@/pages/Auth/Login/LoginForm3.vue')
const LoginForm4 = () => import(/* webpackChunkName: "auth" */ '@/pages/Auth/Login/LoginForm4.vue')
const LoginForm5 = () => import(/* webpackChunkName: "auth" */ '@/pages/Auth/Login/LoginForm5.vue')
const ProfileSettings = () => import(/* webpackChunkName: "settings" */ '@/pages/settings/profile.vue')
const AccountSettings = () => import(/* webpackChunkName: "settings" */ '@/pages/settings/account.vue')
const AppearanceSettings = () => import(/* webpackChunkName: "settings" */ '@/pages/settings/appearance.vue')
const NotificationsSettings = () => import(/* webpackChunkName: "settings" */ '@/pages/settings/notifications.vue')
const DisplaySettings = () => import(/* webpackChunkName: "settings" */ '@/pages/settings/display.vue')
const BillingSettings = () => import(/* webpackChunkName: "settings" */ '@/pages/settings/billing.vue')
const Upgrade = () => import(/* webpackChunkName: "upgrade" */ '@/pages/upgrade.vue')
const Help = () => import(/* webpackChunkName: "help" */ '@/pages/help.vue')

// Users page
const Users = () => import(/* webpackChunkName: "users" */ '@/pages/users/index.vue')

// Task pages
const Tasks = () => import(/* webpackChunkName: "tasks" */ '@/pages/tasks/index.vue')
const TaskDetails = () => import(/* webpackChunkName: "tasks" */ '@/pages/tasks/[id].vue')
const TaskForm = () => import(/* webpackChunkName: "tasks" */ '@/pages/tasks/TaskForm.vue')

// Category pages
const Categories = () => import(/* webpackChunkName: "categories" */ '@/pages/categories/index.vue')
const CategoryDetails = () => import(/* webpackChunkName: "categories" */ '@/pages/categories/[id]/index.vue')
const CategoryForm = () => import(/* webpackChunkName: "categories" */ '@/pages/categories/[id]/edit.vue')
const NewCategory = () => import(/* webpackChunkName: "categories" */ '@/pages/categories/new.vue')

// Product pages
const Products = () => import(/* webpackChunkName: "products" */ '@/pages/products/index.vue')
const ProductDetails = () => import(/* webpackChunkName: "products" */ '@/pages/products/[id]/index.vue')
const ProductForm = () => import(/* webpackChunkName: "products" */ '@/pages/products/[id]/edit.vue')
const NewProduct = () => import(/* webpackChunkName: "products" */ '@/pages/products/new.vue')

// Customer pages
const Customers = () => import(/* webpackChunkName: "customers" */ '@/pages/customers/index.vue')
const CustomerDetails = () => import(/* webpackChunkName: "customers" */ '@/pages/customers/[id]/index.vue')
const CustomerEdit = () => import(/* webpackChunkName: "customers" */ '@/pages/customers/[id]/edit.vue')
const NewCustomer = () => import(/* webpackChunkName: "customers" */ '@/pages/customers/new.vue')

// Order pages
const Orders = () => import(/* webpackChunkName: "orders" */ '@/pages/orders/index.vue')
const OrderDetails = () => import(/* webpackChunkName: "orders" */ '@/pages/orders/[id]/index.vue')
const EditOrder = () => import(/* webpackChunkName: "orders" */ '@/pages/orders/[id]/edit.vue')
const NewOrder = () => import(/* webpackChunkName: "orders" */ '@/pages/orders/new.vue')

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
      {
        path: 'settings/billing',
        name: 'BillingSettings',
        component: BillingSettings,
      },
      {
        path: 'upgrade',
        name: 'Upgrade',
        component: Upgrade,
        meta: { layout: 'default' }
      },
      {
        path: 'help',
        name: 'Help',
        component: Help,
        meta: { layout: 'default' }
      },
      // Users route
      {
        path: 'users',
        name: 'Users',
        component: Users,
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
      // Products routes
      {
        path: '/products',
        name: 'products',
        component: Products,
        meta: { title: 'Products' }
      },
      {
        path: '/products/new',
        name: 'new-product',
        component: NewProduct,
        meta: { title: 'New Product' }
      },
      {
        path: '/products/:id',
        name: 'product-details',
        component: ProductDetails,
        meta: { title: 'Product Details' },
        props: true
      },
      {
        path: '/products/:id/edit',
        name: 'edit-product',
        component: ProductForm,
        meta: { title: 'Edit Product' },
        props: true
      },
      // Customers routes
      {
        path: '/customers',
        name: 'customers',
        component: Customers,
        meta: { title: 'Customers' }
      },
      {
        path: '/customers/new',
        name: 'new-customer',
        component: NewCustomer,
        meta: { title: 'New Customer' }
      },
      {
        path: '/customers/:id',
        name: 'customer-details',
        component: CustomerDetails,
        meta: { title: 'Customer Details' },
        props: true
      },
      {
        path: '/customers/:id/edit',
        name: 'edit-customer',
        component: CustomerEdit,
        meta: { title: 'Edit Customer' },
        props: true
      },
      // Categories routes
      {
        path: 'categories',
        name: 'Categories',
        component: Categories,
      },
      {
        path: 'categories/new',
        name: 'NewCategory',
        component: NewCategory,
      },
      {
        path: 'categories/:id',
        name: 'CategoryDetails',
        component: CategoryDetails,
        props: true,
      },
      {
        path: 'categories/:id/edit',
        name: 'EditCategory',
        component: CategoryForm,
        props: true,
      },
      // Orders routes
      {
        path: '/orders',
        name: 'orders',
        component: Orders,
        meta: { title: 'Orders' }
      },
      {
        path: '/orders/new',
        name: 'new-order',
        component: NewOrder,
        meta: { title: 'New Order' }
      },
      {
        path: '/orders/:id',
        name: 'order-details',
        component: OrderDetails,
        meta: { title: 'Order Details' },
        props: true
      },
      {
        path: '/orders/:id/edit',
        name: 'edit-order',
        component: EditOrder,
        meta: { title: 'Edit Order' },
        props: true
      },
      // Auth pages
      {
        path: '/login/1',
        name: 'LoginForm1',
        component: LoginForm1,
        meta: { layout: 'empty' }
      },
      {
        path: '/login/2',
        name: 'LoginForm2',
        component: LoginForm2,
        meta: { layout: 'empty' }
      },
      {
        path: '/login/3',
        name: 'LoginForm3',
        component: LoginForm3,
        meta: { layout: 'empty' }
      },
      {
        path: '/login/4',
        name: 'LoginForm4',
        component: LoginForm4,
        meta: { layout: 'empty' }
      },
      {
        path: '/login/5',
        name: 'LoginForm5',
        component: LoginForm5,
        meta: { layout: 'empty' }
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
