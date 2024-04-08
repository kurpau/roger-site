<script setup lang="ts">
const client = useMedusaClient();
const { products } = await client.products.list();
</script>

<template>
  <div class="container grid grid-cols-4 gap-5">
    <div v-for="product in products" :key="product.id">
      <ProductCard
        :id="product.id"
        :thumbnail="product.thumbnail"
        :title="product.title"
        :description="product.description"
        :price="product.variants[0].prices[0].amount"
      />
    </div>
  </div>
</template>
