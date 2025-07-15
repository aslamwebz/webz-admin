<script setup lang="ts">
import ErrorLayout from './ErrorLayout.vue'
</script>

<template>
  <ErrorLayout
    code="500"
    title="Internal Server Error"
    message="Something went wrong on our end. Please try again later."
    :show-home-button="true"
  />
</template>
