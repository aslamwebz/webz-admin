<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from '@/components/ui/toast/use-toast'
import CategoryForm from '../components/CategoryForm.vue'
import { mockCategories, type Category } from '@/types/category'

const route = useRoute()
const router = useRouter()
const { toast } = useToast()

const isLoading = ref(true)
const isSubmitting = ref(false)
const category = ref<Category | null>(null)

// In a real app, you would fetch the category from an API
const fetchCategory = () => {
  isLoading.value = true
  setTimeout(() => {
    const foundCategory = mockCategories.find(c => c.id === route.params.id)
    if (foundCategory) {
      category.value = foundCategory
    } else {
      // Redirect to categories list if category not found
      router.push('/categories')
      toast({
        title: 'Error',
        description: 'Category not found',
        variant: 'destructive',
      })
    }
    isLoading.value = false
  }, 500)
}

const handleSubmit = async (formData: any) => {
  isSubmitting.value = true
  
  try {
    // In a real app, you would call an API here
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Update the category object
    const updatedCategory = {
      ...formData,
      id: category.value?.id || '',
      productCount: category.value?.productCount || 0,
      createdAt: category.value?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    // In a real app, you would update this in your database
    console.log('Category updated:', updatedCategory)
    
    toast({
      title: 'Success',
      description: 'Category updated successfully',
    })
    
    // Redirect to the category details
    router.push(`/categories/${category.value?.id}`)
  } catch (error) {
    console.error('Error updating category:', error)
    toast({
      title: 'Error',
      description: 'Failed to update category. Please try again.',
      variant: 'destructive',
    })
  } finally {
    isSubmitting.value = false
  }
}

const handleCancel = () => {
  if (category.value) {
    router.push(`/categories/${category.value.id}`)
  } else {
    router.push('/categories')
  }
}

onMounted(() => {
  fetchCategory()
})
</script>

<template>
  <div class="space-y-6">
    <div v-if="isLoading" class="flex items-center justify-center h-64">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
    
    <template v-else-if="category">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-2xl font-bold tracking-tight">Edit Category</h2>
          <p class="text-muted-foreground">
            Update the category details
          </p>
        </div>
        <Button 
          variant="outline" 
          @click="handleCancel"
        >
          <ArrowLeft class="mr-2 h-4 w-4" />
          Back to Category
        </Button>
      </div>
      
      <CategoryForm 
        :initial-data="category"
        :is-submitting="isSubmitting"
        @submit="handleSubmit"
        @cancel="handleCancel"
      />
    </template>
  </div>
</template>
