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
npm start             # дев-сборка + сервер с live reload
npm run build         # продакшн-сборка (JS минифицируется, sourcemap'ы не генерируются)
npm run eslint-fix    # автофиксинг JS через ESLint
npm run scss-lint     # проверка SCSS через Stylelint
npm run scss-fix      # автофиксинг SCSS через Stylelint
npm run format        # форматирование src/**/*.{html,scss,js} через Prettier
```

---

## Структура проекта

```
src/
├── blocks/          # компоненты (SCSS + JS в одной папке)
├── img/
│   ├── icons/       # SVG-иконки для спрайта (одна иконка = один файл)
│   └── favicon.png  # источник для генерации фавиконок (512×512, добавить самому)
├── js/
│   └── main.js      # основной скрипт (подключается с defer)
├── pages/           # страницы (точки входа для сборки)
└── scss/
    ├── global/      # normalize, переменные, миксины
    └── style.scss   # точка входа

build/               # результат сборки (не коммитится)
gulp/tasks/          # задачи Gulp
```

---

## HTML

Страницы лежат в `src/pages/` и собираются в `build/`. При необходимости можно использовать инклуды через `gulp-file-include` с префиксом `@@`:

```html
@@include('../blocks/header/header.html')
@@include('../blocks/footer/footer.html')
```

---

## SCSS

- Компилятор: **Dart Sass**
- Autoprefixer — добавляет вендорные префиксы автоматически (цели браузеров задаются через `browserslist` в `package.json`)
- Shorthand — сворачивает margin/padding/border в сокращённую форму
- CSSComb — форматирование свойств по порядку
- Stylelint — линтинг SCSS (конфиг `.stylelintrc.json`)
- В dev-режиме генерируются sourcemap'ы (`.map` рядом с CSS)

Переменные, миксины и базовые стили — в `src/scss/global/`.

---

## JavaScript

- **Rigger** — инклуды через `//= path/to/file.js`
- **Babel** — транспиляция ES6+ (цели браузеров задаются через `browserslist` в `package.json`)
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

Цвет и размер управляются через CSS (`fill: currentColor`).

---

## Фавиконки

Положи `src/img/favicon.png` (рекомендуется 512×512). При сборке автоматически генерируются:

| Файл | Назначение |
|------|-----------|
| `favicon.ico` | Браузерная вкладка (legacy) |
| `favicon-16x16.png`, `favicon-32x32.png` | Браузерная вкладка |
| `apple-touch-icon.png` (180×180) | iOS / macOS |
| `site.webmanifest` | PWA-манифест |

Файлы попадают в `build/img/favicons/`. Если файла нет — задача тихо пропускается, сборка не падает.

---

## Figma-токены

Скрипт забирает локальные стили из Figma (цвета, типографику, тени) и генерирует SCSS-переменные.

### Настройка

```bash
cp .env.example .env
```

Заполни `.env`:

```
FIGMA_TOKEN=your_personal_access_token   # figma.com → Account Settings → Personal access tokens
FIGMA_FILE_ID=your_file_id               # из URL: figma.com/design/FILE_ID/...
```

### Запуск

```bash
npm run figma:tokens
```

Генерирует `src/scss/global/_tokens.scss`. Подключи один раз в `style.scss`:

```scss
@import 'global/tokens.scss';
```

### Что генерируется

| Тип стиля Figma | SCSS-переменная |
|-----------------|-----------------|
| Fill (Solid) | `$token-<name>: #hex;` |
| Text | `$token-<name>-size`, `-weight`, `-line-height`, `-letter-spacing` |
| Effect (Drop Shadow) | `$token-<name>: 0px 4px 8px 0px rgba(...)` |

Имя переменной = kebab-case из имени стиля в Figma.
Пример: `Colors/Primary/Blue 500` → `$token-colors-primary-blue-500`.

---

## Продакшн-сборка

```bash
npm run build
```

Отличия от dev:
- JS минифицируется (Terser)
- Sourcemap'ы не генерируются
- Сервер не запускается
