<script setup lang="ts">
import { SfButton, SfIconShoppingCart } from "@storefront-ui/vue";
const { params } = useRoute();
import { useCartStore } from "@/stores/cart";
import { useRegionStore } from "@/stores/region";
import { formatPrice } from "~/utils/format-price";
const client = useMedusaClient();

const cartStore = useCartStore();
const regionStore = useRegionStore();
const product = ref(null);
const quantity = ref(1);
const variant_id = ref(null);
const lowestPrice = ref({});

try {
  const response = await client.products.retrieve(params.id as string);
  product.value = response.product;
} catch {
  throw createError({
    statusCode: 404,
    statusMessage: "Product not found",
    fatal: true,
  });
}

// Computed property for currency code
const currencyCode = computed(() => {
  return regionStore.region?.currency?.code || "EUR";
});

// // Methods
const increment = () => {
  quantity.value++;
};

const decrement = () => {
  if (quantity.value > 1) {
    quantity.value--;
  }
};

const updateSelectedOptions = (value) => {
  const variant = product.value.variants
    .reduce((acc, cur) => {
      return [
        ...acc,
        {
          variant_id: cur.id,
          options: cur.options.map((o) => o.value),
        },
      ];
    }, [])
    .find((variant) => {
      return (
        Object.values(value).sort().join("__") ===
        variant.options.sort().join("__")
      );
    });
  variant_id.value = variant.variant_id;
};

const filterLowestPrice = () => {
  if (product.value.variants) {
    lowestPrice.value = product.value.variants
      .flatMap((variant) =>
        variant.prices.filter(
          (price) => price.currency_code === currencyCode.value,
        ),
      )
      .sort((a, b) => a.amount - b.amount)[0];
  }
};

// Watcher for currency code changes
watch(
  currencyCode,
  () => {
    filterLowestPrice();
  },
  { immediate: true },
);

const addToCart = async (item) => {
  await cartStore.addItem(item);
};
</script>

<template>
  <div>
    <Head>
      <Title>Fansr | {{ product.title }}</Title>
      <Meta name="description" :content="product.description" />
    </Head>
    <!-- <ProductDetails :product="product" /> -->
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
          <p class="my-7 text-xl" v-if="lowestPrice?.currency_code">
            {{ formatPrice(lowestPrice.amount, lowestPrice.currency_code) }}
          </p>
          <!-- <p v-else>...</p> -->
          <h3 class="pb-2 mb-4 font-bold border-b-2">Product description:</h3>
          <p class="mb-7">{{ product.description }}</p>
          <div class="my-7">
            <products-options
              :options="product.options"
              @updateSelectedOptions="updateSelectedOptions"
            />
            <quantity-selector
              :quantity="quantity"
              @increment="increment"
              @decrement="decrement"
            />
          </div>
          <SfButton @click="addToCart({ variant_id, quantity })" size="sm">
            <template #prefix>
              <SfIconShoppingCart size="sm" />
            </template>
            Add to cart
          </SfButton>
        </div>
      </div>
    </div>
  </div>
  <!-- <p v-if="lowestPrice.currency_code" class="mt-2 mb-4 text-lg"> -->
  <!--   {{ formatPrice(lowestPrice.amount, lowestPrice.currency_code) }} -->
  <!-- </p> -->
</template>
