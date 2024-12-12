<script setup>
  import { useStore } from '@/stores/store'

  defineProps({
    item: Object,
  });

  const store = useStore()
  function removeProduct(id) {
    store.removeFromCart(id)
  }
</script>

<template>
  <div class="img relative">
    <img class="object-contain h-28 w-28" :src="item.details.images" alt="product image" />
    <button 
      class="absolute top-0 right-0 z-10 bg-black text-white h-5 w-5 flex justify-center items-center"
      @click="removeProduct(item.id)"
    >
      x
    </button>
  </div>
</template>
