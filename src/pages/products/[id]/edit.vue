<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select'
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
import { useToast } from '@/components/ui/toast/use-toast'
import { Loader2, Save, ArrowLeft } from 'lucide-vue-next'
import type { Product } from '@/types/product'
import { mockProducts, productCategories, productStatuses } from '@/types/product'

const route = useRoute()
const router = useRouter()
const { toast } = useToast()
const isSubmitting = ref(false)
const showCancelDialog = ref(false)
const hasUnsavedChanges = ref(false)
const pendingNavigation = ref('')

// Form state
const form = ref<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>({
  name: '',
  description: '',
  price: 0,
  category: '',
  stock: 0,
  status: 'in_stock',
  image: ''
})

// Check if this is an edit or create
const isEdit = route.name === 'edit-product'
const productId = route.params.id as string

// Load product data if in edit mode
onMounted(() => {
  if (isEdit) {
    // In a real app, you would fetch the product from an API
    const product = mockProducts.find(p => p.id === productId)
    if (product) {
      const { id, createdAt, updatedAt, ...productData } = product
      form.value = productData
    }
  }
  
  // Set up beforeunload handler
  window.addEventListener('beforeunload', handleBeforeUnload)
  
  // Clean up
  return () => {
    window.removeEventListener('beforeunload', handleBeforeUnload)
  }
})

const handleBeforeUnload = (e: BeforeUnloadEvent) => {
  if (hasUnsavedChanges.value) {
    // Cancel the event
    e.preventDefault()
    // Chrome requires returnValue to be set
    e.returnValue = ''
    return ''
  }
}

const handleSubmit = async () => {
  isSubmitting.value = true
  
  try {
    // In a real app, you would call an API here
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // For demo purposes, just log and show success
    console.log('Product saved:', form.value)
    
    toast({
      title: 'Success',
      description: isEdit ? 'Product updated successfully' : 'Product created successfully',
    })
    
    hasUnsavedChanges.value = false
    router.push('/products')
  } catch (error) {
    console.error('Error saving product:', error)
    toast({
      title: 'Error',
      description: 'Failed to save product. Please try again.',
      variant: 'destructive',
    })
  } finally {
    isSubmitting.value = false
  }
}

const handleCancel = () => {
  if (hasUnsavedChanges.value) {
    showCancelDialog.value = true
  } else {
    router.push('/products')
  }
}

const confirmCancel = () => {
  if (pendingNavigation.value) {
    router.push(pendingNavigation.value)
    pendingNavigation.value = ''
  } else {
    router.push('/products')
  }
  showCancelDialog.value = false
}



// Watch for form changes
const originalForm = JSON.stringify(form.value)
watch(form, (newValue) => {
  hasUnsavedChanges.value = JSON.stringify(newValue) !== originalForm
}, { deep: true })
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold tracking-tight">
          {{ isEdit ? 'Edit Product' : 'Create New Product' }}
        </h2>
        <p class="text-muted-foreground">
          {{ isEdit ? 'Update the product details below' : 'Fill in the details to create a new product' }}
        </p>
      </div>
      <Button variant="outline" @click="handleCancel">
        <ArrowLeft class="mr-2 h-4 w-4" />
        Back to Products
      </Button>
    </div>

    <form @submit.prevent="handleSubmit">
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
                      v-model.number="form.price" 
                      type="number" 
                      min="0" 
                      step="0.01" 
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
                  No image
                </div>
              </div>
              <div class="space-y-1">
                <h3 class="font-medium">{{ form.name || 'Product Name' }}</h3>
                <p class="text-sm text-muted-foreground line-clamp-2">
                  {{ form.description || 'Product description will appear here' }}
                </p>
                <p class="font-medium">
                  {{ form.price ? `$${form.price.toFixed(2)}` : '$0.00' }}
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent class="space-y-4">
              <Button type="submit" class="w-full" :disabled="isSubmitting">
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
              
              <div class="text-sm text-muted-foreground text-center">
                {{ hasUnsavedChanges ? 'You have unsaved changes' : 'All changes saved' }}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
    
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
  </div>
</template>
