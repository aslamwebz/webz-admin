<script setup lang="ts">
import type { SidebarProps } from '.'
import { cn } from '@/lib/utils'
import { Sheet, SheetContent } from '@/registry/new-york/ui/sheet'
import { SIDEBAR_WIDTH_MOBILE, SIDEBAR_WIDTH_ICON, useSidebar } from './utils'
import { computed } from 'vue'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<SidebarProps>(), {
  side: 'left',
  variant: 'sidebar',
  collapsible: 'offcanvas',
})

const { isMobile, state, openMobile, setOpenMobile } = useSidebar()

// Compute the width based on the sidebar state
const sidebarWidth = computed(() => {
  if (state.value === 'collapsed') {
    return SIDEBAR_WIDTH_ICON
  }
  return '16rem' // Default width when expanded
})

// Add a class for smooth transitions
const transitionClass = computed(() => ({
  'transition-all duration-300 ease-in-out': true,
  'will-change-transform': true,
  'backface-visibility': 'hidden',
  'transform': 'translateZ(0)'
}))
</script>

<template>
  <div
    v-if="collapsible === 'none'"
    :class="cn('flex h-full w-[--sidebar-width] flex-col bg-sidebar text-sidebar-foreground', props.class)"
    v-bind="$attrs"
  >
    <slot />
  </div>

  <Sheet v-else-if="isMobile" :open="openMobile" v-bind="$attrs" @update:open="setOpenMobile">
    <SheetContent
      data-sidebar="sidebar"
      data-mobile="true"
      :side="side"
      class="w-[--sidebar-width] bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden"
      :style="{
        '--sidebar-width': SIDEBAR_WIDTH_MOBILE,
      }"
    >
      <div class="flex h-full w-full flex-col">
        <slot />
      </div>
    </SheetContent>
  </Sheet>

  <div
    v-else 
    class="group peer hidden md:block"
    :data-state="state"
    :data-collapsible="state === 'collapsed' ? collapsible : ''"
    :data-variant="variant"
    :data-side="side"
  >
    <!-- This is what handles the sidebar gap on desktop  -->
    <div
      :class="cn(
        'relative bg-transparent',
        'group-data-[collapsible=offcanvas]:w-0',
        'group-data-[side=right]:rotate-180',
        variant === 'floating' || variant === 'inset' ? 'p-2' : '',
        transitionClass
      )"
      :style="{
        width: sidebarWidth,
        minWidth: sidebarWidth,
        '--sidebar-width': '16rem',
        '--sidebar-width-icon': SIDEBAR_WIDTH_ICON,
        'transition-property': 'width, min-width',
        'transition-timing-function': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'transition-duration': '300ms'
      }"
    />
    <div
      :class="cn(
        'relative inset-y-0 z-10 hidden h-svh md:flex',
        side === 'left' 
          ? 'left-0 group-data-[collapsible=offcanvas]:-left-full' 
          : 'right-0 group-data-[collapsible=offcanvas]:-right-full',
        variant === 'floating' 
          ? 'p-2' 
          : 'group-data-[side=left]:border-r group-data-[side=right]:border-l',
        props.class,
        transitionClass
      )"
      :style="{
        width: sidebarWidth,
        minWidth: sidebarWidth,
        '--sidebar-width': '16rem',
        '--sidebar-width-icon': SIDEBAR_WIDTH_ICON,
        'transition-property': 'width, min-width, transform',
        'transition-timing-function': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'transition-duration': '300ms',
        'transform': 'translateZ(0)'
      }"
      v-bind="$attrs"
    >
      <div
        data-sidebar="sidebar"
        class="flex h-full w-full flex-col text-sidebar-foreground bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow"
      >
        <slot />
      </div>
    </div>
  </div>
</template>
