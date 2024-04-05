<template>
  <NavbarTop />
  <ul>
    <li v-for="product in products">{{ product.title }}</li>
  </ul>
  <NuxtPage />
</template>

<script lang="ts" setup></script>
