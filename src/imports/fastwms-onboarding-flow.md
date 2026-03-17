Сделай дизайн в стиле OpenAI: минимализм, много воздуха, светлый фон, нейтральные серые, аккуратные карточки, мягкие тени, простые иконки, без перегруза. Дружелюбный, современный интерфейс.

Проект: FASTWMS
Задача: регистрация пользователя → онбординг-опросник (7 вопросов + ветвления-уточнения, которые не меняют счетчик) → успех. Также сделать админ-страницу со статистикой по опроснику (учитывая незавершенные/закрытые/пропущенные).

==== ОСНОВНОЙ FLOW ====
1) Auth / Sign Up (поля) → 2) Survey Intro → 3) Survey Step 1..7 (с прогрессом) → 4) Success
Если пользователь закрывает опросник на любом шаге: показать Exit modal, затем отправить в Dashboard (не рисовать весь дашборд, только виджет “Завершите настройку профиля” + кнопка Resume).

==== СТИЛЬ OPENAI ====
- Фон: светлый, почти белый (#FAFAFA или близко)
- Текст: темно-серый почти черный (#111827 или близко)
- Вторичный текст: серый (#6B7280 или близко)
- Бордер: очень светлый серый (#E5E7EB или близко)
- Карточки: белые, радиус 16, тень очень мягкая
- Акцент: один спокойный цвет (например зелено-бирюзовый/голубой), использовать только для Primary CTA и прогресса
- Типографика: современный гротеск (Inter / SF Pro), заголовки жирнее, тексты спокойные
- Отступы: крупные (24–32), сетка 12 колонок (Desktop)

==== АДАПТИВЫ ====
Сделай 3 брейкпоинта:
- Desktop 1440
- Tablet 768
- Mobile 375
На Mobile: нижняя панель кнопок fixed, степпер компактный.

==== ФРЕЙМЫ (СОЗДАЙ ВСЕ) ====
A) AUTH
1) Auth / Sign Up (Desktop)
2) Auth / Sign Up (Mobile)
3) Auth / Loading (skeleton)
4) Auth / Error state (inline)

B) SURVEY (ONBOARDING)
5) Survey / Step 0 - Intro
6) Survey / Step 1 - Role
7) Survey / Step 2 - Marketplaces
8) Survey / Step 3 - Honest Sign + sub-question (print owner)
9) Survey / Step 4 - Primary Goal
10) Survey / Step 5 - Scale (SKU + Cabinets)
11) Survey / Step 6 - Fulfillment + sub-question (RBAC)
12) Survey / Step 7 - Contacts
13) Survey / Success
14) Survey / Loading (skeleton)
15) Survey / Error save (banner + retry)
16) Modal / Exit confirm (close on step)
17) Modal / Skip confirm

C) DASHBOARD WIDGET (после закрытия)
18) Dashboard / Onboarding card (Resume) – карточка с прогрессом и кнопкой “Продолжить”

D) ADMIN ANALYTICS
19) Admin / Survey Analytics - Overview
20) Admin / Survey Analytics - Drop-off Funnel
21) Admin / Survey Analytics - Question Details
22) Admin / Survey Analytics - Responses Table
23) Admin / Empty state
24) Admin / Loading (skeleton)

==== КОМПОНЕНТЫ (СОЗДАЙ КАК COMPONENTS + VARIANTS) ====
- Stepper Header: “Вопрос N из 7 · осталось X · ~1 минута” (Desktop) и “N/7 · осталось X · ~1 мин” (Mobile)
- Survey Card Option (variant: default/hover/selected/disabled)
- Chips multi-select (variant: default/selected)
- Sticky Bottom Bar (Back/Next/Skip; states: Next enabled/disabled/loading)
- Tooltip/Popover для подсказок (Desktop) + Bottom Sheet (Mobile)
- Toast “Сохранено”
- Banner Error (save failed)
- Modal Base (Exit/Skip)
- KPI Card (admin)
- Chart Card (placeholder layout)
- Table (admin, pagination, filter bar)

==== ТЕКСТЫ (МИКРОКОПИРАЙТ) ====
Survey Intro:
- Title: “Пару вопросов — настроим FASTWMS под вас”
- Subtitle: “7 вопросов · ~1 минута”
- Body: “Включим нужные модули (WB/ЧЗ/УПД), покажем подсказки и уберём лишнее.”
- Buttons: Primary “Начать”, Secondary “Пропустить (можно позже)”

Progress line на шагах:
- Desktop: “Вопрос {N} из 7 · осталось {7−N} · ~1 минута”
- Mobile: “{N}/7 · осталось {7−N} · ~1 мин”

Exit modal:
- Title: “Продолжить позже?”
- Text: “Мы сохраним ответы. Осталось {7−N} из 7 — это около 1 минуты.”
- Buttons: Primary “Продолжить”, Secondary “Позже”

Dashboard onboarding widget:
- Title: “Завершите настройку профиля”
- Text: “Осталось {7−last_step} из 7 — займёт около 1 минуты.”
- CTA: “Продолжить”

Success:
- Title: “Готово! FASTWMS настроен под вас ✅”
- Subtitle: “Мы подготовили стартовый сценарий и включили нужные модули.”
- CTA: “Перейти к настройке”, Secondary: “Перейти в систему”

==== ВОПРОСЫ ОПРОСНИКА (7 ОСНОВНЫХ + ВЕТВЛЕНИЯ) ====
Step 1 Role (single select cards):
- Селлер
- Фулфилмент / склад
- Бренд / производство
- Агентство / менеджер
Sub-question (не меняет счетчик): показывать если “Фулфилмент” или “Агентство”
“Сколько клиентов/кабинетов ведёте?”: 1–3 / 4–10 / 10+

Step 2 Marketplaces (multi-select chips):
Wildberries, Ozon, Я.Маркет, Lamoda, Другое (если выбрано — input)

Step 3 Honest Sign (single select):
Да, уже работаем / Да, начинаем / Нет / Не знаю
Sub-question (не меняет счетчик) если выбрано “Да, уже/начинаем”:
“Кто печатает коды?”: Мы сами / Фулфилмент / Производство

Step 4 Primary Goal (single select cards):
Остатки / Коды маркировки / УПД / Поставки WB / Доступы / Отчеты

Step 5 Scale:
SKU range: до 50 / 50–200 / 200–1000 / 1000+
Cabinets range: 1 / 2–5 / 5+

Step 6 Fulfillment:
Да, работаем с фулфилментом / Нет, свой склад / Планируем подключить
Sub-question (не меняет счетчик) если “Да”:
“Нужны роли и права (RBAC)?” Да/Нет

Step 7 Contacts:
Telegram (ник/телефон), Email

==== ПОДСКАЗКИ (TOOLTIPS) ДЛЯ СЛОЖНЫХ ТЕРМИНОВ ====
Добавь иконку ⓘ рядом с терминами, по клику Tooltip/Bottom sheet:
- SKU: “SKU = товарная позиция. Часто размер считают отдельным SKU.”
- Кабинет/Организация: “Отдельная организация/аккаунт (ИП/ООО или клиент у фулфилмента).”
- Честный знак/DataMatrix/КИЗ: “Коды маркировки. FASTWMS хранит, распределяет и помогает печатать.”
- УПД: “Документ передачи товаров/кодов. Можно сверять принятые/отклоненные коды.”
- RBAC: “Разграничение прав доступа по ролям.”

==== ADMIN: СТРАНИЦА СТАТИСТИКОЙ ОПРОСНИКА ====
Overview layout:
- Top filter bar: Period (7/30/90/custom), Role, Marketplace, ЧЗ, Source (UTM), кнопки Apply/Reset, Export CSV
- KPI cards: Registrations, Survey started, Completed, Completion rate, Closed, In progress, Avg time
- Funnel chart card: шаги 0–7 + отдельно “Closed on step”
- Charts: Completion rate by day, Roles distribution, Top goals
- Insights card: текстовые подсказки (placeholder)
Drop-off Funnel page: подробная воронка + таблица отвала по шагам
Question Details: распределение ответов + разрезы по ролям/источникам
Responses Table: строки пользователей, статус (completed/in_progress/closed/skipped), last_step, last_activity, source, actions

==== ПРОТОТИП ССЫЛКИ (В FIGMA) ====
- Sign Up → Survey Intro → Step1 → ... → Success
- На любом Step: Close (X) → Exit modal → Later → Dashboard onboarding widget
- Dashboard widget CTA → Resume step N
- Skip → Skip confirm → Dashboard widget

Соблюдай стиль OpenAI, очень чисто и современно. 