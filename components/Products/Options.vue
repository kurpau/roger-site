<template>
  <div>
    <div v-for="option in filteredOptions" :key="option.id" class="mt-6">
      <div class="text-sm">
        <p class="mb-2 font-medium">
          {{ option.title }}
        </p>
        <div>
          <button
            v-for="value in option.values"
            :key="value.id"
            :class="
              value.value === currentOptions[option.id]
                ? 'bg-gray-500 text-white'
                : 'bg-gray-200 text-black'
            "
            class="inline-flex justify-center items-center mr-2 w-12 h-12 text-xs rounded-sm last:mr-0 hover:text-white hover:bg-gray-500"
            @click="updateOption(option.id, value.value)"
          >
            {{ value.value }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, defineProps, onMounted } from "vue";

const emit = defineEmits(["updateSelectedOptions"]);

// Define props
const props = defineProps({
  options: {
    type: Array,
    default: () => [],
  },
});

// State
const currentOptions = ref({});

// Computed properties to filter out duplicate values
const filteredOptions = computed(() => {
  return props.options.map((option) => ({
    ...option,
    values: option.values.reduce((acc, curr) => {
      if (!acc.find((val) => val.value === curr.value)) {
        return [...acc, { ...curr }];
      }
      return acc;
    }, []),
  }));
});

// Watcher to initialize currentOptions when options change
watch(
  () => props.options,
  (newOptions) => {
    currentOptions.value = newOptions.reduce((acc, curr) => {
      if (!acc[curr.id]) {
        acc[curr.id] = curr.values[0].value; // Initialize with the first value
      }
      return acc;
    }, {});
    // Emit event to update parent component
    emit("updateSelectedOptions", currentOptions.value);
  },
  { immediate: true },
);

// Method to update selected options
const updateOption = (optionId, value) => {
  currentOptions.value[optionId] = value;
  emit("updateSelectedOptions", currentOptions.value);
};
</script>
