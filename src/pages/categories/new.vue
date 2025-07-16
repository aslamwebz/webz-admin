<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from '@/components/ui/toast/use-toast'
import CategoryForm from './components/CategoryForm.vue'
import { mockCategories } from '@/types/category'

const router = useRouter()
const { toast } = useToast()
const isSubmitting = ref(false)

const handleSubmit = async (formData: any) => {
  isSubmitting.value = true
  
  try {
    // In a real app, you would call an API here
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Create a new category object
    const newCategory = {
      ...formData,
      id: `cat-${mockCategories.length + 1}`,
      productCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    // In a real app, you would add this to your database
    console.log('New category created:', newCategory)
    
    toast({
      title: 'Success',
      description: 'Category created successfully',
    })
    
    // Redirect to the categories list
    router.push('/categories')
  } catch (error) {
    console.error('Error creating category:', error)
    toast({
      title: 'Error',
      description: 'Failed to create category. Please try again.',
      variant: 'destructive',
    })
  } finally {
    isSubmitting.value = false
  }
}

const handleCancel = () => {
  router.push('/categories')
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold tracking-tight">New Category</h2>
        <p class="text-muted-foreground">
          Add a new product category
        </p>
      </div>
      <Button 
        variant="outline" 
        @click="router.push('/categories')"
      >
        <ArrowLeft class="mr-2 h-4 w-4" />
        Back to Categories
      </Button>
    </div>
    
    <CategoryForm 
      :is-submitting="isSubmitting"
      @submit="handleSubmit"
      @cancel="handleCancel"
    />
  </div>
</template>
