<template>
  <div class="card h-100 rounded-3 shadow-sm">
    <div class="img-container">
      <img
        :src="product.images.default"
        class="img-default"
        :alt="product.name"
        :style="imgStyle"
      />
      <img
        v-if="product.images.hover"
        :src="product.images.hover"
        class="img-hover"
        :alt="product.name + ' Hover'"
        :style="imgHoverStyle"
      />
    </div>
    <div class="card-body">
      <p class="fs-5 mb-3">{{ product.name }}</p>

      <template v-if="product.specs.screens?.length">
        Màn hình:
        <button
          v-for="(screen, i) in product.specs.screens"
          :key="'screen-' + i"
          type="button"
          class="btn btn-outline-danger btn-sm disabled"
          :class="{ 'mt-1': i > 1 }"
        >{{ screen }}</button>
        <br />
      </template>

      <template v-if="product.specs.cpus?.length">
        CPU:
        <button
          v-for="(cpu, i) in product.specs.cpus"
          :key="'cpu-' + i"
          type="button"
          class="btn btn-outline-danger btn-sm disabled"
        >{{ cpu }}</button>
        <br />
      </template>

      <template v-if="product.specs.rams?.length">
        RAM:
        <button
          v-for="(ram, i) in product.specs.rams"
          :key="'ram-' + i"
          type="button"
          class="btn btn-outline-danger btn-sm disabled"
        >{{ ram }}</button>
        <br />
      </template>

      <template v-if="product.specs.vgas?.length">
        VGA:
        <button
          v-for="(vga, i) in product.specs.vgas"
          :key="'vga-' + i"
          type="button"
          class="btn btn-outline-danger btn-sm disabled"
        >{{ vga }}</button>
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const imgStyle = computed(() => {
  const scale = props.product.imageScale ?? 1
  if (scale === 1) return {}
  return {
    transform: `scale(${scale})`,
    transformOrigin: 'center',
    display: 'block',
    margin: 'auto'
  }
})

const imgHoverStyle = computed(() => {
  const scale = props.product.imageScaleHover ?? props.product.imageScale ?? 1
  if (scale === 1) return {}
  return {
    transform: `scale(${scale})`,
    transformOrigin: 'center',
    display: 'block',
    margin: 'auto'
  }
})
</script>

<style scoped>
.img-container {
  overflow: hidden;
  position: relative;
}
.img-container img {
  width: 100%;
  object-fit: cover;
  transition: opacity 0.3s;
}
.img-hover {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
}
.card:hover .img-hover {
  opacity: 1;
}
.card:hover .img-default {
  opacity: 0;
}
</style>
