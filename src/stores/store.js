import { defineStore } from 'pinia'
import productsData from '../assets/products.json';

export const useStore = defineStore('storeId', {
  state: () => {
    return {
      products: productsData.products,
      cart: [],
      productSelected: productsData.products[0],
    }
  },
  getters: {
    totalPrice: (state) => {
      return state.cart.reduce((acc, item) => acc + item.details.price * item.details.quantity, 0);
    },
  },
  actions: {
    findProduct(object, id) {
      const product = object.find(item => item.id === id);
      if (product) {
        return product;
      }
    },
    addToCart (id) {
      const item = this.findProduct(this.cart, id);
      if (item) {
        return;
      } else {
        const product_added = {
          id: id,
          details: {
            ...this.findProduct(this.products, id), 
            quantity: 1
          }
        }
        this.cart.push(product_added);
      }
    },
    updateQuantity(id, value) {
      let new_quantity = 0;
      const product_added = this.findProduct(this.cart, id);
      const max = product_added.details.stock
      if (value > max) {
        new_quantity = max;
      } else if (value < 1) {
        new_quantity = 1;
      } else {
        new_quantity = value;
      }
      product_added.details.quantity = new_quantity
      return new_quantity
    },
    useCounter(id) {
      const productDetails = this.findProduct(this.cart, id).details;
      const oldQuantity = productDetails.quantity;
      const increment = () => {
        if (!oldQuantity|| oldQuantity === productDetails.stock) return;
        this.updateQuantity(id, oldQuantity + 1);
      }
      const decrement = () => {
        if (!oldQuantity || oldQuantity === 1) {
          this.removeFromCart(id);
          return;
        }
        this.updateQuantity(id, oldQuantity - 1);
      }
      return { increment, decrement };
    },
    removeFromCart(id) {
      this.cart = this.cart.filter(item => item?.id !== id);
    },
    clearCart() {
      this.cart = [];
    },
    updateSelectedProduct(product) {
      this.productSelected = product;
    }
  },
})