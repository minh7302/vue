<script setup>
  import { reactive, ref } from 'vue';
  import productsData from './assets/products.json';
  import Cart from './components/Cart.vue';
  import List_product from './components/List_product.vue';
  import Product_selected from './components/Product_selected.vue';

  const products = productsData.products;

  const product_seclected = reactive({
    product: products[0]
  })

  const cart = reactive({
    items: [],
    total_price: 0
  });

  function selected(id) {
    product_seclected.product = products.find(product => product.id === id);
  }


  function addToCart(id) {
    const itemIndex = cart.items.findIndex(item => item.id === id);
    
    if (itemIndex !== -1) {
      cart.items[itemIndex].details.quantity += 1;
    } else {
      cart.items.push({
        id: id,
        details: {...products.find(product => product.id === id), quantity: 1, added: true}
      });
    }
    cart.total_price += products.find(product => product.id === id).price;
  }

  function useCounter(id) {
    const itemIndex = cart.items.findIndex(item => item.id === id);
    const increment = () => {
      if (!cart.items[itemIndex].details.quantity || cart.items[itemIndex].details.quantity === cart.items[itemIndex].details.stock) return;
      cart.items[itemIndex].details.quantity++;
      cart.total_price += products.find(product => product.id === id).price;
    }
    const decrement = () => {
      if (!cart.items[itemIndex].details.quantity || cart.items[itemIndex].details.quantity === 1) {
        removeFromCart(id);
        return;
      }
      cart.items[itemIndex].details.quantity--;
      cart.total_price -= products.find(product => product.id === id).price;
    }
    return { increment, decrement };
  }

  
  const added = ref(false);

  function clearCart() {
    cart.items = [];
    cart.total_price = 0;
    added.value = !added.value;
  }

  function updateQuanttity(id, event) {
    const value = Number(event.target.value);
    let temp = 0;
    if (value > products.find(product => product.id === id).stock) {
      temp = products.find(product => product.id === id).stock;
    } else if (value < 1) {
      temp = 1;
    } else {
      temp = value;
    }
    cart.items.find(item => item.id === id).details.quantity = temp;
    event.target.value = temp;
    cart.total_price = sum_price();
  }


  function sum_price() {
    let sum = 0
    cart.items.forEach(item => sum += item.details.price * item.details.quantity);
    return sum;
  }

  function removeFromCart(id) {
    cart.items = cart.items.filter(item => item.id !== id);
    cart.total_price = sum_price();
  }

</script>

<template>
  
  <div class="bg-gray-50 p-2.5">
    <div class="row1 flex justify-between mb-10">
      <Product_selected :product="product_seclected.product"/>
    </div>

    <div class="row2 flex w-full p-10">
      <List_product
        :products="products"
        :useCounter="useCounter"
        :addToCart="addToCart" 
        :updateQuanttity="updateQuanttity"
        :cart="cart"
        :selected="selected"
      />

      <Cart
        :cart="cart"
        :product_count="products.length"
        :sum_price="sum_price"
        :removeFromCart="removeFromCart"
        :clearCart="clearCart"
      />

    </div>
  </div>
</template>

<style scoped>
  
</style>