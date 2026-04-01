# IVN Labs Website

Современный веб-сайт для IT-компании IVN Labs с поддержкой мультиязычности и анимациями.

## Технологии

- **Next.js 14** - React фреймворк
- **TypeScript** - Типизация
- **Tailwind CSS** - Стилизация
- **Framer Motion** - Анимации
- **next-intl** - Интернационализация

## Функции

- ✅ Поддержка 3 языков (Русский, Узбекский, Английский)
- ✅ Современный дизайн с градиентами
- ✅ Плавные анимации и переходы
- ✅ Адаптивный дизайн
- ✅ Разделы: Главная, О нас, Проекты, Клиенты, Контакты
- ✅ Форма обратной связи

## Установка

```bash
npm install
```

## Запуск

```bash
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000) в браузере.

## Структура проекта

```
ivn-labs/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── globals.css
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Projects.tsx
│   ├── Clients.tsx
│   ├── Contact.tsx
│   ├── Footer.tsx
│   └── LanguageSwitcher.tsx
├── messages/
│   ├── ru.json
│   ├── uz.json
│   └── en.json
└── ...
```

## Языки

Сайт поддерживает три языка:
- 🇷🇺 Русский (по умолчанию)
- 🇺🇿 O'zbek
- 🇬🇧 English

Переключение языков доступно в навигационном меню.
