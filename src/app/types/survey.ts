export interface SurveyData {
  userId?: string;
  role?: string;
  clientsCount?: string;
  marketplaces?: string[];
  marketplacesOther?: string;
  honestSign?: string;
  printOwner?: string;
  primaryGoals?: string[]; // Changed from primaryGoal to support multiple selection
  skuRange?: string;
  cabinetsRange?: string;
  fulfillment?: string;
  telegram?: string;
  email?: string;
  // Step 7: Business details
  storeName?: string;
  organizationType?: 'individual' | 'legal'; // ИП или Юр.лицо
  inn?: string;
  shortSellerName?: string;
  shortAddress?: string;
  currentStep: number;
  lastStep: number;
  status: 'in_progress' | 'completed' | 'closed' | 'skipped';
  startedAt?: string;
  completedAt?: string;
  lastActivityAt?: string;
}

export const TOTAL_STEPS = 7;

export const MARKETPLACES = [
  'Wildberries',
  'Ozon',
  'Я.Маркет',
  'Lamoda',
  'Другое'
];

export const ROLES = [
  { value: 'seller', label: 'Селлер', description: 'Продаю товары на маркетплейсах' },
  { value: 'fulfillment', label: 'Фулфилмент / склад', description: 'Оказываю услуги хранения и отправки' },
  { value: 'brand', label: 'Бренд / производство', description: 'Производю товары для продажи' },
  { value: 'agency', label: 'Агентство / менеджер', description: 'Управляю кабинетами клиентов' }
];

export const GOALS = [
  { value: 'inventory', label: 'Остатки', icon: '📦' },
  { value: 'marking', label: 'Коды маркировки', icon: '🏷️' },
  { value: 'upd', label: 'УПД', icon: '📄' },
  { value: 'supplies', label: 'Поставки WB', icon: '🚚' },
  { value: 'access', label: 'Доступы', icon: '🔐' },
  { value: 'reports', label: 'Отчеты', icon: '📊' }
];

export interface SurveyQuestion {
  id: number;
  title: string;
  description: string;
  type: 'single' | 'multiple' | 'text' | 'subquestions';
  options?: { value: string; label: string; description?: string; icon?: string }[];
  subQuestion?: {
    condition: (data: SurveyData) => boolean;
    title: string;
    type: 'single' | 'multiple' | 'text';
    options?: { value: string; label: string }[];
  };
  tooltip?: string;
}

export const SURVEY_QUESTIONS: SurveyQuestion[] = [
  {
    id: 1,
    title: 'Ваша роль в бизнесе',
    description: 'Это поможет настроить интерфейс под ваши задачи',
    type: 'single',
    options: ROLES,
    subQuestion: {
      condition: (data) => data.role === 'fulfillment' || data.role === 'agency',
      title: 'Сколько клиентов/кабинетов ведёте?',
      type: 'single',
      options: [
        { value: '1–3', label: '1–3' },
        { value: '4–10', label: '4–10' },
        { value: '10+', label: '10+' }
      ]
    }
  },
  {
    id: 2,
    title: 'На каких маркетплейсах работаете?',
    description: 'Можно выбрать несколько',
    type: 'multiple',
    options: MARKETPLACES.map(m => ({ value: m, label: m }))
  },
  {
    id: 3,
    title: 'Работаете с Честным знаком?',
    description: 'Маркировка товаров DataMatrix кодами',
    type: 'single',
    tooltip: 'Коды маркировки. FASTWMS хранит, распределяет и помогает печатать.',
    options: [
      { value: 'yes-working', label: 'Да, уже работаем' },
      { value: 'yes-starting', label: 'Да, начинаем' },
      { value: 'no', label: 'Нет' },
      { value: 'unknown', label: 'Не знаю' }
    ],
    subQuestion: {
      condition: (data) => data.honestSign === 'yes-working' || data.honestSign === 'yes-starting',
      title: 'Кто печатает коды?',
      type: 'single',
      options: [
        { value: 'ourselves', label: 'Мы сами' },
        { value: 'fulfillment', label: 'Фулфилмент' },
        { value: 'production', label: 'Производство' }
      ]
    }
  },
  {
    id: 4,
    title: 'Главные задачи сейчас',
    description: 'Что хотите настроить в первую очередь? Можно выбрать несколько',
    type: 'multiple',
    options: GOALS
  },
  {
    id: 5,
    title: 'Масштаб работы',
    description: 'Это поможет оптимизировать интерфейс',
    type: 'subquestions'
  },
  {
    id: 6,
    title: 'Фулфилмент',
    description: 'Работаете с партнёрами по хранению и отправке?',
    type: 'single',
    options: [
      { value: 'yes', label: 'Да, работаем с фулфилментом' },
      { value: 'no', label: 'Нет, свой склад' },
      { value: 'planning', label: 'Планируем подключить' }
    ]
  },
  {
    id: 7,
    title: 'Завершение регистрации',
    description: 'Заполните данные вашей компании',
    type: 'text'
  }
];