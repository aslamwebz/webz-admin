<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ArrowLeft, Save, X, Check, Loader2 } from 'lucide-vue-next'
import { mockOrders } from '@/types/order'
import { mockCustomers } from '@/types/customer'
import { mockProducts } from '@/types/product'

const route = useRoute()
const router = useRouter()

// Order status and payment status options
const orderStatuses = [
  { value: 'pending', label: 'Pending' },
  { value: 'processing', label: 'Processing' },
  { value: 'shipped', label: 'Shipped' },
  { value: 'delivered', label: 'Delivered' },
  { value: 'cancelled', label: 'Cancelled' },
]

const paymentStatuses = [
  { value: 'pending', label: 'Pending' },
  { value: 'paid', label: 'Paid' },
  { value: 'failed', label: 'Failed' },
  { value: 'refunded', label: 'Refunded' },
  { value: 'partially_refunded', label: 'Partially Refunded' },
]

const paymentMethods = [
  { value: 'credit_card', label: 'Credit Card' },
  { value: 'paypal', label: 'PayPal' },
  { value: 'bank_transfer', label: 'Bank Transfer' },
  { value: 'cash_on_delivery', label: 'Cash on Delivery' },
]

// Form state
const form = ref({
  status: '',
  paymentStatus: '',
  paymentMethod: '',
  shippingAddress: {
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'United States',
    phone: ''
  },
  billingAddressSame: true,
  billingAddress: {
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'United States'
  },
  notes: ''
})

// UI state
const isLoading = ref(true)
const isSubmitting = ref(false)
const order = ref<typeof mockOrders[0] | null>(null)
const customer = ref<typeof mockCustomers[0] | null>(null)

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
      
      // Populate form
      form.value = {
        status: foundOrder.status,
        paymentStatus: foundOrder.paymentStatus,
        paymentMethod: foundOrder.paymentMethod,
        shippingAddress: { ...foundOrder.shippingAddress },
        billingAddressSame: foundOrder.billingAddressSame,
        billingAddress: foundOrder.billingAddress ? { ...foundOrder.billingAddress } : {
          firstName: '',
          lastName: '',
          address: '',
          city: '',
          state: '',
          postalCode: '',
          country: 'United States'
        },
        notes: foundOrder.notes || ''
      }
    } else {
      // Handle order not found
      router.push('/orders')
    }
    
    isLoading.value = false
  }, 500)
}

const handleSubmit = async () => {
  isSubmitting.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // In a real app, you would update the order via API here
    console.log('Order updated:', form.value)
    
    // Redirect to order details
    router.push(`/orders/${order.value?.id}`)
  } catch (error) {
    console.error('Failed to update order:', error)
  } finally {
    isSubmitting.value = false
  }
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value)
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
  
  <form v-else-if="order" @submit.prevent="handleSubmit" class="space-y-6">
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-4">
        <Button 
          type="button" 
          variant="outline" 
          size="icon" 
          @click="router.push(`/orders/${order.id}`)"
        >
          <ArrowLeft class="h-4 w-4" />
        </Button>
        <div>
          <h2 class="text-2xl font-bold tracking-tight">
            Edit Order #{{ order.orderNumber }}
          </h2>
          <p class="text-muted-foreground">
            Placed on {{ new Date(order.createdAt).toLocaleDateString() }}
          </p>
        </div>
      </div>
      <div class="flex items-center space-x-2">
        <Button 
          type="button" 
          variant="outline" 
          @click="router.push(`/orders/${order.id}`)"
        >
          <X class="mr-2 h-4 w-4" />
          Cancel
        </Button>
        <Button type="submit" :disabled="isSubmitting">
          <Save class="mr-2 h-4 w-4" />
          <span v-if="isSubmitting">
            <Loader2 class="mr-2 h-4 w-4 animate-spin" />
            Saving...
          </span>
          <span v-else>Save Changes</span>
        </Button>
      </div>
    </div>

    <div class="grid gap-6 md:grid-cols-3">
      <!-- Order Details -->
      <div class="md:col-span-2 space-y-6">
        <!-- Order Status -->
        <Card>
          <CardHeader>
            <CardTitle>Order Status</CardTitle>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="grid gap-4 md:grid-cols-2">
              <div class="space-y-2">
                <Label for="status">Order Status</Label>
                <Select v-model="form.status">
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem v-for="status in orderStatuses" :key="status.value" :value="status.value">
                      {{ status.label }}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div class="space-y-2">
                <Label for="paymentStatus">Payment Status</Label>
                <Select v-model="form.paymentStatus">
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem v-for="status in paymentStatuses" :key="status.value" :value="status.value">
                      {{ status.label }}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div class="space-y-2">
                <Label for="paymentMethod">Payment Method</Label>
                <Select v-model="form.paymentMethod">
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem v-for="method in paymentMethods" :key="method.value" :value="method.value">
                      {{ method.label }}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- Order Items -->
        <Card>
          <CardHeader>
            <CardTitle>Order Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="border rounded-md divide-y">
              <div v-for="item in orderItems" :key="item.productId" class="p-4 flex items-start space-x-4">
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
                  <p class="text-sm text-muted-foreground">SKU: {{ item.productId }}</p>
                </div>
                <div class="text-right">
                  <p class="font-medium">{{ formatCurrency(item.price * item.quantity) }}</p>
                  <p class="text-sm text-muted-foreground">{{ item.quantity }} × {{ formatCurrency(item.price) }}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- Order Notes -->
        <Card>
          <CardHeader>
            <CardTitle>Order Notes</CardTitle>
            <CardDescription>Add a private note about this order</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea 
              v-model="form.notes" 
              placeholder="Add a note about this order"
              class="min-h-[100px]"
            />
          </CardContent>
        </Card>
      </div>

      <!-- Order Summary -->
      <div class="space-y-6">
        <!-- Order Summary -->
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="space-y-2">
              <div class="flex justify-between">
                <span class="text-muted-foreground">Subtotal</span>
                <span>{{ formatCurrency(order.subtotal) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-muted-foreground">Shipping</span>
                <span>{{ formatCurrency(order.shipping) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-muted-foreground">Tax</span>
                <span>{{ formatCurrency(order.tax) }}</span>
              </div>
              <div v-if="order.discount > 0" class="flex justify-between">
                <span class="text-muted-foreground">Discount</span>
                <span class="text-green-600">- {{ formatCurrency(order.discount) }}</span>
              </div>
              <div class="flex justify-between font-medium pt-2 border-t">
                <span>Total</span>
                <span>{{ formatCurrency(order.total) }}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- Customer Information -->
        <Card v-if="customer">
          <CardHeader>
            <CardTitle>Customer</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="space-y-2">
              <p class="font-medium">{{ customer.firstName }} {{ customer.lastName }}</p>
              <p class="text-sm text-muted-foreground">{{ customer.email }}</p>
              <p class="text-sm text-muted-foreground">{{ customer.phone }}</p>
              <Button 
                type="button" 
                variant="link" 
                class="h-auto p-0 text-sm"
                @click="router.push(`/customers/${customer.id}`)"
              >
                View customer details
              </Button>
            </div>
          </CardContent>
        </Card>

        <!-- Shipping Address -->
        <Card>
          <CardHeader>
            <div class="flex items-center justify-between">
              <CardTitle>Shipping Address</CardTitle>
              <Button 
                type="button" 
                variant="ghost" 
                size="sm"
                @click="form.billingAddressSame = !form.billingAddressSame"
              >
                <Check v-if="form.billingAddressSame" class="mr-2 h-4 w-4 text-green-600" />
                <span v-else class="text-muted-foreground">Same as billing</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="space-y-2">
              <Label for="shippingFirstName">First Name</Label>
              <Input id="shippingFirstName" v-model="form.shippingAddress.firstName" />
            </div>
            <div class="space-y-2">
              <Label for="shippingLastName">Last Name</Label>
              <Input id="shippingLastName" v-model="form.shippingAddress.lastName" />
            </div>
            <div class="space-y-2">
              <Label for="shippingAddress">Address</Label>
              <Input id="shippingAddress" v-model="form.shippingAddress.address" />
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-2">
                <Label for="shippingCity">City</Label>
                <Input id="shippingCity" v-model="form.shippingAddress.city" />
              </div>
              <div class="space-y-2">
                <Label for="shippingState">State</Label>
                <Input id="shippingState" v-model="form.shippingAddress.state" />
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-2">
                <Label for="shippingPostalCode">Postal Code</Label>
                <Input id="shippingPostalCode" v-model="form.shippingAddress.postalCode" />
              </div>
              <div class="space-y-2">
                <Label for="shippingCountry">Country</Label>
                <Input id="shippingCountry" v-model="form.shippingAddress.country" disabled />
              </div>
            </div>
            <div class="space-y-2">
              <Label for="shippingPhone">Phone</Label>
              <Input id="shippingPhone" v-model="form.shippingAddress.phone" />
            </div>
          </CardContent>
        </Card>

        <!-- Billing Address -->
        <Card v-if="!form.billingAddressSame">
          <CardHeader>
            <CardTitle>Billing Address</CardTitle>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="space-y-2">
              <Label for="billingFirstName">First Name</Label>
              <Input id="billingFirstName" v-model="form.billingAddress.firstName" />
            </div>
            <div class="space-y-2">
              <Label for="billingLastName">Last Name</Label>
              <Input id="billingLastName" v-model="form.billingAddress.lastName" />
            </div>
            <div class="space-y-2">
              <Label for="billingAddress">Address</Label>
              <Input id="billingAddress" v-model="form.billingAddress.address" />
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-2">
                <Label for="billingCity">City</Label>
                <Input id="billingCity" v-model="form.billingAddress.city" />
              </div>
              <div class="space-y-2">
                <Label for="billingState">State</Label>
                <Input id="billingState" v-model="form.billingAddress.state" />
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-2">
                <Label for="billingPostalCode">Postal Code</Label>
                <Input id="billingPostalCode" v-model="form.billingAddress.postalCode" />
              </div>
              <div class="space-y-2">
                <Label for="billingCountry">Country</Label>
                <Input id="billingCountry" v-model="form.billingAddress.country" disabled />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </form>
</template>
