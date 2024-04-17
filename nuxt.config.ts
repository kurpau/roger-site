// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  routeRules: {
    // prerender index route by default
    "/": { prerender: true },
  },
  modules: ["@nuxtjs/tailwindcss", "nuxt-medusa", "@nuxt/image", "@pinia/nuxt"],
  image: {
    domains: ["medusa-public-images.s3.eu-west-1.amazonaws.com"],
  },
  app: {
    head: {
      title: "Fansr",
      meta: [{ name: "description", content: "Preped meals to your door" }],
    },
  },
});