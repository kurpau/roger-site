<script setup lang="ts">
const client = useMedusaClient();
const { products } = await client.products.list();

useHead({
  title: "Fansr | Products",
  meta: [{ name: "description", content: "Fansr products" }],
});
</script>

<template>
  <section>
    <div
      class="grid grid-cols-1 gap-4 content-around md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
    >
      <p v-if="!products.length">No products found</p>
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
  </section>
</template>
