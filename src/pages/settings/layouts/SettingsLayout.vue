<script setup lang="ts">
import { Separator } from '@/components/ui/separator'

defineProps<{
  title: string
  description: string
}>()
</script>

<template>
  <div class="space-y-6 p-10 pb-16">
    <div class="space-y-0.5">
      <h2 class="text-2xl font-bold tracking-tight">
        {{ title }}
      </h2>
      <p class="text-muted-foreground">
        {{ description }}
      </p>
    </div>
    <Separator class="my-6" />
    <div class="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
      <div class="flex-1 lg:max-w-2xl">
        <div class="space-y-6">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
