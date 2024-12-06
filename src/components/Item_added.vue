<script setup>
  defineProps({
    removeFromCart: Function,
    item: Object,
  });
  
</script>

<template>
  <div class="img relative">
    <img class="object-contain" width="100px" height="100px" :src="item.details.images" alt="product image" />
    <button 
      class="absolute top-0 right-0 z-10 bg-black text-white h-5 w-5 flex justify-center items-center"
      @click="removeFromCart(item.id)"
    >
      x
    </button>
  </div>
</template>