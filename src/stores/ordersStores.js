import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
// import { useProductStore } from './productStores'
import { useCartStore } from './cartStore'

export const useOrdersStore = defineStore('orders', () => {
  // State
  const pastOrders = ref([])
  const loading = ref(false)
  const error = ref(null)

  // Getters
  const getAllOrders = computed(() => pastOrders.value)

  const recentOrders = computed(() =>
    pastOrders.value.slice(0, 5)
  )

  const frequentlyOrderedItems = computed(() => {
    const itemCounts = {}

    pastOrders.value.forEach(order => {
      order.items.forEach(item => {
        if (itemCounts[item.id]) {
          itemCounts[item.id].totalQuantity += item.quantity
          itemCounts[item.id].orderCount += 1
        } else {
          itemCounts[item.id] = {
            ...item,
            totalQuantity: item.quantity,
            orderCount: 1
          }
        }
      })
    })

    return Object.values(itemCounts)
      .sort((a, b) => b.totalQuantity - a.totalQuantity)
      .slice(0, 10)
  })

  // Actions
  const addOrder = (order) => {
    const newOrder = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      status: 'completed',
      ...order
    }
    pastOrders.value.unshift(newOrder)
  }

  const updateOrderStatus = (orderId, status) => {
    const order = pastOrders.value.find(o => o.id === orderId)
    if (order) {
      order.status = status
    }
  }

  const reorderItems = (orderItems) => {
    const cartStore = useCartStore()
    orderItems.forEach(item => {
      cartStore.addToCart(item)
    })
  }

  const quickAddToCart = (item) => {
    const cartStore = useCartStore()
    cartStore.addToCart(item)
  }

  // Future: API integration
  const fetchOrders = async () => {
    loading.value = true
    error.value = null
    try {
      // const response = await axios.get('/api/user/orders')
      // pastOrders.value = response.data
      console.log('Fetch orders - integrate with your API')
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  // Initialize with sample data (replace with API call)
  const initializeSampleData = () => {
    pastOrders.value = [
      {
        id: '1',
        date: '2024-01-15T10:30:00Z',
        status: 'completed',
        total: 6.00,
        items: [
          {
            id: 'carrot-1',
            name: 'Carrot',
            price: 1.00,
            quantity: 1,
            image: 'img/products/carrot.jpg'
          },
          {
            id: 'banana-1',
            name: 'Banana',
            price: 0.50,
            quantity: 10,
            image: 'img/products/banana.jpg'
          }
        ]
      },
      {
        id: '2',
        date: '2024-01-10T14:20:00Z',
        status: 'completed',
        total: 15.50,
        items: [
          {
            id: 'apple-1',
            name: 'Apple',
            price: 1.25,
            quantity: 4,
            image: 'img/products/apple.jpg'
          },
          {
            id: 'milk-1',
            name: 'Milk',
            price: 2.50,
            quantity: 4,
            image: 'img/products/milk.jpg'
          }
        ]
      }
    ]
  }

  return {
    // State
    pastOrders,
    loading,
    error,

    // Getters
    getAllOrders,
    recentOrders,
    frequentlyOrderedItems,

    // Actions
    addOrder,
    updateOrderStatus,
    reorderItems,
    quickAddToCart,
    fetchOrders,
    initializeSampleData
  }
})
