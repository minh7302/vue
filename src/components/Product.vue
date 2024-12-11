<script setup>
  const props = defineProps({
    product: Object,
    added: Boolean,
    quantity: Number,
    selected: Function,
    cart: Object
  });
  
  function addToCart (id) {
    const itemIndex = props.cart.items.findIndex(item => item.id === id);
    
    if (itemIndex !== -1) {
      props.cart.items[itemIndex].details.quantity += 1;
    } else {
      props.cart.items.push({
        id: id,
        details: {
          ...props.product, 
          quantity: 1, 
          added: true
        }
      });
    }
  }

  function useCounter (id) {
    const itemIndex = props.cart.items.findIndex(item => item.id === id);
    const checkQuantity = props.cart.items[itemIndex].details.quantity
    const increment = () => {
      if (!checkQuantity|| checkQuantity === props.cart.items[itemIndex].details.stock) return;
      props.cart.items[itemIndex].details.quantity++;
    }
    const decrement = () => {
      if (!checkQuantity || checkQuantity === 1) {
        props.cart.items = props.cart.items.filter(item => item.id !== id);
        return;
      }
      props.cart.items[itemIndex].details.quantity--;
    }
    return { increment, decrement };
  }

  function updateQuanttity(id, event) {
    const value = Number(event.target.value);
    let temp = 0;
    if (value > props.product.stock) {
      temp = props.product.stock;
    } else if (value < 1) {
      temp = 1;
    } else {
      temp = value;
    }
    props.cart.items.find(item => item.id === id).details.quantity = temp;
    event.target.value = temp;
  }
</script>

<template>

  <div class="col2 w-1/2">
    <div class="title font-bold">{{product.title}}</div>
    <div class="price font-semibold text-sm">{{product.price}}</div>
    <a @click="selected(product.id)" href="#" class="text-sky-500 font-semibold text-xs">Show Details</a>
  </div>
  <div class="col1 w-1/2 flex flex-col items-center gap-2">
    <img width="100%" height="auto" :src="product.images" :alt="product.title" />

    <div class="w-full">
      <button 
        :class="!added ? '' : 'hidden'"
        @click="addToCart(product.id)" 
        class="add-to-cart w-full bg-white text-center p-2 shadow-md text-green-700 font-semibold text-sm"
      >
        ADD
      </button>

      <div 
        :class="added ? '' : 'hidden'"
        class="quantity flex gap-2 w-full"
      >
        <button @click="useCounter(product.id).decrement" class="bg-white w-3/12 h-10 font-bold shadow-md">-</button>
        <input 
          class="h-10 w-6/12 text-center text-sm font-semibold shadow-xl" 
          type="number" step="1" 
          name="quantity" 
          min="1"
          :max="product.stock"
          :value="quantity"
          @keyup.enter="updateQuanttity(product.id, $event)"
        >
        <button @click="useCounter(product.id).increment" class="bg-white w-3/12 h-10 font-bold text-green-700 shadow-md">+</button>
      </div>
    </div>
  </div>
  
</template>

<style scoped>
  a {
    padding: 0 !important;
    cursor: pointer;
  }
  
  input[type="number"]::-webkit-inner-spin-button, 
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input:focus {
  outline: none;
  border: none;
}
</style>