<template>
  <main class="wrapper">
    <h1>Past Orders</h1>

    <div v-if="cartHistory.length === 0">
      <p>No past orders yet.</p>
    </div>

    <div v-else>
      <div
        v-for="(order, index) in reversedHistory"
        :key="index"
        class="order"
      >
        <h2>
          Order #{{ reversedHistory.length - index }}
          ({{ new Date(order.date).toLocaleString() }})
        </h2>

        <table class="product-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in order.items" :key="item.id">
              <td>{{ item.name }}</td>
              <td>{{ formatCurrency(item.price) }}</td>
              <td>{{ item.quantity }}</td>
              <td>{{ formatCurrency(item.total) }}</td>
            </tr>
          </tbody>
        </table>

        <p class="order-total">
          <strong>Order Total:</strong> {{ formatCurrency(order.total) }}
        </p>
      </div>
    </div>
  </main>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useCartStore } from '@/stores/cartStore'

const cartStore = useCartStore()
const { cartHistory } = storeToRefs(cartStore)

// ✅ Reverse order so newest appears first
const reversedHistory = computed(() => [...cartHistory.value].reverse())

const formatCurrency = (value) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value)
</script>

<style scoped>
.order {
  margin-bottom: 2rem;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #fafafa;
}

.product-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

.product-table th,
.product-table td {
  border: 1px solid #ddd;
  padding: 0.75rem;
  text-align: center;
}

.product-table th {
  background-color: #f4f4f4;
}

.order-total {
  margin-top: 1rem;
  text-align: right;
  font-size: 1.1rem;
}
</style>
