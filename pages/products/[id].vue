<script setup lang="ts">
const { params } = useRoute();
const client = useMedusaClient();

const product = ref(null);

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
</script>

<template>
  <div>

    <Head>
      <Title>Fansr | {{ product.title }}</Title>
      <Meta name="description" :content="product.description" />
    </Head>
    <ProductDetails :product="product" />
  </div>
</template>
