<!-- <template>
  <router-link :to="`/category/${name.toLowerCase()}`" class="category-card">
    <img :src="require(`@/assets/${image}`)" :alt="name" />
    <h3>{{ name }}</h3>
  </router-link>
</template>

<script>
export default {
  props: {
    name: String,
    image: String
  }
}
</script>

<style scoped>
.category-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: inherit;
  background: #fff;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
}
.category-card:hover {
  transform: translateY(-5px);
}
.category-card img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 6px;
}
</style> -->
<template>
  <router-link :to="`/category/${name.toLowerCase()}`" class="category-card">
    <img :src="imageSource" :alt="name" />
    <h3>{{ name }}</h3>
  </router-link>
</template>

<script>
export default {
  props: {
    name: String,
    image: String
  },
  computed: {
    imageSource () {
      // If it's a URL (starts with http), use it directly
      if (this.image.startsWith('http')) {
        return this.image
      }
      // Otherwise, require it from assets
      try {
        return require(`@/assets/${this.image}`)
      } catch (error) {
        console.warn(`Image not found: ${this.image}`)
        return 'https://via.placeholder.com/200x200/gray/white?text=No+Image'
      }
    }
  }
}
</script>

<style scoped>
.category-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: inherit;
  background: #fff;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
}
.category-card:hover {
  transform: translateY(-5px);
}
.category-card img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 6px;
}
</style>
