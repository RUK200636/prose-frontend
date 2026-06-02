import { createRouter, createWebHistory } from 'vue-router'

// Функция для обновления мета-тегов
function updateMetaTags(meta) {
  const dynamicTags = document.querySelectorAll('meta[name="description"], meta[name="keywords"], meta[property^="og:"], meta[name^="twitter:"]')
  dynamicTags.forEach(tag => tag.remove())

  const tags = [
    { name: 'description', content: meta.description || 'Лучшая косметология Владивостока' },
    { name: 'keywords', content: meta.keywords || 'косметология, Владивосток, красота' },
    { name: 'robots', content: meta.robots || 'index, follow' },
    { property: 'og:title', content: meta.title || 'PROSESITE - Косметология Владивостока' },
    { property: 'og:description', content: meta.description || 'Лучшая косметология Владивостока' },
    { property: 'og:image', content: meta.ogImage || 'https://ваш-сайт.ru/og-default.jpg' },
    { property: 'og:url', content: meta.ogUrl || window.location.href },
    { property: 'og:type', content: meta.ogType || 'website' },
    { property: 'og:locale', content: 'ru_RU' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: meta.title || 'PROSESITE - Косметология Владивостока' },
    { name: 'twitter:description', content: meta.description || 'Лучшая косметология Владивостока' },
    { name: 'twitter:image', content: meta.ogImage || 'https://ваш-сайт.ru/twitter-default.jpg' }
  ]

  tags.forEach(tagConfig => {
    let tag = document.createElement('meta')
    if (tagConfig.property) {
      tag.setAttribute('property', tagConfig.property)
    } else {
      tag.setAttribute('name', tagConfig.name)
    }
    tag.setAttribute('content', tagConfig.content)
    document.head.appendChild(tag)
  })

  let canonical = document.querySelector('link[rel="canonical"]')
  if (!canonical) {
    canonical = document.createElement('link')
    canonical.setAttribute('rel', 'canonical')
    document.head.appendChild(canonical)
  }
  canonical.setAttribute('href', window.location.href)
}

const routes = [
  {
    path: '/',
    component: () => import('./pages/Home.vue'),
    meta: {
      title: 'Главная | PROSESITE - Косметология Владивостока',
      description: 'Лучшая косметология Владивостока. Профессиональный уход за кожей, современные процедуры.',
      keywords: 'косметология, Владивосток, уход за лицом, косметолог',
      ogImage: 'https://ваш-сайт.ru/og-home.jpg',
      robots: 'index, follow'
    }
  },
  {
    path: '/about',
    component: () => import('./pages/About.vue'),
    meta: {
      title: 'О нас | PROSESITE',
      description: 'Команда косметологов PROSESITE, сертификаты, наш подход к красоте.',
      keywords: 'косметологи Владивосток, специалисты, о клинике',
      robots: 'index, follow'
    }
  },
  {
    path: '/contact',
    component: () => import('./pages/Contact.vue'),
    meta: {
      title: 'Контакты | PROSESITE',
      description: 'Контакты косметологического центра PROSESITE во Владивостоке.',
      keywords: 'контакты косметолога Владивосток, запись на прием',
      robots: 'index, follow'
    }
  },
  {
    path: '/price',
    component: () => import('./pages/Price.vue'),
    meta: {
      title: 'Услуги и цены | PROSESITE',
      description: 'Прайс-лист на косметологические услуги.',
      keywords: 'цены косметология Владивосток, стоимость процедур',
      robots: 'index, follow'
    }
  },
  {
    path: '/cabinet',
    component: () => import('./pages/Cabinet.vue'),
    meta: {
      title: 'Личный кабинет | PROSESITE',
      description: 'Ваши записи, история процедур, личные данные.',
      robots: 'noindex, nofollow'
    }
  },
  {
    path: '/cart',
    component: () => import('./pages/Cart.vue'),
    meta: {
      title: 'Корзина | PROSESITE',
      description: 'Ваши выбранные услуги и товары.',
      robots: 'noindex, nofollow'
    }
  },
  {
    path: '/admin',
    component: () => import('./pages/Admin.vue'),
    meta: {
      title: 'Админ-панель | PROSESITE',
      description: 'Управление записями клиентов.',
      robots: 'noindex, nofollow'
    }
  },
  {
    path: '/login',
    component: () => import('./pages/Login.vue'),
    meta: {
      title: 'Вход | PROSESITE',
      description: 'Вход в личный кабинет.',
      robots: 'noindex, nofollow'
    }
  },
  {
    path: '/register',
    component: () => import('./pages/Register.vue'),
    meta: {
      title: 'Регистрация | PROSESITE',
      description: 'Регистрация в личном кабинете.',
      robots: 'noindex, nofollow'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Защитник маршрутов — все страницы доступны без авторизации
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  } else {
    document.title = 'PROSESITE - Косметология Владивостока'
  }
  updateMetaTags(to.meta)
  // Пропускаем все маршруты без проверки
  next()
})

export default router