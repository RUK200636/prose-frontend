<template>
  <div class="cart-page">
    <button @click="$router.back()" class="back-btn">← Вернуться назад</button>

    <h1 class="page-title">Корзина услуг</h1>

    <div v-if="cartItems.length === 0" class="empty-cart">
      <div class="empty-icon">🛒</div>
      <p>Корзина пуста</p>
      <router-link to="/price" class="btn-purple">Перейти к услугам</router-link>
    </div>

    <div v-else class="cart-container">
      <div class="cart-items">
        <div v-for="item in cartItems" :key="item.id" class="cart-item">
          <div class="item-info">
            <h3 class="item-name">{{ item.name }}</h3>
            <p class="item-price">{{ item.price }} ₽</p>
          </div>

          <div class="item-actions">
            <div class="quantity-control">
              <button @click="decreaseQuantity(item.id)" class="qty-btn">−</button>
              <span class="qty-value">{{ item.quantity }}</span>
              <button @click="increaseQuantity(item.id)" class="qty-btn">+</button>
            </div>
            <button @click="removeItem(item.id)" class="remove-btn">Удалить</button>
          </div>
        </div>
      </div>

      <!-- Выбор даты и времени -->
      <div class="appointment-section">
        <h3>Выберите дату и время записи</h3>
        <div class="datetime-picker">
          <div class="date-picker">
            <label>Дата:</label>
            <input type="date" v-model="selectedDate" :min="minDate" @change="onDateChange" />
          </div>
          <div class="time-picker">
            <label>Время:</label>
            <select v-model="selectedTime" @change="onTimeChange">
              <option v-for="time in availableTimes" :key="time" :value="time" :disabled="isTimeSlotTaken(time)">
                {{ time }} {{ isTimeSlotTaken(time) ? '❌ (занято)' : '✅ (свободно)' }}
              </option>
            </select>
          </div>
        </div>
        <div v-if="selectedDate && selectedTime && isTimeSlotTaken(selectedTime)" class="time-error">
          ⚠️ Выбранное время занято. Минимальный интервал между записями — 2 часа.
        </div>
      </div>

      <div class="cart-summary">
        <div class="summary-row">
          <span>Итого:</span>
          <span class="total-price">{{ totalPrice }} ₽</span>
        </div>
        <button class="checkout-btn" :disabled="!isTimeAvailable" @click="checkout">
          Оформить запись
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const cartItems = ref([])
const selectedDate = ref('')
const selectedTime = ref('10:00')
const allAppointments = ref([])

// Минимальная дата — сегодня
const minDate = new Date().toISOString().split('T')[0]

// Доступные часы для записи
const allTimes = [
  '09:00', '10:00', '11:00', '12:00', '13:00',
  '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'
]

const availableTimes = ref([...allTimes])

// Конвертация времени в минуты
function timeToMinutes(timeStr) {
  const [hours, minutes] = timeStr.split(':').map(Number)
  return hours * 60 + minutes
}

// Проверка, занято ли время
function isTimeSlotTaken(time) {
  if (!selectedDate.value) return false
  
  const appointmentsOnDate = allAppointments.value.filter(app => {
    const appDate = app.date.split(' ')[0]
    return appDate === selectedDate.value && (app.status === 'confirmed' || app.status === 'pending')
  })
  
  const takenTimes = appointmentsOnDate.map(app => {
    const timePart = app.date.split(' ')[1]
    return timePart
  }).filter(t => t)
  
  if (takenTimes.includes(time)) return true
  
  const timeMinutes = timeToMinutes(time)
  
  for (const takenTime of takenTimes) {
    const takenMinutes = timeToMinutes(takenTime)
    const diff = Math.abs(timeMinutes - takenMinutes)
    if (diff < 120) {
      return true
    }
  }
  
  return false
}

const isTimeAvailable = computed(() => {
  return selectedDate.value && selectedTime.value && !isTimeSlotTaken(selectedTime.value)
})

function onDateChange() {
  if (!isTimeSlotTaken('10:00')) {
    selectedTime.value = '10:00'
  } else {
    const freeTime = allTimes.find(t => !isTimeSlotTaken(t))
    if (freeTime) {
      selectedTime.value = freeTime
    } else {
      selectedTime.value = ''
    }
  }
}

function onTimeChange() {}

// Получение email пользователя из всех возможных источников
function getUserEmail() {
  // 1. Из user (после входа)
  const user = localStorage.getItem('user')
  if (user) {
    const userData = JSON.parse(user)
    const email = userData.login || userData.email || ''
    if (email) return email
  }
  
  // 2. Из userData (после регистрации)
  const userDataStorage = localStorage.getItem('userData')
  if (userDataStorage) {
    const data = JSON.parse(userDataStorage)
    const email = data.email || data.login || ''
    if (email) return email
  }
  
  // 3. Из users
  const users = localStorage.getItem('users')
  if (users) {
    const usersList = JSON.parse(users)
    if (usersList.length > 0) {
      return usersList[0].login || ''
    }
  }
  
  return ''
}

function loadCart() {
  const saved = localStorage.getItem('cart')
  if (saved) {
    cartItems.value = JSON.parse(saved)
  }
}

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cartItems.value))
}

function loadAppointments() {
  const saved = localStorage.getItem('appointments')
  if (saved) {
    allAppointments.value = JSON.parse(saved)
  }
}

function increaseQuantity(id) {
  const item = cartItems.value.find(i => i.id === id)
  if (item) {
    item.quantity++
    saveCart()
  }
}

function decreaseQuantity(id) {
  const item = cartItems.value.find(i => i.id === id)
  if (item) {
    if (item.quantity > 1) {
      item.quantity--
      saveCart()
    } else {
      removeItem(id)
    }
  }
}

function removeItem(id) {
  cartItems.value = cartItems.value.filter(i => i.id !== id)
  saveCart()
}

function checkout() {
  if (cartItems.value.length === 0) {
    alert('Корзина пуста')
    return
  }

  if (!selectedDate.value) {
    alert('Пожалуйста, выберите дату записи')
    return
  }

  if (!selectedTime.value) {
    alert('Пожалуйста, выберите время записи')
    return
  }

  if (isTimeSlotTaken(selectedTime.value)) {
    alert('Выбранное время занято. Пожалуйста, выберите другое время.')
    return
  }

  const appointmentDateTime = `${selectedDate.value} ${selectedTime.value}`

  // Получаем email пользователя
  const userEmail = getUserEmail()
  
  console.log('📧 Email для записи:', userEmail)

  if (!userEmail) {
    alert('Не удалось определить ваш email. Пожалуйста, войдите в аккаунт заново.')
    return
  }

  const appointments = JSON.parse(localStorage.getItem('appointments') || '[]')

  for (const item of cartItems.value) {
    for (let i = 0; i < item.quantity; i++) {
      appointments.push({
        id: Date.now() + Math.random() * 1000 + i,
        service: item.name,
        price: item.price,
        date: appointmentDateTime,
        status: 'pending',
        userEmail: userEmail,
        createdAt: new Date().toISOString()
      })
    }
  }

  localStorage.setItem('appointments', JSON.stringify(appointments))

  cartItems.value = []
  saveCart()

  selectedDate.value = ''
  selectedTime.value = '10:00'

  alert('✅ Запись оформлена! Мы свяжемся с вами для подтверждения.\nВы можете отслеживать статус в личном кабинете.')
  router.push('/cabinet')
}

onMounted(() => {
  loadCart()
  loadAppointments()
})

const totalPrice = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + (item.price * item.quantity), 0)
})
</script>

<style scoped>
.cart-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 30px 20px;
  min-height: 70vh;
}

.back-btn {
  background: none;
  border: none;
  color: #666;
  font-size: 16px;
  cursor: pointer;
  padding: 10px 0;
  margin-bottom: 20px;
  font-family: "Source Serif Pro", serif;
}

.page-title {
  font-size: 2rem;
  color: #333;
  text-align: center;
  margin-bottom: 30px;
  font-weight: 400;
}

.empty-cart {
  text-align: center;
  padding: 60px 20px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 20px;
  opacity: 0.5;
}

.btn-purple {
  display: inline-block;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 12px 30px;
  border-radius: 30px;
  text-decoration: none;
  transition: all 0.3s;
}

.cart-container {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.cart-items {
  background: white;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #f0f0f0;
}

.cart-item:last-child {
  border-bottom: none;
}

.item-info {
  flex: 2;
}

.item-name {
  font-size: 1.1rem;
  font-weight: 500;
  color: #333;
  margin-bottom: 5px;
}

.item-price {
  color: #667eea;
  font-weight: 500;
}

.item-actions {
  display: flex;
  align-items: center;
  gap: 15px;
}

.quantity-control {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #f8f9fa;
  border-radius: 30px;
  padding: 5px 10px;
}

.qty-btn {
  background: none;
  border: none;
  font-size: 1.2rem;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  cursor: pointer;
}

.qty-btn:hover {
  background: #667eea;
  color: white;
}

.qty-value {
  min-width: 30px;
  text-align: center;
  font-weight: 500;
}

.remove-btn {
  background: none;
  border: 1px solid #dc3545;
  color: #dc3545;
  padding: 6px 14px;
  border-radius: 20px;
  cursor: pointer;
}

.remove-btn:hover {
  background: #dc3545;
  color: white;
}

.appointment-section {
  background: white;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.appointment-section h3 {
  margin-bottom: 15px;
  color: #333;
  font-weight: 500;
}

.datetime-picker {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.date-picker, .time-picker {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.date-picker label, .time-picker label {
  font-weight: 500;
  color: #666;
  font-size: 0.9rem;
}

.date-picker input, .time-picker select {
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  font-family: inherit;
}

.date-picker input:focus, .time-picker select:focus {
  outline: none;
  border-color: #667eea;
}

.time-error {
  margin-top: 12px;
  padding: 8px 12px;
  background: #fff3cd;
  border-radius: 8px;
  color: #856404;
  font-size: 0.85rem;
}

.cart-summary {
  background: white;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.summary-row {
  display: flex;
  justify-content: space-between;
  font-size: 1.2rem;
  font-weight: 500;
  padding-bottom: 15px;
  border-bottom: 1px solid #f0f0f0;
  margin-bottom: 15px;
}

.total-price {
  color: #667eea;
  font-size: 1.3rem;
}

.checkout-btn {
  width: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 14px;
  border-radius: 30px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}

.checkout-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.checkout-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

@media (max-width: 768px) {
  .cart-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .item-actions {
    width: 100%;
    justify-content: space-between;
  }

  .datetime-picker {
    flex-direction: column;
  }

  .date-picker input, .time-picker select {
    width: 100%;
  }
}
</style>