<script setup lang="ts">
import { ref, watch } from 'vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card'
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { 
  Loader2, 
  Save, 
 
  Tag,
  CheckCircle2,
  XCircle
} from 'lucide-vue-next'
import { type Category } from '@/types/category'

const props = defineProps<{
  initialData?: Partial<Category>
  isSubmitting?: boolean
}>()

const emit = defineEmits(['submit', 'cancel'])



const form = ref<Omit<Category, 'id' | 'createdAt' | 'updatedAt' | 'productCount'>>({
  name: '',
  slug: '',
  description: '',
  isActive: true,
  image: ''
})

const showCancelDialog = ref(false)
const hasUnsavedChanges = ref(false)
const pendingNavigation = ref('')

// Watch for changes to initialData
watch(() => props.initialData, (newVal) => {
  if (newVal) {
    const { id, createdAt, updatedAt, productCount, ...formData } = newVal
    form.value = { ...form.value, ...formData }
  }
}, { immediate: true })

// Generate slug from name
const generateSlug = (name: string) => {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/-+/g, '-') // Replace multiple - with single -
    .trim()
}

// Handle form submission
const handleSubmit = (e: Event) => {
  e.preventDefault()
  emit('submit', form.value)
}

// Handle cancel
const handleCancel = () => {
  if (hasUnsavedChanges.value) {
    showCancelDialog.value = true
  } else {
    emit('cancel')
  }
}

// Confirm cancel navigation
const confirmCancel = () => {
  if (pendingNavigation.value) {
    window.location.href = pendingNavigation.value
  } else {
    emit('cancel')
  }
  showCancelDialog.value = false
}

// Watch for form changes
const originalForm = JSON.stringify(form.value)
watch(form, (newValue) => {
  hasUnsavedChanges.value = JSON.stringify(newValue) !== originalForm
}, { deep: true })

// Update slug when name changes, but only if slug hasn't been manually edited
const slugManuallyEdited = ref(false)
watch(() => form.value.name, (newName) => {
  if (!slugManuallyEdited.value) {
    form.value.slug = generateSlug(newName)
  }
})

// Mark slug as manually edited when user types in the slug field
const handleSlugInput = () => {
  slugManuallyEdited.value = true
}
</script>

<template>
  <form @submit="handleSubmit">
    <div class="grid gap-6 md:grid-cols-3">
      <!-- Main Form -->
      <div class="space-y-6 md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Category Information</CardTitle>
            <CardDescription>
              Enter the category details
            </CardDescription>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="space-y-2">
              <Label for="name">Category Name</Label>
              <Input 
                id="name" 
                v-model="form.name" 
                placeholder="e.g., Electronics" 
                required 
              />
            </div>
            
            <div class="space-y-2">
              <Label for="slug">URL Slug</Label>
              <Input 
                id="slug" 
                v-model="form.slug" 
                placeholder="e.g., electronics" 
                required
                @input="handleSlugInput"
              />
              <p class="text-xs text-muted-foreground">
                The slug is used in the URL. Only lowercase letters, numbers, and hyphens are allowed.
              </p>
            </div>
            
            <div class="space-y-2">
              <Label for="description">Description</Label>
              <Textarea 
                id="description" 
                v-model="form.description" 
                placeholder="Enter a description for this category" 
                rows="4" 
              />
              <p class="text-xs text-muted-foreground">
                This description may be used in category pages and search results.
              </p>
            </div>
            
            <div class="space-y-2">
              <Label for="status">Status</Label>
              <div class="flex items-center space-x-4">
                <div class="flex items-center space-x-2">
                  <input 
                    id="active" 
                    v-model="form.isActive" 
                    type="radio" 
                    :value="true" 
                    class="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                  />
                  <Label for="active" class="flex items-center">
                    <CheckCircle2 class="h-4 w-4 mr-1.5 text-green-500" />
                    Active
                  </Label>
                </div>
                <div class="flex items-center space-x-2">
                  <input 
                    id="inactive" 
                    v-model="form.isActive" 
                    type="radio" 
                    :value="false" 
                    class="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                  />
                  <Label for="inactive" class="flex items-center">
                    <XCircle class="h-4 w-4 mr-1.5 text-gray-500" />
                    Inactive
                  </Label>
                </div>
              </div>
            </div>
            
            <div class="space-y-2">
              <Label for="image">Image URL</Label>
              <Input 
                id="image" 
                v-model="form.image" 
                type="url" 
                placeholder="https://example.com/image.jpg" 
              />
              <p class="text-xs text-muted-foreground">
                URL of the category image. Recommended size: 800x400px
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <!-- Preview & Actions -->
      <div class="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
            <CardDescription>How your category will appear</CardDescription>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="aspect-[16/9] bg-muted rounded-md overflow-hidden">
              <div class="w-full h-full flex items-center justify-center text-muted-foreground">
                <div class="text-center p-6">
                  <Tag class="h-12 w-12 mx-auto mb-4 opacity-20" />
                  <p class="text-sm">
                    {{ form.image ? 'Image preview' : 'No image selected' }}
                  </p>
                </div>
              </div>
            </div>
            <div class="space-y-1">
              <h3 class="text-lg font-medium">{{ form.name || 'Category Name' }}</h3>
              <p class="text-sm text-muted-foreground">
                {{ form.description || 'Category description will appear here' }}
              </p>
              <div class="pt-2">
                <span 
                  class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
                  :class="form.isActive ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'"
                >
                  {{ form.isActive ? 'Active' : 'Inactive' }}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Actions</CardTitle>
          </CardHeader>
          <CardContent class="space-y-4">
            <Button 
              type="submit" 
              class="w-full" 
              :disabled="isSubmitting"
            >
              <Loader2 v-if="isSubmitting" class="mr-2 h-4 w-4 animate-spin" />
              <Save v-else class="mr-2 h-4 w-4" />
              {{ isSubmitting ? 'Saving...' : 'Save Category' }}
            </Button>
            
            <Button 
              type="button" 
              variant="outline" 
              class="w-full" 
              @click="handleCancel"
              :disabled="isSubmitting"
            >
              Cancel
            </Button>
            
            <div v-if="hasUnsavedChanges" class="text-sm text-yellow-600 dark:text-yellow-400 flex items-center">
              <AlertCircle class="h-4 w-4 mr-2" />
              You have unsaved changes
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    
    <!-- Cancel Confirmation Dialog -->
    <AlertDialog v-model:open="showCancelDialog">
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Discard changes?</AlertDialogTitle>
          <AlertDialogDescription>
            You have unsaved changes. Are you sure you want to leave this page? Your changes will be lost.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel @click="showCancelDialog = false">Cancel</AlertDialogCancel>
          <AlertDialogAction @click="confirmCancel">Discard Changes</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </form>
</template>
