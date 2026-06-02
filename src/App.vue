<template>
  <div id="app">
    <Header />
    <main class="main-content">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import { onMounted } from 'vue'

onMounted(() => {
  const notified = sessionStorage.getItem('diploma_notified')
  if (!notified) {
    alert('⚠️ Внимание! Данный сайт является дипломной работой и не предназначен для реального использования. Все данные демонстрационные.')
    sessionStorage.setItem('diploma_notified', 'true')
  }
})
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Source Serif Pro", serif;
  background: white;
}

.main-content {
  min-height: calc(100vh - 140px);
}
</style>