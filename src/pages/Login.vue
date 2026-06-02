<template>
  <div class="login-page">
    <button @click="goBack" class="back-btn">← Вернуться назад</button>

    <h1 class="page-title">Войти в аккаунт</h1>

    <div v-if="showHttpsWarning" class="security-warning">
      ⚠️ <strong>Внимание:</strong> Сайт использует небезопасное соединение HTTP.
    </div>

    <div class="login-container">
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="input-group">
          <label for="login">Логин, номер телефона или адрес почты</label>
          <input
            v-model="credentials.login"
            type="text"
            id="login"
            placeholder="Введите логин, телефон или email"
            required
            class="login-input"
            autocomplete="username"
          />
        </div>

        <div class="input-group">
          <label for="password">Пароль</label>
          <div class="password-wrapper">
            <input
              v-model="credentials.password"
              :type="showPassword ? 'text' : 'password'"
              id="password"
              placeholder="Введите пароль"
              required
              class="password-input"
              minlength="6"
              autocomplete="current-password"
            />
            <button type="button" class="toggle-password" @click="togglePassword">
              {{ showPassword ? "👁️" : "👁️‍🗨️" }}
            </button>
          </div>
          <small class="password-hint">Минимум 6 символов</small>
        </div>

        <div class="remember-me">
          <input v-model="rememberMe" type="checkbox" id="remember" class="checkbox" />
          <label for="remember">Запомнить меня</label>
        </div>

        <button type="submit" class="login-btn" :disabled="isLoading">
          {{ isLoading ? "Вход..." : "Войти" }}
        </button>

        <div class="form-links">
          <div class="register-section">
            <p>Нет аккаунта?</p>
            <router-link to="/register" class="register-link">
              Зарегистрироваться
            </router-link>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const credentials = ref({
  login: "",
  password: "",
});

const showHttpsWarning = ref(false);
const rememberMe = ref(false);
const showPassword = ref(false);
const isLoading = ref(false);

function togglePassword() {
  showPassword.value = !showPassword.value;
}

function goBack() {
  router.back();
}

async function handleLogin() {
  if (!credentials.value.login || !credentials.value.password) {
    alert("Пожалуйста, заполните все поля");
    return;
  }

  if (credentials.value.password.length < 6) {
    alert("Пароль должен содержать минимум 6 символов");
    return;
  }

  isLoading.value = true;

  try {
    await new Promise((resolve) => setTimeout(resolve, 800));

    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]')
    
    const foundUser = existingUsers.find(
      user => user.login === credentials.value.login
    )

    if (!foundUser) {
      alert('❌ Пользователь с таким логином не найден. Зарегистрируйтесь сначала.')
      isLoading.value = false
      return
    }

    if (foundUser.password !== credentials.value.password) {
      alert('❌ Неверный пароль. Попробуйте снова.')
      isLoading.value = false
      return
    }

    const token = 'auth-token-' + Date.now() + '-' + Math.random().toString(36).substr(2, 8)
    localStorage.setItem('token', token)
    
    // Сохраняем данные пользователя ВКЛЮЧАЯ флаг isAdmin
    localStorage.setItem('user', JSON.stringify({
      login: credentials.value.login,
      name: foundUser.name,
      phone: foundUser.phone,
      isAdmin: foundUser.isAdmin || false  // ← добавляем флаг администратора
    }))

    credentials.value.password = ""
    
    alert(`✅ Добро пожаловать, ${foundUser.name || credentials.value.login}!`)
    
    await router.push("/");
    
  } catch (error) {
    console.error("Ошибка входа:", error);
    alert("❌ Ошибка входа. Проверьте данные и попробуйте снова.");
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => {
  const isLocalhost =
    window.location.hostname.includes("localhost") ||
    window.location.hostname.includes("127.0.0.1");

  if (window.location.protocol !== "https:" && !isLocalhost) {
    showHttpsWarning.value = true;
  }
});
</script>

<style scoped>
.login-page {
  max-width: 450px;
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
  margin-bottom: 30px;
  font-weight: 400;
}

.security-warning {
  background-color: #fff3cd;
  border: 1px solid #ffeaa7;
  color: #856404;
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 20px;
  font-size: 0.9rem;
  text-align: center;
}

.login-container {
  background: white;
  border-radius: 12px;
  padding: 35px 30px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  margin-bottom: 30px;
}

.login-form {
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
  font-size: 0.95rem;
}

.login-input,
.password-input {
  padding: 14px 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  font-family: "Source Serif Pro", serif;
  color: #333;
  transition: all 0.3s;
  box-sizing: border-box;
}

.login-input:focus,
.password-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.login-input::placeholder,
.password-input::placeholder {
  color: #aaa;
}

.password-wrapper {
  position: relative;
}

.password-input {
  width: 100%;
  padding-right: 50px;
}

.password-hint {
  color: #666;
  font-size: 0.85rem;
  margin-top: 5px;
  opacity: 0.7;
}

.toggle-password {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #666;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.toggle-password:hover {
  color: #333;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: -10px;
}

.checkbox {
  width: 18px;
  height: 18px;
  border: 2px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  accent-color: #667eea;
}

.remember-me label {
  color: #666;
  font-size: 0.95rem;
  cursor: pointer;
}

.login-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 16px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  font-family: "Source Serif Pro", serif;
  margin-top: 10px;
}

.login-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
}

.login-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.form-links {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  margin-top: 20px;
}

.register-section {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 10px;
}

.register-section p {
  color: #666;
  font-size: 0.95rem;
  margin: 0;
}

.register-link {
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
}

.register-link:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .login-page {
    padding: 20px 15px;
  }
  .page-title {
    font-size: 1.8rem;
  }
  .login-container {
    padding: 30px 25px;
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 1.6rem;
  }
  .login-container {
    padding: 25px 20px;
  }
  .login-input,
  .password-input {
    padding: 12px 14px;
    font-size: 15px;
  }
  .login-btn {
    padding: 14px;
    font-size: 15px;
  }
}
</style>