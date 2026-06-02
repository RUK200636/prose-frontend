<template>
  <div class="admin-page">
    <h1>Панель администратора</h1>
    <p>Страница загрузилась!</p>
    
    <div class="stats-cards">
      <div class="stat-card">
        <div class="stat-number">{{ appointments.length }}</div>
        <div class="stat-label">Всего записей</div>
      </div>
    </div>

    <div v-if="appointments.length === 0" class="empty-state">
      <p>📋 Нет записей</p>
      <button @click="addTestData" class="test-btn">➕ Добавить тестовую запись</button>
    </div>

    <div v-else class="appointments-list">
      <div v-for="app in appointments" :key="app.id" class="appointment-card">
        <p><strong>{{ app.service }}</strong> — {{ app.date }}</p>
        <p>Клиент: {{ app.userEmail }}</p>
        <span :class="['status', app.status]">{{ app.status }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const appointments = ref([])

function loadAppointments() {
  const saved = localStorage.getItem('appointments')
  console.log('Загружено:', saved)
  if (saved) {
    appointments.value = JSON.parse(saved)
  }
}

function addTestData() {
  const newApp = {
    id: Date.now(),
    service: 'Лазерная эпиляция',
    price: 5000,
    date: '2025-05-20 14:00',
    status: 'pending',
    userEmail: 'test@example.com'
  }
  appointments.value.push(newApp)
  localStorage.setItem('appointments', JSON.stringify(appointments.value))
  alert('Тестовая запись добавлена!')
}

onMounted(() => {
  loadAppointments()
})
</script>

<style scoped>
.admin-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
}

h1 {
  color: #333;
  margin-bottom: 10px;
}

.stats-cards {
  display: flex;
  gap: 20px;
  margin: 30px 0;
}

.stat-card {
  background: #667eea;
  color: white;
  padding: 20px;
  border-radius: 12px;
  text-align: center;
}

.stat-number {
  font-size: 2rem;
  font-weight: bold;
}

.empty-state {
  text-align: center;
  padding: 50px;
  background: #f8f9fa;
  border-radius: 12px;
}

.test-btn {
  background: #28a745;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 15px;
}

.appointment-card {
  background: white;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.status {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
}

.status.pending {
  background: #fff3cd;
  color: #856404;
}
</style>