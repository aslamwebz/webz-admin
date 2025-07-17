<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Search, Plus, MoreHorizontal, Eye, Pencil, Trash2 } from 'lucide-vue-next'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card'
import { useToast } from '@/components/ui/toast/use-toast'
import { mockCustomers } from '@/types/customer'

const router = useRouter()
const { toast } = useToast()

// State
const searchQuery = ref('')
const selectedCustomer = ref<typeof mockCustomers[0] | null>(null)
const showDeleteDialog = ref(false)
const isDeleting = ref(false)

// Computed
const filteredCustomers = computed(() => {
  if (!searchQuery.value) return mockCustomers
  
  const query = searchQuery.value.toLowerCase()
  return mockCustomers.filter(customer => 
    customer.firstName.toLowerCase().includes(query) ||
    customer.lastName.toLowerCase().includes(query) ||
    customer.email.toLowerCase().includes(query) ||
    customer.phone.includes(query) ||
    customer.city.toLowerCase().includes(query) ||
    customer.status.includes(query)
  )
})

// Methods
const handleView = (customer: typeof mockCustomers[0]) => {
  router.push(`/customers/${customer.id}`)
}

const handleEdit = (customer: typeof mockCustomers[0]) => {
  router.push(`/customers/${customer.id}/edit`)
}

const handleDelete = (customer: typeof mockCustomers[0]) => {
  selectedCustomer.value = customer
  showDeleteDialog.value = true
}

const confirmDelete = () => {
  if (!selectedCustomer.value) return
  
  isDeleting.value = true
  
  // Simulate API call
  setTimeout(() => {
    // In a real app, you would call an API to delete the customer
    const index = mockCustomers.findIndex(c => c.id === selectedCustomer.value?.id)
    if (index !== -1) {
      // mockCustomers.splice(index, 1) // Uncomment in a real implementation
      const customer = selectedCustomer.value
      if (customer) {
        toast({
          title: 'Customer deleted',
          description: `${customer.firstName} ${customer.lastName} has been deleted.`,
        })
      }
    }
    
    isDeleting.value = false
    showDeleteDialog.value = false
    selectedCustomer.value = null
  }, 1000)
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

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold tracking-tight">Customers</h2>
        <p class="text-muted-foreground">
          Manage your customers and view their details
        </p>
      </div>
      <Button @click="router.push('/customers/new')">
        <Plus class="mr-2 h-4 w-4" />
        Add Customer
      </Button>
    </div>

    <Card>
      <CardHeader>
        <div class="flex items-center justify-between">
          <div>
            <CardTitle>Customers</CardTitle>
            <CardDescription>
              A list of all your customers
            </CardDescription>
          </div>
          <div class="relative w-64">
            <Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              v-model="searchQuery"
              type="search"
              placeholder="Search customers..."
              class="w-full pl-8"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Orders</TableHead>
              <TableHead>Total Spent</TableHead>
              <TableHead>Status</TableHead>
              <TableHead class="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="customer in filteredCustomers" :key="customer.id">
              <TableCell class="font-medium">
                {{ customer.firstName }} {{ customer.lastName }}
              </TableCell>
              <TableCell>{{ customer.email }}</TableCell>
              <TableCell>{{ customer.phone }}</TableCell>
              <TableCell>{{ customer.city }}, {{ customer.state }}</TableCell>
              <TableCell>{{ customer.totalOrders }}</TableCell>
              <TableCell>{{ formatCurrency(customer.totalSpent) }}</TableCell>
              <TableCell>
                <Badge :variant="getStatusVariant(customer.status)">
                  {{ customer.status.charAt(0).toUpperCase() + customer.status.slice(1) }}
                </Badge>
              </TableCell>
              <TableCell class="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger as-child>
                    <Button variant="ghost" class="h-8 w-8 p-0">
                      <span class="sr-only">Open menu</span>
                      <MoreHorizontal class="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem @click="handleView(customer)">
                      <Eye class="mr-2 h-4 w-4" />
                      <span>View</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem @click="handleEdit(customer)">
                      <Pencil class="mr-2 h-4 w-4" />
                      <span>Edit</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      class="text-destructive"
                      @click="handleDelete(customer)"
                    >
                      <Trash2 class="mr-2 h-4 w-4" />
                      <span>Delete</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
            <TableRow v-if="filteredCustomers.length === 0">
              <TableCell colspan="8" class="h-24 text-center">
                No customers found.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter class="flex items-center justify-between border-t px-6 py-4">
        <div class="text-sm text-muted-foreground">
          Showing <span class="font-medium">1</span> to <span class="font-medium">{{ filteredCustomers.length }}</span> of{' '}
          <span class="font-medium">{{ mockCustomers.length }}</span> customers
        </div>
      </CardFooter>
    </Card>
  </div>

  <!-- Delete Confirmation Dialog -->
  <Dialog v-model:open="showDeleteDialog">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogDescription>
          This action cannot be undone. This will permanently delete the customer
          <span v-if="selectedCustomer" class="font-semibold">
            {{ selectedCustomer.firstName }} {{ selectedCustomer.lastName }}
          </span>
          and all associated data.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button 
          variant="outline" 
          :disabled="isDeleting"
          @click="showDeleteDialog = false"
        >
          Cancel
        </Button>
        <Button 
          variant="destructive" 
          :disabled="isDeleting"
          @click="confirmDelete"
        >
          <span v-if="isDeleting" class="flex items-center">
            <Loader2 class="mr-2 h-4 w-4 animate-spin" />
            Deleting...
          </span>
          <span v-else>Delete Customer</span>
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
