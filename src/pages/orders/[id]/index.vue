<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Edit, Printer, Truck, CreditCard, CheckCircle, XCircle, Clock, Mail, Phone, MapPin } from 'lucide-vue-next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { mockOrders } from '@/types/order'
import { mockCustomers } from '@/types/customer'
import { mockProducts } from '@/types/product'

const route = useRoute()
const router = useRouter()

// State
const order = ref<typeof mockOrders[0] | null>(null)
const customer = ref<typeof mockCustomers[0] | null>(null)
const isLoading = ref(true)

// Computed
const orderItems = computed(() => {
  if (!order.value) return []
  
  return order.value.items.map(item => {
    const product = mockProducts.find(p => p.id === item.productId)
    return {
      ...item,
      productName: product?.name || 'Unknown Product',
      image: product?.images?.[0] || ''
    }
  })
})

// Methods
const loadOrder = () => {
  isLoading.value = true
  
  // Simulate API call
  setTimeout(() => {
    const foundOrder = mockOrders.find(o => o.id === route.params.id)
    if (foundOrder) {
      order.value = foundOrder
      customer.value = mockCustomers.find(c => c.id === foundOrder.customerId) || null
    } else {
      // Handle order not found
      router.push('/orders')
    }
    
    isLoading.value = false
  }, 500)
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
    case 'delivered':
      return 'default'
    case 'shipped':
      return 'secondary'
    case 'processing':
      return 'outline'
    case 'cancelled':
      return 'destructive'
    default:
      return 'outline'
  }
}

const getPaymentStatusVariant = (status: string) => {
  switch (status) {
    case 'paid':
      return 'default'
    case 'pending':
      return 'outline'
    case 'failed':
      return 'destructive'
    case 'refunded':
      return 'secondary'
    default:
      return 'outline'
  }
}

const formatPaymentStatus = (status: string) => {
  const statusMap: Record<string, string> = {
    'pending': 'Pending',
    'paid': 'Paid',
    'failed': 'Failed',
    'refunded': 'Refunded',
    'partially_refunded': 'Partially Refunded'
  }
  return statusMap[status] || status.split('_').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')
}

const getPaymentMethodIcon = (method: string) => {
  const icons = {
    credit_card: CreditCard,
    paypal: '🔵',      
    bank_transfer: '🏦', 
    cash_on_delivery: '💵' 
  }
  return icons[method as keyof typeof icons] || '❓' 
}

// Lifecycle
onMounted(() => {
  loadOrder()
})
</script>

<template>
  <div v-if="isLoading" class="flex items-center justify-center h-64">
    <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
  
  <div v-else-if="order" class="space-y-6">
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-4">
        <Button variant="outline" size="icon" @click="router.push('/orders')">
          <ArrowLeft class="h-4 w-4" />
        </Button>
        <div>
          <h2 class="text-2xl font-bold tracking-tight">
            Order #{{ order.orderNumber }}
          </h2>
          <p class="text-muted-foreground">
            Placed on {{ formatDate(order.createdAt) }}
          </p>
        </div>
      </div>
      <div class="flex items-center space-x-2">
        <Button variant="outline" @click="window.print()">
          <Printer class="mr-2 h-4 w-4" />
          Print
        </Button>
        <Button @click="router.push(`/orders/${order.id}/edit`)">
          <Edit class="mr-2 h-4 w-4" />
          Edit Order
        </Button>
      </div>
    </div>

    <div class="grid gap-6 md:grid-cols-3">
      <!-- Order Summary -->
      <div class="md:col-span-2 space-y-6">
        <!-- Order Items -->
        <Card>
          <CardHeader>
            <CardTitle>Order Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="space-y-6">
              <div v-for="item in orderItems" :key="item.productId" class="flex items-start space-x-4">
                <div class="h-16 w-16 rounded-md bg-muted overflow-hidden">
                  <img 
                    v-if="item.image" 
                    :src="item.image" 
                    :alt="item.productName"
                    class="h-full w-full object-cover"
                  >
                </div>
                <div class="flex-1">
                  <p class="font-medium">{{ item.productName }}</p>
                  <p class="text-sm text-muted-foreground">Qty: {{ item.quantity }}</p>
                </div>
                <div class="text-right">
                  <p class="font-medium">${{ (item.price * item.quantity).toFixed(2) }}</p>
                  <p class="text-sm text-muted-foreground">${{ item.price.toFixed(2) }} each</p>
                </div>
              </div>
            </div>

            <div class="mt-6 border-t pt-4 space-y-2">
              <div class="flex justify-between">
                <span class="text-muted-foreground">Subtotal</span>
                <span>${{ order.subtotal.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-muted-foreground">Shipping</span>
                <span>${{ order.shipping.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-muted-foreground">Tax</span>
                <span>${{ order.tax.toFixed(2) }}</span>
              </div>
              <div v-if="order.discount > 0" class="flex justify-between">
                <span class="text-muted-foreground">Discount</span>
                <span class="text-green-600">- ${{ order.discount.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between font-medium pt-2 border-t mt-2">
                <span>Total</span>
                <span>${{ order.total.toFixed(2) }}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- Order Notes -->
        <Card v-if="order.notes">
          <CardHeader>
            <CardTitle>Order Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <p class="whitespace-pre-line">{{ order.notes }}</p>
          </CardContent>
        </Card>
      </div>

      <!-- Order Details -->
      <div class="space-y-6">
        <!-- Order Status -->
        <Card>
          <CardHeader>
            <CardTitle>Order Status</CardTitle>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="flex items-start space-x-4">
              <div class="p-2 bg-muted rounded-lg">
                <Truck class="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p class="text-sm text-muted-foreground">Status</p>
                <div class="flex items-center space-x-2">
                  <Badge :variant="getStatusVariant(order.status)">
                    {{ order.status === 'processing' ? 'In Progress' : 
                       order.status.charAt(0).toUpperCase() + order.status.slice(1) }}
                  </Badge>
                  <span v-if="order.shippedAt" class="text-xs text-muted-foreground">
                    Shipped on {{ formatDate(order.shippedAt) }}
                  </span>
                  <span v-else-if="order.status === 'delivered'" class="text-xs text-muted-foreground">
                    Delivered on {{ formatDate(order.deliveredAt || '') }}
                  </span>
                </div>
              </div>
            </div>

            <div class="flex items-start space-x-4">
              <div class="p-2 bg-muted rounded-lg">
                <CreditCard class="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p class="text-sm text-muted-foreground">Payment</p>
                <div class="flex items-center space-x-2">
                  <Badge :variant="getPaymentStatusVariant(order.paymentStatus)">
                    {{ formatPaymentStatus(order.paymentStatus) }}
                  </Badge>
                  <span class="text-sm">
                    <component :is="getPaymentMethodIcon(order.paymentMethod)" class="h-4 w-4" />
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- Customer Information -->
        <Card v-if="customer">
          <CardHeader>
            <CardTitle>Customer</CardTitle>
            <CardDescription>Contact information</CardDescription>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="flex items-start space-x-4">
              <div class="p-2 bg-muted rounded-lg">
                <User class="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p class="font-medium">{{ customer.firstName }} {{ customer.lastName }}</p>
                <a 
                  :href="'mailto:' + customer.email" 
                  class="text-sm text-primary hover:underline"
                >
                  {{ customer.email }}
                </a>
                <p class="text-sm">
                  <a :href="'tel:' + customer.phone" class="text-primary hover:underline">
                    {{ customer.phone }}
                  </a>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- Shipping Address -->
        <Card>
          <CardHeader>
            <CardTitle>Shipping Address</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="space-y-2">
              <p class="font-medium">
                {{ order.shippingAddress.firstName }} {{ order.shippingAddress.lastName }}
              </p>
              <p class="text-sm text-muted-foreground">
                {{ order.shippingAddress.address }}<br>
                {{ order.shippingAddress.city }}, {{ order.shippingAddress.state }} {{ order.shippingAddress.postalCode }}<br>
                {{ order.shippingAddress.country }}
              </p>
              <p class="text-sm text-muted-foreground">
                <a :href="'tel:' + order.shippingAddress.phone" class="text-primary hover:underline">
                  {{ order.shippingAddress.phone }}
                </a>
              </p>
            </div>
          </CardContent>
        </Card>

        <!-- Billing Address -->
        <Card v-if="!order.billingAddressSame">
          <CardHeader>
            <CardTitle>Billing Address</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="space-y-2">
              <p class="font-medium">
                {{ order.billingAddress?.firstName }} {{ order.billingAddress?.lastName }}
              </p>
              <p class="text-sm text-muted-foreground">
                {{ order.billingAddress?.address }}<br>
                {{ order.billingAddress?.city }}, {{ order.billingAddress?.state }} {{ order.billingAddress?.postalCode }}<br>
                {{ order.billingAddress?.country }}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>
