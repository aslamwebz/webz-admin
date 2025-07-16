<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import SettingsLayout from './layouts/SettingsLayout.vue'
import { useTheme } from '@/composables/useTheme'
import ThemeSwitch from '@/components/theme/ThemeSwitch.vue'
import { Check } from 'lucide-vue-next'

const { isDark } = useTheme()

type FontOption = {
  id: string
  name: string
  description: string
  className: string
}

const fontOptions: FontOption[] = [
  {
    id: 'sans',
    name: 'Inter (Default)',
    description: 'A clean, modern sans-serif font',
    className: 'font-sans'
  },
  {
    id: 'serif',
    name: 'Georgia',
    description: 'A classic serif font',
    className: 'font-serif'
  },
  {
    id: 'mono',
    name: 'JetBrains Mono',
    description: 'A developer-friendly monospace font',
    className: 'font-mono'
  }
]

const selectedFont = ref<string>('sans')

// Load saved font preference
if (typeof localStorage !== 'undefined') {
  const savedFont = localStorage.getItem('font-preference')
  if (savedFont) {
    selectedFont.value = savedFont
  }
}

// Apply font class to body
const applyFont = (fontClass: string) => {
  document.body.classList.remove('font-sans', 'font-serif', 'font-mono')
  document.body.classList.add(fontClass)
}

// Set initial font on mount
onMounted(() => {
  applyFont(`font-${selectedFont.value}`)
})

// Watch for font changes and apply them
watch(selectedFont, (newFont) => {
  // Save preference
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('font-preference', newFont)
  }
  
  // Update font
  applyFont(`font-${newFont}`)
})

defineOptions({
  name: 'AppearanceSettings',
})
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

      
      <div class="flex items-center justify-between max-w-xl p-4 border rounded-lg">
        <div>
          <p class="text-sm font-medium">Theme</p>
          <p class="text-sm text-muted-foreground">
            {{ isDark ? 'Dark' : 'Light' }} mode
          </p>
        </div>
        <ThemeSwitch />
      </div>

      <!-- Font Selection -->
      <div class="pt-8">
        <h3 class="text-lg font-medium">Font</h3>
        <p class="text-sm text-muted-foreground">
          Choose the font for the application.
        </p>
      </div>
      
      <div class="max-w-3xl">
        <div class="grid gap-3 sm:grid-cols-3">
          <div 
            v-for="font in fontOptions" 
            :key="font.id"
            class="group relative flex cursor-pointer flex-col rounded-lg border p-4 transition-all hover:border-primary/50"
            :class="{
              'border-primary ring-1 ring-primary/20 bg-primary/5': selectedFont === font.id,
              'border-border hover:border-primary/30': selectedFont !== font.id
            }"
            @click="selectedFont = font.id"
          >
            <!-- Font name and radio button -->
            <div class="flex items-center">
              <div class="flex h-4 w-4 items-center justify-center rounded-full border mr-3 flex-shrink-0">
                <Check 
                  v-if="selectedFont === font.id" 
                  class="h-2.5 w-2.5 text-primary" 
                />
              </div>
              <span class="text-sm font-medium">{{ font.name }}</span>
            </div>
            
            <!-- Font preview -->
            <div class="mt-3 flex-1 flex flex-col">
              <div 
                class="text-2xl font-medium leading-tight"
                :class="font.className"
              >
                Aa
              </div>
              <p 
                class="mt-2 text-sm text-muted-foreground line-clamp-2"
                :class="font.className"
              >
                {{ font.description }}
              </p>
            </div>
            
            <!-- Active indicator -->
            <div 
              v-if="selectedFont === font.id"
              class="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary"
            />
          </div>
        </div>
        
        <!-- Live preview -->
        <div class="mt-6 overflow-hidden rounded-lg border bg-card shadow-sm">
          <div class="border-b bg-muted/20 p-3">
            <p class="text-sm font-medium">Live Preview</p>
          </div>
          <div class="p-4" :class="fontOptions.find(f => f.id === selectedFont)?.className">
            <h3 class="text-lg font-semibold">The quick brown fox jumps over the lazy dog</h3>
            <p class="mt-2 text-muted-foreground">
              The quick brown fox jumps over the lazy dog. 1234567890
            </p>
            <div class="mt-4 flex items-center space-x-4 text-sm">
              <div>
                <p class="font-medium">Aa</p>
                <p class="text-xs text-muted-foreground">Regular</p>
              </div>
              <div>
                <p class="font-medium"><strong>Aa</strong></p>
                <p class="text-xs text-muted-foreground">Bold</p>
              </div>
              <div>
                <p class="font-medium italic">Aa</p>
                <p class="text-xs text-muted-foreground">Italic</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </SettingsLayout>
</template>
