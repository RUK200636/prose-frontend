<template>
  <div class="home-page">
    <div class="container">
      <section class="hero">
        <div class="hero-left">
          <h1 class="hero-title">
            Лучшая косметология
            <span class="hero-location">Владивостока</span>
          </h1>

          <div class="hero-image-wrap">
            <img src="@/assets/mainface.jpg" alt="face" class="hero-img" />

            <div class="cta-pill">
              <a
                  href="https://t.me/PROSESITE"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="telegram-widget"
              >
                <img src="@/assets/tg.png" alt="Telegram" class="tg-icon" />
                <div class="tg-text">
                  <span class="tg-title">Наш телеграм канал</span>
                  <span class="tg-subtitle">Подписаться →</span>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div class="hero-right">
          <h2 class="hero-claim">
            Улучшите баланс<br />
            между работой,<br />
            личной жизнью,<br />
            своим здоровьем
          </h2>

          <p class="hero-sub">знакомьтесь с нашими ← предложениями</p>

          <div class="hero-buttons">
            <router-link to="/price" class="btn-purple">наши программы</router-link>
            <router-link to="/about" class="btn-purple btn-about">о нас</router-link>
          </div>
        </div>
      </section>

      <!-- Карусель с картинками -->
      <section class="carousel-section">
        <h2 class="carousel-title">Наши услуги</h2>

        <div class="carousel-container">
          <button class="carousel-arrow prev" @click="prevSlide">❮</button>

          <div class="carousel-wrapper">
            <div
                v-for="(slide, index) in displaySlides"
                :key="slide.id"
                :class="['carousel-card', {
                'card-center': index === 1,
                'card-left': index === 0,
                'card-right': index === 2
              }]"
                @click="index === 1 ? null : goToSlide(index)"
            >
              <div class="card-inner">
                <img :src="slide.image" :alt="slide.title" class="carousel-image" />
                <div class="carousel-overlay">
                  <h3>{{ slide.title }}</h3>
                  <p v-if="slide.subtitle">{{ slide.subtitle }}</p>
                  <router-link to="/price" class="carousel-btn">ПОДРОБНЕЕ</router-link>
                </div>
              </div>
            </div>
          </div>

          <button class="carousel-arrow next" @click="nextSlide">❯</button>
        </div>

        <div class="carousel-dots">
          <span
              v-for="(slide, index) in slides"
              :key="index"
              :class="['dot', { active: currentIndex === index }]"
              @click="currentIndex = index"
          ></span>
        </div>
      </section>

      <hr class="divider" />

      <section class="promo">
        <p class="promo-text">
          Заботьтесь о себе, доверяйте природе и выбирайте натуральные эко-решения для
          красоты и здоровья вместе с нами! (Продукция в подарок)
        </p>

        <div class="promo-grid">
          <div class="promo-left">
            <img src="@/assets/bottle1.jpg" alt="bottles" />
          </div>
          <div class="promo-right">
            <img src="@/assets/bottle2.jpg" alt="cream" />
          </div>
        </div>
      </section>

      <hr class="divider" />

      <div class="center-wrapper">
        <article class="card about-card">
          <div class="card-image-container-about">
            <img src="@/assets/specialists/anas.jpg" alt="about" />
            <div class="card-text-overlay-about">
              <router-link to="/about" class="about-link">О нас</router-link>
            </div>
          </div>
        </article>
      </div>

      <hr class="divider" />

      <div class="newsletter-minimalist">
        <div class="newsletter-minimalist-content">
          <h1>Будьте в курсе новостей</h1>

          <p class="lead-text">
            Подпишитесь на рассылку и получайте информацию об акциях, новых процедурах и
            полезные советы по уходу за собой:
          </p>

          <div class="minimalist-form-container">
            <form @submit.prevent="handleNewsletterSubmit">
              <ul class="newsletter-minimalist-list">
                <li class="email-item">
                  Ваш email
                  <input
                      v-model="newsletterEmail"
                      type="email"
                      class="email-input-minimalist"
                      placeholder="example@mail.com"
                      required
                  />
                </li>

                <li>
                  <label class="checkbox-item">
                    <input v-model="newsletterAgreed" type="checkbox" required />
                    <span class="custom-checkbox"></span>
                    <span class="checkbox-label"
                    >Соглашаюсь с политикой конфиденциальности и обработкой персональных
                      данных</span
                    >
                  </label>
                </li>

                <li class="with-check">Только полезная информация</li>
                <li class="with-check">Без спама</li>
                <li class="with-check">Отписаться можно в любой момент</li>
              </ul>

              <div class="separator-line"></div>

              <button type="submit" class="subscribe-btn-minimalist" :disabled="newsletterLoading">
                {{ newsletterLoading ? "Подписка..." : "Подписаться" }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

// Импорты картинок для слайдера
import img1 from '@/assets/price/1.png'
import img2 from '@/assets/price/2.png'
import img3 from '@/assets/price/3.png'
import img4 from '@/assets/price/4.png'

const currentIndex = ref(0);

const slides = ref([
  {
    id: 1,
    image: img1,
    title: 'КОСМЕТОЛОГИЯ',
    subtitle: 'НАШИ УСЛУГИ'
  },
  {
    id: 2,
    image: img2,
    title: 'ИННОВАЦИИ',
    subtitle: 'Современные технологии'
  },
  {
    id: 3,
    image: img3,
    title: 'СПЕЦИАЛЬНЫЕ',
    subtitle: 'ПРЕДЛОЖЕНИЯ'
  },
  {
    id: 4,
    image: img4,
    title: 'ПИРСИНГ',
    subtitle: 'НОВИНКА'
  }
]);

const displaySlides = computed(() => {
  const prevIndex = (currentIndex.value - 1 + slides.value.length) % slides.value.length;
  const nextIndex = (currentIndex.value + 1) % slides.value.length;

  return [
    slides.value[prevIndex],
    slides.value[currentIndex.value],
    slides.value[nextIndex]
  ];
});

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % slides.value.length;
};

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + slides.value.length) % slides.value.length;
};

const goToSlide = (index) => {
  if (index === 0) prevSlide();
  if (index === 2) nextSlide();
};

const newsletterEmail = ref("");
const newsletterAgreed = ref(false);
const newsletterLoading = ref(false);

function handleNewsletterSubmit(e) {
  e.preventDefault();

  const email = newsletterEmail.value.trim();

  if (!email) {
    alert("Пожалуйста, введите ваш email");
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert("Пожалуйста, введите корректный email адрес");
    return;
  }

  if (!newsletterAgreed.value) {
    alert("Для подписки необходимо согласие с политикой конфиденциальности");
    return;
  }

  newsletterLoading.value = true;

  setTimeout(() => {
    newsletterLoading.value = false;
    newsletterEmail.value = "";
    newsletterAgreed.value = false;

    alert("Спасибо за подписку! Проверьте вашу почту.");
  }, 1000);
}
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 20px 80px;
  font-family: "Source Serif Pro", serif;
  color: #111;
  width: 100%;
  box-sizing: border-box;
}

.hero {
  display: flex;
  gap: 60px;
  background: #efefef;
  border-radius: 14px;
  border: 2px solid #cfcfcf;
  padding: 35px;
  align-items: flex-start;
}

.hero-left { flex: 1.2; }
.hero-title { margin: 6px 6px 18px 6px; font-size: 36px; line-height: 1.02; font-weight: 100; }
.hero-location { display: block; font-weight: 700; font-size: 35px; margin-top: 6px; }
.hero-image-wrap { position: relative; margin-top: 25px; }
.hero-img { width: 100%; max-height: 450px; object-fit: cover; border-radius: 12px; display: block; border: 1px solid rgba(0,0,0,0.12); }

.cta-pill {
  position: absolute; left: 1px; bottom: -20px; width: 320px; height: 70px;
  background: linear-gradient(135deg, #5f81ca 0%, #8249c4 100%);
  border-radius: 28px; box-shadow: 0 4px 15px rgba(95,129,202,0.3);
  display: flex; align-items: center; padding: 0 15px; transition: all 0.3s ease; border: none;
}
.cta-pill:hover { box-shadow: 0 8px 25px rgba(95,129,202,0.4); transform: translateY(-3px); background: linear-gradient(135deg, #4d6fb0 0%, #7039a9 100%); }
.telegram-widget { display: flex; align-items: center; gap: 12px; color: white; width: 100%; height: 100%; text-decoration: none; }
.tg-icon { width: 36px; height: 36px; background: white; border-radius: 50%; padding: 6px; }
.tg-text { display: flex; flex-direction: column; gap: 3px; flex-grow: 1; }
.tg-title { font-size: 15px; font-weight: 600; color: white; letter-spacing: 0.3px; }
.tg-subtitle { font-size: 13px; color: rgba(255,255,255,0.9); font-weight: 400; }

.hero-right { flex: 0.8; text-align: right; padding: 12px 20px; }
.hero-claim { font-size: 45px; line-height: 1.08; margin: 0; font-weight: 100; }
.hero-sub { margin-top: 18px; color: #666; font-weight: 300; }
.hero-buttons { margin-top: 25px; display: flex; justify-content: flex-end; gap: 15px; flex-wrap: wrap; }

.btn-purple {
  display: inline-block; padding: 12px 28px; border-radius: 30px;
  background: linear-gradient(135deg, #5f81ca 0%, #8249c4 100%);
  text-decoration: none; color: white; font-weight: 600; font-size: 16px;
  transition: all 0.3s; border: none; box-shadow: 0 4px 10px rgba(95,129,202,0.3); cursor: pointer;
}
.btn-purple:hover { background: linear-gradient(135deg, #4d6fb0 0%, #7039a9 100%); transform: translateY(-2px); }

/* ========== КАРУСЕЛЬ ========== */
.carousel-section {
  margin: 50px 0;
}

.carousel-title {
  font-size: 2rem;
  text-align: center;
  margin-bottom: 40px;
  color: #333;
  font-weight: 400;
}

.carousel-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
}

.carousel-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 100%;
  min-height: 350px;
}

.carousel-card {
  cursor: pointer;
  transition: all 0.4s ease;
  border-radius: 16px;
  overflow: hidden;
  position: relative;
}

.card-left, .card-right {
  width: 25%;
  opacity: 0.6;
  transform: scale(0.85);
  filter: blur(1px);
}

.card-center {
  width: 40%;
  transform: scale(1);
  opacity: 1;
  z-index: 10;
  box-shadow: 0 20px 35px rgba(0, 0, 0, 0.2);
}

.card-center:hover {
  transform: scale(1.02);
}

.card-inner {
  position: relative;
  width: 100%;
  height: 300px;
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carousel-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  color: white;
  padding: 30px 15px 20px;
  text-align: center;
}

.carousel-overlay h3 {
  font-size: 1.3rem;
  margin-bottom: 8px;
  font-weight: 600;
}

.carousel-overlay p {
  font-size: 0.9rem;
  opacity: 0.9;
  margin-bottom: 8px;
}

.carousel-btn {
  display: inline-block;
  margin-top: 8px;
  padding: 6px 16px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  text-decoration: none;
  border-radius: 25px;
  font-size: 0.8rem;
  transition: all 0.3s;
}

.carousel-btn:hover {
  background: rgba(255, 255, 255, 0.4);
}

.carousel-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 20px;
  z-index: 20;
  transition: all 0.3s;
}

.carousel-arrow:hover {
  background: rgba(0, 0, 0, 0.8);
}

.prev { left: 5px; }
.next { right: 5px; }

.carousel-dots {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 25px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #ccc;
  cursor: pointer;
  transition: all 0.3s;
}

.dot.active {
  background: #667eea;
  width: 24px;
  border-radius: 5px;
}

/* ========== ОСТАЛЬНЫЕ СТИЛИ ========== */
.center-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.about-card {
  width: 100%;
  max-width: 600px;
  position: relative;
}

.card-image-container-about {
  width: 100%;
  height: 380px;
  overflow: hidden;
  border-radius: 14px;
}

.card-image-container-about img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.about-link {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-decoration: none;
  padding: 12px 28px;
  border-radius: 40px;
  font-size: 1.3rem;
  font-weight: 600;
  display: inline-block;
  transition: all 0.3s;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.about-link:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
}

.divider {
  margin: 40px 0;
  border: none;
  height: 1px;
  background: #bfbfbf;
}

.promo-text {
  color: #666;
  font-size: 23px;
  line-height: 1.6;
  margin-bottom: 30px;
  text-align: center;
}

.promo-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
}

.promo-left,
.promo-right {
  background: #fff;
  border-radius: 14px;
  padding: 12px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  transition: transform 0.3s;
}

.promo-left:hover,
.promo-right:hover {
  transform: translateY(-3px);
}

.promo-left img,
.promo-right img {
  width: 100%;
  height: 100%;
  max-height: 500px;
  object-fit: cover;
  border-radius: 12px;
}

.newsletter-minimalist {
  background: linear-gradient(135deg, #5f81ca 0%, #8249c4 100%);
  padding: 70px 20px;
  margin: 60px 0 0 0;
  border-radius: 20px;
  color: white;
}

.newsletter-minimalist-content {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.newsletter-minimalist h1 {
  font-size: 36px;
  font-weight: 400;
  margin-bottom: 20px;
}

.minimalist-form-container {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 40px;
  backdrop-filter: blur(10px);
  max-width: 700px;
  margin: 0 auto;
}

.newsletter-minimalist-list {
  list-style: none;
  padding: 0;
  text-align: left;
}

.newsletter-minimalist-list li {
  margin-bottom: 18px;
  padding-left: 30px;
  position: relative;
}

.newsletter-minimalist-list li.with-check::before {
  content: "✓";
  position: absolute;
  left: 0;
}

.email-input-minimalist {
  width: 100%;
  background: transparent;
  border: none;
  border-bottom: 2px solid rgba(255, 255, 255, 0.3);
  padding: 12px 0;
  color: white;
}

.subscribe-btn-minimalist {
  background: white;
  color: #5f81ca;
  border: none;
  padding: 18px 50px;
  border-radius: 8px;
  cursor: pointer;
}

@media (max-width: 768px) {
  .hero { flex-direction: column; gap: 30px; padding: 20px; }
  .hero-right { text-align: center; }
  .hero-buttons { justify-content: center; }
  .carousel-wrapper { gap: 8px; }
  .card-left, .card-right { width: 20%; }
  .card-center { width: 55%; }
  .card-inner { height: 220px; }
  .carousel-arrow { width: 30px; height: 30px; font-size: 14px; }
  .about-link { font-size: 1rem; padding: 8px 20px; }
  .promo-grid { grid-template-columns: 1fr; }
}
</style>