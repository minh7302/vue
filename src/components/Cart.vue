<script setup>
  import Item_added from './Item_added.vue';
  defineProps({
    cart: Object,
    product_count: Number,
    sum_price: Function,
    removeFromCart: Function,
    clearCart: Function
  });
</script>

<template>
  <div class="cart w-5/12 px-10 flex flex-col justify-between">
    <div class="h-5/6 flex flex-col gap-5">
      <div class="cart-info flex justify-between">
        <div class="count flex">
          <div class="num-item">
            {{cart.items.length}}
          </div>
          /{{ product_count }} Added
        </div>

        <a @click="clearCart()" class="rs-btn">
          Reset
        </a>
      </div>

      <div class="cart-content h-fit grid grid-cols-3 gap-y-5">
        <div 
          v-for="item in cart.items"
          :key="item"
          class="cart-item flex justify-between h-fit"
        >
          <Item_added 
            :removeFromCart="removeFromCart"
            :item="item"
          />
        </div>
      </div>
    </div>

    <div 
      class="total_price h-1/6 text-center"
      :class="cart.items.length == 0 ? 'hidden' : ''"
    >
        Total: {{cart.total_price}}
    </div>
  </div>
</template>