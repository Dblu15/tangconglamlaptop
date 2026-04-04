<template>
  <div>
    <!-- Slider -->
    <img src="/images/slider/slider.png" width="100%" alt="Banner slider" />

    <!-- Top Pick -->
    <section class="flat-spacing-8 bg-surface">
      <div class="container">
        <div class="flat-title style-between align-items-end wow fadeInUp">
          <div class="box-title"></div>
          <router-link to="/products" class="btn-underline">View all</router-link>
        </div>
        <section class="flat-spacing-24 pt-0">
          <div class="container">
            <div class="row">
              <div
                v-for="product in featuredProducts"
                :key="product.id"
                class="col-6 col-lg-4 col-xl-3 mb-4"
              >
                <ProductCard :product="product" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>

    <!-- Brands -->
    <div class="container my-4">
      <div class="row align-items-center justify-content-center">
        <div class="col-md-3 text-center">
          <img src="/images/brand/dell.png" class="brand-img brand-dell" alt="Dell" />
        </div>
        <div class="col-md-3 text-center">
          <img src="/images/brand/hp.png" class="brand-img brand-hp" alt="HP" />
        </div>
        <div class="col-md-3 text-center">
          <img src="/images/brand/lenovo.png" class="brand-img" alt="Lenovo" />
        </div>
        <div class="col-md-3 text-center">
          <img src="/images/brand/mac.png" class="brand-img brand-mac" alt="Mac" />
        </div>
      </div>
    </div>

    <!-- Testimonials -->
    <div class="container testimonial-section">
      <h6 class="text-danger fw-bold">Đánh giá</h6>
      <h2 class="fw-bold mb-4">Đánh giá từ khách hàng</h2>

      <div id="testimonialSlider" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
          <div
            v-for="(testimonial, i) in testimonials"
            :key="i"
            class="carousel-item"
            :class="{ active: i === 0 }"
          >
            <div class="position-relative d-inline-block">
              <img :src="testimonial.avatar" class="testimonial-avatar" :alt="testimonial.name" />
              <div class="quote-icon"><i class="bi bi-chat-quote-fill"></i></div>
            </div>
            <p class="testimonial-text">"{{ testimonial.text }}"</p>
            <div class="testimonial-name">{{ testimonial.name }}</div>
            <div class="testimonial-role">{{ testimonial.role }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Latest Tips & Trends -->
    <div class="container my-5 py-5 text-center">
      <h2 class="fw-bold mb-3">Mẹo & Xu Hướng Mới Nhất</h2>
      <p class="text-muted mb-5">Khám phá lời khuyên chuyên gia, mẹo hay và cập nhật sản phẩm công nghệ nổi bật.</p>
      
      <div class="row g-4 text-start">
        <div v-for="(news, index) in latestNews" :key="index" class="col-md-4">
          <div class="card h-100 border rounded-4 news-card">
            <img :src="news.image" class="card-img-top p-2 news-image" :alt="news.title" />
            <div class="card-body d-flex flex-column px-4 pb-4">
              <h5 class="card-title fw-semibold flex-grow-1">{{ news.title }}</h5>
              <a href="#" class="text-primary text-decoration-none fw-medium d-inline-block mt-3">Xem thêm ></a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Get In Touch -->
    <div class="container my-5 py-5">
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <h2 class="fw-bold mb-3">Liên Hệ Với Chúng Tôi</h2>
          <p class="text-muted mb-5">Vui lòng gửi mọi thắc mắc chung qua biểu mẫu liên hệ dưới đây và chúng tôi sẽ phản hồi sớm nhất có thể.</p>
          
          <form @submit.prevent="handleContactSubmit">
            <div class="row g-4 mb-4">
              <div class="col-md-6">
                <label for="name" class="form-label ms-1">Họ và tên*</label>
                <input type="text" class="form-control bg-transparent rounded-3 py-2" id="name" v-model="contactForm.name" required>
              </div>
              <div class="col-md-6">
                <label for="email" class="form-label ms-1">Email của bạn*</label>
                <input type="email" class="form-control bg-transparent rounded-3 py-2" id="email" v-model="contactForm.email" required>
              </div>
            </div>
            <div class="mb-4">
              <label for="message" class="form-label ms-1">Tin nhắn*</label>
              <textarea class="form-control bg-transparent rounded-3" id="message" rows="5" v-model="contactForm.message" required></textarea>
            </div>
            <div class="text-center mt-5">
              <button type="submit" class="btn btn-dark px-5 py-2 rounded-pill fw-bold" style="min-width: 150px;">Gửi</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import ProductCard from '@/components/ProductCard.vue'
import allProducts from '@/data/products.json'

const FEATURED_IDS = [
  'dell-latitude-5430-14',
  'dell-latitude-9430-14',
  'dell-latitude-7420-14',
  'dell-latitude-5440-14',
  'dell-latitude-7440-14',
  'dell-latitude-9430-2in1-14',
  'dell-latitude-5450-14',
  'dell-latitude-7450-14'
]

const featuredProducts = computed(() =>
  FEATURED_IDS.map(id => allProducts.find(p => p.id === id)).filter(Boolean)
)

const testimonials = [
  {
    avatar: '/images/nvh.webp',
    name: 'Nguyễn Văn Hưng',
    role: 'Game thủ & Streamer',
    text: 'Tôi đã mua chiếc laptop gaming tại shop và trải nghiệm vượt xa mong đợi. Máy chạy mượt, FPS ổn định và được tư vấn rất kỹ về cấu hình phù hợp. Shop còn hỗ trợ cài đặt phần mềm đầy đủ trước khi giao, rất hài lòng.'
  },
  {
    avatar: '/images/ltth.jpg',
    name: 'Trần Minh Châu',
    role: 'Nhân viên văn phòng',
    text: 'Laptop văn phòng mình mua tại shop rất nhẹ, pin trâu và giá rẻ hơn nơi khác. Nhân viên hỗ trợ chuyển dữ liệu và tối ưu máy miễn phí. Mình sẽ tiếp tục ủng hộ khi nâng cấp máy mới.'
  },
  {
    avatar: '/images/tmk.png',
    name: 'Phạm Quốc Thái',
    role: 'Designer – Freelancer',
    text: 'Kỹ thuật làm rất nhanh và chuyên nghiệp. Máy khởi động chỉ vài giây, chạy mượt hơn hẳn so với trước. Giá thành hợp lý và bảo hành rõ ràng.'
  }
]

// Mock data: Tin tức công nghệ
const latestNews = [
  {
    title: 'Top 5 Mẫu Laptop Mỏng Nhẹ Đáng Mua Nhất Năm Nay',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=700&auto=format&fit=crop'
  },
  {
    title: 'Bí Quyết Kiểm Tra & Chọn Mua Laptop Cũ Chất Lượng',
    image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=700&auto=format&fit=crop'
  },
  {
    title: 'Mẹo Tối Ưu Hóa Windows Giúp Máy Tính Chạy Mượt Mà Hơn',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=700&auto=format&fit=crop'
  }
]

// Quản lý Form Liên Hệ
const contactForm = ref({
  name: '',
  email: '',
  message: ''
})

const handleContactSubmit = () => {
  alert('Gửi thành công! Chúng tôi sẽ liên hệ lại qua email trong thời gian sớm nhất.')
  contactForm.value = { name: '', email: '', message: '' }
}
</script>

<style scoped>
.brand-img {
  max-width: 100%;
  height: auto;
}
.brand-dell {
  transform: scale(0.7);
}
.brand-hp {
  transform: scale(0.8);
}
.brand-mac {
  transform: scale(1.2);
}

/* Latest Tips & Trends styles */
.news-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.news-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.05) !important;
}
.news-image {
  height: 250px;
  object-fit: cover;
  border-radius: 12px;
}

/* Service Commitments styles */
.service-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid #dee2e6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  color: #333;
}
.service-text {
  font-size: 0.95rem;
  letter-spacing: 0.5px;
  color: #333;
}
.border-md-end {
  border-right: 1px solid #dee2e6;
}
@media (max-width: 768px) {
  .border-md-end {
    border-right: none;
  }
  .service-item {
    padding-bottom: 20px;
  }
}

/* Base form improvements */
.form-control:focus {
  border-color: #000;
  box-shadow: none;
}
</style>
