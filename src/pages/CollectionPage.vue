<script setup>
import Cart from '../components/Cart.vue';
import Collection from '../components/Collection.vue';
import ProductSelected from '../components/ProductSelected.vue';

</script>

<template>
  <div class="bg-gray-50 p-2.5">
    <div class="row1 flex justify-between mb-10">
      <ProductSelected/>
    </div>

    <div class="row2 flex w-full p-10">
      <Collection/>

      <Cart/>
    </div>

  </div>
</template>

<style scoped>
  
</style>