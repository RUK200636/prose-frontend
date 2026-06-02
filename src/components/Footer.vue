<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-grid">
        <!-- Колонка 1: Бренд и соцсети -->
        <div class="footer-col footer-col-1">
          <div class="brand">
            <span class="brand-name">PROSE</span>
            <span class="brand-year">© {{ currentYear }}</span>
          </div>
          <p class="brand-desc">
            Косметологический центр<br />
            во Владивостоке
          </p>
          <a href="https://t.me/PROSESITE" target="_blank" class="social-link">
            <img src="@/assets/tg.png" alt="Telegram" class="social-icon" />
            Telegram
          </a>
        </div>

        <!-- Колонка 2: Контакты -->
        <div class="footer-col footer-col-2">
          <h4>Контакты</h4>
          <a href="tel:+78005553535" class="footer-link"> 8 (800) 555-35-35</a>
          <a href="mailto:Prosest@gmail.com" class="footer-link"> Prosest@gmail.com</a>
          <div class="footer-link address"> г. Владивосток, ул. Светланская, д. 1</div>
        </div>

        <!-- Колонка 3: Навигация -->
        <div class="footer-col footer-col-3">
          <h4>Навигация</h4>
          <router-link to="/" class="footer-link">Главная</router-link>
          <router-link to="/price" class="footer-link">Услуги</router-link>
          <router-link to="/about" class="footer-link">О нас</router-link>
          <router-link to="/cabinet" class="footer-link">Кабинет</router-link>
          <router-link to="/contact" class="footer-link">Контакты</router-link>
        </div>
      </div>

      <!-- Карта -->
      <div class="footer-map">
        <div class="map-wrapper">
          <iframe
              src="https://yandex.ru/map-widget/v1/?ll=131.886902,43.115207&z=12&l=sat,skl"
              width="100%"
              height="140"
              frameborder="0"
              style="border-radius: 12px;"
              allowfullscreen
          ></iframe>
        </div>
        <div class="map-address">📍 г. Владивосток, ул. Светланская, д. 1</div>
      </div>

      <!-- Нижняя строка -->
      <div class="footer-bottom">
        <p>Все права защищены. Сертифицированная косметологическая клиника.</p>
        <div class="bottom-links">
          <router-link to="/privacy">Политика конфиденциальности</router-link>
          <router-link to="/terms">Условия использования</router-link>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, onMounted } from "vue";

const currentYear = ref("");

onMounted(() => {
  currentYear.value = new Date().getFullYear();
});
</script>

<style scoped>
.footer {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 30px 0 20px;
  margin-top: 40px;
  font-family: "Source Serif Pro", serif;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Сетка 3 колонки */
.footer-grid {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 30px;
  padding-bottom: 30px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  margin-bottom: 25px;
}

/* Фиксированная ширина для каждой колонки */
.footer-col {
  flex: 1;
  min-width: 200px;
}

.footer-col-1 {
  max-width: 280px;
}

.footer-col-2 {
  max-width: 320px;
}

.footer-col-3 {
  max-width: 200px;
}

/* Колонка 1 */
.brand {
  display: flex;
  align-items: baseline;
  gap: 12px;
  margin-bottom: 15px;
  flex-wrap: wrap;
}

.brand-name {
  font-size: 2rem;
  font-weight: 700;
  color: white;
  letter-spacing: 2px;
}

.brand-year {
  font-size: 1rem;
  opacity: 0.8;
}

.brand-desc {
  font-size: 1rem;
  line-height: 1.5;
  opacity: 0.9;
  margin-bottom: 20px;
}

.social-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: white;
  text-decoration: none;
  padding: 8px 20px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 30px;
  transition: all 0.3s;
  width: fit-content;
  font-size: 1rem;
}

.social-link:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: translateY(-2px);
}

.social-icon {
  width: 20px;
  height: 20px;
  filter: brightness(0) invert(1);
}

/* Заголовки колонок */
.footer-col h4 {
  font-size: 1.2rem;
  font-weight: 600;
  color: white;
  margin-bottom: 20px;
  letter-spacing: 1px;
}

/* Ссылки */
.footer-link {
  display: block;
  color: white;
  text-decoration: none;
  margin-bottom: 12px;
  transition: all 0.3s;
  font-size: 1rem;
  opacity: 0.9;
  white-space: nowrap;
}

.footer-link:hover {
  opacity: 1;
  transform: translateX(5px);
}

.address {
  white-space: normal;
  line-height: 1.4;
  opacity: 0.8;
}

.address:hover {
  transform: none;
  opacity: 0.9;
}

/* Карта */
.footer-map {
  text-align: center;
  margin-bottom: 25px;
}

.map-wrapper {
  max-width: 450px;
  margin: 0 auto 10px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.map-address {
  font-size: 0.9rem;
  opacity: 0.8;
}

/* Нижняя строка */
.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  text-align: center;
}

.footer-bottom p {
  font-size: 0.85rem;
  opacity: 0.8;
  margin: 0;
}

.bottom-links {
  display: flex;
  gap: 25px;
}

.bottom-links a {
  color: white;
  text-decoration: none;
  font-size: 0.8rem;
  opacity: 0.7;
  transition: opacity 0.3s;
}

.bottom-links a:hover {
  opacity: 1;
}

/* Адаптивность */
@media (max-width: 900px) {
  .footer-grid {
    gap: 20px;
  }

  .footer-link {
    white-space: normal;
  }
}

@media (max-width: 768px) {
  .footer-grid {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .footer-col {
    max-width: 100%;
    text-align: center;
  }

  .brand {
    justify-content: center;
  }

  .social-link {
    margin: 0 auto;
  }

  .footer-link:hover {
    transform: translateX(0) translateY(-2px);
  }

  .footer-bottom {
    flex-direction: column;
    justify-content: center;
  }

  .bottom-links {
    gap: 20px;
  }
}

@media (max-width: 480px) {
  .footer {
    padding: 20px 0 15px;
  }

  .brand-name {
    font-size: 1.8rem;
  }

  .bottom-links {
    flex-direction: column;
    gap: 8px;
  }
}
</style>