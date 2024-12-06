<script setup>
  import { reactive, ref } from 'vue';
  import productsData from './assets/products.json';
  import Product from './components/Product.vue';

  const products = productsData.products;

  const cart = reactive({
    items: [],
    total_price: 0
  });


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
      if (!cart.items[itemIndex].details.quantity || cart.items[itemIndex].details.quantity === 1) return;
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
    <div class="row1 flex justify-between mb-2.5">
      <div class="col1 w-1/2 flex justify-center items-center">
        <img width="400px" height="400px" src="./assets/img/img.jpg" alt="">
      </div>
      <div class="col2 w-1/2">
        <div class="title text-2xl">Make your own style</div>
        <div class="category mb-2.5 text-xs">Catagories</div>
        <div class="price mb-2.5 text-lg">PRICE: $350</div>
        <div class="description mb-1.5">Get inspired by the latest fashion trends.</div>
        <a href="#">Read More</a>
      </div>
    </div>

    <div class="row2 flex w-full">
      <div class="products grid grid-cols-2 w-7/12 gap-x-10 gap-y-5">
        <div v-for="product in products" :key="product.id"
          :id="'product-' + product.id"
          class="item flex justify-between"
        >
          <Product 
            :counter="useCounter" 
            :product="product" 
            :add="addToCart" 
            :updateQuanttity="updateQuanttity"
            :added="cart.items.some(item => item.id === product.id)"
            :quantity="cart.items.find(item => item.id === product.id)?.details.quantity"
          />
        </div>
      </div>

      <div class="cart w-5/12 px-10 flex flex-col justify-between">
        <div class="h-5/6 flex flex-col gap-5">
          <div class="cart-info flex justify-between">
            <div class="count flex">
              <div class="num-item">
                {{cart.items.length}}
              </div>
              /{{ products.length }} Added
            </div>

            <a @click="clearCart()" class="rs-btn">
              Reset
            </a>
          </div>

          <div class="cart-content h-fit grid grid-cols-3 gap-y-5">
            <div 
              v-for="(item,index) in cart.items"
              :key="item" 
              class="cart-item flex justify-between h-fit"
            >
              <div class="img relative">
                <img class="object-contain" width="100px" height="100px" :src="cart.items[index].details.images" alt="product image" />
                <button 
                  class="absolute top-0 right-0 z-10 bg-black text-white h-5 w-5 flex justify-center items-center"
                  @click="removeFromCart(item.id)"
                >
                  x
                </button>
              </div>
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
    </div>
  </div>
</template>

<style scoped>
  a {
    padding: 0 !important;
    cursor: pointer;
  }
  .cart-content img {
    height: 100px;
  }
</style>