<script setup>
  import { useStore } from '@/stores/store'
  import { toRefs } from 'vue';
  const product = toRefs(useStore()).productSelected
</script>

<template>
  <div class="col1 w-1/2 flex justify-center items-center">
    <img width="400px" height="400px" :src="product.images" alt="">
  </div>
  
  <div class="col2 w-1/2">
    <div class="title text-2xl font-semibold">{{product.title}}</div>
    <div class="category mb-2.5 text-xs">{{product.category}}</div>
    <div class="price mb-2.5 text-lg flex gap-2">
      PRICE: 
      <div class="font-bold">$ {{product.price}}</div>
    </div>
    <div class="description mb-1.5">{{product.description}}</div>
    <a href="#" class="text-sky-500">Read More</a>
  </div>
</template>

<style scoped>
  a {
    padding: 0 !important;
    cursor: pointer;
  }
</style>