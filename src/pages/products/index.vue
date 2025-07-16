<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  ArrowUpDown,
  ChevronDown,
  Eye,
  Pencil,
  Trash2
} from 'lucide-vue-next'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'
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
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card'
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog'
import { Product, mockProducts, productCategories, productStatuses } from '@/types/product'

const router = useRouter()
const searchQuery = ref('')
const categoryFilter = ref('all')
const statusFilter = ref('all')
const selectedProduct = ref<Product | null>(null)
const showDeleteDialog = ref(false)

// In a real app, you would fetch this from an API
const products = ref<Product[]>(mockProducts)

const filteredProducts = computed(() => {
  return products.value.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                        product.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesCategory = categoryFilter.value === 'all' || product.category === categoryFilter.value
    const matchesStatus = statusFilter.value === 'all' || product.status === statusFilter.value
    
    return matchesSearch && matchesCategory && matchesStatus
  })
})

const handleView = (product: Product) => {
  console.log('View product:', product)
  router.push(`/products/${product.id}`)
}

const handleEdit = (product: Product) => {
  console.log('Edit product:', product)
  router.push(`/products/${product.id}/edit`)
}

const handleDelete = (product: Product) => {
  selectedProduct.value = product
  showDeleteDialog.value = true
}

const confirmDelete = () => {
  if (selectedProduct.value) {
    // In a real app, you would call an API here
    products.value = products.value.filter(p => p.id !== selectedProduct.value?.id)
    showDeleteDialog.value = false
    selectedProduct.value = null
  }
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price)
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
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold tracking-tight">Products</h2>
        <p class="text-muted-foreground">
          Manage your products and view their details
        </p>
      </div>
      <Button @click="router.push('/products/new')">
        <Plus class="mr-2 h-4 w-4" />
        Add Product
      </Button>
    </div>

    <!-- Filters -->
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div class="space-y-2">
          <label class="text-sm font-medium">Search</label>
          <div class="relative">
            <Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              v-model="searchQuery" 
              placeholder="Search products..." 
              class="pl-8" 
            />
          </div>
        </div>
        
        <div class="space-y-2">
          <label class="text-sm font-medium">Category</label>
          <Select v-model="categoryFilter">
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
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
          <label class="text-sm font-medium">Status</label>
          <Select v-model="statusFilter">
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
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
      </CardContent>
    </Card>

    <!-- Products Table -->
    <Card>
      <CardHeader>
        <CardTitle>Products</CardTitle>
        <CardDescription>
          A list of all your products
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead class="text-right">Price</TableHead>
              <TableHead class="text-right">Stock</TableHead>
              <TableHead class="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-if="filteredProducts.length === 0">
              <TableCell colspan="6" class="h-24 text-center">
                No products found
              </TableCell>
            </TableRow>
            <TableRow v-for="product in filteredProducts" :key="product.id">
              <TableCell class="font-medium">
                <div class="flex items-center space-x-3">
                  <img 
                    v-if="product.image" 
                    :src="product.image" 
                    :alt="product.name" 
                    class="h-10 w-10 rounded-md object-cover"
                  />
                  <div>
                    <div class="font-medium">{{ product.name }}</div>
                    <div class="text-sm text-muted-foreground line-clamp-1">
                      {{ product.description }}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                {{ productCategories.find(c => c.value === product.category)?.label || product.category }}
              </TableCell>
              <TableCell>
                <Badge :variant="getStatusVariant(product.status)">
                  {{ productStatuses.find(s => s.value === product.status)?.label || product.status }}
                </Badge>
              </TableCell>
              <td class="text-right">{{ formatPrice(product.price) }}</td>
              <td class="text-right">{{ product.stock }}</td>
              <td>
                <DropdownMenu>
                  <DropdownMenuTrigger as-child>
                    <Button variant="ghost" class="h-8 w-8 p-0">
                      <span class="sr-only">Open menu</span>
                      <MoreHorizontal class="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem @click="handleView(product)">
                      <Eye class="mr-2 h-4 w-4" />
                      View
                    </DropdownMenuItem>
                    <DropdownMenuItem @click="handleEdit(product)">
                      <Pencil class="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      class="text-destructive"
                      @click="handleDelete(product)"
                    >
                      <Trash2 class="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>

    <!-- Delete Confirmation Dialog -->
    <Dialog v-model:open="showDeleteDialog">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the product "{{ selectedProduct?.name }}".
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" @click="showDeleteDialog = false">Cancel</Button>
          <Button variant="destructive" @click="confirmDelete">Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>
