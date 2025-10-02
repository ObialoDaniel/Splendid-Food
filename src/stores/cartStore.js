import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useProductStore } from './productStore'

export const useCartStore = defineStore('cart', () => {
  const cartItems = ref({})
  const isOpen = ref(false)
  const cartHistory = ref([]) // ✅ track past orders

  // --- Getters ---
  const totalQuantity = computed(() =>
    Object.values(cartItems.value).reduce((total, q) => total + q, 0)
  )

  const cartTotal = computed(() => {
    const productStore = useProductStore()
    let total = 0
    Object.entries(cartItems.value).forEach(([name, q]) => {
      const price = productStore.getProductPrice(name)
      total += price * q
    })
    return Number(total.toFixed(2))
  })

  const cartItemsArray = computed(() => {
    const productStore = useProductStore()
    return Object.entries(cartItems.value).map(([name, q]) => {
      const product = productStore.getProductByName(name)
      const price = productStore.getProductPrice(name)
      return {
        id: product?.id || name,
        name,
        quantity: q,
        price,
        total: Number((price * q).toFixed(2)),
        product: product || null
      }
    })
  })

  // --- Actions ---
  const addToCart = (name, quantity = 1) => {
    cartItems.value[name] = (cartItems.value[name] || 0) + quantity
  }

  const removeFromCart = (name) => {
    if (cartItems.value[name]) delete cartItems.value[name]
  }

  const updateQuantity = (name, quantity) => {
    if (quantity <= 0) removeFromCart(name)
    else cartItems.value[name] = quantity
  }

  const clearCart = () => {
    cartItems.value = {}
  }

  // ✅ Checkout: move current cart into history
  const checkout = () => {
    if (Object.keys(cartItems.value).length === 0) return

    cartHistory.value.push({
      date: new Date().toISOString(),
      items: cartItemsArray.value,
      total: cartTotal.value
    })

    clearCart()
  }

  // --- Sidebar actions ---
  const toggleSidebar = () => {
    isOpen.value = !isOpen.value
  }

  const openSidebar = () => {
    isOpen.value = true
  }

  const closeSidebar = () => {
    isOpen.value = false
  }

  // --- Expose state, getters, actions ---
  return {
    // State
    cartItems,
    isOpen,
    cartHistory,

    // Getters
    totalQuantity,
    cartTotal,
    cartItemsArray,

    // Actions
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    checkout,

    // Sidebar
    toggleSidebar,
    openSidebar,
    closeSidebar
  }
})
