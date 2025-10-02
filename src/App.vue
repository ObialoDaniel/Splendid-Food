<!-- <template>
  <div id="app">
    <header class="top-bar spread">
      <nav class="top-bar-nav">
        <router-link to="/" class="top-bar-link">
          <i class="icofont-spoon-and-fork"></i>
          <span>Home</span>
        </router-link>
        <router-link to="/products" class="top-bar-link">
          <span>Products</span>
        </router-link>
        <router-link to="/past-orders" class="top-bar-link">
          <span>Past Orders</span>
        </router-link>
      </nav>
        <div @click="toggleSidebar" class="top-bar-cart-link">
        <i class="icofont-cart-alt icofont-1x"></i>
        <span>Cart ({{totalQuantity}})</span>
      </div>
    </header>
    <router-view
      :inventory="inventory"
      :add-to-cart="addToCart"
      :total-quantity="totalQuantity"
      @toggle-sidebar="toggleSidebar"
    />

    <AppSidebar
    :isOpen="showSidebar"
    :toggle="toggleSidebar"
    :cart="cart"
    :inventory="inventory"
    :remove="removeItem"
    :calculateTotal="calculateTotal"
    :getPrice="getPrice"
    :total-quantity="totalQuantity"
   />

  </div>
</template>

<script>
import AppSidebar from './components/Sidebar.vue'
import food from './food.json'

export default {
  components: {
    AppSidebar
  },
  data () {
    return {
      showSidebar: false,
      inventory: food,
      cart: {}
    }
  },
  computed: {
    totalQuantity () {
      return Object.values(this.cart).reduce((acc, curr) => {
        return acc + curr
      }, 0)
    }
  },
  methods: {
    addToCart (name, quantity) {
      if (!this.cart[name]) this.cart[name] = 0
      this.cart[name] += quantity
    },
    toggleSidebar () {
      this.showSidebar = !this.showSidebar
    },
    removeItem (name) {
      delete this.cart[name]
    },
    calculateTotal () {
      return Object.entries(this.cart).reduce((acc, [key, quantity]) => {
        const product = this.inventory.find(p => p.name === key)
        const price = product ? product.price.USD : 0
        return acc + price * quantity
      }, 0).toFixed(2)
    },
    getPrice (name) {
      const product = this.inventory.find(p => p.name === name)
      return product ? product.price.USD : 0
    }
  }
}
</script> -->

<template>
  <div id="app">
    <!-- Navigation -->
    <nav class="top-nav">
      <div class="nav-container">
        <router-link to="/" class="nav-brand">Splendid Food</router-link>

        <div class="nav-links">
          <router-link to="/" class="nav-link">Home</router-link>
          <router-link to="/products" class="nav-link">Products</router-link>
          <router-link to="/past-orders" class="nav-link">Past Orders</router-link>

          <!-- Cart toggle button -->
          <button @click="toggleSidebar" class="cart-button">
            <i class="icofont-cart-alt"></i>
            Cart ({{ totalQuantity }})
          </button>
        </div>
      </div>
    </nav>

    <!-- Main content -->
    <router-view />

    <!-- Sidebar component - no props needed! -->
    <Sidebar />
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'
import { useCartStore } from '@/stores/cartStore'
import { storeToRefs } from 'pinia'

export default {
  name: 'App',
  components: {
    Sidebar
  },
  setup () {
    const cartStore = useCartStore()
    const { totalQuantity } = storeToRefs(cartStore)
    const { toggleSidebar } = cartStore

    return {
      totalQuantity,
      toggleSidebar
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.top-nav {
  background-color: var(--topNavBackground);
  color: white;
  padding: 1rem 0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
}

.nav-brand {
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-link {
  color: white;
  text-decoration: none;
  transition: opacity 0.2s ease;
}

.nav-link:hover {
  opacity: 0.8;
}

.nav-link.router-link-active {
  font-weight: bold;
  opacity: 1;
}

.cart-button {
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.cart-button:hover {
  background: rgba(255, 255, 255, 0.3);
}

@media (max-width: 768px) {
  .nav-container {
    flex-direction: column;
    gap: 1rem;
  }

  .nav-links {
    gap: 1rem;
  }
}
</style>
