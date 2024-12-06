<script setup>
import Product from './Product.vue';
defineProps({
  products: Object,
  addToCart: Function,
  useCounter: Function,
  updateQuanttity: Function,
  cart: Object,
});
</script>

<template>
  <div class="products grid grid-cols-2 w-7/12 gap-x-10 gap-y-5">
    <div v-for="product in products" :key="product.id"
      :id="'product-' + product.id"
      class="item flex justify-between"
    >
      <Product 
        :counter="useCounter" 
        :product="product" 
        :add="addToCart" 
        :updateQuanttity="updateQuanttity"
        :added="cart.items.some(item => item.id === product.id)"
        :quantity="cart.items.find(item => item.id === product.id)?.details.quantity"
      />
    </div>
  </div>
</template>