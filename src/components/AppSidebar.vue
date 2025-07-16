<script setup lang="ts">
import type { SidebarProps } from '@/components/ui/sidebar'

import { LayoutDashboard, ListChecks, Package, Users, Lock, Bug, Settings, HelpCircle, ShoppingBag, User } from 'lucide-vue-next'
import NavMain from '@/components/NavMain.vue'
import NavProjects from '@/components/NavProjects.vue'
import NavUser from '@/components/NavUser.vue'
import AppLogo from '@/components/AppLogo.vue'


import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'

const props = withDefaults(defineProps<SidebarProps>(), {
  collapsible: 'icon',
})

// Navigation data
const data = {
  user: {
    name: 'Em',
    email: 'aslam4webz@gmail.com',
    avatar: '',
  },
  navMain: [
    {
      title: 'Dashboard',
      url: '/',
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: 'Tasks',
      url: '/tasks',
      icon: ListChecks,
      isActive: false,
    },
    {
      title: 'Products',
      url: '/products',
      icon: Package,
      isActive: false,
    },
    {
      title: 'Orders',
      url: '/orders',
      icon: ShoppingBag,
      isActive: false,
    },
    {
      title: 'Customers',
      url: '/customers',
      icon: User,
      isActive: false,
    },
    {
      title: 'Users',
      url: '/users',
      icon: Users,
      isActive: false,
    },
    {
      title: 'Auth',
      url: '#',
      icon: Lock,
      isActive: false,
      items: [
        { title: 'Login Form 1', url: '/login/1' },
        { title: 'Login Form 2', url: '/login/2' },
        { title: 'Login Form 3', url: '/login/3' },
        { title: 'Login Form 4', url: '/login/4' },
        { title: 'Login Form 5', url: '/login/5' },
      ],
    },
    {
      title: 'Errors',
      url: '#',
      icon: Bug,
      isActive: false,
      items: [
        { title: 'Unauthorized', url: '/401' },
        { title: 'Forbidden', url: '/403' },
        { title: 'Not Found', url: '/404' },
        { title: 'Internal Server', url: '/500' },
        { title: 'Maintenance', url: '/503' },
      ],
    },
    {
      title: 'Settings',
      url: '#',
      icon: Settings,
      isActive: false,
      items: [
        { title: 'Profile', url: '/settings/profile' },
        { title: 'Account', url: '/settings/account' },
        { title: 'Appearance', url: '/settings/appearance' },
        { title: 'Notifications', url: '/settings/notifications' },
        { title: 'Display', url: '/settings/display' },
      ],
    },
    {
      title: 'Help Center',
      url: '/help-center',
      icon: HelpCircle,
      isActive: false,
    },
  ],
  projects: [],
}
</script>

<template>
  <Sidebar v-bind="props">
    <SidebarHeader>
      <AppLogo />
    </SidebarHeader>
    <SidebarContent>
      <NavMain :items="data.navMain" />
      <NavProjects :projects="data.projects" />
    </SidebarContent>
    <SidebarFooter>
      <NavUser :user="data.user" />
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>
