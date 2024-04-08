<script setup lang="ts">
defineProps(["product"]);
</script>

<template>
  <div class="m-auto max-w-5xl card">
    <div class="grid grid-cols-2 gap-10">
      <div class="p-7">
        <NuxtImg
          :src="product.thumbnail"
          alt="product img"
          class="my-7 mx-auto"
          width="400"
        />
      </div>
      <div class="p-7">
        <h2 class="my-7 text-4xl">{{ product.title }}</h2>
        <p class="my-7 text-xl">
          Price - {{ product.variants[0].prices[0].amount }}€
        </p>
        <h3 class="pb-2 mb-4 font-bold border-b-2">Product description:</h3>
        <p class="mb-7">{{ product.description }}</p>
      </div>
    </div>
  </div>
</template>
