<template>
  <!-- Mobile Menu Button -->
  <div class="d-xl-none d-flex justify-content-between align-items-center px-3 py-2 shadow-sm">
    <router-link to="/" class="logo-header">
      <img src="/images/logo/favicon.png" class="logo mobile-logo" alt="logo" />
    </router-link>
    <button class="btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#mobileMenu">
      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 50 50">
        <path d="M 3 9 A 1.0001 1.0001 0 1 0 3 11 L 47 11 A 1.0001 1.0001 0 1 0 47 9 L 3 9 z M 3 24 A 1.0001 1.0001 0 1 0 3 26 L 47 26 A 1.0001 1.0001 0 1 0 47 24 L 3 24 z M 3 39 A 1.0001 1.0001 0 1 0 3 41 L 47 41 A 1.0001 1.0001 0 1 0 47 39 L 3 39 z"></path>
      </svg>
    </button>
  </div>

  <!-- Mobile Offcanvas Menu -->
  <div class="offcanvas offcanvas-start" tabindex="-1" id="mobileMenu">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title">Menu</h5>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas"></button>
    </div>
    <div class="offcanvas-body">
      <ul class="nav flex-column">
        <li class="nav-item"><router-link to="/" class="nav-link">Trang chủ</router-link></li>
        <li class="nav-item mobile-product-item">
          <p class="nav-link">Sản phẩm</p>
          <ul class="mobile-brand-list">
            <li v-for="brand in productHierarchy" :key="`mobile-${brand.key}`" class="mobile-brand-node">
              <div class="mobile-brand-name">{{ brand.label }}</div>
              <ul class="mobile-line-list">
                <li v-for="line in brand.children" :key="`mobile-${brand.key}-${line.key}`">
                  <router-link
                    :to="{ path: '/products', query: { brand: brand.key, line: line.key } }"
                    class="nav-link mobile-line-link"
                  >
                    {{ line.label }}
                  </router-link>
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li class="nav-item"><router-link to="/store-location" class="nav-link">Địa chỉ</router-link></li>
        <li class="nav-item"><router-link to="/shipping" class="nav-link">Giao hàng</router-link></li>
        <li class="nav-item"><router-link to="/warranty" class="nav-link">Bảo hành</router-link></li>
        <li class="nav-item"><router-link to="/about-us" class="nav-link">Về chúng tôi</router-link></li>
      </ul>
    </div>
  </div>

  <!-- Desktop Header -->
  <header id="header" class="header-default">
    <div class="header-bottom d-none d-xl-block">
      <div class="container">
        <nav class="box-navigation text-center">
          <ul class="box-nav-menu">
            <div class="col-xl-2 col-md-4 col-6 text-center">
              <router-link to="/" class="logo-header">
                <img src="/images/logo/favicon.png" alt="logo" class="logo desktop-logo" />
              </router-link>
            </div>
            <li class="menu-item"><router-link to="/" class="item-link">Trang chủ</router-link></li>
            <li class="menu-item menu-item-product">
              <router-link to="/products" class="item-link">
                Sản phẩm
                <i class="icon-arr-down product-menu-icon" style="font-size: 20px; margin-left: 4px;"></i>
              </router-link>
              <div class="sub-menu sub-menu-product">
                <ul class="product-parent-list">
                  <li
                    v-for="brand in productHierarchy"
                    :key="brand.key"
                    class="product-parent-item"
                  >
                    <router-link
                      :to="{ path: '/products', query: { brand: brand.key } }"
                      class="product-parent-link"
                    >
                      <span>{{ brand.label }}</span>
                      <i class="icon-arr-right" style="font-size: 20px;"></i>
                    </router-link>

                    <div class="product-child-panel">
                      <ul class="menu-list product-child-list">
                        <li v-for="line in brand.children" :key="`${brand.key}-${line.key}`">
                          <router-link
                            :to="{ path: '/products', query: { brand: brand.key, line: line.key } }"
                            class="menu-link-text product-child-link"
                          >
                            {{ line.label }}
                          </router-link>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </li>
            <li class="menu-item"><router-link to="/store-location" class="item-link">Địa chỉ</router-link></li>
            <li class="menu-item"><router-link to="/shipping" class="item-link">Giao hàng</router-link></li>
            <li class="menu-item"><router-link to="/warranty" class="item-link">Bảo hành</router-link></li>
            <li class="menu-item"><router-link to="/about-us" class="item-link">Về chúng tôi</router-link></li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
const productHierarchy = [
  {
    key: 'dell',
    label: 'Dell',
    children: [
      { key: 'workstation', label: 'Dòng máy trạm' },
      { key: 'mainstream', label: 'Dòng máy phổ thông' }
    ]
  },
  {
    key: 'hp',
    label: 'HP',
    children: [
      { key: 'workstation', label: 'Dòng máy trạm' },
      { key: 'mainstream', label: 'Dòng máy phổ thông' }
    ]
  },
  {
    key: 'thinkpad',
    label: 'ThinkPad',
    children: [
      { key: 'workstation', label: 'Dòng máy trạm' },
      { key: 'mainstream', label: 'Dòng máy phổ thông' }
    ]
  }
]
</script>

<style scoped>
.mobile-logo {
  height: 65px;
  width: auto;
  object-fit: contain;
}
.desktop-logo {
  max-height: 120px;
  width: auto;
  object-fit: contain;
}
.mobile-menu-icon {
  font-size: 32px;
}

.menu-item-product {
  position: relative;
}

.menu-item-product .item-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.product-menu-icon {
  font-size: 12px;
  transition: transform 0.25s ease;
}

.menu-item-product:hover .product-menu-icon {
  transform: rotate(180deg);
}

.sub-menu-product {
  min-width: 470px;
  padding: 0;
  border: 1px solid var(--line);
  border-radius: 14px;
  overflow: hidden;
}

.product-parent-list {
  list-style: none;
  margin: 0;
  padding: 0;
  width: 180px;
  border-right: 1px solid var(--line);
  background: var(--surface-2);
  position: relative;
}

.product-parent-item {
  position: static;
}

.product-parent-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  font-size: 15px;
  font-weight: 600;
  color: var(--text-2);
  transition: all 0.2s ease;
}

.product-parent-link i {
  font-size: 11px;
}

.product-parent-link:hover {
  color: var(--white);
  background-color: var(--primary);
}

.product-child-panel {
  position: absolute;
  top: 0;
  left: 180px;
  width: 290px;
  background: var(--white);
  padding: 12px 16px;
  opacity: 0;
  pointer-events: none;
  z-index: 1;
  transform: translateY(6px);
  transition: all 0.2s ease;
}

.product-parent-item:hover .product-child-panel {
  opacity: 1;
  pointer-events: auto;
  z-index: 2;
  transform: translateY(0);
}

.product-parent-list .product-parent-item:first-child .product-child-panel {
  opacity: 1;
  pointer-events: auto;
  z-index: 1;
  transform: translateY(0);
}

.product-child-list {
  display: grid;
  gap: 2px;
}

.product-child-link {
  padding: 9px 12px;
  border-radius: 10px;
  color: var(--text-2);
  font-weight: 500;
  transition: all 0.2s ease;
}

.product-child-link:hover {
  color: var(--primary);
  background-color: var(--primary-4);
}

.mobile-product-item {
  border: 1px solid var(--line-2);
  border-radius: 14px;
  padding: 8px 10px;
  margin: 8px 0;
  background: linear-gradient(180deg, var(--white) 0%, var(--surface-2) 100%);
}

.mobile-brand-list,
.mobile-line-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.mobile-brand-list {
  display: grid;
  gap: 8px;
}

.mobile-brand-node {
  border-radius: 10px;
  border: 1px solid var(--line);
  padding: 8px 10px;
}

.mobile-brand-name {
  font-size: 13px;
  font-weight: 700;
  color: var(--dark-2);
  margin-bottom: 6px;
}

.mobile-line-list {
  padding-left: 10px;
}

.mobile-line-link {
  font-size: 13px;
  color: var(--text-2);
  padding: 5px 0;
}
</style>
