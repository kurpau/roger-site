<script setup lang="ts">
const { params } = useRoute();
const client = useMedusaClient();
const { product } = await client.products.retrieve(params.id as string);
</script>

<template>
  <div>
    <ProductDetails :product="product" />
  </div>
</template>
