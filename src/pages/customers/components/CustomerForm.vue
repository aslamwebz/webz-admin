<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/components/ui/toast/use-toast'
import { customerStatuses } from '@/types/customer'

const props = defineProps<{
  customer?: {
    id: string
    firstName: string
    lastName: string
    email: string
    phone: string
    address: string
    city: string
    state: string
    postalCode: string
    country: string
    status: 'active' | 'inactive' | 'banned'
  } | null
  isEditing?: boolean
}>()

const emit = defineEmits<{
  (e: 'submit', customer: typeof props.customer): void
  (e: 'cancel'): void
}>()

const { toast } = useToast()
const router = useRouter()

// Form state
const form = ref({
  firstName: props.customer?.firstName || '',
  lastName: props.customer?.lastName || '',
  email: props.customer?.email || '',
  phone: props.customer?.phone || '',
  address: props.customer?.address || '',
  city: props.customer?.city || '',
  state: props.customer?.state || '',
  postalCode: props.customer?.postalCode || '',
  country: props.customer?.country || 'USA',
  status: props.customer?.status || 'active',
})

// Form validation
const errors = ref<Record<string, string>>({})
const isSubmitting = ref(false)

const hasUnsavedChanges = computed(() => {
  if (!props.customer) return true
  
  return Object.keys(form.value).some(key => {
    return form.value[key as keyof typeof form.value] !== props.customer?.[key as keyof typeof props.customer]
  })
})

// Watch for customer prop changes (for edit mode)
watch(() => props.customer, (newCustomer) => {
  if (newCustomer) {
    form.value = {
      firstName: newCustomer.firstName,
      lastName: newCustomer.lastName,
      email: newCustomer.email,
      phone: newCustomer.phone,
      address: newCustomer.address,
      city: newCustomer.city,
      state: newCustomer.state,
      postalCode: newCustomer.postalCode,
      country: newCustomer.country,
      status: newCustomer.status,
    }
  } else {
    // Reset form for new customer
    form.value = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'USA',
      status: 'active',
    }
  }
}, { immediate: true })

// Methods
const validateForm = () => {
  errors.value = {}
  let isValid = true
  
  if (!form.value.firstName.trim()) {
    errors.value.firstName = 'First name is required'
    isValid = false
  }
  
  if (!form.value.lastName.trim()) {
    errors.value.lastName = 'Last name is required'
    isValid = false
  }
  
  if (!form.value.email) {
    errors.value.email = 'Email is required'
    isValid = false
  } else if (!/\S+@\S+\.\S+/.test(form.value.email)) {
    errors.value.email = 'Please enter a valid email address'
    isValid = false
  }
  
  if (!form.value.phone) {
    errors.value.phone = 'Phone number is required'
    isValid = false
  }
  
  if (!form.value.address) {
    errors.value.address = 'Address is required'
    isValid = false
  }
  
  if (!form.value.city) {
    errors.value.city = 'City is required'
    isValid = false
  }
  
  if (!form.value.state) {
    errors.value.state = 'State is required'
    isValid = false
  }
  
  if (!form.value.postalCode) {
    errors.value.postalCode = 'Postal code is required'
    isValid = false
  }
  
  return isValid
}

const handleSubmit = () => {
  if (!validateForm()) return
  
  isSubmitting.value = true
  
  // Simulate API call
  setTimeout(() => {
    const customerData = {
      ...form.value,
      id: props.customer?.id || `cus_${Math.random().toString(36).substr(2, 9)}`,
      totalOrders: props.customer?.totalOrders || 0,
      totalSpent: props.customer?.totalSpent || 0,
      createdAt: props.customer?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    
    emit('submit', customerData)
    
    toast({
      title: props.isEditing ? 'Customer updated' : 'Customer created',
      description: `${form.value.firstName} ${form.value.lastName} has been ${props.isEditing ? 'updated' : 'added'}.`,
    })
    
    isSubmitting.value = false
  }, 1000)
}

const handleCancel = () => {
  if (hasUnsavedChanges.value) {
    // Show confirmation dialog if there are unsaved changes
    if (confirm('You have unsaved changes. Are you sure you want to leave?')) {
      emit('cancel')
    }
  } else {
    emit('cancel')
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div class="space-y-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="space-y-2">
          <Label for="firstName">First Name <span class="text-destructive">*</span></Label>
          <Input 
            id="firstName" 
            v-model="form.firstName" 
            placeholder="John"
            :class="{ 'border-destructive': errors.firstName }"
          />
          <p v-if="errors.firstName" class="text-sm text-destructive">
            {{ errors.firstName }}
          </p>
        </div>
        
        <div class="space-y-2">
          <Label for="lastName">Last Name <span class="text-destructive">*</span></Label>
          <Input 
            id="lastName" 
            v-model="form.lastName" 
            placeholder="Doe"
            :class="{ 'border-destructive': errors.lastName }"
          />
          <p v-if="errors.lastName" class="text-sm text-destructive">
            {{ errors.lastName }}
          </p>
        </div>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="space-y-2">
          <Label for="email">Email <span class="text-destructive">*</span></Label>
          <Input 
            id="email" 
            v-model="form.email" 
            type="email" 
            placeholder="john.doe@example.com"
            :class="{ 'border-destructive': errors.email }"
          />
          <p v-if="errors.email" class="text-sm text-destructive">
            {{ errors.email }}
          </p>
        </div>
        
        <div class="space-y-2">
          <Label for="phone">Phone <span class="text-destructive">*</span></Label>
          <Input 
            id="phone" 
            v-model="form.phone" 
            placeholder="+1 (555) 123-4567"
            :class="{ 'border-destructive': errors.phone }"
          />
          <p v-if="errors.phone" class="text-sm text-destructive">
            {{ errors.phone }}
          </p>
        </div>
      </div>
      
      <div class="space-y-2">
        <Label for="address">Address <span class="text-destructive">*</span></Label>
        <Input 
          id="address" 
          v-model="form.address" 
          placeholder="123 Main St"
          :class="{ 'border-destructive': errors.address }"
        />
        <p v-if="errors.address" class="text-sm text-destructive">
          {{ errors.address }}
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="space-y-2">
          <Label for="city">City <span class="text-destructive">*</span></Label>
          <Input 
            id="city" 
            v-model="form.city" 
            placeholder="New York"
            :class="{ 'border-destructive': errors.city }"
          />
          <p v-if="errors.city" class="text-sm text-destructive">
            {{ errors.city }}
          </p>
        </div>
        
        <div class="space-y-2">
          <Label for="state">State/Province <span class="text-destructive">*</span></Label>
          <Input 
            id="state" 
            v-model="form.state" 
            placeholder="NY"
            :class="{ 'border-destructive': errors.state }"
          />
          <p v-if="errors.state" class="text-sm text-destructive">
            {{ errors.state }}
          </p>
        </div>
        
        <div class="space-y-2">
          <Label for="postalCode">Postal Code <span class="text-destructive">*</span></Label>
          <Input 
            id="postalCode" 
            v-model="form.postalCode" 
            placeholder="10001"
            :class="{ 'border-destructive': errors.postalCode }"
          />
          <p v-if="errors.postalCode" class="text-sm text-destructive">
            {{ errors.postalCode }}
          </p>
        </div>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="space-y-2">
          <Label for="country">Country</Label>
          <Input 
            id="country" 
            v-model="form.country" 
            placeholder="Country"
          />
        </div>
        
        <div class="space-y-2">
          <Label for="status">Status</Label>
          <Select v-model="form.status">
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem 
                v-for="status in customerStatuses" 
                :key="status.value"
                :value="status.value"
              >
                {{ status.label }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div class="space-y-2">
        <Label for="notes">Notes</Label>
        <Textarea 
          id="notes" 
          v-model="form.notes" 
          placeholder="Additional notes about this customer"
          class="min-h-[100px]"
        />
      </div>
    </div>
    
    <div class="flex justify-end space-x-4 pt-4 border-t">
      <Button 
        type="button" 
        variant="outline" 
        :disabled="isSubmitting"
        @click="handleCancel"
      >
        Cancel
      </Button>
      <Button type="submit" :disabled="isSubmitting">
        <span v-if="isSubmitting" class="flex items-center">
          <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {{ isEditing ? 'Updating...' : 'Creating...' }}
        </span>
        <span v-else>
          {{ isEditing ? 'Update Customer' : 'Create Customer' }}
        </span>
      </Button>
    </div>
  </form>
</template>
