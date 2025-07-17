<script setup lang="ts">
import { ref } from 'vue'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Download, FileText, BarChart2, Calendar, Filter } from 'lucide-vue-next'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const reportType = ref('sales')
const dateRange = ref('7days')
const format = ref('pdf')

const reportTypes = [
  { value: 'sales', label: 'Sales Report' },
  { value: 'products', label: 'Products Report' },
  { value: 'customers', label: 'Customers Report' },
  { value: 'inventory', label: 'Inventory Report' },
]

const dateRanges = [
  { value: '7days', label: 'Last 7 days' },
  { value: '30days', label: 'Last 30 days' },
  { value: '90days', label: 'Last 90 days' },
  { value: 'month', label: 'This month' },
  { value: 'year', label: 'This year' },
  { value: 'custom', label: 'Custom range' },
]

const formats = [
  { value: 'pdf', label: 'PDF' },
  { value: 'csv', label: 'CSV' },
  { value: 'excel', label: 'Excel' },
]

const generateReport = () => {
  // In a real app, this would generate and download the report
  console.log('Generating report:', {
    type: reportType.value,
    dateRange: dateRange.value,
    format: format.value
  })
  
  // Show success message
  // This would be replaced with actual report generation logic
  alert(`Report generated successfully! (${format.value.toUpperCase()} format)`)
}
</script>

<template>
  <div class="space-y-6">
    <!-- Report Generator Card -->
    <Card>
      <CardHeader>
        <CardTitle class="flex items-center gap-2">
          <FileText class="h-5 w-5" />
          <span>Generate Report</span>
        </CardTitle>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="grid gap-4 md:grid-cols-3">
          <!-- Report Type -->
          <div class="space-y-2">
            <Label for="report-type">Report Type</Label>
            <Select v-model="reportType">
              <SelectTrigger id="report-type">
                <SelectValue placeholder="Select report type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem v-for="type in reportTypes" :key="type.value" :value="type.value">
                  {{ type.label }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <!-- Date Range -->
          <div class="space-y-2">
            <Label for="date-range">Date Range</Label>
            <Select v-model="dateRange">
              <SelectTrigger id="date-range">
                <Calendar class="h-4 w-4 opacity-50 mr-2" />
                <SelectValue placeholder="Select date range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem v-for="range in dateRanges" :key="range.value" :value="range.value">
                  {{ range.label }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <!-- Format -->
          <div class="space-y-2">
            <Label for="format">Format</Label>
            <Select v-model="format">
              <SelectTrigger id="format">
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem v-for="fmt in formats" :key="fmt.value" :value="fmt.value">
                  {{ fmt.label }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
      <CardFooter class="flex justify-end border-t px-6 py-4">
        <Button @click="generateReport">
          <Download class="h-4 w-4 mr-2" />
          Generate Report
        </Button>
      </CardFooter>
    </Card>

    <!-- Report Templates -->
    <div>
      <h3 class="text-lg font-semibold mb-4">Report Templates</h3>
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card v-for="template in reportTypes" :key="template.value" class="hover:shadow-md transition-shadow">
          <CardHeader class="pb-2">
            <div class="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center mb-2">
              <BarChart2 class="h-5 w-5 text-primary" />
            </div>
            <CardTitle class="text-lg">{{ template.label }}</CardTitle>
          </CardHeader>
          <CardContent class="pb-4">
            <p class="text-sm text-muted-foreground">
              Generate a detailed {{ template.label.toLowerCase() }} with various metrics and insights.
            </p>
          </CardContent>
          <CardFooter class="pt-0">
            <Button variant="outline" size="sm" class="w-full" @click="reportType = template.value">
              Use Template
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>

    <!-- Recent Reports -->
    <div class="mt-8">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-semibold">Recent Reports</h3>
        <Button variant="outline" size="sm" class="gap-2">
          <Filter class="h-4 w-4" />
          <span>Filter</span>
        </Button>
      </div>
      
      <Card>
        <div class="divide-y">
          <div v-for="i in 5" :key="i" class="p-4 flex items-center justify-between hover:bg-muted/50">
            <div class="flex items-center space-x-4">
              <div class="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                <FileText class="h-5 w-5 text-primary" />
              </div>
              <div>
                <p class="font-medium">{{ reportTypes[i % reportTypes.length].label }}</p>
                <p class="text-sm text-muted-foreground">Generated {{ i }} day{{ i > 1 ? 's' : '' }} ago</p>
              </div>
            </div>
            <div class="flex items-center space-x-2">
              <Button variant="outline" size="sm" class="gap-2">
                <Download class="h-4 w-4" />
                <span>Download</span>
              </Button>
              <Button variant="ghost" size="icon" class="h-8 w-8">
                <span class="sr-only">More options</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4">
                  <circle cx="12" cy="12" r="1" />
                  <circle cx="12" cy="5" r="1" />
                  <circle cx="12" cy="19" r="1" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>
