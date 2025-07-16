<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'
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
  ArrowLeft, 
  Edit, 
  Trash2,
  CheckCircle2,
  XCircle,
  Package,
  Calendar,
  Clock,
  Tag,
  List
} from 'lucide-vue-next'
import { mockCategories, type Category } from '@/types/category'

const route = useRoute()
const router = useRouter()
const isLoading = ref(true)
const showDeleteDialog = ref(false)
const category = ref<Category | null>(null)
const relatedProducts = ref<any[]>([]) // In a real app, this would be fetched from an API

// In a real app, you would fetch the category from an API
const fetchCategory = () => {
  isLoading.value = true
  setTimeout(() => {
    const foundCategory = mockCategories.find(c => c.id === route.params.id)
    if (foundCategory) {
      category.value = foundCategory
      // Mock related products
      relatedProducts.value = Array(5).fill(0).map((_, i) => ({
        id: `prod-${i + 1}`,
        name: `Product ${i + 1} in ${foundCategory.name}`,
        price: Math.floor(Math.random() * 1000) + 100,
        stock: Math.floor(Math.random() * 100),
        status: ['in_stock', 'low_stock', 'out_of_stock'][Math.floor(Math.random() * 3)]
      }))
    }
    isLoading.value = false
  }, 500)
}

const handleDelete = async () => {
  // In a real app, you would call an API here
  await new Promise(resolve => setTimeout(resolve, 1000))
  router.push('/categories')
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getStatusVariant = (status: string) => {
  switch (status) {
    case 'in_stock':
      return 'success'
    case 'low_stock':
      return 'warning'
    case 'out_of_stock':
      return 'destructive'
    default:
      return 'default'
  }
}

const getStatusLabel = (status: string) => {
  return {
    in_stock: 'In Stock',
    low_stock: 'Low Stock',
    out_of_stock: 'Out of Stock'
  }[status] || status
}

onMounted(() => {
  fetchCategory()
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <Button variant="outline" @click="router.push('/categories')">
        <ArrowLeft class="mr-2 h-4 w-4" />
        Back to Categories
      </Button>
      
      <div class="flex space-x-2">
        <Button 
          variant="outline" 
          @click="router.push(`/categories/${$route.params.id}/edit`)"
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
    
    <template v-else-if="category">
      <div class="grid gap-6 md:grid-cols-3">
        <!-- Category Details -->
        <div class="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div class="flex items-center justify-between">
                <CardTitle class="text-2xl">{{ category.name }}</CardTitle>
                <Badge 
                  variant="outline" 
                  :class="category.isActive ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-50 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800' : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700'"
                >
                  <CheckCircle2 v-if="category.isActive" class="h-3.5 w-3.5 mr-1.5" />
                  <XCircle v-else class="h-3.5 w-3.5 mr-1.5" />
                  {{ category.isActive ? 'Active' : 'Inactive' }}
                </Badge>
              </div>
              <CardDescription>
                <code class="rounded bg-muted px-2 py-1 text-xs font-mono">
                  {{ category.slug }}
                </code>
              </CardDescription>
            </CardHeader>
            <CardContent class="space-y-4">
              <div class="aspect-[16/6] bg-muted rounded-md overflow-hidden mb-6">
                <div class="w-full h-full flex items-center justify-center text-muted-foreground">
                  <div class="text-center p-6">
                    <Tag class="h-12 w-12 mx-auto mb-4 opacity-20" />
                    <p class="text-sm">Category image</p>
                  </div>
                </div>
              </div>
              
              <div class="prose max-w-none">
                <h3>Description</h3>
                <p>{{ category.description || 'No description provided.' }}</p>
              </div>
              
              <div class="grid grid-cols-2 gap-4 pt-4 border-t">
                <div class="flex items-center space-x-2">
                  <Package class="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p class="text-sm text-muted-foreground">Products</p>
                    <p class="font-medium">{{ category.productCount }}</p>
                  </div>
                </div>
                <div class="flex items-center space-x-2">
                  <Calendar class="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p class="text-sm text-muted-foreground">Created</p>
                    <p class="font-medium">{{ formatDate(category.createdAt) }}</p>
                  </div>
                </div>
                <div class="flex items-center space-x-2">
                  <Clock class="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p class="text-sm text-muted-foreground">Last Updated</p>
                    <p class="font-medium">{{ formatDate(category.updatedAt) }}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <!-- Products in this category -->
          <Card>
            <CardHeader>
              <CardTitle>Products in this category</CardTitle>
              <CardDescription>
                List of products associated with this category
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div class="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow v-if="relatedProducts.length === 0">
                      <TableCell colspan="4" class="text-center py-8 text-muted-foreground">
                        No products found in this category
                      </TableCell>
                    </TableRow>
                    <TableRow v-for="product in relatedProducts" :key="product.id">
                      <TableCell class="font-medium">
                        {{ product.name }}
                      </TableCell>
                      <td>${{ product.price.toFixed(2) }}</td>
                      <td>{{ product.stock }} units</td>
                      <td>
                        <Badge :variant="getStatusVariant(product.status)">
                          {{ getStatusLabel(product.status) }}
                        </Badge>
                      </td>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <!-- Actions & Stats -->
        <div class="space-y-6">
          <!-- Quick Actions -->
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent class="space-y-2">
              <Button variant="outline" class="w-full justify-start">
                <Package class="mr-2 h-4 w-4" />
                View All Products
              </Button>
              <Button variant="outline" class="w-full justify-start">
                <List class="mr-2 h-4 w-4" />
                View Category Analytics
              </Button>
            </CardContent>
          </Card>
          
          <!-- Category Stats -->
          <Card>
            <CardHeader>
              <CardTitle>Category Stats</CardTitle>
            </CardHeader>
            <CardContent class="space-y-4">
              <div class="space-y-1">
                <p class="text-sm font-medium">Total Products</p>
                <p class="text-2xl font-bold">{{ category.productCount }}</p>
                <p class="text-xs text-muted-foreground">
                  {{ Math.floor(category.productCount * 1.5) }} products across all categories
                </p>
              </div>
              
              <div class="space-y-1">
                <p class="text-sm font-medium">Status</p>
                <div class="flex items-center">
                  <div 
                    class="h-2 rounded-full flex-1" 
                    :class="category.isActive ? 'bg-green-500' : 'bg-gray-300'"
                  ></div>
                  <span class="ml-2 text-sm font-medium">
                    {{ category.isActive ? 'Active' : 'Inactive' }}
                  </span>
                </div>
              </div>
              
              <div class="space-y-1">
                <p class="text-sm font-medium">Last Updated</p>
                <p class="text-sm">{{ formatDate(category.updatedAt) }}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </template>
    
    <!-- Delete Confirmation Dialog -->
    <AlertDialog v-model:open="showDeleteDialog">
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete the category "{{ category?.name }}" and remove all associated data.
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction 
            variant="destructive"
            @click="handleDelete"
          >
            Delete Category
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>
</template>
