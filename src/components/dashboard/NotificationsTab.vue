<script setup lang="ts">
import { ref } from 'vue'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Bell, BellOff, Check, Clock, AlertTriangle, Info } from 'lucide-vue-next'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

// Notification types
interface Notification {
  id: string
  type: 'success' | 'warning' | 'error' | 'info' | 'system'
  title: string
  message: string
  time: string
  read: boolean
  action?: {
    label: string
    onClick: () => void
  }
}

// Mock notifications
const notifications = ref<Notification[]>([
  {
    id: '1',
    type: 'success',
    title: 'Order Completed',
    message: 'Order #12345 has been successfully delivered.',
    time: '2 minutes ago',
    read: false,
    action: {
      label: 'View Order',
      onClick: () => console.log('View order #12345')
    }
  },
  {
    id: '2',
    type: 'warning',
    title: 'Low Stock Alert',
    message: 'Product "Wireless Headphones" is running low in stock (5 items left).',
    time: '1 hour ago',
    read: false,
    action: {
      label: 'Restock',
      onClick: () => console.log('Restock Wireless Headphones')
    }
  },
  {
    id: '3',
    type: 'error',
    title: 'Payment Failed',
    message: 'Payment for order #12346 has failed. Please check payment details.',
    time: '3 hours ago',
    read: false,
    action: {
      label: 'Retry Payment',
      onClick: () => console.log('Retry payment for order #12346')
    }
  },
  {
    id: '4',
    type: 'info',
    title: 'New Message',
    message: 'You have a new message from customer John Doe.',
    time: '5 hours ago',
    read: true,
    action: {
      label: 'View Message',
      onClick: () => console.log('View message from John Doe')
    }
  },
  {
    id: '5',
    type: 'system',
    title: 'System Update',
    message: 'Scheduled maintenance is planned for tomorrow at 2:00 AM UTC.',
    time: '1 day ago',
    read: true
  }
])

// Notification settings
const notificationSettings = ref({
  email: true,
  push: true,
  sound: true,
  marketing: false,
  orderUpdates: true,
  lowStock: true,
  newMessages: true,
  systemAlerts: true
})

// Mark notification as read
const markAsRead = (id: string) => {
  const notification = notifications.value.find(n => n.id === id)
  if (notification) {
    notification.read = true
  }
}

// Mark all as read
const markAllAsRead = () => {
  notifications.value.forEach(n => { n.read = true })
}

// Get notification icon based on type
const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'success':
      return { icon: Check, class: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' }
    case 'warning':
      return { icon: AlertTriangle, class: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400' }
    case 'error':
      return { icon: AlertTriangle, class: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' }
    case 'info':
      return { icon: Info, class: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' }
    default:
      return { icon: Bell, class: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400' }
  }
}
</script>

<template>
  <div class="space-y-6">
    <!-- Unread Notifications -->
    <div>
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center space-x-2">
          <h3 class="text-lg font-semibold">Unread Notifications</h3>
          <Badge variant="secondary" class="px-2 py-0.5">
            {{ notifications.filter(n => !n.read).length }}
          </Badge>
        </div>
        <Button 
          v-if="notifications.some(n => !n.read)" 
          variant="ghost" 
          size="sm" 
          class="text-sm text-primary"
          @click="markAllAsRead"
        >
          Mark all as read
        </Button>
      </div>

      <div class="space-y-2 mb-8">
        <Card 
          v-for="notification in notifications.filter(n => !n.read)" 
          :key="notification.id"
          class="border-l-4 border-primary overflow-hidden"
        >
          <div class="flex p-4">
            <div 
              class="h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 mr-3"
              :class="getNotificationIcon(notification.type).class"
            >
              <component 
                :is="getNotificationIcon(notification.type).icon" 
                class="h-5 w-5"
              />
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between">
                <h4 class="font-medium text-sm">{{ notification.title }}</h4>
                <span class="text-xs text-muted-foreground">{{ notification.time }}</span>
              </div>
              <p class="text-sm text-muted-foreground mt-1">{{ notification.message }}</p>
              <div v-if="notification.action" class="mt-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  @click="notification.action.onClick"
                >
                  {{ notification.action.label }}
                </Button>
              </div>
            </div>
          </div>
        </Card>

        <div v-if="!notifications.some(n => !n.read)" class="text-center py-8">
          <BellOff class="h-10 w-10 mx-auto text-muted-foreground mb-2" />
          <p class="text-sm text-muted-foreground">No unread notifications</p>
        </div>
      </div>
    </div>

    <!-- Notification Settings -->
    <div>
      <h3 class="text-lg font-semibold mb-4">Notification Settings</h3>
      <Card>
        <CardContent class="p-6 space-y-6">
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div class="space-y-0.5">
                <Label>Email Notifications</Label>
                <p class="text-sm text-muted-foreground">Receive notifications via email</p>
              </div>
              <Switch v-model:checked="notificationSettings.email" />
            </div>

            <div class="flex items-center justify-between">
              <div class="space-y-0.5">
                <Label>Push Notifications</Label>
                <p class="text-sm text-muted-foreground">Receive push notifications</p>
              </div>
              <Switch v-model:checked="notificationSettings.push" />
            </div>

            <div class="flex items-center justify-between">
              <div class="space-y-0.5">
                <Label>Notification Sound</Label>
                <p class="text-sm text-muted-foreground">Play sound for new notifications</p>
              </div>
              <Switch v-model:checked="notificationSettings.sound" />
            </div>
          </div>

          <div class="border-t pt-6">
            <h4 class="font-medium mb-4">Notification Types</h4>
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div class="space-y-0.5">
                  <Label>Order Updates</Label>
                  <p class="text-sm text-muted-foreground">Order status changes and updates</p>
                </div>
                <Switch v-model:checked="notificationSettings.orderUpdates" />
              </div>

              <div class="flex items-center justify-between">
                <div class="space-y-0.5">
                  <Label>Low Stock Alerts</Label>
                  <p class="text-sm text-muted-foreground">When product stock is low</p>
                </div>
                <Switch v-model:checked="notificationSettings.lowStock" />
              </div>

              <div class="flex items-center justify-between">
                <div class="space-y-0.5">
                  <Label>New Messages</Label>
                  <p class="text-sm text-muted-foreground">When you receive a new message</p>
                </div>
                <Switch v-model:checked="notificationSettings.newMessages" />
              </div>

              <div class="flex items-center justify-between">
                <div class="space-y-0.5">
                  <Label>System Alerts</Label>
                  <p class="text-sm text-muted-foreground">Important system notifications</p>
                </div>
                <Switch v-model:checked="notificationSettings.systemAlerts" />
              </div>

              <div class="flex items-center justify-between">
                <div class="space-y-0.5">
                  <Label>Marketing & Promotions</Label>
                  <p class="text-sm text-muted-foreground">Special offers and promotions</p>
                </div>
                <Switch v-model:checked="notificationSettings.marketing" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Past Notifications -->
    <div>
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-semibold">Past Notifications</h3>
        <Button variant="outline" size="sm" class="gap-2">
          <Filter class="h-4 w-4" />
          <span>Filter</span>
        </Button>
      </div>

      <div class="space-y-2">
        <div 
          v-for="notification in notifications.filter(n => n.read)" 
          :key="notification.id"
          class="p-4 rounded-lg border hover:bg-muted/50 cursor-pointer transition-colors"
          @click="markAsRead(notification.id)"
        >
          <div class="flex items-start">
            <div 
              class="h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 mr-3 mt-0.5"
              :class="getNotificationIcon(notification.type).class"
            >
              <component 
                :is="getNotificationIcon(notification.type).icon" 
                class="h-4 w-4"
              />
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between">
                <h4 class="font-medium text-sm">{{ notification.title }}</h4>
                <span class="text-xs text-muted-foreground">{{ notification.time }}</span>
              </div>
              <p class="text-sm text-muted-foreground mt-1">{{ notification.message }}</p>
            </div>
          </div>
        </div>

        <div v-if="!notifications.some(n => n.read)" class="text-center py-8">
          <Clock class="h-10 w-10 mx-auto text-muted-foreground mb-2" />
          <p class="text-sm text-muted-foreground">No past notifications</p>
        </div>
      </div>
    </div>
  </div>
</template>
