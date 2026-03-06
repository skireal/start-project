'use strict'

// Убрать на html класс "no-js": с уровня стилей знаем работает ли JS
document.documentElement.classList.remove('no-js')

// Touch-устройство (для CSS-хуков вида .touch .element { ... })
if ('ontouchstart' in window) {
    document.documentElement.classList.add('touch')
}
