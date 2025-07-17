<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Card, 
  CardContent, 
  CardHeader 
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
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'
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
  Plus, 
  Search, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Eye,
  CheckCircle2,
  XCircle
} from 'lucide-vue-next'
import { mockCategories, type Category } from '@/types/category'

const router = useRouter()
const searchQuery = ref('')
const selectedCategory = ref<Category | null>(null)
const showDeleteDialog = ref(false)
const isDeleting = ref(false)

// In a real app, you would fetch this from an API
const categories = ref<Category[]>(mockCategories)

const filteredCategories = computed(() => {
  if (!searchQuery.value) return categories.value
  
  const query = searchQuery.value.toLowerCase()
  return categories.value.filter(category => 
    category.name.toLowerCase().includes(query) || 
    category.description?.toLowerCase().includes(query) ||
    category.slug.toLowerCase().includes(query)
  )
})

const handleView = (category: Category) => {
  router.push(`/categories/${category.id}`)
}

const handleEdit = (category: Category) => {
  router.push(`/categories/${category.id}/edit`)
}

const handleDeleteClick = (category: Category) => {
  selectedCategory.value = category
  showDeleteDialog.value = true
}

const confirmDelete = async () => {
  if (!selectedCategory.value) return
  
  isDeleting.value = true
  try {
    // In a real app, you would call an API here
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    categories.value = categories.value.filter(c => c.id !== selectedCategory.value?.id)
    showDeleteDialog.value = false
    selectedCategory.value = null
  } catch (error) {
    console.error('Error deleting category:', error)
  } finally {
    isDeleting.value = false
  }
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h2 class="text-2xl font-bold tracking-tight">Categories</h2>
        <p class="text-muted-foreground">
          Manage your product categories
        </p>
      </div>
      <Button @click="router.push('/categories/new')">
        <Plus class="mr-2 h-4 w-4" />
        Add Category
      </Button>
    </div>

    <Card>
      <CardHeader>
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div class="w-full sm:w-auto">
            <div class="relative">
              <Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                v-model="searchQuery"
                type="search"
                placeholder="Search categories..."
                class="w-full sm:w-64 pl-8"
              />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div class="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Products</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead class="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-if="filteredCategories.length === 0">
                <TableCell colspan="6" class="text-center py-8 text-muted-foreground">
                  No categories found
                </TableCell>
              </TableRow>
              <TableRow v-for="category in filteredCategories" :key="category.id">
                <TableCell class="font-medium">
                  <div class="flex items-center gap-3">
                    <div class="h-10 w-10 rounded-md bg-muted flex items-center justify-center">
                      <span class="text-lg font-medium text-foreground/80">
                        {{ category.name.charAt(0).toUpperCase() }}
                      </span>
                    </div>
                    <div>
                      <div class="font-medium">{{ category.name }}</div>
                      <div class="text-sm text-muted-foreground line-clamp-1">
                        {{ category.description || 'No description' }}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <code class="relative rounded bg-muted px-2 py-1 text-xs font-mono">
                    {{ category.slug }}
                  </code>
                </TableCell>
                <td>{{ category.productCount }} products</td>
                <td>
                  <Badge variant="outline" :class="category.isActive ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-50 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800' : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700'">
                    <CheckCircle2 v-if="category.isActive" class="h-3 w-3 mr-1.5" />
                    <XCircle v-else class="h-3 w-3 mr-1.5" />
                    {{ category.isActive ? 'Active' : 'Inactive' }}
                  </Badge>
                </td>
                <td>{{ formatDate(category.updatedAt) }}</td>
                <td>
                  <div class="flex items-center justify-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger as-child>
                        <Button variant="ghost" class="h-8 w-8 p-0">
                          <span class="sr-only">Open menu</span>
                          <MoreHorizontal class="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem @click="handleView(category)">
                          <Eye class="mr-2 h-4 w-4" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem @click="handleEdit(category)">
                          <Edit class="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          class="text-destructive focus:text-destructive"
                          @click="handleDeleteClick(category)"
                        >
                          <Trash2 class="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </td>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>

    <!-- Delete Confirmation Dialog -->
    <AlertDialog v-model:open="showDeleteDialog">
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete the category "{{ selectedCategory?.name }}" and remove all associated data.
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel :disabled="isDeleting">Cancel</AlertDialogCancel>
          <AlertDialogAction 
            variant="destructive" 
            :disabled="isDeleting"
            @click="confirmDelete"
          >
            <Loader2 v-if="isDeleting" class="mr-2 h-4 w-4 animate-spin" />
            {{ isDeleting ? 'Deleting...' : 'Delete' }}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>
</template>
