<template>
  <div class="about-page">
    <button @click="$router.back()" class="back-button">← Вернуться назад</button>

    <h1 class="page-title">О нас</h1>

    <!-- Блок о бренде -->
    <div class="brand-section">
      <h2 class="section-title">О бренде PROSE</h2>
      <div class="brand-content">
        <p>
          PROSE — это современный косметологический центр во Владивостоке, основанный в 2015 году.
          Мы объединили передовые технологии и индивидуальный подход, чтобы помочь нашим клиентам
          выглядеть и чувствовать себя прекрасно.
        </p>
        <p>
          Наша философия — гармония между красотой и здоровьем. Мы используем только сертифицированные
          препараты и оборудование премиум-класса, прошедшее все необходимые клинические испытания.
        </p>
      </div>
    </div>

    <!-- Достижения компании -->
    <div class="achievements-section">
      <h2 class="section-title">Наши достижения</h2>
      <div class="achievements-grid">
        <div class="achievement-card">
          <div class="achievement-icon">🏆</div>
          <div class="achievement-text">
            <h4>Лидер рынка</h4>
            <p>Признаны лучшим косметологическим центром Владивостока в 2023 и 2024 году</p>
          </div>
        </div>
        <div class="achievement-card">
          <div class="achievement-icon">📜</div>
          <div class="achievement-text">
            <h4>Сертификация</h4>
            <p>Все специалисты имеют международные сертификаты и регулярно повышают квалификацию</p>
          </div>
        </div>
        <div class="achievement-card">
          <div class="achievement-icon">🔬</div>
          <div class="achievement-text">
            <h4>Инновации</h4>
            <p>Первыми во Владивостоке внедрили аппараты последнего поколения для RF-лифтинга</p>
          </div>
        </div>
        <div class="achievement-card">
          <div class="achievement-icon">⭐</div>
          <div class="achievement-text">
            <h4>Клиенты</h4>
            <p>Более 5000 довольных клиентов за 8 лет работы</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Миссия и ценности -->
    <div class="mission-section">
      <h2 class="section-title">Наша миссия</h2>
      <div class="mission-content">
        <p>
          Мы стремимся сделать качественную косметологию доступной каждому, кто хочет сохранить
          молодость и красоту. Наша задача — не просто провести процедуру, а создать комплексную
          программу ухода с учётом индивидуальных особенностей каждого клиента.
        </p>
        <div class="values">
          <span class="value-tag">Профессионализм</span>
          <span class="value-tag">Индивидуальный подход</span>
          <span class="value-tag">Безопасность</span>
          <span class="value-tag">Результат</span>
        </div>
      </div>
    </div>

    <div class="team-section">
      <h2 class="section-title">Наша команда</h2>

      <div class="team-member">
        <div class="member-photo">
          <img src="@/assets/specialists/alek.png" alt="Алексей" class="photo" />
        </div>
        <div class="member-info">
          <h3 class="member-name">Алексей</h3>
          <p class="member-position">Специалист по лазерным технологиям</p>
          <p class="member-description">
            Опыт работы 8 лет. Сертифицированный специалист по лазерной эпиляции. Работает
            на оборудовании последнего поколения.
          </p>
        </div>
      </div>

      <div class="team-member">
        <div class="member-photo">
          <img src="@/assets/specialists/svet.png" alt="Светлана" class="photo" />
        </div>
        <div class="member-info">
          <h3 class="member-name">Светлана</h3>
          <p class="member-position">Специалист по Rf-лифтингу</p>
          <p class="member-description">
            Опыт работы 6 лет. Эксперт в области аппаратной косметологии. Прошла обучение
            в Германии и Южной Корее.
          </p>
        </div>
      </div>

      <div class="team-member">
        <div class="member-photo">
          <img src="@/assets/specialists/ana.png" alt="Анастасия" class="photo" />
        </div>
        <div class="member-info">
          <h3 class="member-name">Анастасия</h3>
          <p class="member-position">Специалист по ультразвуковым технологиям</p>
          <p class="member-description">
            Опыт работы 5 лет. Специализируется на коррекции фигуры и anti-age программах.
          </p>
        </div>
      </div>

      <div class="team-member">
        <div class="member-photo">
          <img src="@/assets/specialists/oks.png" alt="Оксана" class="photo" />
        </div>
        <div class="member-info">
          <h3 class="member-name">Оксана</h3>
          <p class="member-position">Специалист по вакуумно-роликовому массажу</p>
          <p class="member-description">
            Опыт работы 7 лет. Мастер LPG-массажа и аппаратного лимфодренажа.
            Сертифицированный тренер.
          </p>
        </div>
      </div>
    </div>

    <div class="about-section">
      <h2 class="section-title">О салоне PROSE</h2>
      <div class="about-content">
        <p>
          Наш салон был основан в 2015 году с целью создания пространства, где современные
          технологии встречаются с индивидуальным подходом к каждому клиенту.
        </p>
        <p>
          Мы используем только сертифицированное оборудование и качественные материалы.
          Все процедуры проводятся под контролем опытных специалистов с медицинским
          образованием.
        </p>
        <div class="stats">
          <div class="stat">
            <span class="stat-number">8+</span>
            <span class="stat-label">Лет на рынке</span>
          </div>
          <div class="stat">
            <span class="stat-number">5000+</span>
            <span class="stat-label">Довольных клиентов</span>
          </div>
          <div class="stat">
            <span class="stat-number">15+</span>
            <span class="stat-label">Сертификатов качества</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.about-page {
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 20px;
}

.back-button {
  background: none;
  border: none;
  color: #666;
  font-size: 16px;
  cursor: pointer;
  padding: 10px 0;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.back-button:hover {
  color: #333;
}

.page-title {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 50px;
  color: #333;
  font-weight: 300;
}

.section-title {
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 30px;
  padding-bottom: 10px;
  border-bottom: 2px solid #f0f0f0;
}

.brand-content, .mission-content {
  background: #f8f9fa;
  padding: 30px;
  border-radius: 16px;
  margin-bottom: 20px;
}

.brand-content p, .mission-content p {
  color: #555;
  line-height: 1.6;
  font-size: 1.05rem;
  margin-bottom: 15px;
}

.values {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 20px;
}

.value-tag {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 8px 20px;
  border-radius: 30px;
  font-size: 0.9rem;
}

.achievements-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.achievement-card {
  display: flex;
  align-items: flex-start;
  gap: 15px;
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s;
}

.achievement-card:hover {
  transform: translateY(-3px);
}

.achievement-icon {
  font-size: 2rem;
}

.achievement-text h4 {
  font-size: 1.1rem;
  color: #667eea;
  margin-bottom: 5px;
}

.achievement-text p {
  color: #666;
  font-size: 0.9rem;
  line-height: 1.4;
}

.team-section,
.about-section {
  margin-bottom: 60px;
}

.team-member {
  background: white;
  border-radius: 12px;
  padding: 25px;
  margin-bottom: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s, box-shadow 0.3s;
  display: flex;
  gap: 25px;
  align-items: flex-start;
}

.team-member:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
}

.member-photo {
  flex-shrink: 0;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid #f0f0f0;
  background: #f8f9fa;
}

.photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.team-member:hover .photo {
  transform: scale(1.05);
}

.member-info {
  flex: 1;
}

.member-name {
  font-size: 1.4rem;
  color: #333;
  margin-bottom: 5px;
  margin-top: 10px;
}

.member-position {
  color: #667eea;
  font-weight: 500;
  margin-bottom: 15px;
  font-size: 1.1rem;
}

.member-description {
  color: #666;
  line-height: 1.6;
  font-size: 1rem;
}

.about-content p {
  color: #666;
  line-height: 1.6;
  margin-bottom: 20px;
  font-size: 1.1rem;
}

.stats {
  display: flex;
  justify-content: space-around;
  margin-top: 40px;
  padding: 30px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  color: white;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 0.9rem;
  opacity: 0.9;
}

@media (max-width: 768px) {
  .team-member {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 20px;
  }

  .member-photo {
    width: 120px;
    height: 120px;
  }

  .member-name {
    margin-top: 0;
  }

  .stats {
    flex-direction: column;
    gap: 25px;
    padding: 25px 15px;
  }

  .stat-number {
    font-size: 2rem;
  }

  .achievements-grid {
    grid-template-columns: 1fr;
  }
}
</style>