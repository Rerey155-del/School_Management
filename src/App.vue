<script setup lang="ts">
import { useSettings } from "@/composables/useSettings";
// Initialize settings/theme
useSettings();
</script>
<template>
  <router-view />
</template>
