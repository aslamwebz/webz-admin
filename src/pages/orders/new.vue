<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ArrowLeft, Plus, X, Loader2, Search, Check, ChevronDown } from 'lucide-vue-next'
import { mockCustomers } from '@/types/customer'
import { mockProducts } from '@/types/product'

const router = useRouter()

// Form state
const form = ref({
  customerId: '',
  items: [] as Array<{ productId: string; quantity: number }>,
  status: 'pending',
  paymentStatus: 'pending',
  paymentMethod: 'credit_card',
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
const isSubmitting = ref(false)
const selectedCustomer = ref<typeof mockCustomers[0] | null>(null)
const searchQuery = ref('')
const selectedProduct = ref('')
const quantity = ref(1)

// Computed
const filteredProducts = computed(() => {
  if (!searchQuery.value) return []
  
  return mockProducts.filter(product => 
    product.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    product.sku?.toLowerCase().includes(searchQuery.value.toLowerCase())
  ).slice(0, 5)
})

const orderItems = computed(() => {
  return form.value.items.map(item => {
    const product = mockProducts.find(p => p.id === item.productId)
    return {
      ...item,
      productName: product?.name || 'Unknown Product',
      price: product?.price || 0,
      total: (product?.price || 0) * item.quantity,
      image: product?.images?.[0] || ''
    }
  })
})

const subtotal = computed(() => {
  return orderItems.value.reduce((sum, item) => sum + item.total, 0)
})

const tax = computed(() => {
  return subtotal.value * 0.1 // 10% tax for example
})

const shipping = computed(() => {
  // Simple shipping calculation
  return orderItems.value.length > 0 ? 10 : 0
})

const total = computed(() => {
  return subtotal.value + tax.value + shipping.value
})

// Methods
const addProduct = () => {
  if (!selectedProduct.value || quantity.value < 1) return
  
  const existingItemIndex = form.value.items.findIndex(item => item.productId === selectedProduct.value)
  
  if (existingItemIndex > -1) {
    // Update quantity if product already in cart
    form.value.items[existingItemIndex].quantity += quantity.value
  } else {
    // Add new item
    form.value.items.push({
      productId: selectedProduct.value,
      quantity: quantity.value
    })
  }
  
  // Reset selection
  selectedProduct.value = ''
  searchQuery.value = ''
  quantity.value = 1
}

const removeItem = (index: number) => {
  form.value.items.splice(index, 1)
}

const updateQuantity = (index: number, newQuantity: number) => {
  if (newQuantity < 1) return
  form.value.items[index].quantity = newQuantity
}

const selectCustomer = (customer: typeof mockCustomers[0]) => {
  selectedCustomer.value = customer
  form.value.customerId = customer.id
  form.value.shippingAddress = {
    ...form.value.shippingAddress,
    firstName: customer.firstName,
    lastName: customer.lastName,
    address: customer.address,
    city: customer.city,
    state: customer.state,
    postalCode: customer.postalCode,
    country: customer.country,
    phone: customer.phone
  }
}

const handleSubmit = async () => {
  if (!selectedCustomer.value) {
    alert('Please select a customer')
    return
  }
  
  if (form.value.items.length === 0) {
    alert('Please add at least one product to the order')
    return
  }
  
  isSubmitting.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // In a real app, you would create the order via API here
    const newOrder = {
      id: `order_${Math.random().toString(36).substr(2, 9)}`,
      orderNumber: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
      customerId: form.value.customerId,
      items: form.value.items,
      subtotal: subtotal.value,
      tax: tax.value,
      shipping: shipping.value,
      discount: 0,
      total: total.value,
      status: form.value.status,
      paymentStatus: form.value.paymentStatus,
      paymentMethod: form.value.paymentMethod,
      shippingAddress: { ...form.value.shippingAddress },
      billingAddressSame: form.value.billingAddressSame,
      billingAddress: form.value.billingAddressSame 
        ? { ...form.value.shippingAddress } 
        : { ...form.value.billingAddress },
      notes: form.value.notes,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    console.log('New order created:', newOrder)
    
    // Redirect to the new order's detail page
    router.push(`/orders/${newOrder.id}`)
  } catch (error) {
    console.error('Failed to create order:', error)
    alert('Failed to create order. Please try again.')
  } finally {
    isSubmitting.value = false
  }
}

const selectProduct = (product: any) => {
  selectedProduct.value = product.id
  searchQuery.value = product.name
}

const clearSelectedCustomer = () => {
  selectedCustomer.value = null
  form.value.customerId = ''
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value)
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-4">
        <Button 
          type="button" 
          variant="outline" 
          size="icon" 
          @click="router.push('/orders')"
        >
          <ArrowLeft class="h-4 w-4" />
        </Button>
        <div>
          <h2 class="text-2xl font-bold tracking-tight">
            New Order
          </h2>
          <p class="text-muted-foreground">
            Create a new customer order
          </p>
        </div>
      </div>
      <div class="flex items-center space-x-2">
        <Button 
          type="button" 
          variant="outline" 
          @click="router.push('/orders')"
        >
          <X class="mr-2 h-4 w-4" />
          Cancel
        </Button>
        <Button type="submit" :disabled="isSubmitting">
          <Plus class="mr-2 h-4 w-4" />
          <span v-if="isSubmitting">
            <Loader2 class="mr-2 h-4 w-4 animate-spin" />
            Creating...
          </span>
          <span v-else>Create Order</span>
        </Button>
      </div>
    </div>

    <div class="grid gap-6 md:grid-cols-3">
      <!-- Order Details -->
      <div class="md:col-span-2 space-y-6">
        <!-- Customer Selection -->
        <Card>
          <CardHeader>
            <CardTitle>Customer</CardTitle>
            <CardDescription>Select a customer for this order</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="relative">
              <Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                v-model="searchQuery"
                placeholder="Search customers..."
                class="pl-8"
                @focus="searchQuery = ''"
              />
              <div 
                v-if="searchQuery && !selectedCustomer"
                class="absolute z-10 mt-1 w-full rounded-md border bg-popover shadow-lg"
              >
                <div 
                  v-for="customer in mockCustomers.filter(c => 
                    `${c.firstName} ${c.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    c.email.toLowerCase().includes(searchQuery.toLowerCase())
                  ).slice(0, 5)" 
                  :key="customer.id"
                  class="p-2 hover:bg-accent cursor-pointer"
                  @click="selectCustomer(customer)"
                >
                  <div class="font-medium">{{ customer.firstName }} {{ customer.lastName }}</div>
                  <div class="text-sm text-muted-foreground">{{ customer.email }}</div>
                </div>
              </div>
            </div>
            
            <div v-if="selectedCustomer" class="mt-4 p-4 border rounded-md">
              <div class="flex justify-between items-start">
                <div>
                  <h4 class="font-medium">{{ selectedCustomer.firstName }} {{ selectedCustomer.lastName }}</h4>
                  <p class="text-sm text-muted-foreground">{{ selectedCustomer.email }}</p>
                  <p class="text-sm text-muted-foreground">{{ selectedCustomer.phone }}</p>
                </div>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm"
                  @click="clearSelectedCustomer"
                >
                  Change
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- Products -->
        <Card>
          <CardHeader>
            <CardTitle>Products</CardTitle>
            <CardDescription>Add products to this order</CardDescription>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="flex space-x-2">
              <div class="flex-1 relative">
                <Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  v-model="searchQuery"
                  placeholder="Search products..."
                  class="pl-8"
                  @focus="searchQuery = ''"
                />
                <div 
                  v-if="searchQuery && !selectedProduct"
                  class="absolute z-10 mt-1 w-full rounded-md border bg-popover shadow-lg"
                >
                  <div 
                    v-for="product in filteredProducts" 
                    :key="product.id"
                    class="p-2 hover:bg-accent cursor-pointer flex items-center"
                    @click="selectProduct(product)"
                  >
                    <div class="h-8 w-8 rounded-md bg-muted mr-2 overflow-hidden">
                      <img 
                        v-if="product.images?.[0]" 
                        :src="product.images[0]" 
                        :alt="product.name"
                        class="h-full w-full object-cover"
                      >
                    </div>
                    <div>
                      <div class="font-medium">{{ product.name }}</div>
                      <div class="text-xs text-muted-foreground">
                        {{ formatCurrency(product.price) }}
                        <template v-if="product.sku">• {{ product.sku }}</template>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="w-24">
                <Input 
                  v-model.number="quantity" 
                  type="number" 
                  min="1" 
                  class="text-center"
                />
              </div>
              <Button 
                type="button" 
                :disabled="!selectedProduct"
                @click="addProduct"
              >
                <Plus class="mr-2 h-4 w-4" />
                Add
              </Button>
            </div>

            <div v-if="orderItems.length > 0" class="border rounded-md divide-y">
              <div 
                v-for="(item, index) in orderItems" 
                :key="index"
                class="p-4 flex items-start space-x-4"
              >
                <div class="h-16 w-16 rounded-md bg-muted overflow-hidden flex-shrink-0">
                  <img 
                    v-if="item.image" 
                    :src="item.image" 
                    :alt="item.productName"
                    class="h-full w-full object-cover"
                  >
                </div>
                <div class="flex-1 min-w-0">
                  <p class="font-medium truncate">{{ item.productName }}</p>
                  <p class="text-sm text-muted-foreground">
                    {{ formatCurrency(item.price) }} each
                  </p>
                </div>
                <div class="flex items-center space-x-4">
                  <div class="flex items-center space-x-2">
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="icon" 
                      class="h-8 w-8"
                      :disabled="item.quantity <= 1"
                      @click="updateQuantity(index, item.quantity - 1)"
                    >
                      <span class="sr-only">Decrease quantity</span>
                      <Minus class="h-4 w-4" />
                    </Button>
                    <div class="w-10 text-center">
                      {{ item.quantity }}
                    </div>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="icon" 
                      class="h-8 w-8"
                      @click="updateQuantity(index, item.quantity + 1)"
                    >
                      <span class="sr-only">Increase quantity</span>
                      <Plus class="h-4 w-4" />
                    </Button>
                  </div>
                  <div class="w-24 text-right font-medium">
                    {{ formatCurrency(item.total) }}
                  </div>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon" 
                    class="h-8 w-8 text-destructive"
                    @click="removeItem(index)"
                  >
                    <span class="sr-only">Remove item</span>
                    <X class="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            <div v-else class="py-12 text-center border rounded-md">
              <ShoppingCart class="mx-auto h-12 w-12 text-muted-foreground mb-2" />
              <p class="text-muted-foreground">No products added to this order</p>
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
                <span>{{ formatCurrency(subtotal) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-muted-foreground">Shipping</span>
                <span>{{ formatCurrency(shipping) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-muted-foreground">Tax</span>
                <span>{{ formatCurrency(tax) }}</span>
              </div>
              <div class="flex justify-between font-medium pt-2 border-t">
                <span>Total</span>
                <span>{{ formatCurrency(total) }}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- Order Status -->
        <Card>
          <CardHeader>
            <CardTitle>Order Status</CardTitle>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="space-y-2">
              <Label for="status">Status</Label>
              <Select v-model="form.status">
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
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
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="refunded">Refunded</SelectItem>
                  <SelectItem value="partially_refunded">Partially Refunded</SelectItem>
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
                  <SelectItem value="credit_card">Credit Card</SelectItem>
                  <SelectItem value="paypal">PayPal</SelectItem>
                  <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                  <SelectItem value="cash_on_delivery">Cash on Delivery</SelectItem>
                </SelectContent>
              </Select>
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
            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-2">
                <Label for="shippingFirstName">First Name</Label>
                <Input 
                  id="shippingFirstName" 
                  v-model="form.shippingAddress.firstName" 
                  :disabled="!!selectedCustomer"
                />
              </div>
              <div class="space-y-2">
                <Label for="shippingLastName">Last Name</Label>
                <Input 
                  id="shippingLastName" 
                  v-model="form.shippingAddress.lastName" 
                  :disabled="!!selectedCustomer"
                />
              </div>
            </div>
            <div class="space-y-2">
              <Label for="shippingAddress">Address</Label>
              <Input 
                id="shippingAddress" 
                v-model="form.shippingAddress.address" 
                :disabled="!!selectedCustomer"
              />
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-2">
                <Label for="shippingCity">City</Label>
                <Input 
                  id="shippingCity" 
                  v-model="form.shippingAddress.city" 
                  :disabled="!!selectedCustomer"
                />
              </div>
              <div class="space-y-2">
                <Label for="shippingState">State/Province</Label>
                <Input 
                  id="shippingState" 
                  v-model="form.shippingAddress.state" 
                  :disabled="!!selectedCustomer"
                />
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-2">
                <Label for="shippingPostalCode">Postal Code</Label>
                <Input 
                  id="shippingPostalCode" 
                  v-model="form.shippingAddress.postalCode" 
                  :disabled="!!selectedCustomer"
                />
              </div>
              <div class="space-y-2">
                <Label for="shippingCountry">Country</Label>
                <Input 
                  id="shippingCountry" 
                  v-model="form.shippingAddress.country" 
                  disabled
                />
              </div>
            </div>
            <div class="space-y-2">
              <Label for="shippingPhone">Phone</Label>
              <Input 
                id="shippingPhone" 
                v-model="form.shippingAddress.phone" 
                :disabled="!!selectedCustomer"
              />
            </div>
          </CardContent>
        </Card>

        <!-- Billing Address -->
        <Card v-if="!form.billingAddressSame">
          <CardHeader>
            <CardTitle>Billing Address</CardTitle>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-2">
                <Label for="billingFirstName">First Name</Label>
                <Input id="billingFirstName" v-model="form.billingAddress.firstName" />
              </div>
              <div class="space-y-2">
                <Label for="billingLastName">Last Name</Label>
                <Input id="billingLastName" v-model="form.billingAddress.lastName" />
              </div>
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
                <Label for="billingState">State/Province</Label>
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
