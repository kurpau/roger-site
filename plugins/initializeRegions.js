import { useRegionStore } from "@/stores/region";

export default defineNuxtPlugin(async (nuxtApp) => {
  try {
    const regionStore = useRegionStore();
    await useAsyncData("regions", () =>
      regionStore.initializeRegions().then(() => true),
    );
  } catch (error) {
    console.error("Error initializing regions:", error);
  }
  const { data, refresh } = await useAsyncData("cart", () =>
    cartStore.createCart().then(() => true),
  );
});
