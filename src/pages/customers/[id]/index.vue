<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Edit, Mail, Phone, MapPin, Calendar, ShoppingBag, DollarSign, User } from 'lucide-vue-next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { mockCustomers } from '@/types/customer'
import { mockOrders } from '@/types/order'

const route = useRoute()
const router = useRouter()

// State
const customer = ref<typeof mockCustomers[0] | null>(null)
const orders = ref<typeof mockOrders>([])
const isLoading = ref(true)

// Computed
const customerOrders = computed(() => {
  return orders.value.filter(order => order.customerId === route.params.id)
})

const lastOrder = computed(() => {
  if (customerOrders.value.length === 0) return null
  return new Date(Math.max(...customerOrders.value.map(o => new Date(o.createdAt).getTime())))
    .toLocaleDateString()
})

// Methods
const loadCustomer = () => {
  isLoading.value = true
  
  // Simulate API call
  setTimeout(() => {
    const foundCustomer = mockCustomers.find(c => c.id === route.params.id)
    if (foundCustomer) {
      customer.value = foundCustomer
      orders.value = mockOrders
    } else {
      // Handle customer not found
      router.push('/customers')
    }
    
    isLoading.value = false
  }, 500)
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const getStatusVariant = (status: string) => {
  switch (status) {
    case 'active':
      return 'default'
    case 'inactive':
      return 'outline'
    case 'banned':
      return 'destructive'
    default:
      return 'secondary'
  }
}

// Lifecycle
onMounted(() => {
  loadCustomer()
})
</script>

<template>
  <div v-if="isLoading" class="flex items-center justify-center h-64">
    <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
  
  <div v-else-if="customer" class="space-y-6">
    <div class="flex items-center space-x-4">
      <Button variant="outline" size="icon" @click="router.push('/customers')">
        <ArrowLeft class="h-4 w-4" />
      </Button>
      <div>
        <h2 class="text-2xl font-bold tracking-tight">
          {{ customer.firstName }} {{ customer.lastName }}
        </h2>
        <p class="text-muted-foreground">
          Customer since {{ formatDate(customer.createdAt) }}
        </p>
      </div>
      <div class="ml-auto flex items-center space-x-2">
        <Badge :variant="getStatusVariant(customer.status)" class="text-sm">
          {{ customer.status.charAt(0).toUpperCase() + customer.status.slice(1) }}
        </Badge>
        <Button @click="router.push(`/customers/${customer.id}/edit`)">
          <Edit class="mr-2 h-4 w-4" />
          Edit
        </Button>
      </div>
    </div>

    <div class="grid gap-6 md:grid-cols-3">
      <!-- Customer Details -->
      <Card>
        <CardHeader>
          <CardTitle>Customer Details</CardTitle>
          <CardDescription>Personal information and contact details</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="flex items-start space-x-4">
            <div class="p-2 bg-muted rounded-lg">
              <User class="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <p class="text-sm text-muted-foreground">Name</p>
              <p class="font-medium">{{ customer.firstName }} {{ customer.lastName }}</p>
            </div>
          </div>
          
          <div class="flex items-start space-x-4">
            <div class="p-2 bg-muted rounded-lg">
              <Mail class="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <p class="text-sm text-muted-foreground">Email</p>
              <a :href="'mailto:' + customer.email" class="font-medium text-primary hover:underline">
                {{ customer.email }}
              </a>
            </div>
          </div>
          
          <div class="flex items-start space-x-4">
            <div class="p-2 bg-muted rounded-lg">
              <Phone class="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <p class="text-sm text-muted-foreground">Phone</p>
              <a :href="'tel:' + customer.phone" class="font-medium">
                {{ customer.phone }}
              </a>
            </div>
          </div>
          
          <div class="flex items-start space-x-4">
            <div class="p-2 bg-muted rounded-lg">
              <MapPin class="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <p class="text-sm text-muted-foreground">Address</p>
              <p class="font-medium">
                {{ customer.address }}<br>
                {{ customer.city }}, {{ customer.state }} {{ customer.postalCode }}<br>
                {{ customer.country }}
              </p>
            </div>
          </div>
          
          <div class="flex items-start space-x-4">
            <div class="p-2 bg-muted rounded-lg">
              <Calendar class="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <p class="text-sm text-muted-foreground">Member since</p>
              <p class="font-medium">{{ formatDate(customer.createdAt) }}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Order Stats -->
      <Card class="md:col-span-2">
        <CardHeader>
          <CardTitle>Order Statistics</CardTitle>
          <CardDescription>Customer order history and spending</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="grid gap-6 sm:grid-cols-2">
            <div class="p-4 border rounded-lg">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-muted-foreground">Total Orders</p>
                  <p class="text-2xl font-bold">{{ customer.totalOrders }}</p>
                </div>
                <div class="p-3 rounded-lg bg-primary/10">
                  <ShoppingBag class="h-6 w-6 text-primary" />
                </div>
              </div>
            </div>
            
            <div class="p-4 border rounded-lg">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-muted-foreground">Total Spent</p>
                  <p class="text-2xl font-bold">
                    {{ new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(customer.totalSpent) }}
                  </p>
                </div>
                <div class="p-3 rounded-lg bg-primary/10">
                  <DollarSign class="h-6 w-6 text-primary" />
                </div>
              </div>
            </div>
            
            <div class="p-4 border rounded-lg">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-muted-foreground">Average Order Value</p>
                  <p class="text-2xl font-bold">
                    {{ 
                      customer.totalOrders > 0 
                        ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
                          .format(customer.totalSpent / customer.totalOrders)
                        : '$0.00'
                    }}
                  </p>
                </div>
                <div class="p-3 rounded-lg bg-primary/10">
                  <DollarSign class="h-6 w-6 text-primary" />
                </div>
              </div>
            </div>
            
            <div class="p-4 border rounded-lg">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-muted-foreground">Last Order</p>
                  <p class="text-2xl font-bold">
                    {{ lastOrder || 'No orders yet' }}
                  </p>
                </div>
                <div class="p-3 rounded-lg bg-primary/10">
                  <Calendar class="h-6 w-6 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Recent Orders -->
    <Card>
      <CardHeader>
        <div class="flex items-center justify-between">
          <div>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>
              {{ customerOrders.length }} orders found
            </CardDescription>
          </div>
          <Button 
            v-if="customerOrders.length > 0" 
            variant="outline" 
            @click="router.push('/orders')"
          >
            View All Orders
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div v-if="customerOrders.length === 0" class="text-center py-12">
          <ShoppingBag class="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 class="mt-2 text-sm font-medium">No orders found</h3>
          <p class="mt-1 text-sm text-muted-foreground">
            This customer hasn't placed any orders yet.
          </p>
        </div>
        <div v-else class="space-y-4">
          <div 
            v-for="order in customerOrders.slice(0, 5)" 
            :key="order.id"
            class="flex items-center p-4 border rounded-lg hover:bg-accent/50 cursor-pointer"
            @click="router.push({ name: 'order-details', params: { id: order.id }})"
          >
            <div class="flex-1">
              <div class="flex items-center space-x-2">
                <span class="font-medium">#{{ order.orderNumber }}</span>
                <Badge :variant="order.status === 'delivered' ? 'default' : 'outline'">
                  {{ order.status }}
                </Badge>
              </div>
              <p class="text-sm text-muted-foreground">
                {{ formatDate(order.createdAt) }}
              </p>
            </div>
            <div class="text-right">
              <p class="font-medium">
                {{ new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(order.total) }}
              </p>
              <p class="text-sm text-muted-foreground">
                {{ order.items.length }} {{ order.items.length === 1 ? 'item' : 'items' }}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
