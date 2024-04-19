<template>
  <div class="flex items-center py-2 px-4 rounded-md shadow">
    <button @click="$emit('decrement', quantity - 1)">–</button>
    <span class="w-8 text-center">{{ quantity }}</span>
    <button @click="$emit('increment', quantity + 1)">+</button>
  </div>
</template>

<script setup>
defineProps({
  quantity: {
    type: Number,
    default: 1,
  },
});
</script>
