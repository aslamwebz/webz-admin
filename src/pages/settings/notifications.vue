<script setup lang="ts">
import { ref } from 'vue'
import SettingsLayout from './layouts/SettingsLayout.vue'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

const emailMe = ref(false)
const pushNotification = ref(true)
const textMessages = ref(false)
const phoneCalls = ref(false)

defineOptions({
  name: 'NotificationSettings',
})
</script>

<template>
  <SettingsLayout
    title="Notifications"
    description="Configure how you receive notifications."
  >
    <div class="space-y-6">
      <div>
        <h3 class="text-lg font-medium">Notifications</h3>
        <p class="text-sm text-muted-foreground">
          Configure how you receive notifications.
        </p>
      </div>
      <Separator />
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <div class="space-y-0.5">
            <Label for="email-notifications">Email</Label>
            <p class="text-sm text-muted-foreground">
              Receive emails about your account activity.
            </p>
          </div>
          <Switch id="email-notifications" v-model="emailMe" />
        </div>
        <div class="flex items-center justify-between">
          <div class="space-y-0.5">
            <Label for="push-notifications">Push Notifications</Label>
            <p class="text-sm text-muted-foreground">
              Receive push notifications on your device.
            </p>
          </div>
          <Switch id="push-notifications" v-model="pushNotification" />
        </div>
        <div class="flex items-center justify-between">
          <div class="space-y-0.5">
            <Label for="text-messages">Text Messages</Label>
            <p class="text-sm text-muted-foreground">
              Receive text messages about important updates.
            </p>
          </div>
          <Switch id="text-messages" v-model="textMessages" />
        </div>
        <div class="flex items-center justify-between">
          <div class="space-y-0.5">
            <Label for="phone-calls">Phone Calls</Label>
            <p class="text-sm text-muted-foreground">
              Receive phone calls for urgent matters.
            </p>
          </div>
          <Switch id="phone-calls" v-model="phoneCalls" />
        </div>
      </div>

      <div class="pt-6">
        <h3 class="text-lg font-medium">Alerts</h3>
        <p class="text-sm text-muted-foreground">
          Configure alert preferences.
        </p>
      </div>
      <Separator />
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <div class="space-y-0.5">
            <Label for="security-alerts">Security Alerts</Label>
            <p class="text-sm text-muted-foreground">
              Receive alerts about your account security.
            </p>
          </div>
          <Switch id="security-alerts" :model-value="true" />
        </div>
        <div class="flex items-center justify-between">
          <div class="space-y-0.5">
            <Label for="billing-updates">Billing Updates</Label>
            <p class="text-sm text-muted-foreground">
              Receive updates about your billing information.
            </p>
          </div>
          <Switch id="billing-updates" :model-value="true" />
        </div>
      </div>
    </div>
  </SettingsLayout>
</template>
