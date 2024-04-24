<template>
  <div class="bg-white rounded-md shadow px-8 py-6 w-full sticky top-28">
    <h3 class="font-semibold mb-4">
      Order Summary
    </h3>

    <div class="my-4 border-t bt-gray-100">
      <div class="font-light text-sm space-y-3 mt-3">
        <div class="flex items-center justify-between mb-2">
          <p>Subtotal</p>
          <p class="font-medium">
            {{ formatPrice(cart.subtotal, currencyCode) }}
          </p>
        </div>

        <div v-if="shippingTotal" class="flex items-center justify-between mb-2">
          <p>Shipping</p>
          <p class="font-medium">
            {{ formatPrice(shippingTotal, currencyCode) }}
          </p>
        </div>

        <div class="flex items-center justify-between mb-2">
          <p>Taxes</p>
          <p class="font-medium">
            {{ formatPrice(cart.tax_total, currencyCode) }}
          </p>
        </div>

        <div class="h-px w-full bg-ui-medium mb-2" />

        <div class="flex items-center justify-between">
          <p>Total</p>
          <p class="font-medium">
            {{ formatPrice(cart.total, currencyCode) }}
          </p>
        </div>
      </div>
    </div>

    <div>
      <button class="btn-ui w-full">
        Checkout
      </button>
    </div>
  </div>
</template>

<script setup>
import { formatPrice } from '@/utils/format-price'

const cartStore = useCartStore();

const cart = computed(() => cartStore.cart)
const currencyCode = computed(() => cartStore.cart.region.currency_code);
const shippingTotal = computed(() => cart.value.shipping_total)

</script>
