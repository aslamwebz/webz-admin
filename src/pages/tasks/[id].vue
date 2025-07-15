<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/toast/use-toast'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft } from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const { toast } = useToast()
const taskId = route.params.id

const task = ref({
  id: '',
  title: '',
  description: '',
  status: '',
  priority: '',
  label: '',
  createdAt: '',
  updatedAt: ''
})

const statusVariant = (status: string) => {
  switch (status) {
    case 'done':
      return 'success'
    case 'in progress':
      return 'default'
    case 'todo':
      return 'outline'
    case 'canceled':
      return 'destructive'
    case 'backlog':
      return 'secondary'
    default:
      return 'default'
  }
}

const priorityVariant = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'destructive'
    case 'medium':
      return 'default'
    case 'low':
      return 'outline'
    default:
      return 'default'
  }
}

const labelVariant = (label: string) => {
  switch (label) {
    case 'bug':
      return 'destructive'
    case 'feature':
      return 'default'
    case 'documentation':
      return 'secondary'
    default:
      return 'outline'
  }
}

const formatDate = (dateString: string) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const handleEdit = () => {
  router.push(`/tasks/${taskId}/edit`)
}

const handleDelete = () => {
  // In a real app, you would call an API to delete the task
  toast({
    title: 'Task deleted',
    description: 'The task has been deleted successfully.',
    variant: 'destructive',
  })
  router.push('/tasks')
}

// Load task data
onMounted(() => {
  // In a real app, you would fetch the task data from an API
  // For now, we'll just set some sample data
  task.value = {
    id: taskId as string,
    title: 'Sample Task',
    description: 'This is a detailed description of the task. It includes all the necessary information about what needs to be done, any requirements, and any other relevant details.',
    status: 'in progress',
    priority: 'high',
    label: 'feature',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
})
</script>

<template>
  <div class="space-y-6 p-6">
    <div class="flex items-center space-x-4">
      <Button variant="ghost" size="icon" @click="router.push('/tasks')" class="h-8 w-8 p-0">
        <ArrowLeft class="h-4 w-4" />
      </Button>
      <div>
        <h2 class="text-2xl font-bold tracking-tight">Task Details</h2>
        <p class="text-muted-foreground">View and manage task details</p>
      </div>
      <div class="ml-auto flex items-center space-x-2">
        <Button variant="outline" @click="handleEdit">
          Edit
        </Button>
        <Button variant="destructive" @click="handleDelete">
          Delete
        </Button>
      </div>
    </div>

    <div class="space-y-8">
      <div class="space-y-2">
        <div class="flex items-center space-x-2">
          <h3 class="text-xl font-semibold">{{ task.title }}</h3>
          <Badge :variant="statusVariant(task.status)" class="capitalize">
            {{ task.status }}
          </Badge>
        </div>
        
        <div class="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <div class="flex items-center">
            <span class="mr-1">Priority:</span>
            <Badge :variant="priorityVariant(task.priority)" class="capitalize">
              {{ task.priority }}
            </Badge>
          </div>
          <span>•</span>
          <div class="flex items-center">
            <span class="mr-1">Label:</span>
            <Badge :variant="labelVariant(task.label)" class="capitalize">
              {{ task.label }}
            </Badge>
          </div>
          <span>•</span>
          <div>Created: {{ formatDate(task.createdAt) }}</div>
          <span>•</span>
          <div>Updated: {{ formatDate(task.updatedAt) }}</div>
        </div>
      </div>

      <div class="space-y-2">
        <h4 class="font-medium">Description</h4>
        <p class="text-muted-foreground whitespace-pre-line">
          {{ task.description || 'No description provided.' }}
        </p>
      </div>
    </div>
  </div>
</template>
