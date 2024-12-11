<script setup>
  import { computed, reactive, ref, watchEffect } from 'vue';
  import productsData from '../assets/products.json';
  import Cart from '../components/Cart.vue';
  import Collection from '../components/Collection.vue';
  import ProductSelected from '../components/ProductSelected.vue';

  const products = productsData.products;

  const product_selected = ref(products[0]);

  const cart = reactive({
    items: []
  });

  const totalPrice = computed(() => {
    let sum = 0
    cart.items.forEach(item => sum += item.details.price * item.details.quantity);
    return sum;
  })

  function removeFromCart(event) {
    cart.items = cart.items.filter(item => item.id !== event);
  }

</script>

<template>
  
  <div class="bg-gray-50 p-2.5">
    <div class="row1 flex justify-between mb-10">
      <ProductSelected :product="product_selected"/>
    </div>

    <div class="row2 flex w-full p-10">
      <Collection
        :products="products"
        :cart="cart"
        @selected="product_selected = products.find(product => product.id === $event)"
        @updateQuantity="cart.items.find(item => item.id === $event.id).details.quantity = $event.new_quantity"
        @productRemoved="removeFromCart(($event))"
        @addToCart="cart.items.push($event)"
      />

      <Cart
        :cart="cart"
        :product_count="products.length"
        :totalPrice="totalPrice"
        @clearCart="cart.items = []"
        @productRemoved="removeFromCart(($event))"
      />
    </div>
  </div>
</template>

<style scoped>
  
</style>