<script setup lang="ts" generic="T extends Record<string, any>">
import type { BulletLegendItemInterface } from '@unovis/ts'
import type { BaseChartProps } from '.'
import { GroupedBar, StackedBar } from '@unovis/ts'
import { VisAxis, VisGroupedBar, VisStackedBar, VisXYContainer } from '@unovis/vue'
import { useMounted } from '@vueuse/core'
import { type Component, computed, ref } from 'vue'
import { cn } from '@/lib/utils'
import { ChartCrosshair, ChartLegend, defaultColors } from '@/components/ui/chart'
import { useTheme } from '@/composables/useTheme'

const props = withDefaults(defineProps<BaseChartProps<T> & {
  /**
   * Render custom tooltip component.
   */
  customTooltip?: Component
  /**
   * Change the type of the chart
   * @default "grouped"
   */
  type?: 'stacked' | 'grouped'
  /**
   * Rounded bar corners
   * @default 0
   */
  roundedCorners?: number
}>(), {
  type: 'grouped',
  margin: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
  filterOpacity: 0.2,
  roundedCorners: 0,
  showXAxis: true,
  showYAxis: true,
  showTooltip: true,
  showLegend: true,
  showGridLine: true,
})
const emits = defineEmits<{
  legendItemClick: [d: BulletLegendItemInterface, i: number]
}>()

type KeyOfT = Extract<keyof T, string>
type Data = typeof props.data[number]

const index = computed(() => props.index as KeyOfT)
const { isDark } = useTheme()

// Theme-aware colors
const colors = computed(() => {
  // In light mode, use the default colors (darker)
  if (!isDark.value) {
    return props.colors?.length ? props.colors : defaultColors(props.categories.length)
  }
  
  // In dark mode, use lighter colors for better visibility
  // These are light pastel colors that work well on dark backgrounds
  const lightColors = [
    '#93c5fd', // light blue
    '#a5b4fc', // light indigo
    '#c4b5fd', // light purple
    '#d8b4fe', // light violet
    '#f0abfc', // light fuchsia
    '#f9a8d4', // light pink
    '#fda4af', // light rose
    '#fca5a5', // light red
    '#fcd34d', // light amber
    '#86efac', // light green
    '#6ee7b7', // light emerald
    '#67e8f9', // light cyan
  ]
  
  return props.colors?.length 
    ? props.colors.map(() => lightColors[0]) // Use first light color if custom colors provided
    : lightColors.slice(0, props.categories.length) // Use as many light colors as needed
})
const legendItems = ref<BulletLegendItemInterface[]>(props.categories.map((category, i) => ({
  name: category,
  color: colors.value[i],
  inactive: false,
})))

const isMounted = useMounted()

function handleLegendItemClick(d: BulletLegendItemInterface, i: number) {
  emits('legendItemClick', d, i)
}

const VisBarComponent = computed(() => props.type === 'grouped' ? VisGroupedBar : VisStackedBar)
const selectorsBar = computed(() => props.type === 'grouped' ? GroupedBar.selectors.bar : StackedBar.selectors.bar)
</script>

<template>
  <div :class="cn('w-full h-[400px] flex flex-col items-end transition-colors duration-200', $attrs.class ?? '')">
    <ChartLegend v-if="showLegend" v-model:items="legendItems" @legend-item-click="handleLegendItemClick" />

    <VisXYContainer
      :data="data"
      :style="{ height: isMounted ? '100%' : 'auto' }"
      :margin="margin"
    >
      <ChartCrosshair v-if="showTooltip" :colors="colors" :items="legendItems" :custom-tooltip="customTooltip" :index="index" />

      <VisBarComponent
        :x="(_d: Data, i: number) => i"
        :y="categories.map(category => (d: Data) => d[category]) "
        :color="colors"
        :rounded-corners="roundedCorners"
        :bar-padding="0.05"
        :attributes="{
          [selectorsBar]: {
            opacity: (_d: Data, i:number) => {
              const pos = i % categories.length
              return legendItems[pos]?.inactive ? filterOpacity : 1
            },
          },
        }"
      />

      <VisAxis
        v-if="showXAxis"
        type="x"
        :tick-format="xFormatter ?? ((v: number) => data[v]?.[index])"
        :grid-line="false"
        :tick-line="true"
        :tick-text-color="isDark ? 'hsl(var(--muted-foreground))' : 'hsl(var(--foreground))'"
        :tick-line-color="isDark ? 'hsl(var(--border) / 0.5)' : 'hsl(var(--border))'"
      />
      <VisAxis
        v-if="showYAxis"
        type="y"
        :tick-line="true"
        :grid-line="showGridLine"
        :tick-format="yFormatter"
        :grid-line-color="isDark ? 'hsl(var(--border) / 0.2)' : 'hsl(var(--border) / 0.5)'"
        :tick-text-color="isDark ? 'hsl(var(--muted-foreground))' : 'hsl(var(--foreground))'"
        :tick-line-color="isDark ? 'hsl(var(--border) / 0.5)' : 'hsl(var(--border))'"
      />

      <slot />
    </VisXYContainer>
  </div>
</template>
