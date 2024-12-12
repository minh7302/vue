<script setup>
  import ItemAdded from './ItemAdded.vue';
  import { useStore } from '@/stores/store'
  import { toRefs } from 'vue';

  const cart = toRefs(useStore()).cart
  const product_count = useStore().products.length
  const totalPrice = toRefs(useStore()).totalPrice
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

        <a @click="useStore().clearCart()" class="rs-btn">
          Reset
        </a>
      </div>

      <div class="cart-content h-fit grid grid-cols-3 gap-y-5">
        <div 
          v-for="item in cart"
          :key="item"
          class="cart-item flex justify-between h-fit"
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