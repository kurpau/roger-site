<script setup lang="ts">
const client = useMedusaClient();
const { products } = await client.products.list();
</script>

<template>
  <section class="flex gap-4">
    <div v-for="product in products" :key="product.id">
      <ProductCard
        :id="product.id"
        :thumbnail="product.thumbnail"
        :title="product.title"
        :description="product.description"
        :price="product.variants[0].prices[0].amount"
      />
    </div>
  </section>
</template>
