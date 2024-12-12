<script setup>
import Product from './Product.vue';
import { useStore } from '@/stores/store'
import { toRefs } from 'vue';

const products = toRefs(useStore()).products
const cart = toRefs(useStore()).cart
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
        :added="cart.some(item => item.id === product.id)"
        :quantity="cart.find(item => item.id === product.id)?.details?.quantity"
      />
    </div>
  </div>
</template>