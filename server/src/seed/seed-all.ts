export const SEED_ALL = {
  "blog": [
    {
      "slug": "ai-agents-for-business",
      "category": "ai",
      "color": "#0ea5e9",
      "color2": "#7c3aed",
      "date": "2024-12-15",
      "readTime": "7 мин",
      "published": true,
      "translations": {
        "ru": {
          "title": "AI-агенты для бизнеса: как автоматизировать рутину",
          "excerpt": "Разбираем, как AI-агенты на базе LLM помогают компаниям автоматизировать процессы и экономить ресурсы.",
          "content": "Искусственный интеллект перестал быть технологией будущего — сегодня AI-агенты активно помогают бизнесу решать повседневные задачи. От автоматической обработки заявок до интеллектуального анализа данных — компании всё чаще внедряют AI-решения.\n\n## Что такое AI-агент?\n\nAI-агент — это программа на базе большой языковой модели (LLM), которая может самостоятельно выполнять задачи: отвечать на вопросы клиентов, анализировать документы, генерировать отчёты и даже принимать решения в рамках заданных правил.\n\n## Примеры применения\n\n**HR-автоматизация** — бот скринит резюме, проводит первичное интервью и формирует шорт-лист кандидатов. Наш проект для Ucell сократил время обработки заявки с 3 дней до 4 часов.\n\n**Клиентский сервис** — AI-агент обрабатывает до 80% типовых обращений без участия оператора, обучаясь на истории тикетов.\n\n**Аналитика** — агент автоматически собирает данные из разных источников, находит аномалии и формирует ежедневные отчёты.\n\n## С чего начать?\n\n1. Определите процессы с большим объёмом рутины\n2. Оцените качество существующих данных\n3. Выберите пилотный проект с измеримым результатом\n4. Начните с MVP и итерируйте\n\nМы в IVN Labs помогаем компаниям внедрять AI-агентов — от консультации до production-готового решения."
        },
        "uz": {
          "title": "Biznes uchun AI-agentlar: rutinani qanday avtomatlashtirish mumkin",
          "excerpt": "LLM asosidagi AI-agentlar kompaniyalarga jarayonlarni avtomatlashtirish va resurslarni tejashga qanday yordam beradi.",
          "content": "Sun'iy intellekt endi kelajak texnologiyasi emas — bugun AI-agentlar biznesga kundalik vazifalarni hal qilishda faol yordam bermoqda.\n\n## AI-agent nima?\n\nAI-agent — bu katta til modeli (LLM) asosidagi dastur bo'lib, vazifalarni mustaqil bajarishi mumkin.\n\n## Qo'llash misollari\n\n**HR-avtomatlashtirish** — bot rezyumelarni skrining qiladi va nomzodlar ro'yxatini tuzadi.\n\n**Mijozlarga xizmat** — AI-agent operatorsiz 80% gacha murojatlarni qayta ishlaydi.\n\n**Analitika** — agent turli manbalardan ma'lumotlarni avtomatik yig'adi va hisobotlar tuzadi.\n\nIVN Labs kompaniyalarga AI-agentlarni joriy etishga yordam beradi."
        },
        "en": {
          "title": "AI Agents for Business: Automating the Routine",
          "excerpt": "How LLM-based AI agents help companies automate processes and save resources.",
          "content": "Artificial intelligence is no longer a technology of the future — today AI agents actively help businesses solve everyday tasks. From automatic request processing to intelligent data analysis — companies are increasingly adopting AI solutions.\n\n## What is an AI Agent?\n\nAn AI agent is a program based on a large language model (LLM) that can independently perform tasks: answer customer questions, analyze documents, generate reports, and even make decisions within given rules.\n\n## Use Cases\n\n**HR Automation** — the bot screens resumes, conducts initial interviews, and creates candidate shortlists. Our project for Ucell reduced application processing time from 3 days to 4 hours.\n\n**Customer Service** — an AI agent handles up to 80% of typical requests without operator involvement, learning from ticket history.\n\n**Analytics** — the agent automatically collects data from various sources, finds anomalies, and generates daily reports.\n\n## How to Get Started?\n\n1. Identify processes with high routine volume\n2. Assess the quality of existing data\n3. Choose a pilot project with measurable results\n4. Start with an MVP and iterate\n\nAt IVN Labs, we help companies implement AI agents — from consultation to production-ready solutions."
        }
      }
    },
    {
      "slug": "nextjs-performance-optimization",
      "category": "tech",
      "color": "#22d3ee",
      "color2": "#0ea5e9",
      "date": "2024-11-28",
      "readTime": "10 мин",
      "published": true,
      "translations": {
        "ru": {
          "title": "Оптимизация производительности Next.js: полный гайд",
          "excerpt": "10 практических советов для ускорения Next.js приложений: от серверных компонентов до умного кэширования.",
          "content": "Next.js стал стандартом для React-разработки, но без правильной оптимизации даже мощный фреймворк может работать медленно. Делимся опытом из реальных проектов.\n\n## 1. Server Components по умолчанию\n\nВ App Router все компоненты серверные по умолчанию. Используйте `'use client'` только когда действительно нужна интерактивность.\n\n## 2. Динамические импорты\n\nТяжёлые библиотеки (графики, 3D, редакторы) загружайте через `dynamic()` с `ssr: false`.\n\n## 3. Image Optimization\n\nВсегда используйте `next/image` — автоматическое WebP, lazy loading и адаптивные размеры.\n\n## 4. Route Segments\n\nИспользуйте `loading.tsx` и `Suspense` для параллельной загрузки данных.\n\n## 5. Кэширование\n\nNext.js кэширует fetch-запросы на сервере. Управляйте через `revalidate` и `cache: 'no-store'`.\n\n## 6. Bundle Analysis\n\nРегулярно проверяйте бандл через `@next/bundle-analyzer` — находите и устраняйте тяжёлые зависимости.\n\n## 7. Font Optimization\n\nИспользуйте `next/font` для автоматического self-hosting шрифтов без CLS.\n\n## 8. Middleware\n\nМинимизируйте логику в middleware — оно выполняется на каждый запрос.\n\n## 9. Edge Runtime\n\nДля API routes с простой логикой используйте Edge Runtime — быстрее и дешевле.\n\n## 10. Мониторинг\n\nВнедрите Web Vitals мониторинг через `reportWebVitals` для отслеживания реальной производительности.\n\nНаша команда специализируется на высокопроизводительных Next.js приложениях — обращайтесь за аудитом."
        },
        "uz": {
          "title": "Next.js samaradorligini optimallashtirish: to'liq qo'llanma",
          "excerpt": "Next.js ilovalarini tezlashtirish uchun 10 ta amaliy maslahat.",
          "content": "Next.js React dasturlash uchun standartga aylandi, lekin to'g'ri optimallashtirishsiz sekin ishlashi mumkin.\n\n## 1. Server Components\n\nApp Router da barcha komponentlar sukut bo'yicha serverda ishlaydi.\n\n## 2. Dinamik importlar\n\nOg'ir kutubxonalarni `dynamic()` orqali yuklang.\n\n## 3. Rasm optimallash\n\nHar doim `next/image` foydalaning.\n\nBizning jamoamiz yuqori samarali Next.js ilovalariga ixtisoslashgan."
        },
        "en": {
          "title": "Next.js Performance Optimization: Complete Guide",
          "excerpt": "10 practical tips for speeding up Next.js apps: from server components to smart caching.",
          "content": "Next.js has become the standard for React development, but without proper optimization even a powerful framework can run slowly. We share experience from real projects.\n\n## 1. Server Components by Default\n\nIn App Router, all components are server-side by default. Use `'use client'` only when you truly need interactivity.\n\n## 2. Dynamic Imports\n\nLoad heavy libraries (charts, 3D, editors) via `dynamic()` with `ssr: false`.\n\n## 3. Image Optimization\n\nAlways use `next/image` — automatic WebP, lazy loading and responsive sizes.\n\n## 4. Route Segments\n\nUse `loading.tsx` and `Suspense` for parallel data loading.\n\n## 5. Caching\n\nNext.js caches fetch requests on the server. Control via `revalidate` and `cache: 'no-store'`.\n\n## 6. Bundle Analysis\n\nRegularly check your bundle with `@next/bundle-analyzer` — find and eliminate heavy dependencies.\n\n## 7. Font Optimization\n\nUse `next/font` for automatic self-hosting of fonts without CLS.\n\n## 8. Middleware\n\nMinimize logic in middleware — it runs on every request.\n\n## 9. Edge Runtime\n\nFor API routes with simple logic, use Edge Runtime — faster and cheaper.\n\n## 10. Monitoring\n\nImplement Web Vitals monitoring via `reportWebVitals` to track real performance.\n\nOur team specializes in high-performance Next.js applications — contact us for an audit."
        }
      }
    },
    {
      "slug": "crm-implementation-mistakes",
      "category": "business",
      "color": "#f59e0b",
      "color2": "#f97316",
      "date": "2024-11-10",
      "readTime": "6 мин",
      "published": true,
      "translations": {
        "ru": {
          "title": "5 ошибок при внедрении CRM, которые стоят бизнесу миллионы",
          "excerpt": "Почему 60% CRM-проектов проваливаются и как избежать типичных ошибок при внедрении.",
          "content": "По статистике, более 60% проектов внедрения CRM не достигают поставленных целей. Разбираем главные ошибки, которые мы видим у клиентов.\n\n## Ошибка 1: CRM ради CRM\n\nКомпании покупают систему, потому что \"у всех есть\", без чёткого понимания, какие процессы нужно автоматизировать. Результат — дорогая записная книжка.\n\n**Как избежать:** начните с аудита бизнес-процессов и определите 3-5 ключевых метрик, которые CRM должна улучшить.\n\n## Ошибка 2: Игнорирование пользователей\n\nCRM выбирается руководством без участия конечных пользователей. Менеджеры саботируют систему, возвращаясь к Excel.\n\n**Как избежать:** привлекайте будущих пользователей к выбору и настройке с первого дня.\n\n## Ошибка 3: Попытка автоматизировать хаос\n\nЕсли процессы не формализованы, CRM их не спасёт. Автоматизация хаоса даёт автоматический хаос.\n\n**Как избежать:** сначала опишите и оптимизируйте процессы, потом автоматизируйте.\n\n## Ошибка 4: Big Bang вместо поэтапного внедрения\n\nЗапуск всех модулей одновременно — это гарантированный стресс и провал.\n\n**Как избежать:** начните с одного отдела или процесса, добейтесь результата, масштабируйте.\n\n## Ошибка 5: Нет интеграций\n\nCRM, не связанная с 1С, телефонией и почтой — это изолированный остров.\n\n**Как избежать:** планируйте интеграции с первого дня. API и webhook — ваши лучшие друзья.\n\nМы в IVN Labs специализируемся на CRM, которые действительно работают. Обращайтесь за консультацией."
        },
        "uz": {
          "title": "CRM joriy etishda millionlarga tushadigan 5 ta xato",
          "excerpt": "Nima uchun CRM loyihalarining 60% muvaffaqiyatsizlikka uchraydi.",
          "content": "Statistikaga ko'ra, CRM joriy etish loyihalarining 60% dan ortig'i maqsadlariga erisha olmaydi.\n\n## Xato 1: CRM CRM uchun\n\nKompaniyalar qaysi jarayonlarni avtomatlashtirishni aniq tushunmay tizim sotib oladi.\n\n## Xato 2: Foydalanuvchilarni e'tiborsiz qoldirish\n\nCRM rahbariyat tomonidan yakuniy foydalanuvchilarsiz tanlanadi.\n\n## Xato 3: Tartibsizlikni avtomatlashtirish\n\nAgar jarayonlar rasmiylashtirilmagan bo'lsa, CRM ularni saqlamaydi.\n\nIVN Labs da biz haqiqatan ishlaydigan CRM larga ixtisoslashganmiz."
        },
        "en": {
          "title": "5 CRM Implementation Mistakes That Cost Millions",
          "excerpt": "Why 60% of CRM projects fail and how to avoid typical implementation mistakes.",
          "content": "Statistics show that over 60% of CRM implementation projects fail to achieve their goals. Let's break down the main mistakes we see in our clients.\n\n## Mistake 1: CRM for CRM's Sake\n\nCompanies buy a system because \"everyone has one\" without clearly understanding which processes need automation. The result — an expensive address book.\n\n**How to avoid:** start with a business process audit and define 3-5 key metrics the CRM should improve.\n\n## Mistake 2: Ignoring Users\n\nCRM is chosen by management without involving end users. Managers sabotage the system, returning to Excel.\n\n**How to avoid:** involve future users in selection and setup from day one.\n\n## Mistake 3: Trying to Automate Chaos\n\nIf processes aren't formalized, CRM won't save them. Automating chaos produces automated chaos.\n\n**How to avoid:** first describe and optimize processes, then automate.\n\n## Mistake 4: Big Bang Instead of Phased Rollout\n\nLaunching all modules simultaneously is guaranteed stress and failure.\n\n**How to avoid:** start with one department or process, achieve results, then scale.\n\n## Mistake 5: No Integrations\n\nA CRM not connected to 1C, telephony, and email is an isolated island.\n\n**How to avoid:** plan integrations from day one. APIs and webhooks are your best friends.\n\nAt IVN Labs, we specialize in CRMs that actually work. Contact us for a consultation."
        }
      }
    },
    {
      "slug": "telegram-bots-trends-2024",
      "category": "tech",
      "color": "#10b981",
      "color2": "#0ea5e9",
      "date": "2024-10-22",
      "readTime": "8 мин",
      "published": true,
      "translations": {
        "ru": {
          "title": "Тренды Telegram-ботов в 2024: что работает",
          "excerpt": "Mini Apps, AI-интеграции, платежи — разбираем актуальные тренды разработки Telegram-ботов.",
          "content": "Telegram остаётся главным мессенджером для бизнеса в Центральной Азии. Вот что мы видим в трендах бот-разработки.\n\n## Mini Apps — новый стандарт\n\nTelegram Mini Apps позволяют создавать полноценные веб-приложения внутри мессенджера. Это идеально для:\n- Каталогов и магазинов\n- Форм и опросников\n- Дашбордов и аналитики\n\n## AI-powered боты\n\nИнтеграция с GPT и другими LLM делает ботов по-настоящему умными:\n- Понимание контекста разговора\n- Генерация персональных ответов\n- Работа с документами и изображениями\n\n## Платежи через Stars\n\nTelegram Stars открывают новые возможности для монетизации:\n- Цифровые товары и подписки\n- Микроплатежи за контент\n- Донаты и поддержка\n\n## Бизнес-автоматизация\n\nСамый востребованный сценарий:\n- Приём и обработка заявок\n- Уведомления и алерты\n- Интеграция с CRM и 1С\n- HR-автоматизация\n\n## Стек 2024\n\nНаш рекомендуемый стек:\n- **Python** + aiogram/python-telegram-bot\n- **PostgreSQL** для хранения\n- **Redis** для кэша и состояний\n- **Docker** для деплоя\n\nМы разработали десятки ботов для бизнеса — от простых нотификаторов до AI-ассистентов с 10K+ пользователей."
        },
        "uz": {
          "title": "2024 yildagi Telegram-bot trendlari",
          "excerpt": "Mini Apps, AI integratsiyalar, to'lovlar — Telegram bot ishlab chiqish trendlari.",
          "content": "Telegram Markaziy Osiyoda biznes uchun asosiy messenjer bo'lib qolmoqda.\n\n## Mini Apps\n\nTelegram Mini Apps messenjer ichida to'liq veb-ilovalar yaratishga imkon beradi.\n\n## AI-powered botlar\n\nGPT va boshqa LLM bilan integratsiya botlarni haqiqatan aqlli qiladi.\n\n## Stars orqali to'lovlar\n\nTelegram Stars yangi monetizatsiya imkoniyatlarini ochadi.\n\nBiz o'nlab biznes botlarini ishlab chiqqanmiz."
        },
        "en": {
          "title": "Telegram Bot Trends in 2024: What Works",
          "excerpt": "Mini Apps, AI integrations, payments — breaking down current Telegram bot development trends.",
          "content": "Telegram remains the main business messenger in Central Asia. Here's what we see in bot development trends.\n\n## Mini Apps — The New Standard\n\nTelegram Mini Apps allow creating full-fledged web applications inside the messenger. Perfect for:\n- Catalogs and stores\n- Forms and surveys\n- Dashboards and analytics\n\n## AI-Powered Bots\n\nIntegration with GPT and other LLMs makes bots truly smart:\n- Understanding conversation context\n- Generating personalized responses\n- Working with documents and images\n\n## Payments via Stars\n\nTelegram Stars open new monetization opportunities:\n- Digital goods and subscriptions\n- Content micropayments\n- Donations and support\n\n## Business Automation\n\nThe most demanded scenario:\n- Receiving and processing applications\n- Notifications and alerts\n- CRM and 1C integration\n- HR automation\n\n## 2024 Stack\n\nOur recommended stack:\n- **Python** + aiogram/python-telegram-bot\n- **PostgreSQL** for storage\n- **Redis** for cache and states\n- **Docker** for deployment\n\nWe've built dozens of business bots — from simple notifiers to AI assistants with 10K+ users."
        }
      }
    },
    {
      "slug": "building-design-system",
      "category": "design",
      "color": "#8b5cf6",
      "color2": "#ec4899",
      "date": "2024-10-05",
      "readTime": "5 мин",
      "published": true,
      "translations": {
        "ru": {
          "title": "Как мы строим дизайн-системы для продуктов",
          "excerpt": "Опыт создания масштабируемых дизайн-систем: от токенов до компонентной библиотеки.",
          "content": "Дизайн-система — это не набор кнопок в Figma, а живой инструмент, который ускоряет разработку и обеспечивает консистентность.\n\n## Зачем нужна дизайн-система?\n\n- Ускоряет разработку в 2-3 раза\n- Обеспечивает единый стиль\n- Упрощает онбординг новых разработчиков\n- Снижает количество багов в UI\n\n## Наш подход\n\n### 1. Design Tokens\n\nВсё начинается с токенов: цвета, типографика, отступы, радиусы, тени. Мы используем CSS Custom Properties для поддержки тем.\n\n### 2. Компонентная архитектура\n\nАтомарный дизайн: атомы → молекулы → организмы → шаблоны → страницы.\n\n### 3. Тёмная и светлая тема\n\nПоддержка тем с первого дня через CSS переменные и `data-theme` атрибут.\n\n### 4. Responsive дизайн\n\nMobile-first подход с плавной адаптацией.\n\n### 5. Анимации\n\nFramer Motion для продуктовых анимаций с уважением к `prefers-reduced-motion`.\n\n## Инструменты\n\n- **Figma** — дизайн и прототипирование\n- **Storybook** — документация компонентов\n- **CSS Custom Properties** — токены\n- **Framer Motion** — анимации\n\nКаждый наш продукт начинается с дизайн-системы — это инвестиция, которая окупается на первом же спринте."
        },
        "uz": {
          "title": "Mahsulotlar uchun dizayn tizimlarini qanday quramiz",
          "excerpt": "Masshtablanadigan dizayn tizimlarini yaratish tajribamiz.",
          "content": "Dizayn tizimi — bu Figma dagi tugmalar to'plami emas, bu ishlab chiqishni tezlashtiradigan va izchillikni ta'minlaydigan jonli vosita.\n\n## Nega dizayn tizimi kerak?\n\n- Ishlab chiqishni 2-3 barobar tezlashtiradi\n- Yagona uslubni ta'minlaydi\n\n## Bizning yondashuvimiz\n\n### 1. Dizayn tokenlari\n- Ranglar, tipografiya, bo'shliqlar\n\n### 2. Komponent arxitekturasi\n- Atomik dizayn\n\nHar bir mahsulotimiz dizayn tizimidan boshlanadi."
        },
        "en": {
          "title": "How We Build Design Systems for Products",
          "excerpt": "Experience building scalable design systems: from tokens to component libraries.",
          "content": "A design system is not a set of buttons in Figma — it's a living tool that accelerates development and ensures consistency.\n\n## Why a Design System?\n\n- Speeds up development 2-3x\n- Ensures unified style\n- Simplifies onboarding new developers\n- Reduces UI bugs\n\n## Our Approach\n\n### 1. Design Tokens\n\nEverything starts with tokens: colors, typography, spacing, radii, shadows. We use CSS Custom Properties for theme support.\n\n### 2. Component Architecture\n\nAtomic design: atoms → molecules → organisms → templates → pages.\n\n### 3. Dark and Light Themes\n\nTheme support from day one via CSS variables and `data-theme` attribute.\n\n### 4. Responsive Design\n\nMobile-first approach with smooth adaptation.\n\n### 5. Animations\n\nFramer Motion for product animations respecting `prefers-reduced-motion`.\n\n## Tools\n\n- **Figma** — design and prototyping\n- **Storybook** — component documentation\n- **CSS Custom Properties** — tokens\n- **Framer Motion** — animations\n\nEvery product we build starts with a design system — it's an investment that pays off in the very first sprint."
        }
      }
    },
    {
      "slug": "it-park-uzbekistan-experience",
      "category": "news",
      "color": "#6366f1",
      "color2": "#8b5cf6",
      "date": "2024-09-18",
      "readTime": "4 мин",
      "published": true,
      "translations": {
        "ru": {
          "title": "Наш опыт в IT Park Узбекистан",
          "excerpt": "Как статус резидента IT Park помогает нам и нашим клиентам: налоговые льготы, нетворкинг и рост.",
          "content": "IVN Labs — официальный резидент IT Park Узбекистан. Делимся опытом и преимуществами.\n\n## Что даёт резидентство?\n\n### Налоговые льготы\n- 0% налог на прибыль\n- 0% НДС на экспорт IT-услуг\n- 7.5% единый социальный платёж (вместо стандартных 12%)\n\n### Инфраструктура\n- Современные офисные пространства\n- Скоростной интернет\n- Конференц-залы и зоны для встреч\n\n### Нетворкинг\n- 1000+ компаний-резидентов\n- Регулярные митапы и хакатоны\n- Доступ к менторам и инвесторам\n\n## Как стать резидентом?\n\n1. Подать заявку на сайте IT Park\n2. Описать проект и бизнес-план\n3. Пройти рассмотрение комиссии (2-4 недели)\n4. Получить статус резидента\n\n## Наш опыт\n\nРезидентство помогло нам:\n- Снизить расходы на 30%\n- Привлечь крупных клиентов\n- Выйти на международный рынок\n- Нанять лучших специалистов\n\nIT Park — это не просто коворкинг, это экосистема для роста IT-бизнеса в Узбекистане. Если вы IT-компания — настоятельно рекомендуем подать заявку."
        },
        "uz": {
          "title": "IT Park O'zbekistondagi tajribamiz",
          "excerpt": "IT Park rezidenti maqomi bizga va mijozlarimizga qanday yordam beradi.",
          "content": "IVN Labs — IT Park O'zbekistonning rasmiy rezidenti.\n\n## Rezidentlik nima beradi?\n\n### Soliq imtiyozlari\n- 0% daromad solig'i\n- 0% QQS IT-xizmatlar eksportida\n\n### Infratuzilma\n- Zamonaviy ofis maydoni\n- Tezkor internet\n\n### Tarmoqlash\n- 1000+ rezident kompaniyalar\n\nIT Park — bu O'zbekistonda IT-biznes o'sishi uchun ekotizim."
        },
        "en": {
          "title": "Our Experience at IT Park Uzbekistan",
          "excerpt": "How IT Park resident status helps us and our clients: tax benefits, networking, and growth.",
          "content": "IVN Labs is an official resident of IT Park Uzbekistan. We share our experience and advantages.\n\n## What Does Residency Offer?\n\n### Tax Benefits\n- 0% income tax\n- 0% VAT on IT service exports\n- 7.5% unified social payment (instead of standard 12%)\n\n### Infrastructure\n- Modern office spaces\n- High-speed internet\n- Conference rooms and meeting zones\n\n### Networking\n- 1000+ resident companies\n- Regular meetups and hackathons\n- Access to mentors and investors\n\n## How to Become a Resident?\n\n1. Submit an application on the IT Park website\n2. Describe your project and business plan\n3. Pass commission review (2-4 weeks)\n4. Receive resident status\n\n## Our Experience\n\nResidency helped us:\n- Reduce costs by 30%\n- Attract major clients\n- Enter international markets\n- Hire top specialists\n\nIT Park is not just a coworking space — it's an ecosystem for IT business growth in Uzbekistan. If you're an IT company, we strongly recommend applying."
        }
      }
    }
  ],
  "projects": [
    {
      "slug": "ecommerce-platform",
      "tag": "E-Commerce",
      "category": "ecommerce",
      "color": "#0ea5e9",
      "color2": "#7c3aed",
      "year": 2024,
      "duration": "4 мес",
      "stack": [
        "Next.js",
        "Node.js",
        "PostgreSQL",
        "Redis",
        "AI/ML"
      ],
      "statValue": "+340%",
      "statLabel": "конверсия",
      "featured": true,
      "translations": {
        "ru": {
          "title": "E-commerce платформа",
          "desc": "Маркетплейс с AI-рекомендациями, персонализацией и встроенной аналитикой для ритейл-компании",
          "challenge": "Клиент терял до 70% пользователей на этапе выбора товара из-за перегруженного интерфейса и отсутствия персонализации.",
          "solution": "Разработали маркетплейс с AI-движком рекомендаций, умным поиском и адаптивным UI. Интегрировали аналитику поведения.",
          "result": "Конверсия выросла на 340% за первые 3 месяца. Среднее время на сайте увеличилось с 1.2 до 4.8 минут."
        },
        "uz": {
          "title": "E-commerce platforma",
          "desc": "AI-tavsiyalar, personalizatsiya va tahlil bilan savdo kompaniyasi uchun marketplace",
          "challenge": "Mijoz tovar tanlash bosqichida foydalanuvchilarning 70% ini yo'qotardi — ortiqcha interfeys va personalizatsiya yo'qligi tufayli.",
          "solution": "AI-tavsiyalar mexanizmi, aqlli qidiruv va adaptiv UI bilan marketplace yaratdik. Xulq-atvor tahlilini integratsiya qildik.",
          "result": "Konversiya dastlabki 3 oyda 340% oshdi. Saytda o'rtacha vaqt 1.2 daqiqadan 4.8 daqiqagacha ko'paydi."
        },
        "en": {
          "title": "E-commerce Platform",
          "desc": "Marketplace with AI recommendations, personalization and built-in analytics for a retail company",
          "challenge": "The client was losing up to 70% of users at the product selection stage due to an overloaded interface and lack of personalization.",
          "solution": "We built a marketplace with an AI recommendation engine, smart search and adaptive UI. Integrated behavioral analytics.",
          "result": "Conversion grew by 340% in the first 3 months. Average time on site increased from 1.2 to 4.8 minutes."
        }
      }
    },
    {
      "slug": "banking-portal",
      "tag": "FinTech",
      "category": "fintech",
      "color": "#8b5cf6",
      "color2": "#ec4899",
      "year": 2024,
      "duration": "6 мес",
      "stack": [
        "React",
        "Java Spring",
        "Oracle DB",
        "Kafka"
      ],
      "statValue": "2M+",
      "statLabel": "транзакций/день",
      "featured": true,
      "translations": {
        "ru": {
          "title": "Банковский корпоративный портал",
          "desc": "Высоконагруженный корпоративный портал с интеграцией ЦБ API и обработкой миллионов транзакций",
          "challenge": "Существующая система не справлялась с нагрузкой более 50K запросов в час и имела критические уязвимости безопасности.",
          "solution": "Построили микросервисную архитектуру на Java Spring + Kafka. Внедрили многоуровневую защиту и интеграцию с ЦБ РУ API.",
          "result": "Система обрабатывает 2M+ транзакций в день без даунтайма. Время отклика снижено с 2.3с до 180мс."
        },
        "uz": {
          "title": "Bank korporativ portali",
          "desc": "Millionlab tranzaksiyalarni qayta ishlaydigan yuqori yuklamali korporativ portal",
          "challenge": "Mavjud tizim soatiga 50K dan ortiq so'rovlarni ko'tara olmadi va kritik xavfsizlik zaifliklari bor edi.",
          "solution": "Java Spring + Kafka asosida mikroservis arxitektura qurdik. Ko'p darajali himoya va Markaziy bank API integratsiyasini amalga oshirdik.",
          "result": "Tizim kuniga 2M+ tranzaksiyani ishsiz holatisiz qayta ishlaydi. Javob vaqti 2.3s dan 180ms gacha tushdi."
        },
        "en": {
          "title": "Banking Corporate Portal",
          "desc": "High-load corporate portal with Central Bank API integration processing millions of transactions",
          "challenge": "The existing system couldn't handle more than 50K requests per hour and had critical security vulnerabilities.",
          "solution": "Built a microservice architecture on Java Spring + Kafka. Implemented multi-level protection and Central Bank API integration.",
          "result": "The system processes 2M+ transactions per day with zero downtime. Response time reduced from 2.3s to 180ms."
        }
      }
    },
    {
      "slug": "logistics-crm",
      "tag": "CRM",
      "category": "crm",
      "color": "#22d3ee",
      "color2": "#0ea5e9",
      "year": 2023,
      "duration": "3 мес",
      "stack": [
        "Vue.js",
        "Python",
        "PostgreSQL",
        "Docker"
      ],
      "statValue": "-60%",
      "statLabel": "ручной труд",
      "featured": false,
      "translations": {
        "ru": {
          "title": "CRM-система для логистики",
          "desc": "Система управления заказами, маршрутами и клиентами для крупной логистической компании",
          "challenge": "Менеджеры тратили 5+ часов ежедневно на ручной ввод данных и согласование маршрутов между отделами.",
          "solution": "Создали CRM с автоматическим распределением заказов, оптимизацией маршрутов и единым рабочим пространством.",
          "result": "Ручной труд сократился на 60%. Скорость обработки заказов выросла в 3 раза. ROI за 6 месяцев — 420%."
        },
        "uz": {
          "title": "Logistika CRM tizimi",
          "desc": "Yirik logistika kompaniyasi uchun buyurtmalar, marshrutlar va mijozlarni boshqarish tizimi",
          "challenge": "Menejerlar kuniga 5+ soat ma'lumotlarni qo'lda kiritish va bo'limlar o'rtasida marshrutlarni kelishishga sarflar edi.",
          "solution": "Buyurtmalarni avtomatik taqsimlash, marshrutlarni optimallashtirish va yagona ish maydoni bilan CRM yaratdik.",
          "result": "Qo'lda mehnat 60% kamaydi. Buyurtmalarni qayta ishlash tezligi 3 barobar oshdi. 6 oyda ROI — 420%."
        },
        "en": {
          "title": "Logistics CRM System",
          "desc": "Order, route and customer management system for a large logistics company",
          "challenge": "Managers spent 5+ hours daily on manual data entry and coordinating routes between departments.",
          "solution": "Created a CRM with automatic order distribution, route optimization and a unified workspace.",
          "result": "Manual work reduced by 60%. Order processing speed tripled. ROI over 6 months — 420%."
        }
      }
    },
    {
      "slug": "bi-dashboard",
      "tag": "Analytics",
      "category": "analytics",
      "color": "#f59e0b",
      "color2": "#f97316",
      "year": 2024,
      "duration": "2 мес",
      "stack": [
        "Power BI",
        "Python",
        "SQL Server",
        "Azure"
      ],
      "statValue": "50+",
      "statLabel": "метрик real-time",
      "featured": false,
      "translations": {
        "ru": {
          "title": "BI Dashboard для ритейла",
          "desc": "Power BI аналитическая платформа с 50+ метриками в реальном времени для сети магазинов",
          "challenge": "Руководство принимало решения на основе месячных Excel-отчётов с задержкой 2-3 недели.",
          "solution": "Построили BI-платформу на Power BI + Python с автоматическими дашбордами и алертами по отклонению KPI.",
          "result": "50+ метрик обновляются в реальном времени. Скорость принятия решений выросла в 8 раз. Выявлено 12% скрытых потерь."
        },
        "uz": {
          "title": "Savdo tarmog'i BI Dashboard",
          "desc": "Do'konlar tarmog'i uchun real vaqtda 50+ metrika bilan Power BI tahlil platformasi",
          "challenge": "Rahbariyat 2-3 hafta kechikish bilan oylik Excel-hisobotlari asosida qaror qabul qilar edi.",
          "solution": "Power BI + Python asosida KPI og'ishlar bo'yicha avtomatik dashboardlar va alertlar bilan BI platforma qurdik.",
          "result": "50+ metrika real vaqtda yangilanadi. Qaror qabul qilish tezligi 8 barobar oshdi. 12% yashirin yo'qotishlar aniqlandi."
        },
        "en": {
          "title": "Retail BI Dashboard",
          "desc": "Power BI analytics platform with 50+ real-time metrics for a retail chain",
          "challenge": "Management made decisions based on monthly Excel reports with a 2-3 week delay.",
          "solution": "Built a BI platform on Power BI + Python with automatic dashboards and KPI deviation alerts.",
          "result": "50+ metrics update in real time. Decision-making speed increased 8x. 12% hidden losses identified."
        }
      }
    },
    {
      "slug": "hr-telegram-bot",
      "tag": "Automation",
      "category": "automation",
      "color": "#10b981",
      "color2": "#0ea5e9",
      "year": 2023,
      "duration": "6 нед",
      "stack": [
        "Python",
        "Telegram Bot API",
        "PostgreSQL",
        "AI"
      ],
      "statValue": "10K+",
      "statLabel": "пользователей",
      "featured": false,
      "translations": {
        "ru": {
          "title": "HR Telegram-бот",
          "desc": "AI-бот для автоматизации найма, онбординга и HR-процессов с аудиторией 10K+ сотрудников",
          "challenge": "HR-отдел из 5 человек не справлялся с потоком заявок: 200+ кандидатов в месяц, ручная проверка документов.",
          "solution": "Разработали Telegram-бота с AI-скринингом резюме, автоматическим онбордингом и интеграцией с HR-системой.",
          "result": "10K+ активных пользователей. Время обработки заявки с 3 дней до 4 часов. Нагрузка на HR снижена на 70%."
        },
        "uz": {
          "title": "HR Telegram-bot",
          "desc": "10K+ xodim uchun yollash, onboarding va HR jarayonlarini avtomatlashtiradigan AI-bot",
          "challenge": "5 kishilik HR bo'limi ariza oqimi bilan dosh bera olmas edi: oyda 200+ nomzod, hujjatlarni qo'lda tekshirish.",
          "solution": "AI-rezyume skrining, avtomatik onboarding va HR tizimi integratsiyasi bilan Telegram-bot ishlab chiqdik.",
          "result": "10K+ faol foydalanuvchi. Arizani ko'rib chiqish vaqti 3 kundan 4 soatga tushdi. HR yuklamasi 70% kamaydi."
        },
        "en": {
          "title": "HR Telegram Bot",
          "desc": "AI bot for automating hiring, onboarding and HR processes with 10K+ employee audience",
          "challenge": "An HR team of 5 couldn't handle the application flow: 200+ candidates per month, manual document verification.",
          "solution": "Developed a Telegram bot with AI resume screening, automatic onboarding and HR system integration.",
          "result": "10K+ active users. Application processing time from 3 days to 4 hours. HR workload reduced by 70%."
        }
      }
    },
    {
      "slug": "erp-integration",
      "tag": "ERP / 1C",
      "category": "erp",
      "color": "#6366f1",
      "color2": "#8b5cf6",
      "year": 2023,
      "duration": "5 мес",
      "stack": [
        "1C",
        "SAP",
        "Python",
        "REST API",
        "RabbitMQ"
      ],
      "statValue": "0",
      "statLabel": "потерь данных",
      "featured": false,
      "translations": {
        "ru": {
          "title": "ERP интеграция 1С + SAP",
          "desc": "Бесшовная интеграция 1С, SAP и CRM для производственного предприятия без потерь данных",
          "challenge": "Три несвязанные системы (1С, SAP, самописная CRM) приводили к дублированию данных и ошибкам в отчётности.",
          "solution": "Создали интеграционную шину на Python + RabbitMQ с двусторонней синхронизацией и мониторингом целостности данных.",
          "result": "0 потерь данных с момента запуска. Синхронизация 500K+ записей ежедневно. Отчётность стала единой и точной."
        },
        "uz": {
          "title": "ERP integratsiya 1C + SAP",
          "desc": "Ishlab chiqarish korxonasi uchun 1C, SAP va CRM ning ma'lumot yo'qotmasdan muammosiz integratsiyasi",
          "challenge": "Uchta bog'liq bo'lmagan tizim (1C, SAP, maxsus CRM) ma'lumotlarning takrorlanishiga va hisobotlardagi xatoliklarga olib keldi.",
          "solution": "Python + RabbitMQ asosida ikki tomonlama sinxronizatsiya va ma'lumotlar yaxlitligini monitoring qilish bilan integratsiya shinasi yaratdik.",
          "result": "Ishga tushirilganidan beri 0 ma'lumot yo'qotish. Kuniga 500K+ yozuv sinxronizatsiyasi. Hisobot yagona va aniq bo'ldi."
        },
        "en": {
          "title": "ERP Integration 1C + SAP",
          "desc": "Seamless integration of 1C, SAP and CRM for a manufacturing enterprise with zero data loss",
          "challenge": "Three disconnected systems (1C, SAP, custom CRM) led to data duplication and reporting errors.",
          "solution": "Created an integration bus on Python + RabbitMQ with bidirectional synchronization and data integrity monitoring.",
          "result": "0 data loss since launch. 500K+ records synchronized daily. Reporting became unified and accurate."
        }
      }
    }
  ],
  "services": [
    {
      "serviceId": "integration",
      "tag": "1C / ERP",
      "color1": "#0ea5e9",
      "color2": "#0284c7",
      "translations": {
        "ru": {
          "title": "Интеграция 1С",
          "subtitle": "Связываем 1С с внешними системами, автоматизируем ERP-процессы."
        },
        "uz": {
          "title": "1C Integratsiya",
          "subtitle": "1C ni tashqi tizimlar bilan ulash, ma'lumot almashishni avtomatlashtirish."
        },
        "en": {
          "title": "1C Integration",
          "subtitle": "Connect 1C with external systems, automate data exchange and ERP processes."
        }
      }
    },
    {
      "serviceId": "web",
      "tag": "Web Dev",
      "color1": "#7c3aed",
      "color2": "#a855f7",
      "translations": {
        "ru": {
          "title": "Веб-разработка",
          "subtitle": "Корпоративные порталы, лендинги и SaaS-платформы с современным UI/UX."
        },
        "uz": {
          "title": "Veb-dasturlash",
          "subtitle": "Korporativ portallar, landing sahifalar va SaaS platformalar."
        },
        "en": {
          "title": "Web Development",
          "subtitle": "Corporate portals, landing pages and SaaS platforms with modern UI/UX."
        }
      }
    },
    {
      "serviceId": "crm",
      "tag": "CRM",
      "color1": "#0ea5e9",
      "color2": "#7c3aed",
      "translations": {
        "ru": {
          "title": "CRM-системы",
          "subtitle": "Разрабатываем CRM под бизнес-процессы — от простых до сложных воронок."
        },
        "uz": {
          "title": "CRM Tizimlar",
          "subtitle": "Biznes jarayonlarga moslashtirilgan CRM tizimlar."
        },
        "en": {
          "title": "CRM Systems",
          "subtitle": "Custom CRM tailored to your business processes."
        }
      }
    },
    {
      "serviceId": "bots",
      "tag": "Telegram",
      "color1": "#22d3ee",
      "color2": "#0ea5e9",
      "translations": {
        "ru": {
          "title": "Telegram-боты",
          "subtitle": "Боты для автоматизации, AI-ассистенты, интеграции с API."
        },
        "uz": {
          "title": "Telegram-botlar",
          "subtitle": "Avtomatlashtirish uchun botlar, AI-yordamchilar."
        },
        "en": {
          "title": "Telegram Bots",
          "subtitle": "Automation bots, AI assistants, API integrations."
        }
      }
    },
    {
      "serviceId": "automation",
      "tag": "Automation",
      "color1": "#f59e0b",
      "color2": "#f97316",
      "translations": {
        "ru": {
          "title": "Автоматизация",
          "subtitle": "Цифровизация бизнес-процессов, снижение ручного труда."
        },
        "uz": {
          "title": "Avtomatlashtirish",
          "subtitle": "Biznes jarayonlarini raqamlashtirish."
        },
        "en": {
          "title": "Automation",
          "subtitle": "Digitize business processes, reduce manual work."
        }
      }
    },
    {
      "serviceId": "bi",
      "tag": "Analytics",
      "color1": "#8b5cf6",
      "color2": "#6d28d9",
      "translations": {
        "ru": {
          "title": "BI Аналитика",
          "subtitle": "Power BI дашборды и аналитические отчёты для принятия решений."
        },
        "uz": {
          "title": "BI Analitika",
          "subtitle": "Power BI dashboard va analitik hisobotlar."
        },
        "en": {
          "title": "BI Analytics",
          "subtitle": "Power BI dashboards and analytical reports for decision-making."
        }
      }
    },
    {
      "serviceId": "ai",
      "tag": "AI / LLM",
      "color1": "#ec4899",
      "color2": "#8b5cf6",
      "translations": {
        "ru": {
          "title": "AI-агенты",
          "subtitle": "Умные ассистенты и агенты на базе LLM для вашего бизнеса."
        },
        "uz": {
          "title": "AI-agentlar",
          "subtitle": "LLM asosidagi aqlli yordamchilar."
        },
        "en": {
          "title": "AI Agents",
          "subtitle": "Smart assistants and LLM-based agents for your business."
        }
      }
    },
    {
      "serviceId": "bitrix",
      "tag": "Bitrix24",
      "color1": "#0ea5e9",
      "color2": "#7c3aed",
      "translations": {
        "ru": {
          "title": "Bitrix24",
          "subtitle": "Внедрение, настройка и интеграция Bitrix24 для команд."
        },
        "uz": {
          "title": "Bitrix24",
          "subtitle": "Bitrix24 ni joriy etish va sozlash."
        },
        "en": {
          "title": "Bitrix24",
          "subtitle": "Bitrix24 implementation, configuration and integration."
        }
      }
    }
  ],
  "team": [
    {
      "memberId": "azizbek",
      "initials": "AI",
      "color1": "#0ea5e9",
      "color2": "#7c3aed",
      "socials": {
        "telegram": "https://t.me/ivnlabs"
      },
      "translations": {
        "ru": {
          "name": "Азизбек И.",
          "position": "Основатель & CEO / Fullstack Developer",
          "type": "Founder",
          "exp": "5+ лет",
          "skills": "Next.js,Node.js,Python,1C,AI/LLM"
        },
        "uz": {
          "name": "Azizbek I.",
          "position": "Asoschisi & CEO / Fullstack Developer",
          "type": "Founder",
          "exp": "5+ yil",
          "skills": "Next.js,Node.js,Python,1C,AI/LLM"
        },
        "en": {
          "name": "Azizbek I.",
          "position": "Founder & CEO / Fullstack Developer",
          "type": "Founder",
          "exp": "5+ years",
          "skills": "Next.js,Node.js,Python,1C,AI/LLM"
        }
      }
    },
    {
      "memberId": "dev1",
      "initials": "JK",
      "color1": "#7c3aed",
      "color2": "#ec4899",
      "socials": {
        "github": "#"
      },
      "translations": {
        "ru": {
          "name": "Жасур К.",
          "position": "Senior Backend Developer",
          "type": "Backend",
          "exp": "4 года",
          "skills": "Java,Spring Boot,PostgreSQL,Kafka,Docker"
        },
        "uz": {
          "name": "Jasur K.",
          "position": "Senior Backend Developer",
          "type": "Backend",
          "exp": "4 yil",
          "skills": "Java,Spring Boot,PostgreSQL,Kafka,Docker"
        },
        "en": {
          "name": "Jasur K.",
          "position": "Senior Backend Developer",
          "type": "Backend",
          "exp": "4 years",
          "skills": "Java,Spring Boot,PostgreSQL,Kafka,Docker"
        }
      }
    },
    {
      "memberId": "dev2",
      "initials": "SK",
      "color1": "#0ea5e9",
      "color2": "#22d3ee",
      "socials": {
        "github": "#"
      },
      "translations": {
        "ru": {
          "name": "Санжар К.",
          "position": "Frontend Developer",
          "type": "Frontend",
          "exp": "3 года",
          "skills": "React,TypeScript,Next.js,Framer Motion"
        },
        "uz": {
          "name": "Sanjar K.",
          "position": "Frontend Developer",
          "type": "Frontend",
          "exp": "3 yil",
          "skills": "React,TypeScript,Next.js,Framer Motion"
        },
        "en": {
          "name": "Sanjar K.",
          "position": "Frontend Developer",
          "type": "Frontend",
          "exp": "3 years",
          "skills": "React,TypeScript,Next.js,Framer Motion"
        }
      }
    },
    {
      "memberId": "designer",
      "initials": "MR",
      "color1": "#f59e0b",
      "color2": "#f97316",
      "socials": {
        "linkedin": "#"
      },
      "translations": {
        "ru": {
          "name": "Мадина Р.",
          "position": "UI/UX Designer",
          "type": "Design",
          "exp": "4 года",
          "skills": "Figma,Prototyping,UX Research,Branding"
        },
        "uz": {
          "name": "Madina R.",
          "position": "UI/UX Designer",
          "type": "Design",
          "exp": "4 yil",
          "skills": "Figma,Prototyping,UX Research,Branding"
        },
        "en": {
          "name": "Madina R.",
          "position": "UI/UX Designer",
          "type": "Design",
          "exp": "4 years",
          "skills": "Figma,Prototyping,UX Research,Branding"
        }
      }
    },
    {
      "memberId": "analyst",
      "initials": "NU",
      "color1": "#10b981",
      "color2": "#0ea5e9",
      "socials": {
        "linkedin": "#"
      },
      "translations": {
        "ru": {
          "name": "Нодира У.",
          "position": "BI & Data Analyst",
          "type": "Analytics",
          "exp": "3 года",
          "skills": "Power BI,Python,SQL,Excel,Tableau"
        },
        "uz": {
          "name": "Nodira U.",
          "position": "BI & Data Analyst",
          "type": "Analytics",
          "exp": "3 yil",
          "skills": "Power BI,Python,SQL,Excel,Tableau"
        },
        "en": {
          "name": "Nodira U.",
          "position": "BI & Data Analyst",
          "type": "Analytics",
          "exp": "3 years",
          "skills": "Power BI,Python,SQL,Excel,Tableau"
        }
      }
    },
    {
      "memberId": "pm",
      "initials": "ZA",
      "color1": "#8b5cf6",
      "color2": "#0ea5e9",
      "socials": {
        "telegram": "#"
      },
      "translations": {
        "ru": {
          "name": "Зафар А.",
          "position": "Project Manager",
          "type": "Management",
          "exp": "5 лет",
          "skills": "Agile,Scrum,Jira,Confluence,Strategy"
        },
        "uz": {
          "name": "Zafar A.",
          "position": "Project Manager",
          "type": "Management",
          "exp": "5 yil",
          "skills": "Agile,Scrum,Jira,Confluence,Strategy"
        },
        "en": {
          "name": "Zafar A.",
          "position": "Project Manager",
          "type": "Management",
          "exp": "5 years",
          "skills": "Agile,Scrum,Jira,Confluence,Strategy"
        }
      }
    }
  ]
};
