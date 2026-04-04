import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/products',
      name: 'products',
      component: () => import('../views/ProductsView.vue')
    },
    {
      path: '/about-us',
      name: 'about-us',
      component: () => import('../views/AboutUsView.vue')
    },
    {
      path: '/products/:id',
      name: 'product-detail',
      component: () => import('../views/ProductDetailView.vue')
    },
    {
      path: '/shipping',
      name: 'shipping',
      component: () => import('../views/ShippingView.vue')
    },
    {
      path: '/warranty',
      name: 'warranty',
      component: () => import('../views/WarrantyView.vue')
    },
    {
      path: '/store-location',
      name: 'store-location',
      component: () => import('../views/StoreLocationView.vue')
    }
  ]
})

export default router
