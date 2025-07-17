<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  // DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { 
  User, 
  CreditCard, 
  LogOut, 
  UserCog,
  Bell,
  HelpCircle,
  Zap
} from 'lucide-vue-next'

const router = useRouter()
// Mock user data - in a real app, this would come from your auth store
const user = computed(() => ({
  name: 'User',
  email: 'user@example.com',
  avatar: '/avatars/01.png'
}))

const handleLogout = () => {
  // In a real app, you would call your auth store's logout method here
  // For now, we'll just redirect to the login page
  router.push('/login')
}

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .substring(0, 2)
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="relative h-10 w-10 rounded-full">
        <Avatar class="h-8 w-8">
          <AvatarImage 
            :src="user.avatar" 
            :alt="user.name" 
          />
          <AvatarFallback>
            {{ getInitials(user.name) }}
          </AvatarFallback>
        </Avatar>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-56" align="end">
      <DropdownMenuLabel class="font-normal flex p-4">
        <div class="flex items-center gap-3">
          <Avatar class="h-10 w-10">
            <AvatarImage :src="user.avatar" :alt="user.name" />
            <AvatarFallback>
              {{ getInitials(user.name) }}
            </AvatarFallback>
          </Avatar>
          <div class="flex flex-col space-y-1">
            <p class="text-sm font-medium leading-none">
              {{ user.name }}
            </p>
            <p class="text-xs leading-none text-muted-foreground">
              {{ user.email }}
            </p>
          </div>
        </div>
      </DropdownMenuLabel>
      
      <DropdownMenuSeparator />
      
      <DropdownMenuGroup>
        <DropdownMenuItem as-child>
          <router-link to="/settings/profile" class="flex items-center">
            <User class="mr-2 h-4 w-4" />
            <span>Profile</span>
          </router-link>
        </DropdownMenuItem>
        
        <DropdownMenuItem as-child>
          <router-link to="/settings/account" class="flex items-center">
            <UserCog class="mr-2 h-4 w-4" />
            <span>Account Settings</span>
          </router-link>
        </DropdownMenuItem>
        
        <DropdownMenuItem as-child>
          <router-link to="/settings/billing" class="flex items-center">
            <CreditCard class="mr-2 h-4 w-4" />
            <span>Billing</span>
          </router-link>
        </DropdownMenuItem>
        
        <DropdownMenuItem as-child>
          <router-link to="/settings/notifications" class="flex items-center">
            <Bell class="mr-2 h-4 w-4" />
            <span>Notifications</span>
          </router-link>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      
      <DropdownMenuSeparator />
      
      <DropdownMenuItem as-child>
        <router-link to="/help" class="flex items-center">
          <HelpCircle class="mr-2 h-4 w-4" />
          <span>Help & Support</span>
        </router-link>
      </DropdownMenuItem>
      
      <DropdownMenuSeparator />
      
      <DropdownMenuItem as-child>
        <router-link to="/upgrade" class="flex items-center text-primary font-medium">
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
</template>
