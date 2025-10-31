# Rewplay Website

Веб-приложение для каталога винтажных аудиокассет на Next.js 14.

## Возможности

- 🏠 Главная страница с новыми поступлениями
- 📚 Полный каталог товаров
- 🔍 Детальные страницы кассет
- ⚙️ Админ-панель для добавления товаров
- 📱 Адаптивный дизайн
- ⚡ Server-Side Rendering для SEO

## Установка

```bash
npm install
```

## Настройка

1. Создайте `.env.local` файл:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

2. Убедитесь, что БД настроена (см. `/database/schema.sql`)

## Запуск

### Разработка

```bash
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
npm run build
npm start
```

## Структура

```
app/
├── page.tsx              # Главная страница
├── layout.tsx            # Общий layout
├── globals.css           # Глобальные стили
├── catalog/
│   ├── page.tsx          # Список всех кассет
│   └── [id]/
│       └── page.tsx      # Детальная страница
└── admin/
    └── page.tsx          # Админка
```

## Страницы

### Главная (`/`)
- Новые поступления (6 кассет)
- Ссылки на каталог и админку

### Каталог (`/catalog`)
- Все кассеты с индикатором наличия
- Фильтры по статусу

### Детальная страница (`/catalog/[id]`)
- Полная информация о кассете
- Ссылки на магазины
- Тэги и категории

### Админка (`/admin`)
- Форма добавления новой кассеты
- Все поля из схемы БД
- Валидация

## Кастомизация

### Цвета

Отредактируйте CSS переменные в `app/globals.css`:

```css
:root {
  --primary: #ff6b6b;      /* Основной цвет */
  --secondary: #4ecdc4;    /* Вторичный цвет */
  --background: #f7f7f7;   /* Фон */
  --text: #2d3436;         /* Текст */
}
```

### Логотип

Замените эмодзи в `app/layout.tsx` на свой логотип.

## API Routes

Сейчас используется прямой доступ к Supabase из Server Components.
Можно добавить API routes в `app/api/` для дополнительной логики.

## Деплой

### Vercel (рекомендуется)

1. Push код в GitHub
2. Импортируйте проект в [Vercel](https://vercel.com)
3. Добавьте Environment Variables
4. Deploy

### Другие платформы

Также работает на:
- Netlify
- Railway
- Render
- Cloudflare Pages

## TypeScript

Типы для Supabase находятся в `/types/supabase.ts`.

При изменении схемы БД обновите типы.

## Лицензия

MIT
