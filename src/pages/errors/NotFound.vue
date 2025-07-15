<script setup lang="ts">
import ErrorLayout from './ErrorLayout.vue'
</script>

<template>
  <ErrorLayout
    code="404"
    title="Page Not Found"
    message="The page you are looking for doesn't exist or has been moved."
    :show-home-button="true"
  />
</template>
