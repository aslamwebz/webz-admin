<script setup lang="ts">
import { ref, computed } from 'vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Plus, Pencil, Trash2, MoreHorizontal, ChevronUp, ChevronDown, Shield, Edit, Eye, Check, X, MapPin } from 'lucide-vue-next'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
// Badge component removed as it's no longer used
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  city: string;
  role: 'Admin' | 'Editor' | 'Viewer';
  status: 'active' | 'inactive';
  lastLogin: string;
}

interface NewUser {
  name: string;
  username: string;
  email: string;
  phone: string;
  city: string;
  role: 'Admin' | 'Editor' | 'Viewer';
  status: 'active' | 'inactive';
}

// Sort and filter states
const sortConfig = ref<{ key: string; direction: 'asc' | 'desc' }>({
  key: 'name',
  direction: 'asc'
})

const statusFilter = ref<string | null>(null)
const roleFilter = ref<string | null>(null)

// Available filters
const statusOptions = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' }
]

const roleOptions = [
  { value: 'Admin', label: 'Admin', icon: Shield },
  { value: 'Editor', label: 'Editor', icon: Edit },
  { value: 'Viewer', label: 'Viewer', icon: Eye }
]

// Mock data - in a real app, this would come from an API
const users = ref<User[]>([
  {
    id: 1,
    name: 'John Doe',
    username: 'johnd',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    city: 'New York',
    role: 'Admin',
    status: 'active',
    lastLogin: '2023-07-14T10:30:00Z',
  },
  {
    id: 2,
    name: 'Jane Smith',
    username: 'janes',
    email: 'jane@example.com',
    phone: '+1 (555) 987-6543',
    city: 'Los Angeles',
    role: 'Editor',
    status: 'active',
    lastLogin: '2023-07-13T15:45:00Z',
  },
  {
    id: 3,
    name: 'Bob Johnson',
    username: 'bobj',
    email: 'bob@example.com',
    phone: '+1 (555) 456-7890',
    city: 'Chicago',
    role: 'Viewer',
    status: 'inactive',
    lastLogin: '2023-07-10T09:15:00Z',
  },
  {
    id: 4,
    name: 'Alice Williams',
    username: 'alicew',
    email: 'alice@example.com',
    phone: '+1 (555) 234-5678',
    city: 'Houston',
    role: 'Editor',
    status: 'active',
    lastLogin: '2023-07-12T11:20:00Z',
  },
  {
    id: 5,
    name: 'Charlie Brown',
    username: 'charlieb',
    email: 'charlie@example.com',
    phone: '+1 (555) 876-5432',
    city: 'Phoenix',
    role: 'Viewer',
    status: 'inactive',
    lastLogin: '2023-07-05T14:30:00Z',
  },
])

const searchQuery = ref('')
const isViewDialogOpen = ref(false)
const isEditDialogOpen = ref(false)
const isAddUserOpen = ref(false)
const isDeleteDialogOpen = ref(false)
const selectedUser = ref<User | null>(null)

// Initialize with default values
const defaultNewUser: NewUser = {
  name: '',
  username: '',
  email: '',
  phone: '',
  city: '',
  role: 'Viewer',
  status: 'active'
}

const newUser = ref<NewUser>({ ...defaultNewUser })

const filteredUsers = computed(() => {
  let result = [...users.value]
  
  // Apply search
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(user => 
      user.name.toLowerCase().includes(query) || 
      user.email.toLowerCase().includes(query) ||
      user.role.toLowerCase().includes(query)
    )
  }
  
  // Apply status filter
  if (statusFilter.value) {
    result = result.filter(user => user.status === statusFilter.value)
  }
  
  // Apply role filter
  if (roleFilter.value) {
    result = result.filter(user => user.role === roleFilter.value)
  }
  
  // Apply sorting
  if (sortConfig.value) {
    const { key, direction } = sortConfig.value
    result.sort((a, b) => {
      if (a[key as keyof User] < b[key as keyof User]) {
        return direction === 'asc' ? -1 : 1
      }
      if (a[key as keyof User] > b[key as keyof User]) {
        return direction === 'asc' ? 1 : -1
      }
      return 0
    })
  }
  
  return result
})

// Toggle sort direction
const requestSort = (key: string) => {
  if (sortConfig.value.key === key) {
    sortConfig.value.direction = sortConfig.value.direction === 'asc' ? 'desc' : 'asc'
  } else {
    sortConfig.value.key = key
    sortConfig.value.direction = 'asc'
  }
}

// Get sort icon
const getSortIcon = (key: string) => {
  if (sortConfig.value.key !== key) return null
  return sortConfig.value.direction === 'asc' ? ChevronUp : ChevronDown
}

// Clear all filters
const clearFilters = () => {
  statusFilter.value = null
  roleFilter.value = null
  searchQuery.value = ''
}

// Get role icon component
const getRoleIcon = (role: string) => {
  const roleOption = roleOptions.find(r => r.value === role)
  return roleOption ? roleOption.icon : null
}

const resetForm = () => {
  // Reset to default values
  newUser.value = { ...defaultNewUser }
  selectedUser.value = null
  isAddUserOpen.value = false
  isEditDialogOpen.value = false
  isDeleteDialogOpen.value = false
  isViewDialogOpen.value = false
}

const openViewDialog = (user: User) => {
  selectedUser.value = { ...user }
  isViewDialogOpen.value = true
}

const openEditDialog = (user: User) => {
  selectedUser.value = { ...user }
  newUser.value = {
    name: user.name,
    username: user.username,
    email: user.email,
    phone: user.phone,
    city: user.city,
    role: user.role,
    status: user.status
  }
  isEditDialogOpen.value = true
}

const openAddUserDialog = () => {
  resetForm()
  isAddUserOpen.value = true
}

const openDeleteDialog = (user: User) => {
  selectedUser.value = user
  isDeleteDialogOpen.value = true
}

const saveUser = () => {
  try {
    if (isEditDialogOpen.value && selectedUser.value) {
      // Update existing user
      const index = users.value.findIndex(u => u.id === selectedUser.value?.id)
      if (index !== -1) {
        users.value[index] = {
          ...users.value[index],
          ...newUser.value,
          id: selectedUser.value.id,
          lastLogin: new Date().toISOString()
        } as User
      }
    } else {
      // Add new user
      const newId = users.value.length > 0 ? Math.max(...users.value.map(u => u.id)) + 1 : 1
      users.value.push({
        ...newUser.value,
        id: newId,
        lastLogin: new Date().toISOString()
      } as User)
    }
    
    // Close the appropriate dialog
    if (isEditDialogOpen.value) {
      isEditDialogOpen.value = false
    } else {
      isAddUserOpen.value = false
    }
    
    // Reset form
    resetForm()
  } catch (error) {
    console.error('Error saving user:', error)
  }
}

const deleteUser = () => {
  if (selectedUser.value) {
    users.value = users.value.filter(u => u.id !== selectedUser.value?.id)
    isDeleteDialogOpen.value = false
    selectedUser.value = null
  }
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col space-y-4">
      <div class="flex flex-col justify-between space-y-4 sm:flex-row sm:items-center sm:space-y-0">
        <div>
          <h1 class="text-2xl font-semibold">Users</h1>
          <p class="text-sm text-muted-foreground">
            Manage your team members and their account permissions
          </p>
        </div>
        <div class="flex space-x-2">
          <div class="relative w-full max-w-sm">
            <Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              v-model="searchQuery"
              type="search"
              placeholder="Search users..."
              class="pl-8"
            />
          </div>
          <Button @click="openAddUserDialog">
            <Plus class="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>
      </div>

      <!-- Filters -->
      <div class="flex flex-wrap items-center gap-2">
        <div class="flex items-center space-x-2">
          <span class="text-sm text-muted-foreground">Status:</span>
          <div class="flex space-x-1">
            <Button 
              v-for="option in statusOptions" 
              :key="option.value"
              :variant="statusFilter === option.value ? 'default' : 'outline'"
              size="sm"
              @click="statusFilter = statusFilter === option.value ? null : option.value"
              class="h-8"
            >
              <span class="mr-1">{{ option.label }}</span>
              <span v-if="statusFilter === option.value" class="ml-1">
                <X class="h-3.5 w-3.5" />
              </span>
            </Button>
          </div>
        </div>

        <div class="flex items-center space-x-2">
          <span class="text-sm text-muted-foreground">Role:</span>
          <div class="flex space-x-1">
            <Button 
              v-for="option in roleOptions" 
              :key="option.value"
              :variant="roleFilter === option.value ? 'default' : 'outline'"
              size="sm"
              @click="roleFilter = roleFilter === option.value ? null : option.value"
              class="h-8"
            >
              <component :is="option.icon" class="mr-1 h-3.5 w-3.5" />
              <span>{{ option.label }}</span>
              <span v-if="roleFilter === option.value" class="ml-1">
                <X class="h-3.5 w-3.5" />
              </span>
            </Button>
          </div>
        </div>

        <Button 
          v-if="statusFilter !== null || roleFilter !== null || searchQuery" 
          variant="ghost" 
          size="sm" 
          @click="clearFilters"
          class="ml-auto text-sm"
        >
          Clear all filters
        </Button>
      </div>
    </div>

    <div class="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead class="w-[60px] px-2">
              <div class="flex items-center space-x-2">
                <Checkbox id="select-all" />
                <Label for="select-all" class="sr-only">Select all</Label>
              </div>
            </TableHead>
            <TableHead class="min-w-[180px] px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              <div class="flex items-center cursor-pointer hover:bg-accent rounded px-2 -mx-2 py-1" @click="requestSort('name')">
                <span>Name</span>
                <component :is="getSortIcon('name')" class="ml-1 h-4 w-4 flex-shrink-0" />
              </div>
            </TableHead>
            <TableHead class="min-w-[120px] px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              <div class="flex items-center cursor-pointer hover:bg-accent rounded px-2 -mx-2 py-1" @click="requestSort('username')">
                <span>Username</span>
                <component :is="getSortIcon('username')" class="ml-1 h-4 w-4 flex-shrink-0" />
              </div>
            </TableHead>
            <TableHead class="min-w-[200px] px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              <div class="flex items-center cursor-pointer hover:bg-accent rounded px-2 -mx-2 py-1" @click="requestSort('email')">
                <span>Email</span>
                <component :is="getSortIcon('email')" class="ml-1 h-4 w-4 flex-shrink-0" />
              </div>
            </TableHead>
            <TableHead class="min-w-[150px] px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              <div class="flex items-center cursor-pointer hover:bg-accent rounded px-2 -mx-2 py-1" @click="requestSort('phone')">
                <span>Phone</span>
                <component :is="getSortIcon('phone')" class="ml-1 h-4 w-4 flex-shrink-0" />
              </div>
            </TableHead>
            <TableHead class="min-w-[120px] px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              <div class="flex items-center cursor-pointer hover:bg-accent rounded px-2 -mx-2 py-1" @click="requestSort('city')">
                <span>City</span>
                <component :is="getSortIcon('city')" class="ml-1 h-4 w-4 flex-shrink-0" />
              </div>
            </TableHead>
            <TableHead class="min-w-[120px] px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              <div class="flex items-center cursor-pointer hover:bg-accent rounded px-2 -mx-2 py-1" @click="requestSort('role')">
                <span>Role</span>
                <component :is="getSortIcon('role')" class="ml-1 h-4 w-4 flex-shrink-0" />
              </div>
            </TableHead>
            <TableHead class="min-w-[100px] px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              <div class="flex items-center cursor-pointer hover:bg-accent rounded px-2 -mx-2 py-1" @click="requestSort('status')">
                <span>Status</span>
                <component :is="getSortIcon('status')" class="ml-1 h-4 w-4 flex-shrink-0" />
              </div>
            </TableHead>
            <TableHead class="min-w-[140px] px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              <div class="flex items-center cursor-pointer hover:bg-accent rounded px-2 -mx-2 py-1" @click="requestSort('lastLogin')">
                <span>Last Login</span>
                <component :is="getSortIcon('lastLogin')" class="ml-1 h-4 w-4 flex-shrink-0" />
              </div>
            </TableHead>
            <TableHead class="relative w-[50px] px-2 py-3.5">
              <span class="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody class="divide-y divide-gray-200 bg-white">
          <TableRow v-for="user in filteredUsers" :key="user.id" class="hover:bg-gray-50">
            <TableCell class="px-2 py-4">
              <div class="flex items-center">
                <Checkbox :id="`user-${user.id}`" class="h-4 w-4" />
                <Label :for="`user-${user.id}`" class="sr-only">Select user</Label>
              </div>
            </TableCell>
            <TableCell class="whitespace-nowrap px-3 py-4">
              <div class="flex items-center cursor-pointer group" @click="openViewDialog(user)">
                <div class="h-10 w-10 flex-shrink-0 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium group-hover:bg-gray-300 transition-colors">
                  {{ user.name.charAt(0).toUpperCase() }}
                </div>
                <div class="ml-4">
                  <div class="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                    {{ user.name }}
                    <span class="ml-2 text-xs text-gray-500 group-hover:text-blue-500 transition-colors">View</span>
                  </div>
                </div>
              </div>
            </TableCell>
            <TableCell class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
              <span class="font-mono bg-gray-100 px-2 py-1 rounded">{{ user.username }}</span>
            </TableCell>
            <TableCell class="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
              {{ user.email }}
            </TableCell>
            <TableCell class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
              {{ user.phone }}
            </TableCell>
            <TableCell class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
              <div class="flex items-center">
                <MapPin class="h-4 w-4 mr-1.5 text-gray-400" />
                {{ user.city }}
              </div>
            </TableCell>
            <TableCell class="whitespace-nowrap px-3 py-4">
              <div class="flex items-center">
                <component :is="getRoleIcon(user.role)" class="mr-2 h-4 w-4 text-muted-foreground flex-shrink-0" />
                <span class="px-2 py-1 text-xs rounded-full" :class="{
                  'bg-purple-100 text-purple-800': user.role === 'Admin',
                  'bg-blue-100 text-blue-800': user.role === 'Editor',
                  'bg-green-100 text-green-800': user.role === 'Viewer'
                }">
                  {{ user.role }}
                </span>
              </div>
            </TableCell>
            <TableCell class="whitespace-nowrap px-3 py-4">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" :class="{
                'bg-green-100 text-green-800': user.status === 'active',
                'bg-gray-100 text-gray-800': user.status === 'inactive'
              }">
                <span :class="[
                  'h-2 w-2 rounded-full mr-1.5',
                  user.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
                ]"></span>
                <span class="capitalize">{{ user.status }}</span>
                <Check v-if="user.status === 'active'" class="ml-1 h-3 w-3 text-green-500" />
              </span>
            </TableCell>
            <TableCell class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
              <time :datetime="user.lastLogin">
                {{ new Date(user.lastLogin).toLocaleDateString() }}
                <div class="text-xs text-gray-400">
                  {{ new Date(user.lastLogin).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }}
                </div>
              </time>
            </TableCell>
            <TableCell class="whitespace-nowrap px-2 py-4 text-right text-sm font-medium">
              <DropdownMenu>
                <DropdownMenuTrigger as-child>
                  <Button variant="ghost" class="h-8 w-8 p-0">
                    <span class="sr-only">Open menu</span>
                    <MoreHorizontal class="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" class="w-40">
                  <DropdownMenuItem @click="openEditDialog(user)" class="cursor-pointer">
                    <Pencil class="mr-2 h-4 w-4" />
                    <span>Edit</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    class="text-destructive cursor-pointer"
                    @click="openDeleteDialog(user)"
                  >
                    <Trash2 class="mr-2 h-4 w-4" />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
          <TableRow v-if="filteredUsers.length === 0">
            <TableCell colspan="6" class="h-24 text-center">
              No users found.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <!-- Add/Edit User Dialog -->
    <Dialog 
      :open="isEditDialogOpen || isAddUserOpen" 
      @update:open="(val: boolean) => {
        if (isEditDialogOpen) {
          isEditDialogOpen = val;
        } else {
          isAddUserOpen = val;
        }
        if (!val) {
          resetForm();
        }
      }"
    >
        <DialogContent>
          <form @submit.prevent="saveUser">
            <DialogHeader>
              <DialogTitle>{{ isEditDialogOpen ? 'Edit User' : 'Add New User' }}</DialogTitle>
              <DialogDescription>
                {{ isEditDialogOpen ? 'Update the user details below.' : 'Enter the details for the new user.' }}
              </DialogDescription>
            </DialogHeader>
            <div class="grid gap-4 py-4">
              <div class="space-y-4">
                <div class="grid grid-cols-4 items-center gap-4">
                  <Label for="name" class="text-right">Name</Label>
                  <Input id="name" v-model="newUser.name" class="col-span-3" required />
                </div>
                
                <div class="grid grid-cols-4 items-center gap-4">
                  <Label for="username" class="text-right">Username</Label>
                  <Input id="username" v-model="newUser.username" class="col-span-3" required />
                </div>
                
                <div class="grid grid-cols-4 items-center gap-4">
                  <Label for="email" class="text-right">Email</Label>
                  <Input id="email" v-model="newUser.email" type="email" class="col-span-3" required />
                </div>
                
                <div class="grid grid-cols-4 items-center gap-4">
                  <Label for="phone" class="text-right">Phone</Label>
                  <Input id="phone" v-model="newUser.phone" type="tel" class="col-span-3" required />
                </div>
                
                <div class="grid grid-cols-4 items-center gap-4">
                  <Label for="city" class="text-right">City</Label>
                  <Input id="city" v-model="newUser.city" class="col-span-3" required />
                </div>
                
                <div class="grid grid-cols-4 items-center gap-4">
                  <Label for="role" class="text-right">Role</Label>
                  <select 
                    id="role" 
                    v-model="newUser.role"
                    class="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    required
                  >
                    <option value="Admin">Admin</option>
                    <option value="Editor">Editor</option>
                    <option value="Viewer">Viewer</option>
                  </select>
                </div>
                
                <div class="grid grid-cols-4 items-center gap-4">
                  <Label class="text-right">Status</Label>
                  <div class="flex items-center space-x-2 col-span-3">
                    <Checkbox 
                      id="status" 
                      :checked="newUser.status === 'active'" 
                      @update:checked="(val: boolean) => newUser.status = val ? 'active' : 'inactive'" />
                    <Label for="status">Active</Label>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" type="button" @click="isEditDialogOpen ? (isEditDialogOpen = false) : (isAddUserOpen = false)">
                Cancel
              </Button>
              <Button type="submit">
                {{ isEditDialogOpen ? 'Update' : 'Add' }} User
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
    </Dialog>

    <!-- Delete Confirmation Dialog -->
    <Dialog v-model:open="isDeleteDialogOpen">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the user
            <span class="font-semibold">{{ selectedUser?.name }}</span> and remove their data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" @click="isDeleteDialogOpen = false">Cancel</Button>
          <Button variant="destructive" @click="deleteUser">Delete User</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <!-- View User Dialog -->
    <Dialog :open="isViewDialogOpen" @update:open="(val: boolean) => isViewDialogOpen = val">
      <DialogContent class="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
          <DialogDescription>
            View user information and activity
          </DialogDescription>
        </DialogHeader>
        <div v-if="selectedUser" class="space-y-6 py-4">
          <div class="flex items-center space-x-4">
            <div class="h-20 w-20 flex-shrink-0 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-medium text-gray-600">
              {{ selectedUser.name.charAt(0).toUpperCase() }}
            </div>
            <div>
              <h3 class="text-lg font-medium">{{ selectedUser.name }}</h3>
              <p class="text-sm text-gray-500">{{ selectedUser.role }}</p>
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1" :class="{
                'bg-green-100 text-green-800': selectedUser.status === 'active',
                'bg-gray-100 text-gray-800': selectedUser.status === 'inactive'
              }">
                {{ selectedUser.status === 'active' ? 'Active' : 'Inactive' }}
              </span>
            </div>
          </div>

          <div class="border-t border-gray-200 pt-4">
            <h4 class="text-sm font-medium text-gray-900 mb-3">Contact Information</h4>
            <dl class="space-y-3">
              <div class="flex items-start">
                <dt class="w-24 text-sm font-medium text-gray-500">Username</dt>
                <dd class="text-sm text-gray-900">{{ selectedUser.username }}</dd>
              </div>
              <div class="flex items-start">
                <dt class="w-24 text-sm font-medium text-gray-500">Email</dt>
                <dd class="text-sm text-gray-900">
                  {{ selectedUser.email }}
                </dd>
              </div>
              <div class="flex items-start">
                <dt class="w-24 text-sm font-medium text-gray-500">Phone</dt>
                <dd class="text-sm text-gray-900">{{ selectedUser.phone }}</dd>
              </div>
              <div class="flex items-start">
                <dt class="w-24 text-sm font-medium text-gray-500">Location</dt>
                <dd class="text-sm text-gray-900 flex items-center">
                  <MapPin class="h-4 w-4 mr-1.5 text-gray-400" />
                  {{ selectedUser.city }}
                </dd>
              </div>
            </dl>
          </div>

          <div class="border-t border-gray-200 pt-4">
            <h4 class="text-sm font-medium text-gray-900 mb-3">Activity</h4>
            <dl class="space-y-3">
              <div class="flex items-start">
                <dt class="w-24 text-sm font-medium text-gray-500">Last Login</dt>
                <dd class="text-sm text-gray-900">
                  {{ new Date(selectedUser.lastLogin).toLocaleDateString() }}
                  <span class="text-gray-500 ml-2">
                    {{ new Date(selectedUser.lastLogin).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }}
                  </span>
                </dd>
              </div>
              <div class="flex items-start">
                <dt class="w-24 text-sm font-medium text-gray-500">Member Since</dt>
                <dd class="text-sm text-gray-900">
                  {{ new Date('2023-01-01').toLocaleDateString() }}
                  <span class="text-gray-500 ml-2">(2 years ago)</span>
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" @click="isViewDialogOpen = false">Close</Button>
          <Button @click="() => {
            openEditDialog(selectedUser!);
            isViewDialogOpen = false;
          }">
            Edit User
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>
