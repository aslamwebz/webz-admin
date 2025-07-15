<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useToast } from '@/components/ui/toast/use-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const { toast } = useToast()
const router = useRouter()
const route = useRoute()

const taskId = route.params.id
const isEditing = ref(!!taskId)

const form = ref({
  title: '',
  description: '',
  status: 'todo',
  priority: 'medium',
  label: 'feature',
})

const statusOptions = [
  { value: 'todo', label: 'Todo' },
  { value: 'in progress', label: 'In Progress' },
  { value: 'done', label: 'Done' },
  { value: 'canceled', label: 'Canceled' },
  { value: 'backlog', label: 'Backlog' },
]

const priorityOptions = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
]

const labelOptions = [
  { value: 'bug', label: 'Bug' },
  { value: 'feature', label: 'Feature' },
  { value: 'documentation', label: 'Documentation' },
]

const handleSubmit = (e: Event) => {
  e.preventDefault()
  // In a real app, you would save to an API here
  toast({
    title: isEditing.value ? 'Task updated' : 'Task created',
    description: isEditing.value 
      ? 'Your task has been updated successfully.'
      : 'Your task has been created successfully.',
  })
  
  // Redirect back to tasks list
  router.push('/tasks')
}

const handleCancel = () => {
  router.push('/tasks')
}

// Load task data if editing
onMounted(() => {
  if (isEditing.value) {
    // In a real app, you would fetch the task data from an API
    // For now, we'll just set some placeholder data
    form.value = {
      title: 'Sample Task',
      description: 'This is a sample task description.',
      status: 'todo',
      priority: 'medium',
      label: 'feature',
    }
  }
})
</script>

<template>
  <div class="space-y-6 p-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold tracking-tight">
          {{ isEditing ? 'Edit Task' : 'Create New Task' }}
        </h2>
        <p class="text-muted-foreground">
          {{ isEditing ? 'Update the task details below' : 'Fill out the form to create a new task' }}
        </p>
      </div>
    </div>

    <form @submit="handleSubmit" class="space-y-6">
      <div class="space-y-4">
        <div class="grid gap-4 md:grid-cols-2">
          <div class="space-y-2">
            <Label for="title">Title</Label>
            <Input id="title" v-model="form.title" required />
          </div>
          
          <div class="space-y-2">
            <Label for="status">Status</Label>
            <Select v-model="form.status">
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem v-for="option in statusOptions" :key="option.value" :value="option.value">
                  {{ option.label }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div class="grid gap-4 md:grid-cols-2">
          <div class="space-y-2">
            <Label for="priority">Priority</Label>
            <Select v-model="form.priority">
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem v-for="option in priorityOptions" :key="option.value" :value="option.value">
                  {{ option.label }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div class="space-y-2">
            <Label for="label">Label</Label>
            <Select v-model="form.label">
              <SelectTrigger>
                <SelectValue placeholder="Select label" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem v-for="option in labelOptions" :key="option.value" :value="option.value">
                  {{ option.label }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div class="space-y-2">
          <Label for="description">Description</Label>
          <Textarea
            id="description"
            v-model="form.description"
            placeholder="Enter task description..."
            class="min-h-[120px]"
          />
        </div>
      </div>

      <div class="flex justify-end space-x-4">
        <Button type="button" variant="outline" @click="handleCancel">
          Cancel
        </Button>
        <Button type="submit">
          {{ isEditing ? 'Update Task' : 'Create Task' }}
        </Button>
      </div>
    </form>
  </div>
</template>
