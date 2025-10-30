// Простой пример JavaScript

document.addEventListener('DOMContentLoaded', () => {
  console.log('Страница загружена!');

  // Обработка клика по кнопке
  const testBtn = document.getElementById('testBtn');

  if (testBtn) {
    testBtn.addEventListener('click', () => {
      alert('Кнопка работает! Gulp-сборка функционирует корректно.');
    });
  }

  // Плавная прокрутка к якорям
  const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

  smoothScrollLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});
