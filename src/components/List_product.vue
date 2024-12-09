<script setup>
import Product from './Product.vue';
defineProps({
  products: Object,
  addToCart: Function,
  useCounter: Function,
  updateQuanttity: Function,
  cart: Object,
  selected: Function,
});
</script>

<template>
  <div class="products grid grid-cols-2 w-7/12 gap-x-10">
    <div v-for="(product, index) in products" :key="product.id"
      :id="'product-' + product.id"
      :class="[
        'item flex justify-between border-t-2 py-5',
        index >= products.length - 2 ? 'border-b-2' : ''
      ]"
    >
      <Product 
        :counter="useCounter" 
        :product="product" 
        :add="addToCart" 
        :updateQuanttity="updateQuanttity"
        :added="cart.items.some(item => item.id === product.id)"
        :quantity="cart.items.find(item => item.id === product.id)?.details.quantity"
        :selected="selected"
      />
    </div>
  </div>
</template>