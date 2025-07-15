<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { columns } from './components/columns'
import DataTable from './components/DataTable.vue'
import tasksData from './data/tasks.json'

defineOptions({
  name: 'TasksPage',
})

const router = useRouter()
const tasks = ref(tasksData)

const handleNewTask = () => {
  router.push('/tasks/new')
}
</script>

<template>
  <div class="h-full flex-1 flex-col space-y-8 p-8">
    <div class="flex items-center justify-between space-y-2">
      <div>
        <h2 class="text-2xl font-bold tracking-tight">Tasks</h2>
        <p class="text-muted-foreground">
          Here's a list of all your tasks
        </p>
      </div>
      <div class="flex items-center space-x-2">
        <Button @click="handleNewTask">
          <PlusCircle class="mr-2 h-4 w-4" />
          New Task
        </Button>
      </div>
    </div>
    <DataTable :data="tasks" :columns="columns" />
  </div>
</template>

<style scoped>
/* Add any custom styles here */
</style>
