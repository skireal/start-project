# Инструкция для Claude

## Обзор проекта

Gulp 4 + Sass + Babel стартовый шаблон с БЭМ-методологией.
Сборка: `npm start` (dev, порт 3030) / `npm run build` (production).

---

## Структура

```
src/
├── scss/
│   ├── global/
│   │   ├── _variables.scss  # SCSS-переменные (цвета, шрифты, брейкпоинты)
│   │   ├── _mixins.scss     # Миксины
│   │   ├── _tokens.scss     # Авто-генерируется из Figma (npm run figma:tokens)
│   │   └── start.scss       # Базовые стили (box-sizing, body и т.д.)
│   ├── blocks/              # SCSS каждого блока — отдельный файл
│   │   ├── burger.scss
│   │   ├── main-nav.scss
│   │   └── ...
│   └── style.scss           # Точка входа — добавлять @import новых блоков сюда
├── js/
│   └── main.js              # Весь JS проекта в одном файле
└── pages/
    └── index.html           # HTML-страницы
```

---

## Создание нового блока

### SCSS (`src/scss/blocks/<name>.scss`)
```scss
.block-name {
    // стили блока

    &__element {
        // стили элемента
    }

    &--modifier {
        // стили модификатора
    }
}
```

### Подключение SCSS
Добавить в `src/scss/style.scss`:
```scss
@import 'blocks/block-name.scss';
```

### JS (`src/js/main.js`)
Весь JS блоков пишется в `main.js` — секциями с комментариями:
```js
/* ==========================================================================
   Название блока
   ========================================================================== */

const elements = document.querySelectorAll('.block-name')
elements.forEach(function(el) {
    // логика блока
})
```

---

## SCSS-переменные

Все переменные проекта — в `src/scss/global/_variables.scss`:

| Категория | Примеры |
|---|---|
| Цвета | `$black`, `$white`, `$gray`, `$corporate`, `$red` |
| Типографика | `$font-size`, `$font-family`, `$line-height` |
| Брейкпоинты | `$mobile` (600px), `$tablet` (1025px), `$notebook` (1380px) |
| Разное | `$border-radius`, `$transition-time`, `$shadow` |

Figma-токены (если запущен `npm run figma:tokens`) доступны как `$token-<имя-стиля>`.

При генерации кода **всегда использовать переменные** вместо хардкода значений.

---

## Работа с Figma MCP

Когда подключён Figma MCP, при работе с макетом:

### Алгоритм генерации блока из Figma

1. Определить имя блока в kebab-case по названию компонента в Figma
2. Создать `src/scss/blocks/<name>.scss` с БЭМ-разметкой
3. Добавить `@import 'blocks/<name>.scss'` в `src/scss/style.scss`
4. Добавить JS-секцию в `src/js/main.js` если есть интерактивность
5. Добавить HTML-разметку в нужный `src/pages/*.html`

### Соответствие Figma → SCSS

- Цвета из Figma → проверить есть ли в `_variables.scss` или `_tokens.scss`, предпочитать переменные
- Отступы → `padding` / `margin` в px как есть (или rem если > 16px)
- Шрифты → `$font-family` из переменных, размер — если есть `$font-size-*` подходящий — использовать
- Брейкпоинты → через `@media (max-width: #{$tablet})` и т.д.
- Тени → проверить `$shadow` в переменных

### Пример запроса к Claude с Figma MCP

```
Открой figma.com/design/FILE_ID/...
Сгенерируй БЭМ-блок .hero по фрейму "Hero / Desktop"
```

### Доступность (accessibility)

При генерации HTML всегда добавлять:
- `aria-label` / `aria-labelledby` для интерактивных элементов без текста
- `aria-expanded` для раскрывающихся компонентов (бургер, аккордеон, дропдаун)
- `aria-controls` для кнопок, управляющих другим элементом
- `aria-current="page"` для активного пункта навигации
- `role` при необходимости (dialog, navigation, main и т.д.)

---

## Npm-скрипты

| Команда | Описание |
|---|---|
| `npm start` | Dev-сервер на порту 3030 |
| `npm run build` | Production-сборка |
| `npm run figma:tokens` | Синхронизация токенов из Figma → `_tokens.scss` |
| `npm run format` | Prettier по всем src-файлам |
| `npm run scss-lint` | Линтинг SCSS |
| `npm run eslint-fix` | Автофикс JS |
