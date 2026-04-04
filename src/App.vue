<template>
  <div id="wrapper">
    <!-- Top Bar -->
    <div class="tf-topbar bg-dark-5 topbar-bg">
      <div class="container">
        <div class="row align-items-center justify-content-center">
          <div class="col-xl-6 overflow-hidden">
            <div class="topbar-center marquee-wrapper">
              <div class="initial-child-container">
                <div class="marquee-child-item"><p>Cam kết máy nguyên zin</p></div>
                <div class="marquee-child-item"><span class="dot"></span></div>
                <div class="marquee-child-item"><p>Không qua sửa chữa</p></div>
                <div class="marquee-child-item"><span class="dot"></span></div>
                <div class="marquee-child-item"><p>Giá tốt nhất thị trường</p></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <TheHeader />

    <router-view />

    <TheFooter />
  </div>
</template>

<script setup>
import TheHeader from '@/components/layout/TheHeader.vue'
import TheFooter from '@/components/layout/TheFooter.vue'
</script>

<style scoped>
</style>
