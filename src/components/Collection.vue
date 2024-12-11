<script setup>
import Product from './Product.vue';
defineProps({
  products: Object,
  cart: Object,
});
const emit = defineEmits(['selected', 'productRemoved', 'updateQuantity', 'addToCart']);
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
        :product="product" 
        :added="cart.items.some(item => item.id === product.id)"
        :quantity="cart.items.find(item => item.id === product.id)?.details.quantity"
        :cart="cart"
        @selected="$emit('selected', $event)"
        @updateQuantity="$emit('updateQuantity', $event)"
        @productRemoved="$emit('productRemoved', $event)"
        @addToCart="$emit('addToCart', $event)"
      />
    </div>
  </div>
</template>