<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
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
import { 
  ArrowLeft, 
  Edit, 
  Trash2, 
  Package, 
  DollarSign, 
  Tag, 
  Box, 
  AlertCircle 
} from 'lucide-vue-next'
import type { Product } from '@/types/product'
import { mockProducts, productCategories, productStatuses } from '@/types/product'

const route = useRoute()
const router = useRouter()
const { toast } = useToast()
const isLoading = ref(true)
const showDeleteDialog = ref(false)
const product = ref<Product | null>(null)

// Format price
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price)
}

// Get category label
const getCategoryLabel = (categoryValue: string) => {
  return productCategories.find(c => c.value === categoryValue)?.label || categoryValue
}

// Get status label
const getStatusLabel = (statusValue: string) => {
  return productStatuses.find(s => s.value === statusValue)?.label || statusValue
}

// Handle delete
const handleDelete = async () => {
  try {
    // In a real app, you would call an API here
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // For demo purposes, just log and show success
    console.log('Product deleted:', product.value?.id)
    
    toast({
      title: 'Success',
      description: 'Product deleted successfully',
    })
    
    router.push('/products')
  } catch (error) {
    console.error('Error deleting product:', error)
    toast({
      title: 'Error',
      description: 'Failed to delete product. Please try again.',
      variant: 'destructive',
    })
  }
}

// Load product data
onMounted(() => {
  // In a real app, you would fetch the product from an API
  setTimeout(() => {
    const foundProduct = mockProducts.find(p => p.id === route.params.id)
    if (foundProduct) {
      product.value = foundProduct
    } else {
      // Redirect to products list if product not found
      router.push('/products')
      toast({
        title: 'Error',
        description: 'Product not found',
        variant: 'destructive',
      })
    }
    isLoading.value = false
  }, 500)
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <Button variant="outline" @click="router.push('/products')">
        <ArrowLeft class="mr-2 h-4 w-4" />
        Back to Products
      </Button>
      
      <div class="flex space-x-2">
        <Button 
          variant="outline" 
          @click="router.push(`/products/${$route.params.id}/edit`)"
        >
          <Edit class="mr-2 h-4 w-4" />
          Edit
        </Button>
        <Button 
          variant="destructive" 
          @click="showDeleteDialog = true"
        >
          <Trash2 class="mr-2 h-4 w-4" />
          Delete
        </Button>
      </div>
    </div>
    
    <template v-if="isLoading">
      <div class="flex items-center justify-center h-64">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    </template>
    
    <template v-else-if="product">
      <div class="grid gap-6 md:grid-cols-3">
        <!-- Product Details -->
        <div class="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div class="flex items-center justify-between">
                <CardTitle class="text-2xl">{{ product.name }}</CardTitle>
                <Badge :variant="product.status === 'in_stock' ? 'default' : 'destructive'" class="text-sm">
                  {{ getStatusLabel(product.status) }}
                </Badge>
              </div>
              <CardDescription>{{ product.description }}</CardDescription>
            </CardHeader>
            <CardContent>
              <div class="aspect-square bg-muted rounded-md overflow-hidden mb-6">
                <img 
                  v-if="product.image" 
                  :src="product.image" 
                  :alt="product.name" 
                  class="w-full h-full object-cover"
                />
                <div v-else class="w-full h-full flex items-center justify-center text-muted-foreground">
                  <Package class="h-12 w-12" />
                </div>
              </div>
              
              <div class="prose max-w-none">
                <h3>Product Details</h3>
                <p>{{ product.description }}</p>
              </div>
            </CardContent>
          </Card>
          
          <!-- Additional Information -->
          <Card>
            <CardHeader>
              <CardTitle>Product Information</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell class="font-medium">ID</TableCell>
                    <td>{{ product.id }}</td>
                  </TableRow>
                  <TableRow>
                    <TableCell class="font-medium">Category</TableCell>
                    <td>{{ getCategoryLabel(product.category) }}</td>
                  </TableRow>
                  <TableRow>
                    <TableCell class="font-medium">Price</TableCell>
                    <td>{{ formatPrice(product.price) }}</td>
                  </TableRow>
                  <TableRow>
                    <TableCell class="font-medium">Stock</TableCell>
                    <td>{{ product.stock }} units</td>
                  </TableRow>
                  <TableRow>
                    <TableCell class="font-medium">Status</TableCell>
                    <td>
                      <Badge :variant="product.status === 'in_stock' ? 'default' : 'destructive'">
                        {{ getStatusLabel(product.status) }}
                      </Badge>
                    </td>
                  </TableRow>
                  <TableRow>
                    <TableCell class="font-medium">Created At</TableCell>
                    <td>{{ new Date(product.createdAt).toLocaleDateString() }}</td>
                  </TableRow>
                  <TableRow>
                    <TableCell class="font-medium">Last Updated</TableCell>
                    <td>{{ new Date(product.updatedAt).toLocaleDateString() }}</td>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        
        <!-- Stats & Actions -->
        <div class="space-y-6">
          <!-- Stats -->
          <Card>
            <CardHeader>
              <CardTitle>Product Stats</CardTitle>
            </CardHeader>
            <CardContent class="space-y-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-2">
                  <div class="p-2 rounded-full bg-secondary">
                    <Package class="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p class="text-sm text-muted-foreground">Stock</p>
                    <p class="font-medium">{{ product.stock }} units</p>
                  </div>
                </div>
                <div class="flex items-center space-x-2">
                  <div class="p-2 rounded-full bg-secondary">
                    <DollarSign class="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p class="text-sm text-muted-foreground">Price</p>
                    <p class="font-medium">{{ formatPrice(product.price) }}</p>
                  </div>
                </div>
              </div>
              <div class="flex items-center space-x-2">
                <div class="p-2 rounded-full bg-secondary">
                  <Tag class="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p class="text-sm text-muted-foreground">Category</p>
                  <p class="font-medium">{{ getCategoryLabel(product.category) }}</p>
                </div>
              </div>
              <div class="flex items-center space-x-2">
                <div class="p-2 rounded-full bg-secondary">
                  <Box class="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p class="text-sm text-muted-foreground">Status</p>
                  <p class="font-medium">
                    <Badge :variant="product.status === 'in_stock' ? 'default' : 'destructive'">
                      {{ getStatusLabel(product.status) }}
                    </Badge>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <!-- Actions -->
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent class="space-y-4">
              <Button 
                variant="outline" 
                class="w-full"
                @click="router.push(`/products/${$route.params.id}/edit`)"
              >
                <Edit class="mr-2 h-4 w-4" />
                Edit Product
              </Button>
              
              <Button 
                variant="destructive" 
                class="w-full"
                @click="showDeleteDialog = true"
              >
                <Trash2 class="mr-2 h-4 w-4" />
                Delete Product
              </Button>
            </CardContent>
          </Card>
          
          <!-- Low Stock Alert -->
          <AlertDialog v-if="product.status === 'low_stock' || product.status === 'out_of_stock'">
            <AlertDialogContent>
              <AlertDialogHeader>
                <div class="flex items-center space-x-2">
                  <AlertCircle class="h-5 w-5 text-yellow-500" />
                  <AlertDialogTitle>Low Stock Alert</AlertDialogTitle>
                </div>
                <AlertDialogDescription>
                  This product is running {{ product.status === 'low_stock' ? 'low on stock' : 'out of stock' }}. 
                  Consider reordering soon to avoid stockouts.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction>Order More</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </template>
    
    <!-- Delete Confirmation Dialog -->
    <AlertDialog v-model:open="showDeleteDialog">
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the product "{{ product?.name }}" and remove all associated data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction 
            variant="destructive"
            @click="handleDelete"
          >
            Delete Product
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>
</template>
