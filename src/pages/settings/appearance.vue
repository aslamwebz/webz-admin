<script setup lang="ts">
import SettingsLayout from './layouts/SettingsLayout.vue'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useTheme, type Theme } from '@/composables/useTheme'
import { ref, watch } from 'vue'

const { theme: currentTheme, setTheme } = useTheme()
const theme = ref<Theme>(currentTheme.value)

// Watch for theme changes and update the local ref
watch(currentTheme, (newTheme) => {
  theme.value = newTheme
})

defineOptions({
  name: 'AppearanceSettings',
})

type ThemeOption = {
  name: Theme
  label: string
}

const themes: ThemeOption[] = [
  {
    name: 'light',
    label: 'Light',
  },
  {
    name: 'dark',
    label: 'Dark',
  },
  {
    name: 'system',
    label: 'System',
  },
]

// Handle theme change
const handleThemeChange = (value: string) => {
  if (value === 'light' || value === 'dark' || value === 'system') {
    setTheme(value)
  }
}
</script>

<template>
  <SettingsLayout
    title="Appearance"
    description="Customize the appearance of the application."
  >
    <div class="space-y-6">
      <!-- Theme Selection -->
      <div>
        <h3 class="text-lg font-medium">Theme</h3>
        <p class="text-sm text-muted-foreground">
          Select the theme for the application.
        </p>
      </div>
      <Separator />
      
      <div class="max-w-xl">
        <RadioGroup 
          :model-value="theme" 
          @update:model-value="handleThemeChange"
          class="space-y-4"
        >
          <div v-for="item in themes" :key="item.name" class="flex items-center space-x-2">
            <RadioGroupItem :value="item.name" :id="`theme-${item.name}`" />
            <Label :for="`theme-${item.name}`" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {{ item.label }}
            </Label>
          </div>
        </RadioGroup>
      </div>

      <!-- Font Selection (Placeholder) -->
      <div class="pt-8">
        <h3 class="text-lg font-medium">Font</h3>
        <p class="text-sm text-muted-foreground">
          Choose the font for the application.
        </p>
      </div>
      <Separator />
      
      <div class="max-w-xl">
        <div class="grid grid-cols-2 gap-4 pt-2 md:grid-cols-3">
          <div class="flex items-center space-x-2">
            <input type="radio" id="font-sans" name="font" value="sans" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" checked>
            <Label for="font-sans" class="text-sm font-medium text-gray-700">
              Inter (Default)
              <p class="text-xs font-normal text-gray-500">A clean, modern sans-serif font.</p>
            </Label>
          </div>
          <div class="flex items-center space-x-2">
            <input type="radio" id="font-serif" name="font" value="serif" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
            <Label for="font-serif" class="text-sm font-medium text-gray-700">
              Georgia
              <p class="text-xs font-normal text-gray-500">A classic serif font.</p>
            </Label>
          </div>
          <div class="flex items-center space-x-2">
            <input type="radio" id="font-mono" name="font" value="mono" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
            <Label for="font-mono" class="text-sm font-medium text-gray-700">
              Mono
              <p class="text-xs font-normal text-gray-500">A monospace font.</p>
            </Label>
          </div>
        </div>
      </div>
    </div>
  </SettingsLayout>
</template>
