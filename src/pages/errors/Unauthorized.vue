<script setup lang="ts">
import ErrorLayout from './ErrorLayout.vue'
</script>

<template>
  <ErrorLayout
    code="401"
    title="Unauthorized"
    message="You are not authorized to access this page."
    :show-home-button="true"
  />
</template>
