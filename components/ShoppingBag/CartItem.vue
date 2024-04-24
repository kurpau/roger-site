<template>
  <div class="flex mb-6 last:mb-0">
    <div class="bg-ui rounded-md overflow-hidden mr-4 max-w-1/4">
      <img class="h-auto w-full object-cover" :src="item.thumbnail" :alt="item.title">
    </div>
    <div class="flex text-sm flex-grow py-2">
      <div class="flex flex-col justify-between w-full flex-grow">
        <div class="flex flex-col">
          <p class="font-semibold mb-2">
            {{ item.title }}
          </p>
          <p class="lg:block mb-4 hidden font-light">
            {{ item.variant.product.description }}
          </p>
          <p>
            <span class="text-ui-dark">Variant:</span> {{ item.description }}
          </p>
        </div>
        <p class="font-semibold">
          {{ formatPrice(item.unit_price, cartCurrencyCode, item.quantity) }}
        </p>
      </div>
      <div class="flex flex-col justify-between">
        <div class="flex justify-end w-full">
          <button @click="deleteItem">
            &times;
          </button>
        </div>
        <quantity-selector :quantity="item.quantity" @increment="updateQuantity" @decrement="updateQuantity" />
      </div>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  item: {
    type: Object,
    default: () => {
      return {}
    }
  }
});

const cartStore = useCartStore();

const cartCurrencyCode = computed(() => {
  return cartStore.cart.region.currency_code;
});

function updateQuantity(quantity) {
  cartStore.updateQuantity({ id: props.item.id, quantity })
}

function deleteItem() {
  cartStore.removeItem(props.item.id)
}
</script>
