<template>
  <div class="cabinet">
    <div class="cabinet-header">
      <h1>Личный кабинет</h1>
      <p class="welcome" v-if="isLoggedIn">Добро пожаловать, {{ userName }}!</p>
      <p class="welcome" v-else>Вы не авторизованы</p>
    </div>

    <div class="cabinet-grid">
      <!-- Карточка профиля -->
      <div class="card profile-card">
        <div class="card-icon"></div>
        <h3>Профиль</h3>
        <div v-if="isLoggedIn">
          <div class="info-row">
            <span class="label">Имя:</span>
            <span class="value">{{ userName }}</span>
          </div>
          <div class="info-row">
            <span class="label">Email:</span>
            <span class="value">{{ userEmail }}</span>
          </div>
          <div class="info-row">
            <span class="label">Телефон:</span>
            <span class="value">{{ userPhone || 'Не указан' }}</span>
          </div>
        </div>
        <div v-else class="empty-state">
          <p>Для просмотра профиля войдите в аккаунт</p>
          <router-link to="/login" class="btn-link">Войти →</router-link>
        </div>
      </div>

      <!-- Карточка записей -->
      <div class="card appointments-card">
        <div class="card-icon"></div>
        <h3>Мои записи</h3>
        <div v-if="!isLoggedIn" class="empty-state">
          <p>Для просмотра записей войдите в аккаунт</p>
          <router-link to="/login" class="btn-link">Войти →</router-link>
        </div>
        <div v-else-if="userAppointments.length === 0" class="empty-state">
          <p>У вас пока нет записей</p>
          <router-link to="/price" class="btn-link">Записаться →</router-link>
        </div>
        <div v-else class="appointments-list">
          <div v-for="app in userAppointments" :key="app.id" class="appointment-item">
            <div class="app-info">
              <span class="app-service">{{ app.service }}</span>
              <span class="app-date">{{ formatDateTime(app.date) }}</span>
            </div>
            <span :class="['app-status', app.status]">{{ getStatusText(app.status) }}</span>
            <button 
              v-if="app.status === 'pending'" 
              class="cancel-btn" 
              @click="cancelAppointment(app.id)"
            >
              Отменить
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="logout-section">
      <button v-if="isLoggedIn" class="btn-logout" @click="logout">Выйти из аккаунта</button>
      <router-link v-else to="/login" class="btn-login-link">Войти в аккаунт</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// Состояние авторизации
const isLoggedIn = ref(false)

// Данные пользователя
const userName = ref('')
const userEmail = ref('')
const userPhone = ref('')

// Все записи
const allAppointments = ref([])

// Функция получения email пользователя
function getUserEmail() {
  const user = localStorage.getItem('user')
  if (user) {
    const userData = JSON.parse(user)
    return userData.login || userData.email || ''
  }
  return ''
}

// Фильтрация записей текущего пользователя
const userAppointments = computed(() => {
  const currentEmail = getUserEmail()
  if (!currentEmail) return []
  return allAppointments.value.filter(app => {
    const appEmail = app.userEmail || ''
    return appEmail === currentEmail
  })
})

function loadUserData() {
  const user = localStorage.getItem('user')
  if (user) {
    const userData = JSON.parse(user)
    userEmail.value = userData.login || userData.email || ''
    userName.value = userData.name || userData.login || 'Пользователь'
    userPhone.value = userData.phone || ''
    isLoggedIn.value = true
  } else {
    // Проверяем userData (регистрация без входа)
    const userDataStorage = localStorage.getItem('userData')
    if (userDataStorage) {
      const data = JSON.parse(userDataStorage)
      userEmail.value = data.email || ''
      userName.value = data.name || 'Пользователь'
      userPhone.value = data.phone || ''
      isLoggedIn.value = true
    } else {
      isLoggedIn.value = false
      userEmail.value = ''
      userName.value = ''
      userPhone.value = ''
    }
  }
}

function loadAppointments() {
  const saved = localStorage.getItem('appointments')
  if (saved) {
    allAppointments.value = JSON.parse(saved)
  }
}

function formatDateTime(dateStr) {
  if (!dateStr) return 'Дата не указана'
  return dateStr
}

function getStatusText(status) {
  const statusMap = {
    pending: 'Ожидает подтверждения',
    confirmed: 'Подтверждена',
    completed: 'Выполнена',
    cancelled: 'Отменена'
  }
  return statusMap[status] || status
}

function cancelAppointment(id) {
  if (confirm('Отменить запись?')) {
    const index = allAppointments.value.findIndex(a => a.id === id)
    if (index !== -1) {
      allAppointments.value[index].status = 'cancelled'
      localStorage.setItem('appointments', JSON.stringify(allAppointments.value))
    }
  }
}

// Функция выхода — просто очищаем данные, остаёмся на странице
function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  localStorage.removeItem('user_session')
  localStorage.removeItem('userData')
  
  // Очищаем локальные переменные
  isLoggedIn.value = false
  userEmail.value = ''
  userName.value = ''
  userPhone.value = ''
  
  alert('Вы вышли из аккаунта')
}

onMounted(() => {
  loadUserData()
  loadAppointments()
})
</script>

<style scoped>
.cabinet {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
  min-height: 70vh;
}

.cabinet-header {
  text-align: center;
  margin-bottom: 40px;
}

.cabinet-header h1 {
  font-size: 2.5rem;
  color: #333;
  font-weight: 400;
  margin-bottom: 10px;
}

.welcome {
  font-size: 1.1rem;
  color: #667eea;
  font-weight: 500;
}

.cabinet-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 25px;
  margin-bottom: 30px;
}

.card {
  background: white;
  border-radius: 16px;
  padding: 25px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s, box-shadow 0.2s;
}

.card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.12);
}

.card-icon {
  font-size: 2rem;
  margin-bottom: 15px;
}

.card h3 {
  font-size: 1.3rem;
  color: #333;
  margin-bottom: 15px;
  font-weight: 500;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 8px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
}

.label {
  color: #888;
  font-size: 0.9rem;
}

.value {
  color: #333;
  font-weight: 400;
}

.empty-state {
  text-align: center;
  color: #aaa;
  padding: 20px 0;
}

.appointments-list {
  max-height: 350px;
  overflow-y: auto;
}

.appointment-item {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
  gap: 10px;
}

.app-info {
  flex: 2;
  display: flex;
  flex-direction: column;
}

.app-service {
  font-weight: 500;
  color: #333;
}

.app-date {
  font-size: 0.8rem;
  color: #888;
}

.app-status {
  font-size: 0.75rem;
  padding: 4px 8px;
  border-radius: 20px;
  font-weight: 500;
}

.app-status.pending {
  background: #fff3cd;
  color: #856404;
}

.app-status.confirmed {
  background: #d4edda;
  color: #155724;
}

.app-status.completed {
  background: #cce5ff;
  color: #004085;
}

.app-status.cancelled {
  background: #f8d7da;
  color: #721c24;
}

.cancel-btn {
  background: none;
  border: 1px solid #dc3545;
  color: #dc3545;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.7rem;
  cursor: pointer;
  transition: all 0.2s;
}

.cancel-btn:hover {
  background: #dc3545;
  color: white;
}

.btn-link {
  color: #667eea;
  text-decoration: none;
  font-size: 0.9rem;
  display: inline-block;
  margin-top: 10px;
}

.logout-section {
  text-align: center;
  margin-top: 20px;
}

.btn-logout {
  background: linear-gradient(135deg, #f56565 0%, #e53e3e 100%);
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 30px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-logout:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(229, 62, 62, 0.3);
}

.btn-login-link {
  display: inline-block;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-decoration: none;
  padding: 12px 30px;
  border-radius: 30px;
  font-size: 1rem;
  transition: all 0.2s;
}

.btn-login-link:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

@media (max-width: 768px) {
  .cabinet {
    padding: 30px 15px;
  }
  
  .cabinet-header h1 {
    font-size: 2rem;
  }
  
  .cabinet-grid {
    grid-template-columns: 1fr;
  }
}
</style>