<template>
  <div class="contact-page">
    <!-- Кнопка назад -->
    <button @click="$router.back()" class="back-btn">← Вернуться назад</button>

    <h1 class="page-title">Связь с администрацией</h1>

    <p class="description">
      Оставьте свой номер телефона и вопрос — мы свяжемся с вами в ближайшее время
    </p>

    <div class="form-container">
      <form @submit.prevent="handleSubmit" class="simple-form">
        <div class="input-group">
          <label>Ваше имя</label>
          <input v-model="form.name" type="text" placeholder="Как к вам обращаться" />
        </div>

        <div class="input-group">
          <label>Номер телефона *</label>
          <input
            v-model="form.phone"
            type="tel"
            placeholder="+7 (999) 123-45-67"
            required
          />
        </div>

        <div class="input-group">
          <label>Тема обращения</label>
          <select v-model="form.topic" class="service-select">
            <option value="">-- Выберите тему --</option>
            <option value="Запись на процедуру">Запись на процедуру</option>
            <option value="Вопрос по услуге">Вопрос по услуге</option>
            <option value="Сотрудничество">Сотрудничество</option>
            <option value="Жалоба/предложение">Жалоба / предложение</option>
            <option value="Другое">Другое</option>
          </select>
        </div>

        <div class="input-group">
          <label>Ваш вопрос *</label>
          <textarea
            v-model="form.message"
            class="comment-textarea"
            placeholder="Опишите ваш вопрос подробнее..."
            required
          ></textarea>
        </div>

        <div class="info-note">
          <p> Мы свяжемся с вами по указанному номеру телефона</p>
        </div>

        <button type="submit" class="submit-btn">Отправить обращение</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const form = ref({
  name: "",
  phone: "",
  topic: "",
  message: "",
});

function handleSubmit() {
  // Проверка обязательных полей
  if (!form.value.phone) {
    alert("Пожалуйста, укажите номер телефона");
    return;
  }

  if (!form.value.message) {
    alert("Пожалуйста, напишите ваш вопрос");
    return;
  }

  // Простая валидация телефона
  const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
  if (!phoneRegex.test(form.value.phone.replace(/\s/g, ""))) {
    alert("Пожалуйста, введите корректный номер телефона");
    return;
  }

  // Сохраняем обращение в localStorage (позже заменим на отправку на сервер)
  const requestData = {
    ...form.value,
    timestamp: new Date().toISOString(),
    status: "новое",
  };

  // Получаем существующие обращения или создаём новый массив
  const existingRequests = JSON.parse(localStorage.getItem("contactRequests") || "[]");
  existingRequests.push(requestData);
  localStorage.setItem("contactRequests", JSON.stringify(existingRequests));

  console.log("Отправлено обращение:", requestData);

  // Показываем сообщение об успехе
  const userName = form.value.name ? form.value.name : "Уважаемый клиент";
  alert(
    `${userName}! Ваше обращение отправлено. Мы свяжемся с вами по телефону ${form.value.phone} в ближайшее время.`
  );

  // Очищаем форму
  form.value = {
    name: "",
    phone: "",
    topic: "",
    message: "",
  };

  // Перенаправляем на главную
  router.push("/");
}
</script>

<style scoped>
.contact-page {
  max-width: 500px;
  margin: 0 auto;
  padding: 30px 20px;
  min-height: 100vh;
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

.back-btn:hover {
  color: #333;
}

.page-title {
  font-size: 2rem;
  color: #333;
  text-align: center;
  margin-bottom: 15px;
  font-weight: 400;
}

.description {
  color: #666;
  text-align: center;
  line-height: 1.5;
  margin-bottom: 40px;
}

.form-container {
  background: white;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  margin-bottom: 40px;
}

.simple-form {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.input-group {
  display: flex;
  flex-direction: column;
}

.input-group label {
  color: #333;
  margin-bottom: 8px;
  font-weight: 500;
}

.input-group label:has(~ input[required])::after,
.input-group label:has(~ textarea[required])::after {
  content: "*";
  color: #ff4081;
  margin-left: 4px;
}

.input-group input,
.service-select,
.comment-textarea {
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
  font-family: "Source Serif Pro", serif;
  transition: border-color 0.3s;
}

.input-group input:focus,
.service-select:focus,
.comment-textarea:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.1);
}

.input-group input::placeholder {
  color: #aaa;
}

.service-select {
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 15px center;
  background-size: 15px;
  padding-right: 40px;
  cursor: pointer;
}

.comment-textarea {
  resize: vertical;
  min-height: 100px;
  font-family: inherit;
  line-height: 1.5;
}

.info-note {
  background: #f8f9fa;
  padding: 12px 15px;
  border-radius: 8px;
  text-align: center;
}

.info-note p {
  margin: 0;
  color: #667eea;
  font-size: 14px;
}

.submit-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 14px;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  font-family: "Source Serif Pro", serif;
  margin-top: 10px;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(102, 126, 234, 0.3);
}

@media (max-width: 768px) {
  .contact-page {
    padding: 20px 15px;
  }

  .page-title {
    font-size: 1.8rem;
  }

  .form-container {
    padding: 25px 20px;
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 1.6rem;
  }

  .description {
    font-size: 0.95rem;
  }

  .info-note p {
    font-size: 12px;
  }
}
</style>