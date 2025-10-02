import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useInventoryStore = defineStore('inventory', () => {
  const inventory = ref([])
  function loadInventory (data) {
    inventory.value = data
  }
  const specialOffers = computed(() =>
    inventory.value.filter(product => product.specialOffer)
  )
  const bestSellers = computed(() =>
    (inventory.value || []).slice(0, 6)
  )
  const popularProducts = computed(() => inventory.value)
  return {
    inventory,
    loadInventory,
    specialOffers,
    bestSellers,
    popularProducts
  }
})
