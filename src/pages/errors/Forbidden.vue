<script setup lang="ts">
import ErrorLayout from './ErrorLayout.vue'
</script>

<template>
  <ErrorLayout
    code="403"
    title="Forbidden"
    message="You don't have permission to access this resource."
    :show-home-button="true"
  />
</template>
