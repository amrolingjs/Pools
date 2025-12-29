import { CardType, WeekData, FutureGoal } from './types';

export const WEEKS_DATA: WeekData[] = [
  {
    id: 'week-1',
    title: 'Неделя 1',
    subtitle: 'Baseline & Strategy',
    items: [
      {
        id: 'w1-econ',
        title: 'Определение экономики продукта',
        type: CardType.TASK,
        description: 'Источники дохода: комиссии/доля протокола/карты. Расчет допустимого CAC.',
        owner: 'Клиент',
        deadline: 'День 3',
        status: 'To Do'
      },
      {
        id: 'w1-funnels',
        title: 'Подготовка воронок',
        type: CardType.TASK,
        description: 'Smart Investor (обучение) и Degen Hunter (APY). Описание цепочек: FB Ads -> Pre-lander -> App.',
        owner: 'A-One Agency',
        deadline: 'День 5',
        status: 'To Do'
      },
      {
        id: 'w1-competitors',
        title: 'Анализ конкурентов',
        type: CardType.TASK,
        description: 'Отстройка от Uniswap/Pancake. Разработка схем воронок под бюджет.',
        owner: 'A-One Agency',
        deadline: 'День 6'
      },
      {
        id: 'w1-tests',
        title: 'Подготовка тестов',
        type: CardType.TASK,
        description: 'План тестов на 4 недели. Список событий + UTM структура. Дашборд-черновик.',
        owner: 'A-One Agency',
        deadline: 'День 7'
      },
      {
        id: 'w1-report',
        title: 'Отчет недели 1',
        type: CardType.REPORT,
        description: 'Фиксация экономики, схемы воронок, план тестов, ссылка на Dashboard.',
        deadline: 'Пятница'
      }
    ],
    outcomes: [
      { id: 'w1-o1', text: 'Экономическая модель (Google Sheet)', isCompleted: false },
      { id: 'w1-o2', text: 'Карта проекта (PDF)', isCompleted: false },
      { id: 'w1-o3', text: 'План тестов (Notion/Trello)', isCompleted: false },
      { id: 'w1-o4', text: '2-3 описанные воронки', isCompleted: false }
    ]
  },
  {
    id: 'week-2',
    title: 'Неделя 2',
    subtitle: 'Упаковка & Контент',
    items: [
      {
        id: 'w2-lands',
        title: 'Упаковка лендингов',
        type: CardType.TASK,
        description: 'Лендинг 1 (Основной), Лендинг 2 (Второй оффер). Trust-блоки: Аудит, Комиссии, FAQ.',
        owner: 'A-One Agency',
        deadline: 'День 12'
      },
      {
        id: 'w2-content-fb',
        title: 'Подготовка контента FB',
        type: CardType.TASK,
        description: '4-6 креативов, 2 версии текста (короткий/длинный).',
        owner: 'A-One Agency',
        deadline: 'День 12'
      },
      {
        id: 'w2-content-twitter',
        title: 'Подготовка контента Twitter',
        type: CardType.TASK,
        description: '10-15 постов/тредов. Список 30-50 аккаунтов для комментинга.',
        owner: 'A-One Agency',
        deadline: 'День 12'
      },
      {
        id: 'w2-docs',
        title: 'Docs + Аналитика',
        type: CardType.TASK,
        description: 'Gitbook документация. Настройка GTM / Web3 трекеров.',
        owner: 'A-One Agency + Tech',
        deadline: 'День 14'
      },
      {
        id: 'w2-report',
        title: 'Отчет недели 2',
        type: CardType.REPORT,
        description: 'Live demo лендингов, примеры креативов, готовый Runbook запуска.',
        deadline: 'Пятница'
      }
    ],
    outcomes: [
      { id: 'w2-o1', text: 'Лендинги готовы к трафику', isCompleted: false },
      { id: 'w2-o2', text: 'Контент-пак (FB/X/TG)', isCompleted: false },
      { id: 'w2-o3', text: 'Настроенная аналитика', isCompleted: false },
      { id: 'w2-o4', text: 'Runbook недели 3', isCompleted: false }
    ]
  },
  {
    id: 'week-3',
    title: 'Неделя 3',
    subtitle: 'Запуск Трафика',
    items: [
      {
        id: 'w3-fb',
        title: 'Запуск FB Ads',
        type: CardType.TASK,
        description: 'Кампания A (оффер 1), Кампания B (оффер 2).',
        owner: 'A-One Agency',
        deadline: 'День 15-16'
      },
      {
        id: 'w3-x',
        title: 'Запуск X Ads & Influence',
        type: CardType.TASK,
        description: 'Промо пост/тред. Интеграция с 1-2 инфлюенсерами.',
        owner: 'A-One Agency',
        deadline: 'День 15-17'
      },
      {
        id: 'w3-tg',
        title: 'Запуск TG Seeding',
        type: CardType.TASK,
        description: 'Посевы в тематических каналах. A/B тест текстов.',
        owner: 'A-One Agency',
        deadline: 'День 16-17'
      },
      {
        id: 'w3-tests',
        title: 'Результаты первых тестов',
        type: CardType.TASK,
        description: 'Сравнение офферов A/B, креативов. Контроль конверсии Wallet Connect.',
        owner: 'A-One Agency',
        deadline: 'День 18-21'
      },
      {
        id: 'w3-report',
        title: 'Отчет недели 3',
        type: CardType.REPORT,
        description: 'Графики конверсий, Топ-2 связки, план оптимизации.',
        deadline: 'Пятница'
      }
    ],
    outcomes: [
      { id: 'w3-o1', text: 'Первые живые пользователи', isCompleted: false },
      { id: 'w3-o2', text: 'Фактические цифры CPA/CAC', isCompleted: false },
      { id: 'w3-o3', text: 'Список эффективных связок', isCompleted: false },
      { id: 'w3-o4', text: 'Список неэффективных (выключено)', isCompleted: false }
    ]
  },
  {
    id: 'week-4',
    title: 'Неделя 4',
    subtitle: 'Аналитика & Baseline',
    items: [
      {
        id: 'w4-stats',
        title: 'Срез статистики',
        type: CardType.TASK,
        description: 'Метрики: CPA Activated, Conversion rate (Visit -> App -> Connect -> Action). ROAS.',
        owner: 'A-One Agency',
        deadline: 'День 22-24'
      },
      {
        id: 'w4-funnel',
        title: 'Работающая воронка',
        type: CardType.TASK,
        description: 'Масштабирование лучших форматов. Вторая волна посевов.',
        owner: 'A-One Agency',
        deadline: 'День 26-28'
      },
      {
        id: 'w4-plan',
        title: 'План на 90 дней',
        type: CardType.TASK,
        description: 'Бюджет (3 сценария), Календарь тестов, Backlog правок.',
        owner: 'A-One Agency',
        deadline: 'День 28'
      },
      {
        id: 'w4-analysis',
        title: 'Результаты тестов + выводы',
        type: CardType.TASK,
        description: 'Анализ связок. Сводка по CPA.',
        owner: 'A-One Agency',
        deadline: 'День 25'
      },
      {
        id: 'w4-final',
        title: 'Final Review + Отчет',
        type: CardType.REPORT,
        description: 'Финальная презентация + Dashboard walkthrough. Решение о масштабировании.',
        deadline: 'Конец месяца'
      }
    ],
    outcomes: [
      { id: 'w4-o1', text: 'Полный срез статистики', isCompleted: false },
      { id: 'w4-o2', text: 'Baseline Report (PDF)', isCompleted: false },
      { id: 'w4-o3', text: 'План на 90 дней', isCompleted: false },
      { id: 'w4-o4', text: 'Модель работы месяц 2', isCompleted: false }
    ]
  }
];

export const FUTURE_GOALS: FutureGoal[] = [
  {
    id: 'future-3m',
    title: 'Momentum & Scaling',
    period: 'Месяц 2-3',
    items: [
      'Community scaling (15-30k)',
      'Traffic ramp-up (10-20k visits/mo)',
      '10-20 mid-KOL интеграций',
      'A/B тесты и on-site оптимизация'
    ],
    kpi: [
      'TVL: 200-500k',
      'Active wallets: 5-10k',
      'Первые fees > 0'
    ]
  },
  {
    id: 'future-6m',
    title: 'Checkpoint & Authority',
    period: 'Месяц 4-6',
    items: [
      'Partnerships (1inch etc)',
      'PR (CoinTelegraph listings)',
      'User feedback loops',
      'Boosted yields'
    ],
    kpi: [
      'TVL: 1-2M',
      'Active wallets: 5-10k',
      'Revenue > marketing costs'
    ]
  }
];

// Mock data for the dashboard chart
export const CHART_DATA = [
  { day: 'Day 1', visits: 120, connects: 5, actions: 0 },
  { day: 'Day 5', visits: 450, connects: 35, actions: 10 },
  { day: 'Day 10', visits: 800, connects: 75, actions: 25 },
  { day: 'Day 15', visits: 1500, connects: 180, actions: 60 },
  { day: 'Day 20', visits: 3200, connects: 350, actions: 140 },
  { day: 'Day 25', visits: 5400, connects: 620, actions: 280 },
  { day: 'Day 30', visits: 8500, connects: 950, actions: 450 },
];