<script setup>
  import { computed, reactive, ref } from 'vue';
  import productsData from '../assets/products.json';
  import Cart from '../components/Cart.vue';
  import Collection from '../components/Collection.vue';
  import ProductSelected from '../components/ProductSelected.vue';

  const products = productsData.products;

  const product_seclected = reactive({
    product: products[0]
  })

  const cart = reactive({
    items: []
  });

  const totalPrice = computed(() => {
    let sum = 0
    cart.items.forEach(item => sum += item.details.price * item.details.quantity);
    return sum;
  })

  function selected(id) {
    product_seclected.product = products.find(product => product.id === id);
  }

  // watchEffect(() => {
  //   const selectedProduct = products.find(product => product?.selected === true);

  //   if (selectedProduct) {
  //     product_selected.value = selectedProduct;
  //   }

  //   products.forEach(product => {
  //     product['selected'] = false;
  //   });
  // });

</script>

<template>
  
  <div class="bg-gray-50 p-2.5">
    <div class="row1 flex justify-between mb-10">
      <ProductSelected :product="product_seclected.product"/>
    </div>

    <div class="row2 flex w-full p-10">
      <Collection
        :products="products"
        :cart="cart"
        :selected="selected"
      />

      <Cart
        :cart="cart"
        :product_count="products.length"
        :totalPrice="totalPrice"
      />
    </div>
  </div>
</template>

<style scoped>
  
</style>