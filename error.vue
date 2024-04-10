<template>
  <div class="mx-auto mt-7 max-w-sm text-center card">
    <p class="mt-7 text-7xl font-bold">{{ error.statusCode }}</p>
    <p class="mt-7 text-6xl">Ooops.</p>
    <p class="mt-7">{{ error.message }}</p>
    <SfButton size="sm" class="my-7" @click="handleClearError"
      >Go Home...</SfButton
    >
  </div>
</template>

<script setup>
import { SfButton } from "@storefront-ui/vue";
defineProps(["error"]);

const handleClearError = () => clearError({ redirect: "/" });
</script>

<style scoped></style>
