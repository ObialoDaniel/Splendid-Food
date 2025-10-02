<template>
  <div class="splash-container">
    <div class="splash">
      <h1>Splendid Food</h1>
    </div>
  </div>
  <main class="wrapper">
    <h2>Recommended</h2>

    <!-- Swiper implementation -->
    <div class="swiper-container" v-if="inventory.length > 0">
      <swiper
        :modules="modules"
        :slides-per-view="1"
        :space-between="20"
        :pagination="{
          clickable: true,
          dynamicBullets: true
        }"
        :navigation="true"
        :autoplay="{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }"
        :loop="true"
        :breakpoints="{
          640: {
            slidesPerView: 2,
            spaceBetween: 20
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 25
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 30
          }
        }"
        class="mySwiper"
      >
        <swiper-slide
          v-for="(product, index) in inventory.slice(0, 10)"
          :key="product.id"
        >
          <ProductCard
            :index="index"
            :product="product"
          />
        </swiper-slide>
      </swiper>
    </div>

    <!-- Popular Categories -->
    <section class="home-section">
      <h2>Popular Categories</h2>
      <div class="category-grid">
        <CategoryCard
          v-for="(category, index) in categories"
          :key="index"
          :name="category.name"
          :image="category.image"
        />
      </div>
    </section>

    <!-- Special Offers -->
    <section class="home-section" v-if="specialOffers.length > 0">
      <h2>Special Offers ({{ specialOffers.length }} items)</h2>
      <div class="card-grid">
        <ProductCard
          v-for="(product, index) in specialOffers"
          :key="product.id"
          :product="product"
          :index="index"
        />
      </div>
    </section>

    <!-- Best Sellers -->
    <section class="home-section" v-if="bestSellers.length > 0">
      <h2>Best Sellers</h2>
      <div class="card-grid">
        <ProductCard
          v-for="(product, index) in bestSellers"
          :key="product.id"
          :product="product"
          :index="index"
        />
      </div>
    </section>

    <!-- Our Most Popular Products -->
    <section class="home-section" v-if="popularProducts.length > 0">
      <h2>Our Most Popular Products</h2>
      <div class="card-grid">
        <ProductCard
          v-for="(product, index) in popularProducts.slice(0, 12)"
          :key="product.id"
          :product="product"
          :index="index"

        />
      </div>
      <router-link to="/products" class="view-all-btn">View All Products</router-link>
    </section>
  </main>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import ProductCard from '@/components/ProductCard.vue'
import CategoryCard from '@/components/CategoryCard.vue'

import { useProductStore } from '@/stores/productStore'
import { useCartStore } from '@/stores/cartStore'
import { storeToRefs } from 'pinia'

export default {
  name: 'HomePage',
  components: {
    ProductCard,
    CategoryCard,
    Swiper,
    SwiperSlide
  },
  setup () {
    const productStore = useProductStore()
    const cartStore = useCartStore()

    const {
      inventory,
      specialOffers,
      bestSellers,
      popularProducts,
      loading,
      error
    } = storeToRefs(productStore)

    const { totalQuantity } = storeToRefs(cartStore)
    const { toggleSidebar } = cartStore

    const modules = [Autoplay, Pagination, Navigation]

    const categories = [
      { name: 'Fruits', image: 'img/categories/Fruits.png' },
      { name: 'Vegetables', image: 'img/categories/Vegetables.jpg' },
      { name: 'Snacks', image: 'img/categories/Snacks.jpg' },
      { name: 'Drinks', image: 'img/categories/Drinks.jpg' },
      { name: 'Dairy', image: 'img/categories/Dairy.jpg' }
    ]

    return {
      categories,
      modules,
      inventory,
      specialOffers,
      bestSellers,
      popularProducts,
      loading,
      error,
      totalQuantity,
      toggleSidebar
    }
  }
}
</script>
