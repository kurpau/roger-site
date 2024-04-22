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
    async initializeCart() {
      const existingCartId = localStorage.getItem("cart_id");

      if (existingCartId) {
        const client = useMedusaClient();
        try {
          const { cart } = await client.carts.retrieve(existingCartId);
          if (!cart.completed_at) {
            this.setCart(cart);
          }
        } catch (e) {
          localStorage.removeItem("cart_id");
          this.createCart();  // Create a new cart if there's an error retrieving the old one
        }
      } else {
        this.createCart();  // No existing cart found, create a new one
      }
    },

    async createCart() {
      const client = useMedusaClient();
      try {
        const { cart } = await client.carts.create(); // No need to pass region_id or country_code as not used previously
        this.setCart(cart);
      } catch (error) {
        console.error("Failed to create cart:", error);
      }
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

