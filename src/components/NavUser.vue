<script setup lang="ts">
import { useRouter } from 'vue-router'
import {
  User,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Zap,
  UserCog,
  HelpCircle
} from 'lucide-vue-next'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'

const props = defineProps<{
  user: {
    name: string
    email: string
    avatar: string
  }
}>()

const { user } = props

const { isMobile } = useSidebar()
const router = useRouter()

const handleLogout = () => {
  // In a real app, you would call your auth store's logout method here
  // For now, we'll just redirect to the login page
  router.push('/login')
}
</script>

<template>
  <SidebarMenu>
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <SidebarMenuButton
            size="lg"
            class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <Avatar class="h-8 w-8 rounded-lg">
              <AvatarImage :src="user.avatar" :alt="user.name" />
              <AvatarFallback class="rounded-lg">
                CN
              </AvatarFallback>
            </Avatar>
            <div class="grid flex-1 text-left text-sm leading-tight">
              <span class="truncate font-medium">{{ user.name }}</span>
              <span class="truncate text-xs">{{ user.email }}</span>
            </div>
            <ChevronsUpDown class="ml-auto size-4" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          class="w-[--reka-dropdown-menu-trigger-width] min-w-56 rounded-lg"
          :side="isMobile ? 'bottom' : 'right'"
          align="end"
          :side-offset="4"
        >
          <DropdownMenuLabel class="p-0 font-normal">
            <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar class="h-8 w-8 rounded-lg">
                <AvatarImage :src="user.avatar" :alt="user.name" />
                <AvatarFallback class="rounded-lg">
                  CN
                </AvatarFallback>
              </Avatar>
              <div class="grid flex-1 text-left text-sm leading-tight">
                <span class="truncate font-semibold">{{ user.name }}</span>
                <span class="truncate text-xs">{{ user.email }}</span>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem as-child>
              <router-link to="/settings/profile" class="flex items-center w-full">
                <User class="mr-2 h-4 w-4" />
                <span>Profile</span>
              </router-link>
            </DropdownMenuItem>
            
            <DropdownMenuItem as-child>
              <router-link to="/settings/account" class="flex items-center w-full">
                <UserCog class="mr-2 h-4 w-4" />
                <span>Account Settings</span>
              </router-link>
            </DropdownMenuItem>
            
            <DropdownMenuItem as-child>
              <router-link to="/settings/billing" class="flex items-center w-full">
                <CreditCard class="mr-2 h-4 w-4" />
                <span>Billing</span>
              </router-link>
            </DropdownMenuItem>
            
            <DropdownMenuItem as-child>
              <router-link to="/settings/notifications" class="flex items-center w-full">
                <Bell class="mr-2 h-4 w-4" />
                <span>Notifications</span>
              </router-link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem as-child>
            <router-link to="/help" class="flex items-center w-full">
              <HelpCircle class="mr-2 h-4 w-4" />
              <span>Help & Support</span>
            </router-link>
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem as-child>
            <router-link to="/upgrade" class="flex items-center w-full text-primary font-medium">
              <Zap class="mr-2 h-4 w-4" />
              <span>Upgrade to Pro</span>
            </router-link>
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem @click="handleLogout" class="text-destructive focus:text-destructive">
            <LogOut class="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  </SidebarMenu>
</template>
