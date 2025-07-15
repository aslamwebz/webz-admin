<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { useRouter } from 'vue-router'

defineProps<{
  code: string
  title: string
  message: string
  showHomeButton?: boolean
}>()

const router = useRouter()

const goHome = () => {
  router.push('/')
}
</script>

<template>
  <div class="flex h-screen w-full flex-col items-center justify-center space-y-4 p-4 text-center">
    <div class="space-y-2">
      <h1 class="text-9xl font-bold text-primary">{{ code }}</h1>
      <h2 class="text-2xl font-semibold tracking-tight">{{ title }}</h2>
      <p class="text-muted-foreground">{{ message }}</p>
    </div>
    
    <div v-if="showHomeButton" class="flex space-x-4 pt-4">
      <Button @click="goHome">
        Go to Homepage
      </Button>
      <Button variant="outline" @click="router.go(-1)">
        Go Back
      </Button>
    </div>
  </div>
</template>
