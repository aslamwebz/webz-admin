<script setup lang="ts">
import { ref, onMounted } from 'vue'
import SettingsLayout from './layouts/SettingsLayout.vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'

defineOptions({
  name: 'ProfileSettings',
})

const name = ref('')
const username = ref('')
const bio = ref('')

// Simulate loading data
onMounted(() => {
  // In a real app, you would fetch this data from an API
  name.value = 'John Doe'
  username.value = 'johndoe'
  bio.value = 'I own a computer.'
})
</script>

<template>
  <SettingsLayout
    title="Profile"
    description="Update your profile information."
  >
    <div class="space-y-6">
      <div>
        <h3 class="text-lg font-medium">Profile</h3>
        <p class="text-sm text-muted-foreground">
          This is how others will see you on the platform.
        </p>
      </div>
      <Separator />
      <div class="space-y-4">
        <div class="space-y-2">
          <Label for="name">Name</Label>
          <Input id="name" v-model="name" placeholder="Your name" />
        </div>
        <div class="space-y-2">
          <Label for="username">Username</Label>
          <div class="flex">
            <span class="inline-flex items-center rounded-l-md border border-r-0 border-input bg-muted px-3 text-sm text-muted-foreground">
              example.com/
            </span>
            <Input
              id="username"
              v-model="username"
              class="rounded-l-none"
              placeholder="username"
            />
          </div>
        </div>
        <div class="space-y-2">
          <Label for="bio">Bio</Label>
          <Textarea
            id="bio"
            v-model="bio"
            placeholder="Tell us a little bit about yourself"
            class="min-h-[100px]"
          />
        </div>
        <div class="flex justify-end pt-4">
          <Button type="submit">Update profile</Button>
        </div>
      </div>
    </div>
  </SettingsLayout>
</template>
