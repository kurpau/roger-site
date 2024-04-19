import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    cart: {
      items: [],
    },
  }),

  getters: {
    items: (state) => state.cart.items,
    cartCurrencyCode: (state) => state.cart.region?.currency_code ?? "EUR",
  },

  actions: {
    async createCart() {
      const client = useMedusaClient();
      const { cart } = await client.carts.create();
      this.setCart(cart);
    },

    setCart(cart) {
      this.cart = cart;
      localStorage.setItem("cart_id", cart.id);
    },

    async updateCart(payload) {
      const client = useMedusaClient();
      let cartId = this.cart.id;

      if (!cartId) {
        await this.createCart();
        cartId = this.cart.id;
      }
      const { cart } = await client.carts.update(cartId, payload);
      this.setCart(cart);
    },

    async addItem(item) {
      const client = useMedusaClient();
      let cartId = this.cart.id;

      if (!cartId) {
        await this.createCart();
        cartId = this.cart.id;
      }

      const { cart } = await client.carts.lineItems.create(cartId, item);
      this.setCart(cart);
    },

    async removeItem(itemId) {
      const client = useMedusaClient();
      const cartId = this.cart.id;
      const { cart } = await client.carts.lineItems.delete(cartId, itemId);
      this.setCart(cart);
    },

    async updateQuantity(item) {
      const client = useMedusaClient();
      const cartId = this.cart.id;
      const { cart } = await client.carts.lineItems.update(cartId, item.id, {
        quantity: item.quantity,
      });
      this.setCart(cart);
    },
  },
});
