<script setup lang="ts">
import { computed } from 'vue'
import { Moon, Sun } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/composables/useTheme'

const { theme, setTheme, isDark } = useTheme()

const toggleTheme = () => {
  setTheme(isDark.value ? 'light' : 'dark')
}

const themeIcon = computed(() => isDark.value ? Moon : Sun)
</script>

<template>
  <Button
    variant="outline"
    size="icon"
    class="h-9 w-16 rounded-full relative"
    @click="toggleTheme"
  >
    <span class="sr-only">Toggle theme</span>
    <div class="absolute inset-0 flex items-center justify-between px-1.5">
      <Sun class="h-4 w-4" :class="{ 'text-muted-foreground': isDark }" />
      <Moon class="h-4 w-4" :class="{ 'text-muted-foreground': !isDark }" />
    </div>
    <span
      class="absolute left-0.5 top-0.5 h-8 w-8 rounded-full bg-primary transition-transform duration-200 flex items-center justify-center"
      :class="{ 'translate-x-7': isDark, 'translate-x-0': !isDark }"
    >
      <component :is="themeIcon" class="h-4 w-4 text-primary-foreground" />
    </span>
  </Button>
</template>
