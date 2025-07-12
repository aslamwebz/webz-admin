<script setup lang="ts">
import { provide, readonly } from 'vue'
import { useTheme } from '@/composables/useTheme'

const { theme: currentTheme, isDark, setTheme } = useTheme()

// Provide theme state to child components
provide('theme', {
  theme: readonly(currentTheme),
  isDark: readonly(isDark),
  setTheme
})
</script>

<template>
  <slot />
</template>
