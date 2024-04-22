<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>


<script setup>
const cartStore = useCartStore();

await useAsyncData('cartInit', () => cartStore.initializeCart().then(() => true))
</script>
