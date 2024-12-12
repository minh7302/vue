<script setup>
  import ItemAdded from './ItemAdded.vue';
  import { useStore } from '@/stores/store'
  import { storeToRefs } from 'pinia';

  const store = useStore()
  const {cart, totalPrice} = storeToRefs(store)
  const product_count = store.products.length

  function clearCart() {
    store.clearCart()
  }

</script>

<template>
  <div class="cart w-5/12 flex flex-col justify-between ml-10">
    <div class="h-5/6 flex flex-col gap-5">
      <div class="cart-info flex justify-between">
        <div class="count flex">
          <div class="num-item">
            {{cart.length}}
          </div>
          /{{ product_count }} Added
        </div>

        <a @click="clearCart()" class="rs-btn">
          Reset
        </a>
      </div>

      <div class="cart-content h-fit flex flex-wrap gap-5 justify-center">
        <div 
          v-for="item in cart"
          :key="item"
          class="cart-item flex justify-between h-fit w-1/4"
        >
          <ItemAdded 
            :item="item"
          />
        </div>
      </div>
    </div>

    <div 
      class="totalPrice h-1/6 text-center"
      :class="cart.length == 0 ? 'hidden' : ''"
    >
        Total: {{totalPrice}}
    </div>
  </div>
</template>