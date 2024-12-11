<script setup>
  const props = defineProps({
    product: Object,
    added: Boolean,
    quantity: Number,
    cart: Object
  });

  const emit = defineEmits(['selected','addToCart','productRemoved', 'updateQuantity']);
  
  function addToCart (id) {
    const itemIndex = props.cart.items.findIndex(item => item.id === id);
    
    if (itemIndex !== -1) {
      new_quantity = props.cart.items[itemIndex].details.quantity + 1;
      updateQuantity(id, new_quantity);
    } else {
      const product_added = {
        id: id,
        details: {
          ...props.product, 
          quantity: 1, 
          added: true
        }
      }
      emit('addToCart', product_added);
    }
  }

  function useCounter (id) {
    const itemIndex = props.cart.items.findIndex(item => item.id === id);
    const oldQuantity = props.cart.items[itemIndex].details.quantity;
    const increment = () => {
      if (!oldQuantity|| oldQuantity === props.cart.items[itemIndex].details.stock) return;
      updateQuantity(id, oldQuantity + 1);
    }
    const decrement = () => {
      if (!oldQuantity || oldQuantity === 1) {
        emit('productRemoved', id);
        return;
      }
      updateQuantity(id, oldQuantity - 1);
    }
    return { increment, decrement };
  }

  function updateQuantity(id, value) {
    let new_quantity = 0;
    if (value > props.product.stock) {
      new_quantity = props.product.stock;
    } else if (value < 1) {
      new_quantity = 1;
    } else {
      new_quantity = value;
    }
    emit('updateQuantity', {id, new_quantity});
    document.querySelector('#product-' + id + ' input').value = new_quantity;
  }
</script>

<template>

  <div class="col2 w-1/2">
    <div class="title font-bold">{{product.title}}</div>
    <div class="price font-semibold text-sm">{{product.price}}</div>
    <a @click="$emit('selected', product.id)" href="#" class="text-sky-500 font-semibold text-xs">Show Details</a>
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
          @keyup.enter="updateQuantity(product.id, Number($event.target.value))"
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