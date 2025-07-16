<script setup>
import { ref, watch } from 'vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select'
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card'
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { 
  Loader2, 
  Save, 
  ArrowLeft, 
  Package, 
  DollarSign, 
  Tag, 
  Box,
  AlertCircle
} from 'lucide-vue-next'
import { productCategories, productStatuses } from '@/types/product'

const props = defineProps({
  initialData: {
    type: Object,
    default: () => ({
      name: '',
      description: '',
      price: 0,
      category: '',
      stock: 0,
      status: 'in_stock',
      image: ''
    })
  },
  isNew: {
    type: Boolean,
    default: false
  },
  isSubmitting: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['submit', 'cancel'])

const form = ref({ ...props.initialData })
const showCancelDialog = ref(false)
const hasUnsavedChanges = ref(false)
const pendingNavigation = ref('')

// Watch for changes to initialData
watch(() => props.initialData, (newVal) => {
  form.value = { ...newVal }
}, { immediate: true })

// Format price for display
const formatPrice = (price) => {
  if (!price) return '0.00'
  return parseFloat(price).toFixed(2)
}

// Handle price input to ensure proper formatting
const handlePriceInput = (e) => {
  // Remove any non-numeric characters except decimal point
  let value = e.target.value.replace(/[^0-9.]/g, '')
  
  // Ensure only one decimal point
  const decimalCount = (value.match(/\./g) || []).length
  if (decimalCount > 1) {
    const parts = value.split('.')
    value = parts[0] + '.' + parts.slice(1).join('')
  }
  
  // Limit to 2 decimal places
  const parts = value.split('.')
  if (parts[1] && parts[1].length > 2) {
    parts[1] = parts[1].substring(0, 2)
    value = parts.join('.')
  }
  
  form.value.price = value === '' ? 0 : parseFloat(value)
}

// Handle form submission
const handleSubmit = (e) => {
  e.preventDefault()
  emit('submit', form.value)
}

// Handle cancel
const handleCancel = () => {
  if (hasUnsavedChanges.value) {
    showCancelDialog.value = true
  } else {
    emit('cancel')
  }
}

// Confirm cancel navigation
const confirmCancel = () => {
  if (pendingNavigation.value) {
    window.location.href = pendingNavigation.value
  } else {
    emit('cancel')
  }
  showCancelDialog.value = false
}

// Watch for form changes
watch(form, (newVal, oldVal) => {
  if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
    hasUnsavedChanges.value = true
  }
}, { deep: true })
</script>

<template>
  <form @submit="handleSubmit">
    <div class="grid gap-6 md:grid-cols-3">
      <!-- Main Form -->
      <div class="space-y-6 md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Product Information</CardTitle>
            <CardDescription>
              Enter the product details
            </CardDescription>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="space-y-2">
              <Label for="name">Product Name</Label>
              <Input 
                id="name" 
                v-model="form.name" 
                placeholder="Enter product name" 
                required 
              />
            </div>
            
            <div class="space-y-2">
              <Label for="description">Description</Label>
              <Textarea 
                id="description" 
                v-model="form.description" 
                placeholder="Enter product description" 
                rows="4" 
              />
            </div>
            
            <div class="grid gap-4 md:grid-cols-2">
              <div class="space-y-2">
                <Label for="price">Price</Label>
                <div class="relative">
                  <span class="absolute left-3 top-2.5 text-muted-foreground">$</span>
                  <Input 
                    id="price" 
                    :value="formatPrice(form.price)" 
                    @input="handlePriceInput"
                    type="text"
                    class="pl-8" 
                    required 
                  />
                </div>
              </div>
              
              <div class="space-y-2">
                <Label for="stock">Stock</Label>
                <Input 
                  id="stock" 
                  v-model.number="form.stock" 
                  type="number" 
                  min="0" 
                  required 
                />
              </div>
            </div>
            
            <div class="grid gap-4 md:grid-cols-2">
              <div class="space-y-2">
                <Label for="category">Category</Label>
                <Select v-model="form.category" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem 
                      v-for="category in productCategories" 
                      :key="category.value" 
                      :value="category.value"
                    >
                      {{ category.label }}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div class="space-y-2">
                <Label for="status">Status</Label>
                <Select v-model="form.status">
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem 
                      v-for="status in productStatuses" 
                      :key="status.value" 
                      :value="status.value"
                    >
                      {{ status.label }}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div class="space-y-2">
              <Label for="image">Image URL</Label>
              <Input 
                id="image" 
                v-model="form.image" 
                type="url" 
                placeholder="https://example.com/image.jpg" 
              />
              <p class="text-sm text-muted-foreground">
                Enter a URL to an image of the product
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <!-- Preview & Actions -->
      <div class="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
            <CardDescription>How your product will appear</CardDescription>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="aspect-square bg-muted rounded-md overflow-hidden">
              <img 
                v-if="form.image" 
                :src="form.image" 
                :alt="form.name || 'Product image'" 
                class="w-full h-full object-cover"
              />
              <div v-else class="w-full h-full flex items-center justify-center text-muted-foreground">
                <Package class="h-12 w-12" />
              </div>
            </div>
            <div class="space-y-1">
              <h3 class="font-medium">{{ form.name || 'Product Name' }}</h3>
              <p class="text-sm text-muted-foreground line-clamp-2">
                {{ form.description || 'Product description will appear here' }}
              </p>
              <p class="font-medium">
                {{ form.price ? `$${formatPrice(form.price)}` : '$0.00' }}
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Actions</CardTitle>
          </CardHeader>
          <CardContent class="space-y-4">
            <Button 
              type="submit" 
              class="w-full" 
              :disabled="isSubmitting"
            >
              <Loader2 v-if="isSubmitting" class="mr-2 h-4 w-4 animate-spin" />
              <Save v-else class="mr-2 h-4 w-4" />
              {{ isSubmitting ? 'Saving...' : 'Save Product' }}
            </Button>
            
            <Button 
              type="button" 
              variant="outline" 
              class="w-full" 
              @click="handleCancel"
              :disabled="isSubmitting"
            >
              Cancel
            </Button>
            
            <div v-if="hasUnsavedChanges" class="text-sm text-yellow-600 dark:text-yellow-400 flex items-center">
              <AlertCircle class="h-4 w-4 mr-2" />
              You have unsaved changes
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    
    <!-- Cancel Confirmation Dialog -->
    <AlertDialog v-model:open="showCancelDialog">
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Discard changes?</AlertDialogTitle>
          <AlertDialogDescription>
            You have unsaved changes. Are you sure you want to leave this page? Your changes will be lost.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel @click="showCancelDialog = false">Cancel</AlertDialogCancel>
          <AlertDialogAction @click="confirmCancel">Discard Changes</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </form>
</template>
