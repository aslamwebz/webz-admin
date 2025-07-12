<script setup lang="ts">
import { inject, computed } from 'vue'
import { Moon, Sun, Monitor, Check } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

type Theme = 'light' | 'dark' | 'system'
type ThemeContext = {
  theme: Theme
  isDark: boolean
  setTheme: (theme: Theme) => void
}

const themeContext = inject<ThemeContext>('theme', {
  theme: 'system',
  isDark: false,
  setTheme: () => {}
})

const currentTheme = computed(() => themeContext.theme)
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" size="icon" class="h-9 w-9">
        <Sun class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span class="sr-only">Toggle theme</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem @click="themeContext.setTheme('light')">
        <Sun class="mr-2 h-4 w-4" />
        <span>Light</span>
        <Check class="ml-auto h-4 w-4" :class="{ 'opacity-0': currentTheme !== 'light' }" />
      </DropdownMenuItem>
      <DropdownMenuItem @click="themeContext.setTheme('dark')">
        <Moon class="mr-2 h-4 w-4" />
        <span>Dark</span>
        <Check class="ml-auto h-4 w-4" :class="{ 'opacity-0': currentTheme !== 'dark' }" />
      </DropdownMenuItem>
      <DropdownMenuItem @click="themeContext.setTheme('system')">
        <Monitor class="mr-2 h-4 w-4" />
        <span>System</span>
        <Check class="ml-auto h-4 w-4" :class="{ 'opacity-0': currentTheme !== 'system' }" />
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
