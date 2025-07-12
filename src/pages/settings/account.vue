<script setup lang="ts">
import { ref } from 'vue'
import SettingsLayout from './layouts/SettingsLayout.vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/components/ui/toast/use-toast'

const { toast } = useToast()

const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const isDeleting = ref(false)

const handleSubmit = (e: Event) => {
  e.preventDefault()
  // Handle password change logic here
  toast({
    title: 'Password updated',
    description: 'Your password has been updated successfully.',
  })
  currentPassword.value = ''
  newPassword.value = ''
  confirmPassword.value = ''
}

const handleDeleteAccount = () => {
  isDeleting.value = true
  // Handle account deletion logic here
  setTimeout(() => {
    isDeleting.value = false
    toast({
      title: 'Account deleted',
      description: 'Your account has been deleted successfully.',
      variant: 'destructive',
    })
  }, 1000)
}
</script>

<template>
  <SettingsLayout
    title="Account"
    description="Update your account settings."
  >
    <div class="space-y-6">
      <div>
        <h3 class="text-lg font-medium">Change Password</h3>
        <p class="text-sm text-muted-foreground">
          Update your password associated with your account.
        </p>
      </div>
      <Separator />
      <form class="space-y-4" @submit="handleSubmit">
        <div class="space-y-2">
          <Label for="current-password">Current Password</Label>
          <Input
            id="current-password"
            v-model="currentPassword"
            type="password"
            required
          />
        </div>
        <div class="space-y-2">
          <Label for="new-password">New Password</Label>
          <Input
            id="new-password"
            v-model="newPassword"
            type="password"
            required
          />
        </div>
        <div class="space-y-2">
          <Label for="confirm-password">Confirm New Password</Label>
          <Input
            id="confirm-password"
            v-model="confirmPassword"
            type="password"
            required
          />
        </div>
        <div class="flex justify-end pt-2">
          <Button type="submit">Update Password</Button>
        </div>
      </form>

      <div class="pt-8">
        <h3 class="text-lg font-medium text-destructive">Danger Zone</h3>
        <p class="text-sm text-muted-foreground">
          These actions are irreversible. Proceed with caution.
        </p>
      </div>
      <Separator />
      <div class="rounded-lg border border-destructive p-4">
        <div class="flex items-center justify-between">
          <div>
            <h4 class="font-medium text-destructive">Delete Account</h4>
            <p class="text-sm text-muted-foreground">
              Permanently delete your account and all of your data.
            </p>
          </div>
          <Button
            variant="destructive"
            :disabled="isDeleting"
            @click="handleDeleteAccount"
          >
            <span v-if="!isDeleting">Delete Account</span>
            <span v-else>Deleting...</span>
          </Button>
        </div>
      </div>
    </div>
  </SettingsLayout>
</template>
