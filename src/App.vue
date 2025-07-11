<script setup lang="ts">
// App setup code can go here if needed
</script>

<template>
  <div class="min-h-screen bg-background">
    <!-- Main content -->
    <main class="relative">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<style>
/* Global styles */
body {
  margin: 0;
  padding: 0;
}

/* Page transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
