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
      let sum = 0;
      state.cart.forEach(item => sum += item?.details?.price * item?.details?.quantity);
      return sum;
    },
  },
  actions: {
    addToCart (id) {
      const itemIndex = this.cart.findIndex(item => item.id === id);
      if (itemIndex !== -1) {
        return;
      } else {
        const product_added = {
          id: id,
          details: {
            ...this.products.find(product => product.id === id), 
            quantity: 1
          }
        }
        this.cart.push(product_added);
      }
    },
    updateQuantity(id, value) {
      let new_quantity = 0;
      const product_added = this.cart.find(item => item.id === id);
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
      const itemIndex = this.cart.findIndex(item => item.id === id);
      const oldQuantity = this.cart[itemIndex].details.quantity;
      const increment = () => {
        if (!oldQuantity|| oldQuantity === this.cart[itemIndex].details.stock) return;
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