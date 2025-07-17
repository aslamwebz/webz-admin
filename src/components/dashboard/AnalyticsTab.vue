<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { LineChart, PieChart } from 'lucide-vue-next'

// Mock data - in a real app, this would come from an API

const topProducts = [
  { name: 'Wireless Headphones', value: 400, color: 'hsl(24.6, 95%, 53.1%)' },
  { name: 'Smart Watch', value: 300, color: 'hsl(142.1, 76.2%, 36.3%)' },
  { name: 'Laptop', value: 200, color: 'hsl(221.2, 83.2%, 53.3%)' },
  { name: 'Smartphone', value: 178, color: 'hsl(346.8, 77.2%, 49.8%)' },
  { name: 'Tablet', value: 150, color: 'hsl(262.1, 83.3%, 57.8%)' },
]

const metrics = [
  { name: 'Total Sales', value: '$24,780', change: '+12.5%', changeType: 'positive' },
  { name: 'Avg. Order Value', value: '$89.50', change: '+5.2%', changeType: 'positive' },
  { name: 'Conversion Rate', value: '3.42%', change: '-0.8%', changeType: 'negative' },
  { name: 'New Customers', value: '1,234', change: '+23.1%', changeType: 'positive' },
]
</script>

<template>
  <div class="space-y-6">
    <!-- Quick Stats -->
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card v-for="metric in metrics" :key="metric.name">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">
            {{ metric.name }}
          </CardTitle>
          <div 
            class="text-xs font-medium px-2 py-1 rounded-full"
            :class="{
              'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400': metric.changeType === 'positive',
              'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400': metric.changeType === 'negative'
            }"
          >
            {{ metric.change }}
          </div>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">{{ metric.value }}</div>
          <p class="text-xs text-muted-foreground">vs last period</p>
        </CardContent>
      </Card>
    </div>

    <!-- Main Charts -->
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <!-- Sales Trend -->
      <Card class="col-span-4">
        <CardHeader>
          <CardTitle>Sales Trend</CardTitle>
        </CardHeader>
        <CardContent class="pl-2">
          <div class="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
            <div class="text-center space-y-2">
              <LineChart class="h-12 w-12 mx-auto text-muted-foreground" />
              <p class="text-sm text-muted-foreground">Sales trend chart will be displayed here</p>
              <p class="text-xs text-muted-foreground">(Integration with charting library needed)</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Top Products -->
      <Card class="col-span-3">
        <CardHeader>
          <CardTitle>Top Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="space-y-4">
            <div v-for="product in topProducts" :key="product.name" class="space-y-1">
              <div class="flex items-center justify-between">
                <div class="text-sm font-medium">{{ product.name }}</div>
                <div class="text-sm font-medium">{{ product.value }} sold</div>
              </div>
              <div class="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div 
                  class="h-full rounded-full" 
                  :style="{
                    width: `${(product.value / 500) * 100}%`,
                    backgroundColor: product.color
                  }"
                ></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Additional Metrics -->
    <div class="grid gap-4 md:grid-cols-2">
      <!-- Traffic Sources -->
      <Card>
        <CardHeader>
          <CardTitle>Traffic Sources</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="h-[250px] flex items-center justify-center bg-muted/20 rounded-md">
            <div class="text-center space-y-2">
              <PieChart class="h-12 w-12 mx-auto text-muted-foreground" />
              <p class="text-sm text-muted-foreground">Traffic sources chart will be displayed here</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Recent Activity -->
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="space-y-4">
            <div v-for="i in 5" :key="i" class="flex items-start space-x-3">
              <div class="h-2 w-2 mt-2 rounded-full bg-primary"></div>
              <div class="flex-1 space-y-1">
                <p class="text-sm font-medium">New order #{{ 1000 + i }}</p>
                <p class="text-xs text-muted-foreground">2 hours ago</p>
              </div>
              <Button variant="ghost" size="sm">View</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
