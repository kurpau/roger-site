<script setup lang="ts">
import ProductCard from "../components/ProductCard.vue";

const client = useMedusaClient();
const { products } = await client.products.list();
</script>

<template>
  {{ products[0].variants[0].prices[0].amount }}
  <section class="flex gap-4">
    <div v-for="product in products">
      <ProductCard :thumbnail="product.thumbnail" :title="product.title" :description="product.description"
        :price="product.variants[0].prices[0].amount" />
    </div>
  </section>
</template>
