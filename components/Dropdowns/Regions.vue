<template>
  <div class="my-auto">
    <SfDropdown v-model="isOpen">
      <template #trigger>
        <SfButton class="min-w-12" variant="secondary" size="sm" @click="toggle()">
          <div v-if="loading">Loading...</div>
          <span v-else>{{ regionStore.country?.iso_3.toUpperCase() }} </span>
        </SfButton>
      </template>
      <div class="relative z-10" v-for="region in regionStore.regions" :key="region.id">
        <ul class="p-2 bg-gray-100 rounded">
          <li class="font-bold">{{ region.name }}</li>
          <li v-for="country in region.countries" :key="country.id">
            <button @click="
              regionStore.updateRegion({ region: region, country: country })
              ">
              {{ country.display_name }}
            </button>
          </li>
        </ul>
      </div>
    </SfDropdown>
  </div>
</template>

<script setup>
import { useRegionStore } from "@/stores/region";
import { SfDropdown, useDisclosure, SfButton } from "@storefront-ui/vue";
import { ref, onMounted } from "vue";

const { isOpen, toggle } = useDisclosure();
const regionStore = useRegionStore();
const loading = ref(true);

onMounted(async () => {
  await regionStore.initializeRegions();
  loading.value = false;
});
</script>
