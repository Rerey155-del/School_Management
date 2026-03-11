<script setup lang="ts">
// Reusable skeleton for Edit Pages
</script>

<template>
  <div class="animate-pulse space-y-10">
    <!-- Header Skeleton -->
    <div class="flex items-center gap-4">
      <div class="w-12 h-12 bg-base-content/5 rounded-full"></div>
      <div class="space-y-2">
        <div class="w-64 h-8 bg-base-content/10 rounded-lg"></div>
        <div class="w-48 h-4 bg-base-content/5 rounded-md"></div>
      </div>
    </div>

    <!-- Main Card Skeleton -->
    <div class="bg-base-100/50 backdrop-blur-xl border border-base-content/5 rounded-[2.5rem] p-8 lg:p-12">
      <div class="flex items-center gap-6 mb-12">
        <div class="w-24 h-24 bg-base-content/10 rounded-3xl"></div>
        <div class="space-y-3">
          <div class="w-48 h-8 bg-base-content/10 rounded-lg"></div>
          <div class="w-32 h-4 bg-base-content/5 rounded-md"></div>
        </div>
      </div>

      <!-- Form Grid Skeleton -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div v-for="i in 4" :key="i" class="space-y-3">
          <div class="w-20 h-3 bg-base-content/5 rounded-full uppercase tracking-widest"></div>
          <div class="w-full h-14 bg-base-content/5 rounded-2xl"></div>
        </div>
      </div>

      <div class="divider opacity-5 my-12"></div>

      <!-- Footer Buttons Skeleton -->
      <div class="flex justify-end gap-4">
        <div class="w-32 h-12 bg-base-content/5 rounded-xl"></div>
        <div class="w-40 h-12 bg-primary/20 rounded-xl"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
</style>
