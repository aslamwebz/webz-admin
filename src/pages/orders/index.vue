<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ChevronDown, MoreHorizontal, Plus, Search } from 'lucide-vue-next'
import { mockCustomers } from '@/types/customer'
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
import { mockOrders } from '@/types/order'

const router = useRouter()

// State
const orders = ref(mockOrders)
const searchQuery = ref('')
const statusFilter = ref('all')
const sortBy = ref('date')
const sortDirection = ref('desc')

// Find customer by ID
const findCustomerById = (customerId: string) => {
  return mockCustomers.find(customer => customer.id === customerId)
}

// Computed
const filteredOrders = computed(() => {
  return orders.value.filter(order => {
    const matchesSearch = 
      order.orderNumber.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      order.customer?.firstName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      order.customer?.lastName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      order.customer?.email.toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchesStatus = statusFilter.value === 'all' || order.status === statusFilter.value

    return matchesSearch && matchesStatus
  })
})

const sortedOrders = computed(() => {
  return [...filteredOrders.value].sort((a, b) => {
    if (sortBy.value === 'date') {
      return sortDirection.value === 'asc'
        ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    } else if (sortBy.value === 'total') {
      return sortDirection.value === 'asc' 
        ? a.total - b.total 
        : b.total - a.total
    }
    return 0
  })
})

// Methods
const handleSort = (column: string) => {
  if (sortBy.value === column) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortBy.value = column
    sortDirection.value = 'desc'
  }
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

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

// Lifecycle
onMounted(() => {
  // In a real app, you would fetch orders from an API here
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col justify-between space-y-4 sm:flex-row sm:items-center sm:space-y-0">
      <h2 class="text-2xl font-bold tracking-tight">Orders</h2>
      <div class="flex items-center space-x-2">
        <Button @click="router.push('/orders/new')">
          <Plus class="mr-2 h-4 w-4" />
          Add Order
        </Button>
      </div>
    </div>

    <div class="grid gap-4 md:grid-cols-4">
      <div class="md:col-span-3">
        <div class="relative">
          <Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            v-model="searchQuery"
            placeholder="Search orders..."
            class="pl-8 w-full"
          />
        </div>
      </div>
      <div>
        <select
          v-model="statusFilter"
          class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
    </div>

    <div class="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead class="w-[100px]">
              <button 
                class="flex items-center"
                @click="handleSort('orderNumber')"
              >
                Order
                <ChevronDown 
                  v-if="sortBy === 'orderNumber'" 
                  class="ml-1 h-4 w-4" 
                  :class="{ 'rotate-180': sortDirection === 'desc' }"
                />
              </button>
            </TableHead>
            <TableHead>Customer</TableHead>
            <TableHead class="text-right">
              <button 
                class="flex items-center ml-auto"
                @click="handleSort('date')"
              >
                Date
                <ChevronDown 
                  v-if="sortBy === 'date'" 
                  class="ml-1 h-4 w-4" 
                  :class="{ 'rotate-180': sortDirection === 'desc' }"
                />
              </button>
            </TableHead>
            <TableHead class="text-right">
              <button 
                class="flex items-center ml-auto"
                @click="handleSort('total')"
              >
                Total
                <ChevronDown 
                  v-if="sortBy === 'total'" 
                  class="ml-1 h-4 w-4" 
                  :class="{ 'rotate-180': sortDirection === 'desc' }"
                />
              </button>
            </TableHead>
            <TableHead>Status</TableHead>
            <TableHead class="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow 
            v-for="order in sortedOrders" 
            :key="order.id"
            class="cursor-pointer hover:bg-muted/50"
            @click="router.push(`/orders/${order.id}`)"
          >
            <TableCell class="font-medium whitespace-nowrap">
              {{ order.orderNumber }}
            </TableCell>
            <TableCell>
              <div v-if="findCustomerById(order.customerId)">
                {{ findCustomerById(order.customerId)?.firstName }} {{ findCustomerById(order.customerId)?.lastName }}
              </div>
              <div v-else class="text-muted-foreground">
                Customer not found
              </div>
            </TableCell>
            <TableCell class="text-right">
              {{ formatDate(order.createdAt) }}
            </TableCell>
            <TableCell class="text-right font-medium">
              ${{ order.total.toFixed(2) }}
            </TableCell>
            <TableCell>
              <Badge :variant="getStatusVariant(order.status)">
                {{ order.status.charAt(0).toUpperCase() + order.status.slice(1) }}
              </Badge>
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger as-child>
                  <Button variant="ghost" class="h-8 w-8 p-0" @click.stop>
                    <span class="sr-only">Open menu</span>
                    <MoreHorizontal class="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem @click.stop="router.push(`/orders/${order.id}`)">
                    View order
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    @click.stop="router.push(`/orders/${order.id}/edit`)"
                  >
                    Edit order
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
          <TableRow v-if="sortedOrders.length === 0">
            <TableCell colspan="6" class="h-24 text-center">
              No orders found.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </div>
</template>
