<script setup>
import { computed } from 'vue'
import { useCartStore } from '@/stores/cartStore'
import { useProductStore } from '@/stores/productStore'
import { storeToRefs } from 'pinia'

const props = defineProps({
  product: { type: Object, required: true },
  index: { type: Number, default: 0 }
})

const cartStore = useCartStore()
const productStore = useProductStore()
const { currency } = storeToRefs(productStore)

// 🔹 Quantity is now reactive from the cart store
const quantity = computed(() => cartStore.cartItems[props.product.name] || 0)

const updateQuantity = (newQuantity) => {
  cartStore.updateQuantity(props.product, newQuantity)
}

const handleAddToCart = () => {
  const newQuantity = quantity.value + 1
  cartStore.updateQuantity(props.product, newQuantity)
  cartStore.openSidebar()
}
</script>
gg
<template>
  <div class="card">
    <div class="card-title">
      {{ product.name }}
    </div>
    <div class="card-body">
      <i class="icofont-10x icofont-{{ product.icon }}"></i>
      <form @submit.prevent>
        <div class="row">
          <div class="cell">
            <label>Type:</label>
          </div>
          <div class="cell">
            <em>{{ product.type }}</em>
          </div>
        </div>
        <div class="row">
          <div class="cell">
            <label>Price:</label>
          </div>
          <div class="cell">
            ${{ product.price[currency] }}
          </div>
        </div>
        <div class="row">
          <div class="cell">
            <label>Quantity:</label>
          </div>
          <div class="cell">
            <!-- quantity comes directly from store -->
            <input
              type="number"
              :value="quantity"
              min="0"
              @input="updateQuantity(+$event.target.value)"
            >
          </div>
        </div>
      </form>
    </div>
    <div class="card-footer">
      <button @click="handleAddToCart" class="btn btn-light">
        Add to cart
      </button>
    </div>
  </div>
</template>
