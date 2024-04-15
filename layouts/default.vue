<template>
  <div class="flex flex-col h-screen">
    <NavbarTop />

    <div>
      <slot />
    </div>

    <Footer class="mt-auto" />
  </div>
</template>
