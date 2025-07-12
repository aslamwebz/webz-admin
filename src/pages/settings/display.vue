<script setup lang="ts">
import { ref } from 'vue'
import SettingsLayout from './layouts/SettingsLayout.vue'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

defineOptions({
  name: 'DisplaySettings',
})

const displayOptions = [
  {
    name: 'Light',
    description: 'Light mode',
  },
  {
    name: 'Dark',
    description: 'Dark mode',
  },
  {
    name: 'System',
    description: 'Use system theme',
  },
]

const selectedDisplay = ref('System')
</script>

<template>
  <SettingsLayout
    title="Display"
    description="Configure display settings for the application."
  >
    <div class="space-y-6">
      <div>
        <h3 class="text-lg font-medium">Theme</h3>
        <p class="text-sm text-muted-foreground">
          Select the theme for the application.
        </p>
      </div>
      <Separator />
      <RadioGroup
        v-model="selectedDisplay"
        class="grid max-w-xl grid-cols-1 gap-8 pt-2 md:grid-cols-3"
      >
        <div
          v-for="option in displayOptions"
          :key="option.name"
          class="flex items-center space-x-2"
        >
          <RadioGroupItem :value="option.name" :id="option.name" />
          <Label :for="option.name" class="flex flex-col space-y-1">
            <span>{{ option.name }}</span>
            <span class="font-normal leading-snug text-muted-foreground">
              {{ option.description }}
            </span>
          </Label>
        </div>
      </RadioGroup>

      <div class="pt-6">
        <h3 class="text-lg font-medium">Density</h3>
        <p class="text-sm text-muted-foreground">
          Adjust the spacing and sizing of elements.
        </p>
      </div>
      <Separator />
      <div class="flex items-center justify-between">
        <div class="space-y-0.5">
          <Label for="density">Density</Label>
          <p class="text-sm text-muted-foreground">
            Adjust the spacing and sizing of elements.
          </p>
        </div>
        <div class="flex items-center space-x-4">
          <Button variant="outline" size="sm">
            Compact
          </Button>
          <Button variant="outline" size="sm">
            Default
          </Button>
          <Button variant="outline" size="sm">
            Comfortable
          </Button>
        </div>
      </div>
    </div>
  </SettingsLayout>
</template>
