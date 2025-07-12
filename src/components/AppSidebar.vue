<script setup lang="ts">
import type { SidebarProps } from '@/components/ui/sidebar'

import { LayoutDashboard, ListChecks, Package, MessageSquare, Users, Lock, Bug, Settings, HelpCircle } from 'lucide-vue-next'
import NavMain from '@/components/NavMain.vue'
import NavProjects from '@/components/NavProjects.vue'
import NavUser from '@/components/NavUser.vue'


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
    name: 'satnaing',
    email: 'satnaingdev@gmail.com',
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
      badge: '3',
    },
    {
      title: 'Apps',
      url: '/apps',
      icon: Package,
      isActive: false,
    },
    {
      title: 'Chats',
      url: '/chats',
      icon: MessageSquare,
      isActive: false,
      badge: '3',
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
        { title: 'Sign In', url: '/sign-in' },
        { title: 'Sign In (2 Col)', url: '/sign-in-2' },
        { title: 'Sign Up', url: '/sign-up' },
        { title: 'Forgot Password', url: '/forgot-password' },
        { title: 'OTP', url: '/otp' },
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
    <SidebarHeader />
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
