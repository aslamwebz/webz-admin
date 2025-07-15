<script setup lang="ts">
import ErrorLayout from './ErrorLayout.vue'
</script>

<template>
  <ErrorLayout
    code="503"
    title="Service Unavailable"
    message="The service is currently unavailable. Please check back soon."
    :show-home-button="true"
  />
</template>
