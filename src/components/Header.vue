<template>
  <header class="header">
    <nav class="navbar">
      <div class="nav-container">
        <div class="logo-section">
          <router-link
            to="/"
            class="logo"
            @mouseenter="logoHover = true"
            @mouseleave="logoHover = false"
          >
            PROSE
            <span v-if="logoHover" class="logo-hint">На главную</span>
          </router-link>
          
          <!-- Контакты рядом с логотипом (маленькая колонка без обводки) -->
          <div class="contacts-column">
            <a href="tel:+78005553535" class="contact-item">
              <span class="contact-icon"></span>
              <div class="contact-text">
                <span class="contact-label">Горячая линия</span>
                <span class="contact-value">8 (800) 555-35-35</span>
              </div>
            </a>
            <a href="mailto:Prosest@gmail.com" class="contact-item">
              <span class="contact-icon"></span>
              <div class="contact-text">
                <span class="contact-label">Email</span>
                <span class="contact-value">Prosest@gmail.com</span>
              </div>
            </a>
          </div>
        </div>

        <div class="nav-links">
          <router-link to="/">Главная</router-link>
          <router-link to="/price">Услуги</router-link>
          <router-link to="/contact">Контакты</router-link>
          <router-link to="/cabinet">Кабинет</router-link>
          
          <!-- Ссылка на админ-панель (только для администратора) -->
          <router-link v-if="isAdmin" to="/admin" class="admin-link">⚙️ Админ-панель</router-link>
          
          <!-- Ссылка корзины -->
          <router-link to="/cart" class="cart-link" active-class="cart-active" aria-label="Корзина">
            <img src="@/assets/telec.png" alt="Корзина" class="cart-icon-img" />
            <span v-if="cartItemCount" class="cart-badge">{{ cartItemCount }}</span>
          </router-link>
          
          <router-link to="/login" class="login-btn">Вход</router-link>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const logoHover = ref(false);
const cartItemCount = ref(0);
const isAdmin = ref(false);

function updateCartCount() {
  const cart = localStorage.getItem("cart");
  if (cart) {
    const cartItems = JSON.parse(cart);
    cartItemCount.value = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
  } else {
    cartItemCount.value = 0;
  }
}

function checkAdminStatus() {
  const user = localStorage.getItem('user');
  if (user) {
    const userData = JSON.parse(user);
    isAdmin.value = userData.isAdmin === true;
  } else {
    isAdmin.value = false;
  }
}

function handleStorageChange() {
  updateCartCount();
  checkAdminStatus();
}

onMounted(() => {
  updateCartCount();
  checkAdminStatus();
  window.addEventListener("storage", handleStorageChange);
  
  const interval = setInterval(() => {
    updateCartCount();
    checkAdminStatus();
  }, 2000);
  
  onUnmounted(() => {
    window.removeEventListener("storage", handleStorageChange);
    clearInterval(interval);
  });
});
</script>

<style scoped>
.header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.navbar {
  padding: 1rem 0;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

/* Логотип и контакты */
.logo-section {
  display: flex;
  align-items: center;
  gap: 25px;
  flex-wrap: wrap;
}

.logo {
  color: white;
  font-size: 1.8rem;
  font-weight: bold;
  text-decoration: none;
  letter-spacing: 2px;
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s;
  cursor: pointer;
}

.logo:hover {
  transform: scale(1.05);
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}

.logo-hint {
  font-size: 0.7rem;
  opacity: 0.7;
  background: rgba(255, 255, 255, 0.2);
  padding: 2px 8px;
  border-radius: 10px;
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  animation: fadeIn 0.3s;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(-5px);
  }
  to {
    opacity: 0.7;
    transform: translateX(-50%) translateY(0);
  }
}

/* Колонка контактов (без обводки) */
.contacts-column {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: white;
  transition: all 0.2s;
  padding: 2px 0;
}

.contact-item:hover {
  transform: translateX(3px);
  opacity: 0.9;
}

.contact-icon {
  font-size: 0.9rem;
  opacity: 0.8;
}

.contact-text {
  display: flex;
  flex-direction: column;
  line-height: 1.3;
}

.contact-label {
  font-size: 0.65rem;
  opacity: 0.7;
  letter-spacing: 0.3px;
}

.contact-value {
  font-size: 0.8rem;
  font-weight: 500;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
  align-items: center;
  flex-wrap: wrap;
}

.nav-links a {
  color: white;
  text-decoration: none;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.3s;
}

.nav-links a:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.nav-links a.router-link-active {
  background: white;
  color: #667eea;
  font-weight: 500;
}

.login-btn {
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid white;
}

.login-btn:hover {
  background: white;
  color: #667eea;
}

/* Стиль для ссылки админ-панели */
.admin-link {
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.admin-link:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* Стили для корзины */
.cart-link {
  position: relative;
  padding: 0.5rem 1rem !important;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.3s;
}

.cart-link:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.cart-icon-img {
  width: 28px;
  height: 28px;
  display: block;
  transition: all 0.3s;
}

.cart-link:hover .cart-icon-img {
  transform: scale(1.05);
}

/* Активное состояние корзины (когда на странице корзины) */
.cart-active {
  background: white !important;
}

.cart-active .cart-icon-img {
  filter: brightness(0) saturate(100%) invert(36%) sepia(89%) saturate(632%) hue-rotate(202deg) brightness(92%) contrast(96%);
}

.cart-badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background: #ff4081;
  color: white;
  font-size: 0.7rem;
  font-weight: bold;
  min-width: 18px;
  height: 18px;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
  font-family: sans-serif;
}

/* При активном состоянии корзины бейдж тоже должен быть виден */
.cart-active .cart-badge {
  background: #ff4081;
  color: white;
}

@media (max-width: 900px) {
  .nav-container {
    flex-direction: column;
    gap: 15px;
    padding: 0 1rem;
  }
  
  .logo-section {
    flex-direction: column;
    text-align: center;
    gap: 10px;
  }
  
  .contacts-column {
    flex-direction: row;
    justify-content: center;
    gap: 20px;
  }
  
  .contact-item {
    padding: 4px 8px;
  }
  
  .nav-links {
    justify-content: center;
    gap: 0.5rem;
  }

  .nav-links a {
    padding: 0.4rem 0.8rem;
    font-size: 0.85rem;
  }

  .cart-icon-img {
    width: 24px;
    height: 24px;
  }

  .logo-hint {
    display: none;
  }
}

@media (max-width: 500px) {
  .contacts-column {
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }
  
  .contact-item {
    padding: 2px 6px;
  }
  
  .contact-value {
    font-size: 0.75rem;
  }
}
</style>