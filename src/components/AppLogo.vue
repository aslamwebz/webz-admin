<script setup lang="ts">
const { collapsed } = defineProps<{
  collapsed?: boolean
}>()
</script>

<template>
  <div class="flex items-center justify-center py-4">
    <div class="flex items-center space-x-2">
      <svg 
        width="32" 
        height="32" 
        viewBox="0 0 32 32" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        class="text-primary"
      >
        <rect width="32" height="32" rx="8" class="fill-current" />
        <path 
          d="M16 8C11.5817 8 8 11.5817 8 16C8 20.4183 11.5817 24 16 24C20.4183 24 24 20.4183 24 16C24 11.5817 20.4183 8 16 8ZM16 22C12.6863 22 10 19.3137 10 16C10 12.6863 12.6863 10 16 10C19.3137 10 22 12.6863 22 16C22 19.3137 19.3137 22 16 22Z" 
          class="fill-background"
        />
        <path 
          d="M16 12C13.7909 12 12 13.7909 12 16C12 18.2091 13.7909 20 16 20C18.2091 20 20 18.2091 20 16C20 13.7909 18.2091 12 16 12Z" 
          class="fill-primary"
        />
      </svg>
      <span v-if="!collapsed" class="text-xl font-bold text-foreground whitespace-nowrap">ShadAdmin</span>
    </div>
  </div>
</template>
