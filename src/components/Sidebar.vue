<template>
  <aside class="cart-container" :class="{ show: isOpen }">
    <div class="cart">
      <h1 class="cart-title spread">
        <span>
          Cart
          <i class="icofont-cart-alt icofont-1x"></i>
        </span>
        <button @click="closeCart" class="cart-close">&times;</button>
      </h1>

      <div class="cart-body">
        <table class="cart-table" v-if="cartItemsArray.length">
          <thead>
            <tr>
              <th><span class="sr-only">Product Image</span></th>
              <th>Product</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Total</th>
              <th><span class="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in cartItemsArray" :key="item.name">
              <td><i class="icofont-carrot icofont-3x"></i></td>
              <td>{{ item.name }}</td>
              <td>${{ item.price.toFixed(2) }}</td>
              <td class="center">{{ item.quantity }}</td>
              <td>${{ item.total.toFixed(2) }}</td>
              <td class="center">
                <button @click="removeFromCart(item.name)" class="btn btn-light cart-remove">&times;</button>
              </td>
            </tr>
          </tbody>
        </table>

        <p class="center" v-else><em>No items in cart</em></p>

        <div class="spread" v-if="cartItemsArray.length">
          <span><strong>Total:</strong> ${{ cartTotal.toFixed(2) }}</span>
          <button class="btn btn-light" @click="handleCheckout">Checkout</button>
        </div>
      </div>
    </div>
  </aside>
</template>

<script>
import { useCartStore } from '@/stores/cartStore'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

export default {
  name: 'AppSidebar',
  setup () {
    const cartStore = useCartStore()
    const { isOpen, cartItemsArray, cartTotal } = storeToRefs(cartStore)
    const { removeFromCart, toggleSidebar, checkout } = cartStore
    const router = useRouter()

    const closeCart = () => {
      toggleSidebar()
    }

    const handleCheckout = () => {
      checkout() // ✅ save order to history
      closeCart() // ✅ close sidebar
      router.push({ name: 'pastorders' }) // ✅ go to PastOrders page
    }

    return {
      isOpen,
      cartItemsArray,
      cartTotal,
      removeFromCart,
      closeCart,
      handleCheckout
    }
  }
}
</script>

<style scoped>
.cart-container {
  position: fixed;
  top: 0;
  right: -400px; /* start hidden */
  width: 400px;
  height: 100%;
  background: #fff;
  box-shadow: -2px 0 6px rgba(0,0,0,0.2);
  transition: right 0.3s ease;
  z-index: 999;
}

.cart-container.show {
  right: 0; /* slide in */
}
</style>
