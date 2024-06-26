<template>
  <div
    class="rounded-md border hover:shadow-lg border-neutral-200 max-w-[300px]"
  >
    <div class="relative">
      <NuxtLink class="block" :to="`/products/${product.id}`">
        <NuxtImg
          format="webp"
          :src="product.thumbnail"
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
      <SfLink
        :tag="NuxtLink"
        :href="`/products/${product.id}`"
        variant="secondary"
        class="no-underline"
      >
        {{ product.title }}
      </SfLink>
      <div class="flex items-center pt-1">
        <SfRating size="xs" :value="5" :max="5" />

        <SfLink
          :tag="NuxtLink"
          :href="`/products/${product.id}`"
          variant="secondary"
          class="pl-1 no-underline"
        >
          <SfCounter size="xs">123</SfCounter>
        </SfLink>
      </div>
      <p
        class="block py-2 font-normal leading-5 typography-text-sm text-neutral-700"
      >
        {{ product.description }}
      </p>
      <p class="block pb-2 font-bold typography-text-lg">
        from {{ formatPrice(lowestPrice.amount, lowestPrice.currency_code) }}
      </p>
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
import { formatPrice } from "~/utils/format-price";
import { useRegionStore } from "@/stores/region";
import { useCartStore } from "@/stores/cart";

import { resolveComponent } from "vue";

const NuxtLink = resolveComponent("NuxtLink");
const props = defineProps(["product"]);

const regionStore = useRegionStore();
const cartStore = useCartStore();

const lowestPrice = computed(() => {
  return (
    props.product.variants
      .reduce((prices, cur) => {
        return [
          ...prices,
          ...cur.prices.filter(
            (price) => price.currency_code === cartStore.cartCurrencyCode,
          ),
        ];
      }, [])
      .sort((a, b) => a.amount - b.amount)[0] || {
      amount: 1,
      currency_code: "usd",
    }
  );
});
</script>
