# Стартовая сборка на Gulp 4

Gulp-сборка для вёрстки: HTML с инклудами, Sass, JS с Babel и ESLint, оптимизация изображений, WebP, SVG-спрайт, генерация фавиконок.

## Требования

- [Node.js LTS](https://nodejs.org/) (v16+)
- [Git](https://git-scm.com/)

## Установка

```bash
git clone https://github.com/skireal/start-project.git my-project
cd my-project
rm -rf .git
npm install
```

## Команды

```bash
npm start        # дев-сборка + сервер с live reload
npm run build    # продакшн-сборка (JS минифицируется, sourcemap'ы не генерируются)
```

---

## Структура проекта

```
src/
├── blocks/          # компоненты (HTML + SCSS + JS в одной папке)
├── img/
│   ├── icons/       # SVG-иконки для спрайта (одна иконка = один файл)
│   └── favicon.png  # источник для генерации фавиконок (512×512, добавить самому)
├── js/
│   ├── head.js      # скрипт в <head> (без defer/async)
│   └── main.js      # основной скрипт (defer)
├── pages/           # страницы (точки входа для сборки)
└── scss/
    ├── blocks/      # стили блоков
    ├── global/      # normalize, переменные, миксины
    └── style.scss   # точка входа

build/               # результат сборки (не коммитится)
gulp/tasks/          # задачи Gulp
```

---

## HTML

Инклуды через `gulp-file-include` с префиксом `@@`:

```html
@@include('../blocks/head/head.html', {"title": "Главная"})
@@include('../blocks/header/header.html')
@@include('../blocks/footer/footer.html')
```

Страницы лежат в `src/pages/`, собираются в `build/`.

---

## SCSS

- Компилятор: **Dart Sass**
- Autoprefixer — добавляет вендорные префиксы автоматически
- Shorthand — сворачивает margin/padding/border в сокращённую форму
- CSSComb — форматирование свойств по порядку
- В dev-режиме генерируются sourcemap'ы (`.map` рядом с CSS)

Переменные, миксины и базовые стили — в `src/scss/global/`.

---

## JavaScript

- **Rigger** — инклуды через `//= path/to/file.js`
- **Babel** — транспиляция ES6+
- **ESLint** — линтинг (конфиг `htmlacademy/es6`: без точек с запятой, отступы 4 пробела)
- В dev-режиме генерируются sourcemap'ы
- В продакшн-режиме JS минифицируется через **Terser**

Вендорные библиотеки (Swiper, Choices.js) берутся из `node_modules` и собираются в `build/js/vendors.js`.

---

## Изображения

- **Оптимизация** — `gulp-imagemin` сжимает все изображения из `src/img/**`
- **WebP** — автоматически конвертирует PNG/JPG в WebP рядом с оригиналом

Использование WebP с фоллбеком:

```html
<picture>
  <source srcset="img/photo.webp" type="image/webp">
  <img src="img/photo.jpg" alt="">
</picture>
```

---

## SVG-спрайт

Иконки из `src/img/icons/*.svg` собираются в `build/img/icons.svg`.

Требования к иконкам:
- Без атрибутов `fill`/`stroke` с конкретными цветами — цвет управляется через CSS
- Имя файла становится `id` иконки в спрайте

Использование:

```html
<svg class="icon" width="24" height="24" aria-hidden="true">
  <use href="img/icons.svg#arrow-down"></use>
</svg>
```

Цвет и размер управляются через CSS (`fill: currentColor`). Базовый класс `.icon` подключён в `src/blocks/sprite-svg/sprite-svg.scss`.

---

## Фавиконки

Положи `src/img/favicon.png` (рекомендуется 512×512). При сборке автоматически генерируются:

| Файл | Назначение |
|------|-----------|
| `favicon.ico` | Браузерная вкладка (legacy) |
| `favicon-16x16.png`, `favicon-32x32.png` | Браузерная вкладка |
| `apple-touch-icon.png` (180×180) | iOS / macOS |
| `site.webmanifest` | PWA-манифест |

Файлы попадают в `build/img/favicons/`. Теги уже прописаны в `src/blocks/head/head.html`.

Если файла нет — задача тихо пропускается, сборка не падает.

---

## Продакшн-сборка

```bash
npm run build
```

Отличия от dev:
- JS минифицируется (Terser)
- Sourcemap'ы не генерируются
- Сервер не запускается
