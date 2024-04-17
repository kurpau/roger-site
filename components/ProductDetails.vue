<script setup lang="ts">
import { SfButton, SfIconShoppingCart } from "@storefront-ui/vue";

defineProps(["product"]);
</script>

<template>
  <div class="m-auto card">
    <div class="grid grid-cols-2 gap-10">
      <div class="p-7">
        <NuxtImg
          :src="product.thumbnail"
          alt="product img"
          class="my-7 mx-auto"
          width="500"
        />
      </div>
      <div class="p-7">
        <h2 class="my-7 text-4xl">{{ product.title }}</h2>
        <p class="my-7 text-xl">
          Price - {{ product.variants[0].prices[0].amount }}€
        </p>
        <h3 class="pb-2 mb-4 font-bold border-b-2">Product description:</h3>
        <p class="mb-7">{{ product.description }}</p>

        <SfButton size="sm">
          <template #prefix>
            <SfIconShoppingCart size="sm" />
          </template>
          Add to cart
        </SfButton>
      </div>
    </div>
  </div>
</template>
