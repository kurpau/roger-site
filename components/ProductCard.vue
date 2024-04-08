<template>
  <div
    class="rounded-md border hover:shadow-lg border-neutral-200 max-w-[300px]"
  >
    <div class="relative">
      <NuxtLink class="block" :to="`/products/${id}`">
        <NuxtImg
          format="webp"
          :src="thumbnail"
          alt="Great product"
          class="block object-cover h-auto rounded-md aspect-square"
          width="300"
          height="300"
        />
      </NuxtLink>
      <SfButton
        variant="tertiary"
        size="sm"
        square
        class="absolute bottom-0 right-0 mr-2 mb-2 bg-white ring-1 ring-inset ring-neutral-200 !rounded-full"
        aria-label="Add to wishlist"
      >
        <SfIconFavorite size="sm" />
      </SfButton>
    </div>
    <div class="p-4 border-t border-neutral-200">
      <SfLink variant="secondary" class="no-underline">
        <NuxtLink :to="`/products/${id}`">
          {{ title }}
        </NuxtLink>
      </SfLink>
      <div class="flex items-center pt-1">
        <SfRating size="xs" :value="5" :max="5" />

        <SfLink variant="secondary" class="pl-1 no-underline">
          <NuxtLink :to="`/products/${id}`">
            <SfCounter size="xs">123</SfCounter>
          </NuxtLink>
        </SfLink>
      </div>
      <p
        class="block py-2 font-normal leading-5 typography-text-sm text-neutral-700"
      >
        {{ description }}
      </p>
      <span class="block pb-2 font-bold typography-text-lg">{{ price }}€</span>
      <SfButton size="sm">
        <template #prefix>
          <SfIconShoppingCart size="sm" />
        </template>
        Add to cart
      </SfButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  SfRating,
  SfCounter,
  SfLink,
  SfButton,
  SfIconShoppingCart,
  SfIconFavorite,
} from "@storefront-ui/vue";

defineProps(["title", "description", "price", "thumbnail", "id"]);
</script>
