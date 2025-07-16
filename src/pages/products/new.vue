<script setup>
// Reuse the edit component with isNew flag
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import ProductForm from './components/ProductForm.vue'

const router = useRouter()
const isSubmitting = ref(false)

const handleSubmit = async (productData) => {
  isSubmitting.value = true
  try {
    // In a real app, you would call an API here
    console.log('Creating product:', productData)
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Redirect to the new product page
    router.push('/products')
  } catch (error) {
    console.error('Error creating product:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold tracking-tight">Add New Product</h2>
        <p class="text-muted-foreground">
          Fill in the details to create a new product
        </p>
      </div>
      <Button 
        variant="outline" 
        @click="router.push('/products')"
      >
        <ArrowLeft class="mr-2 h-4 w-4" />
        Back to Products
      </Button>
    </div>
    
    <ProductForm 
      :is-new="true"
      :is-submitting="isSubmitting"
      @submit="handleSubmit"
      @cancel="router.push('/products')"
    />
  </div>
</template>
