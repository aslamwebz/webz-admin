<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useToast } from '@/components/ui/toast/use-toast'
import CustomerForm from './components/CustomerForm.vue'

const router = useRouter()
const { toast } = useToast()

const handleSubmit = (customer: any) => {
  // In a real app, you would call an API to create the customer
  console.log('Creating customer:', customer)
  
  // Simulate API call
  setTimeout(() => {
    // In a real app, you would add the customer to your database
    // mockCustomers.push(customer) // Uncomment in a real implementation
    
    toast({
      title: 'Customer created',
      description: `${customer.firstName} ${customer.lastName} has been added.`,
    })
    
    // Redirect to the customer detail page
    router.push(`/customers/${customer.id}`)
  }, 1000)
}

const handleCancel = () => {
  router.push('/customers')
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold tracking-tight">New Customer</h2>
        <p class="text-muted-foreground">
          Add a new customer to your store
        </p>
      </div>
    </div>

    <div class="grid gap-6">
      <CustomerForm
        @submit="handleSubmit"
        @cancel="handleCancel"
      />
    </div>
  </div>
</template>
