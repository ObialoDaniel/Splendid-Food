<template>
  <main class="wrapper">
    <h1>Products</h1>
    <div class="card-container" v-if="inventory">
      <ProductCard
      v-for="(product, index) in inventory.slice(0, 6)"
      :key="product.id"
      :index="index"
      :product="product"
      :add-to-cart="addToCart"
      :update-quantity="updateQuantity"
      :quantity="cartItems[product.name] || 0"
    />
    </div>
    <p v-else>No products available.</p>
  </main>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useProductStore } from '@/stores/productStore'
import { useCartStore } from '@/stores/cartStore'
import ProductCard from '@/components/ProductCard.vue'

// Product store
const productStore = useProductStore()
const { inventory } = storeToRefs(productStore)

// Cart store
const cartStore = useCartStore()
const { cartItems } = storeToRefs(cartStore) // reactive
const { addToCart, updateQuantity } = cartStore // methods
</script>
