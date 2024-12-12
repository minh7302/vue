<script setup>
  import { useStore } from '@/stores/store'

  const props = defineProps({
    product: Object,
    added: Boolean,
    quantity: Number
  });
  const store = useStore()

  function getNewQuantity(id, event) {
    const new_value = Number(event.target.value)
    const new_quantity = store.updateQuantity(id, new_value);
    document.querySelector(`#product-${id} input`).value = new_quantity
  }

  function getProduct(product) {
    store.updateSelectedProduct(product);
  }

  function addProductToCart(id) {
    store.addToCart(id);
  }

  function increment(id) {
    store.useCounter(id).increment();
  }

  function decrement(id) {
    store.useCounter(id).decrement();
  }
</script>

<template>
  <div class="col2 w-1/2">
    <div class="title font-bold">{{product.title}}</div>
    <div class="price font-semibold text-sm">{{product.price}}</div>
    <a @click="getProduct(product)" href="#" class="text-sky-500 font-semibold text-xs">Show Details</a>
  </div>
  <div class="col1 w-1/2 flex flex-col items-center gap-2">
    <img class="object-contain w-full h-full" :src="product.images" :alt="product.title" />

    <div class="w-full">
      <button 
        :class="!added ? '' : 'hidden'"
        @click="addProductToCart(product.id)"
        class="add-to-cart w-full bg-white text-center p-2 shadow-md text-green-700 font-semibold text-sm"
      >
        ADD
      </button>

      <div 
        :class="added ? '' : 'hidden'"
        class="quantity flex gap-2 w-full"
      >
        <button @click="decrement(product.id)" class="bg-white w-3/12 h-10 font-bold shadow-md">-</button>
        <input 
          class="h-10 w-6/12 text-center text-sm 
                font-semibold shadow-xl [appearance:textfield] 
                [&::-webkit-outer-spin-button]:appearance-none 
                [&::-webkit-inner-spin-button]:appearance-none
                focus:outline-none focus:border-none" 
          type="number" step="1" 
          name="quantity" 
          min="1"
          :max="product.stock"
          :value="quantity"
          @keyup.enter="getNewQuantity(product.id, $event)"
        >
        <button @click="increment(product.id)" class="bg-white w-3/12 h-10 font-bold text-green-700 shadow-md">+</button>
      </div>
    </div>
  </div>
  
</template>