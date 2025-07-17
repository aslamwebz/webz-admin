<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <tr 
    :class="cn(
      'group border-b transition-colors',
      'hover:bg-muted/20 dark:hover:bg-muted/10',
      'data-[state=selected]:bg-muted/50',
      'cursor-pointer',
      props.class
    )"
  >
    <slot />
  </tr>
</template>
