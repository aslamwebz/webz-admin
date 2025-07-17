<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from '@/components/ui/toast/use-toast'
import { mockCustomers } from '@/types/customer'
import CustomerForm from '../components/CustomerForm.vue'

const route = useRoute()
const router = useRouter()
const { toast } = useToast()

const customer = ref<typeof mockCustomers[0] | null>(null)
const isLoading = ref(true)

// Fetch customer data
onMounted(() => {
  // Simulate API call
  setTimeout(() => {
    const foundCustomer = mockCustomers.find(c => c.id === route.params.id)
    if (foundCustomer) {
      customer.value = foundCustomer
    } else {
      // Handle customer not found
      toast({
        title: 'Error',
        description: 'Customer not found',
        variant: 'destructive',
      })
      router.push('/customers')
    }
    isLoading.value = false
  }, 500)
})

const handleSubmit = (updatedCustomer: any) => {
  // In a real app, you would call an API to update the customer
  console.log('Updating customer:', updatedCustomer)
  
  // Simulate API call
  setTimeout(() => {
    // In a real app, you would update the customer in your database
    // const index = mockCustomers.findIndex(c => c.id === updatedCustomer.id)
    // if (index !== -1) {
    //   mockCustomers[index] = updatedCustomer
    // }
    
    toast({
      title: 'Customer updated',
      description: `${updatedCustomer.firstName} ${updatedCustomer.lastName} has been updated.`,
    })
    
    // Redirect to the customer detail page
    router.push(`/customers/${updatedCustomer.id}`)
  }, 1000)
}

const handleCancel = () => {
  if (customer.value) {
    router.push(`/customers/${customer.value.id}`)
  } else {
    router.push('/customers')
  }
}
</script>

<template>
  <div v-if="isLoading" class="flex items-center justify-center h-64">
    <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
  
  <div v-else-if="customer" class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold tracking-tight">
          Edit Customer
        </h2>
        <p class="text-muted-foreground">
          Update customer information
        </p>
      </div>
    </div>

    <div class="grid gap-6">
      <CustomerForm
        :customer="customer"
        :is-editing="true"
        @submit="handleSubmit"
        @cancel="handleCancel"
      />
    </div>
  </div>
</template>
