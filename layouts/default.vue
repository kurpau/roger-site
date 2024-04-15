<template>
  <div class="flex flex-col h-screen">
    <NavbarTop />

    <div class="m-auto my-4 max-w-screen-2xl">
      <slot />
    </div>

    <Footer class="mt-auto" />
  </div>
</template>
