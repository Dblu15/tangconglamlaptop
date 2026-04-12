<template>
  <div>
    <!-- Title Page -->
    <section class="tf-page-title">
      <div class="container">
        <div class="box-title text-center">
          <h4 class="title">Sản phẩm</h4>
          <div class="breadcrumb-list">
            <router-link class="breadcrumb-item" to="/">Trang chủ</router-link>
            <div class="breadcrumb-item dot"><span></span></div>
            <span class="breadcrumb-item">Sản phẩm</span>
            <template v-if="selectedBrandLabel">
              <div class="breadcrumb-item dot"><span></span></div>
              <span class="breadcrumb-item">{{ selectedBrandLabel }}</span>
            </template>
            <template v-if="selectedLineLabel">
              <div class="breadcrumb-item dot"><span></span></div>
              <span class="breadcrumb-item">{{ selectedLineLabel }}</span>
            </template>
          </div>
        </div>
      </div>
    </section>

    <!-- Product Grid -->
    <section class="flat-spacing-24 pt-0">
      <div class="container">
        <div v-if="filteredProducts.length > 0" class="row">
          <div
            v-for="product in filteredProducts"
            :key="product.id"
            class="col-6 col-lg-4 col-xl-3 mb-4"
          >
            <ProductCard :product="product" />
          </div>
        </div>
        <div v-else class="text-center py-5">
          <p class="fs-5 text-muted">Hiện chưa có sản phẩm</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import ProductCard from '@/components/ProductCard.vue'
import products from '@/data/products.json'

const route = useRoute()

const brandLabels = {
  dell: 'Dell',
  hp: 'HP',
  thinkpad: 'ThinkPad'
}

const lineLabels = {
  workstation: 'Dòng máy trạm',
  mainstream: 'Dòng máy phổ thông'
}

const selectedBrandLabel = computed(() => {
  const brandKey = route.query.brand
  if (typeof brandKey !== 'string') {
    return ''
  }
  return brandLabels[brandKey] || ''
})

const selectedLineLabel = computed(() => {
  const lineKey = route.query.line
  if (typeof lineKey !== 'string') {
    return ''
  }
  return lineLabels[lineKey] || ''
})

const filteredProducts = computed(() => {
  const brand = route.query.brand
  const line = route.query.line
  if (!brand || !line) return []
  return products.filter(p => p.brand === brand && p.line === line)
})
</script>

<style scoped>
</style>
