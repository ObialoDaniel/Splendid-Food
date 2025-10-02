import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import foodData from '@/data/food.json' // Adjust path based on your structure

export const useProductStore = defineStore('products', () => {
  // State
  const inventory = ref([])
  const loading = ref(false)
  const error = ref(null)
  const currency = ref('USD') // Default currency

  // Getters
  const specialOffers = computed(() =>
    inventory.value.filter(product => product.specialOffer)
  )

  const bestSellers = computed(() =>
    inventory.value.slice(0, 6)
  )

  const popularProducts = computed(() =>
    inventory.value
  )

  const getProductById = computed(() =>
    (id) => inventory.value.find(product => product.id === id)
  )

  const getProductByName = computed(() =>
    (name) => inventory.value.find(product => product.name === name)
  )

  const getProductPrice = computed(() =>
    (productName) => {
      const product = inventory.value.find(p => p.name === productName)
      return product ? product.price[currency.value] : 0
    }
  )

  const productsByCategory = computed(() =>
    (type) => inventory.value.filter(product => product.type === type)
  )

  // Actions
  const loadInventory = () => {
    try {
      loading.value = true
      // For now, load from local JSON
      inventory.value = foodData.map(product => ({
        ...product,
        // Add any additional properties you might need
        image: product.image || `https://via.placeholder.com/200x200/gray/white?text=${product.name}`,
        specialOffer: Math.random() > 0.8 // Randomly assign special offers for demo
      }))
      console.log('Inventory loaded successfully:', inventory.value.length, 'products')
    } catch (err) {
      error.value = 'Failed to load inventory'
      console.error('Error loading inventory:', err)
    } finally {
      loading.value = false
    }
  }

  const setCurrency = (newCurrency) => {
    if (['USD', 'NOK'].includes(newCurrency)) {
      currency.value = newCurrency
    }
  }

  // Future API integration
  const fetchProducts = async () => {
    loading.value = true
    error.value = null
    try {
      // When you're ready for API:
      // const response = await axios.get('/api/products')
      // inventory.value = response.data
      // For now, use local data
      loadInventory()
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  // Initialize inventory on store creation
  loadInventory()

  return {
    // State
    inventory,
    loading,
    error,
    currency,

    // Getters
    specialOffers,
    bestSellers,
    popularProducts,
    getProductById,
    getProductByName,
    getProductPrice,
    productsByCategory,

    // Actions
    loadInventory,
    setCurrency,
    fetchProducts
  }
})
