<script setup lang="ts">
import { ref, computed } from 'vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Plus, Pencil, Trash2, MoreHorizontal } from 'lucide-vue-next'
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
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'

interface User {
  id: number;
  name: string;
  email: string;
  role: 'Admin' | 'Editor' | 'Viewer';
  status: 'active' | 'inactive';
  lastLogin: string;
}

interface NewUser {
  name: string;
  email: string;
  role: 'Admin' | 'Editor' | 'Viewer';
  status: 'active' | 'inactive';
}

// Mock data - in a real app, this would come from an API
const users = ref<User[]>([
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
    status: 'active',
    lastLogin: '2023-07-14T10:30:00Z',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'Editor',
    status: 'active',
    lastLogin: '2023-07-13T15:45:00Z',
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: 'Viewer',
    status: 'inactive',
    lastLogin: '2023-07-10T09:15:00Z',
  },
])

const searchQuery = ref('')
const isAddUserOpen = ref(false)
const isDeleteDialogOpen = ref(false)
const selectedUser = ref<User | null>(null)
const newUser = ref<NewUser>({
  name: '',
  email: '',
  role: 'Viewer',
  status: 'active'
})

const filteredUsers = computed(() => {
  if (!searchQuery.value) return users.value
  const query = searchQuery.value.toLowerCase()
  return users.value.filter(user => 
    user.name.toLowerCase().includes(query) || 
    user.email.toLowerCase().includes(query) ||
    user.role.toLowerCase().includes(query)
  )
})

const resetForm = () => {
  newUser.value = {
    name: '',
    email: '',
    role: 'Viewer',
    status: 'active'
  }
  selectedUser.value = null
}

const openEditDialog = (user: User) => {
  selectedUser.value = user
  newUser.value = { ...user }
  isAddUserOpen.value = true
}

const openDeleteDialog = (user: User) => {
  selectedUser.value = user
  isDeleteDialogOpen.value = true
}

const saveUser = () => {
  if (selectedUser.value) {
    // Update existing user
    const index = users.value.findIndex(u => u.id === selectedUser.value?.id)
    if (index !== -1) {
      users.value[index] = { 
        ...users.value[index],
        ...newUser.value,
        id: selectedUser.value.id,
        lastLogin: users.value[index].lastLogin
      }
    }
  } else {
    // Add new user
    const newId = users.value.length > 0 ? Math.max(...users.value.map(u => u.id), 0) + 1 : 1
    const newUserObj: User = {
      ...newUser.value,
      id: newId,
      lastLogin: new Date().toISOString()
    }
    users.value.unshift(newUserObj)
  }
  isAddUserOpen.value = false
  resetForm()
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
        <Button @click="isAddUserOpen = true; resetForm()">
          <Plus class="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>
    </div>

    <div class="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead class="w-[100px]">
              <div class="flex items-center space-x-2">
                <Checkbox id="select-all" />
                <Label for="select-all" class="sr-only">Select all</Label>
              </div>
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Login</TableHead>
            <TableHead class="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="user in filteredUsers" :key="user.id">
            <TableCell>
              <div class="flex items-center space-x-2">
                <Checkbox :id="`user-${user.id}`" />
                <Label :for="`user-${user.id}`" class="sr-only">Select user</Label>
              </div>
            </TableCell>
            <TableCell class="font-medium">{{ user.name }}</TableCell>
            <TableCell>{{ user.email }}</TableCell>
            <TableCell>
              <Badge variant="outline">{{ user.role }}</Badge>
            </TableCell>
            <TableCell>
              <div class="flex items-center">
                <span :class="[
                  'h-2 w-2 rounded-full mr-2',
                  user.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
                ]"></span>
                <span class="capitalize">{{ user.status }}</span>
              </div>
            </TableCell>
            <TableCell class="text-sm text-muted-foreground">
              {{ new Date(user.lastLogin).toLocaleDateString() }}
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger as-child>
                  <Button variant="ghost" class="h-8 w-8 p-0">
                    <span class="sr-only">Open menu</span>
                    <MoreHorizontal class="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem @click="openEditDialog(user)">
                    <Pencil class="mr-2 h-4 w-4" />
                    <span>Edit</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    class="text-destructive"
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
    <Dialog :open="isAddUserOpen" @update:open="(val: boolean) => {
  isAddUserOpen = val;
  if (!val) resetForm();
}">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{{ selectedUser ? 'Edit User' : 'Add New User' }}</DialogTitle>
          <DialogDescription>
            {{ selectedUser ? 'Update the user details below.' : 'Enter the details for the new user.' }}
          </DialogDescription>
        </DialogHeader>
        <div class="grid gap-4 py-4">
          <div class="grid grid-cols-4 items-center gap-4">
            <Label for="name" class="text-right">Name</Label>
            <Input id="name" v-model="newUser.name" class="col-span-3" />
          </div>
          <div class="grid grid-cols-4 items-center gap-4">
            <Label for="email" class="text-right">Email</Label>
            <Input id="email" v-model="newUser.email" type="email" class="col-span-3" />
          </div>
          <div class="grid grid-cols-4 items-center gap-4">
            <Label for="role" class="text-right">Role</Label>
            <select 
              id="role" 
              v-model="newUser.role"
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
  @update:checked="(val: boolean) => newUser.status = val ? 'active' : 'inactive'" 
/>
              <Label for="status">Active</Label>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" @click="isAddUserOpen = false">Cancel</Button>
          <Button type="submit" @click="saveUser">
            {{ selectedUser ? 'Update' : 'Add' }} User
          </Button>
        </DialogFooter>
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
  </div>
</template>
