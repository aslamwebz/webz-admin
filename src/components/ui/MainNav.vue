<script setup lang="ts">
import { cn } from '@/lib/utils'
import { useRoute } from 'vue-router'

const route = useRoute()

const navItems = [
  { name: 'Dashboard', path: '/' },
  { name: 'Orders', path: '/orders' },
  { name: 'Products', path: '/products' },
  { name: 'Customers', path: '/customers' },
  { name: 'Settings', path: '/settings/profile' }, // Default to profile settings
]

const isActive = (path: string) => {
  // Special handling for settings to match any settings sub-route
  if (path.startsWith('/settings')) {
    return route.path.startsWith('/settings')
  }
  return route.path === path || route.path.startsWith(`${path}/`)
}
</script>

<template>
  <nav :class="cn('flex items-center space-x-4 lg:space-x-6', $attrs.class ?? '')">
    <router-link
      v-for="item in navItems"
      :key="item.path"
      :to="item.path"
      :class="[
        'text-sm font-medium transition-colors hover:text-primary',
        isActive(item.path) ? 'text-foreground' : 'text-muted-foreground'
      ]"
    >
      {{ item.name }}
    </router-link>
  </nav>
</template>
