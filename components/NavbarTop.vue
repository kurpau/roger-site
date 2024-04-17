<template>
  <header class="flex justify-center py-2 px-4 w-full bg-white border-b lg:py-5 lg:px-6 border-neutral-200">
    <div class="flex flex-row flex-wrap justify-start items-center w-full h-full lg:flex-nowrap max-w-[1536px]">
      <NuxtLink to="/" aria-label="SF Homepage"
        class="inline-block mr-4 focus-visible:rounded-sm shrink-0 focus-visible:outline focus-visible:outline-offset">
        <picture>
          <source srcset="
              https://storage.googleapis.com/sfui_docs_artifacts_bucket_public/production/vsf_logo.svg
            " media="(min-width: 768px)" />
          <img src="https://storage.googleapis.com/sfui_docs_artifacts_bucket_public/production/vsf_logo_sign.svg"
            alt="Sf Logo" class="w-8 h-8 md:h-6 md:w-[176px] lg:w-[12.5rem] lg:h-[1.75rem]" />
        </picture>
      </NuxtLink>
      <SfButton aria-label="Open categories" class="order-first mr-4 lg:hidden lg:order-1" square variant="tertiary">
        <SfIconMenu />
      </SfButton>
      <nav class="flex flex-1 justify-end lg:order-last lg:ml-4">
        <div class="flex flex-row flex-nowrap">
          <ul class="flex gap-4 items-center">
            <li>
              <Dropdowns-Regions />
            </li>
            <li>
              <NuxtLink class="hover:text-primary-700" to="/">Home</NuxtLink>
            </li>
            <li>
              <NuxtLink class="hover:text-primary-700" to="/about">About</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/products">
                <SfButton class="lg:flex lg:mr-4" type="button" size="sm">
                  <span class="whitespace-nowrap lg:flex">Products</span>
                </SfButton>
              </NuxtLink>
            </li>
          </ul>
          <SfButton v-for="actionItem in actionItems" :key="actionItem.ariaLabel"
            class="mr-2 -ml-0.5 rounded-md text-primary-700 hover:bg-primary-100 hover:text-primary-600 active:bg-primary-200 active:text-primary-700"
            :aria-label="actionItem.ariaLabel" variant="tertiary" square>
            <template #prefix>
              <Component :is="actionItem.icon" />
            </template>
            <span v-if="actionItem.role === 'login'" class="hidden whitespace-nowrap xl:inline-flex">{{ actionItem.label
              }}</span>
          </SfButton>
        </div>
      </nav>
    </div>
  </header>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import {
  SfButton,
  SfIconShoppingCart,
  SfIconFavorite,
  SfIconPerson,
  SfIconExpandMore,
  SfInput,
  SfIconSearch,
  SfIconMenu,
} from "@storefront-ui/vue";

const actionItems = [
  {
    icon: SfIconShoppingCart,
    ariaLabel: "Cart",
    role: "button",
    label: "",
  },
];

const inputValue = ref("");

const search = () => {
  alert(`Successfully found 10 results for ${inputValue.value}`);
};
</script>
