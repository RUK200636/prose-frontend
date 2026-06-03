<template>
  <div class="cabinet">
    <div class="cabinet-header">
      <h1>Личный кабинет</h1>
      <p class="welcome" v-if="isLoggedIn">Добро пожаловать, {{ userName }}!</p>
      <p class="welcome" v-else>Вы не авторизованы</p>
    </div>

    <div class="cabinet-grid">
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

      <div class="card appointments-card">
        <div class="card-icon"></div>
        <h3>Мои записи</h3>
        <div v-if="!isLoggedIn" class="empty-state">
          <p>Для просмотра записей войдите в аккаунт</p>
          <router-link to="/login" class="btn-link">Войти →</router-link>
        </div>
        <div v-else-if="appointments.length === 0" class="empty-state">
          <p>У вас пока нет записей</p>
          <router-link to="/price" class="btn-link">Записаться →</router-link>
        </div>
        <div v-else class="appointments-list">
          <div v-for="app in appointments" :key="app.id" class="appointment-item">
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
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const API_BASE = 'https://prose-backend.onrender.com/api'

const isLoggedIn = ref(false)
const userName = ref('')
const userEmail = ref('')
const userPhone = ref('')
const appointments = ref([])

async function loadUserData() {
  const token = localStorage.getItem('token')
  if (!token) {
    isLoggedIn.value = false
    return
  }
  try {
    const response = await fetch(`${API_BASE}/user`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    if (response.ok) {
      const user = await response.json()
      userName.value = user.name
      userEmail.value = user.email
      userPhone.value = user.phone || ''
      isLoggedIn.value = true
    } else {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      isLoggedIn.value = false
    }
  } catch (err) {
    console.error(err)
    isLoggedIn.value = false
  }
}

async function loadAppointments() {
  const token = localStorage.getItem('token')
  if (!token) return
  try {
    const response = await fetch(`${API_BASE}/appointments`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    if (response.ok) {
      appointments.value = await response.json()
    } else {
      console.error('Failed to load appointments')
    }
  } catch (err) {
    console.error(err)
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

async function cancelAppointment(id) {
  if (!confirm('Отменить запись?')) return
  const token = localStorage.getItem('token')
  try {
    const response = await fetch(`${API_BASE}/appointments/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    })
    if (response.ok) {
      await loadAppointments()
      alert('Запись отменена')
    } else {
      alert('Не удалось отменить запись')
    }
  } catch (err) {
    console.error(err)
    alert('Ошибка')
  }
}

async function logout() {
  const token = localStorage.getItem('token')
  if (token) {
    try {
      await fetch(`${API_BASE}/logout`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      })
    } catch (e) {}
  }
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  isLoggedIn.value = false
  router.push('/')
}

onMounted(() => {
  loadUserData()
  if (isLoggedIn.value) {
    loadAppointments()
  }
})
</script>

<style scoped>
/* Ваши оригинальные стили из Cabinet.vue – полностью скопированы из вашего файла */
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