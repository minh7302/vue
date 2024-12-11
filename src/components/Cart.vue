<script setup>
  import ItemAdded from './ItemAdded.vue';
  const props = defineProps({
    cart: Object,
    product_count: Number,
    totalPrice: Number
  });

  function clearCart() {
    props.cart.items = [];
  }

  function removeFromCart(id) {
    props.cart.items = props.cart.items.filter(item => item.id !== id);
  }
</script>

<template>
  <div class="cart w-5/12 flex flex-col justify-between ml-10">
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
          <ItemAdded 
            :removeFromCart="removeFromCart"
            :item="item"
          />
        </div>
      </div>
    </div>

    <div 
      class="totalPrice h-1/6 text-center"
      :class="cart.items.length == 0 ? 'hidden' : ''"
    >
        Total: {{totalPrice}}
    </div>
  </div>
</template>