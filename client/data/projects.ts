// ─────────────────────────────────────────────────────────────────
// Projects data — later will be fetched from admin API
// Add new projects here until the admin panel is ready
// ─────────────────────────────────────────────────────────────────

export type Project = {
  id: string;
  slug: string;
  tag: string;
  category: 'ecommerce' | 'fintech' | 'crm' | 'analytics' | 'automation' | 'erp';
  color: string;
  color2: string;
  year: number;
  duration: string;        // "3 месяца"
  stack: string[];
  statValue: string;       // "+340%"
  statLabel: string;       // "конверсия"
  featured?: boolean;      // show larger card
  image?: string;          // "/images/projects/ecom.jpg" — add from admin panel
};

export const projects: Project[] = [
  {
    id: 'ecom',
    slug: 'ecommerce-platform',
    tag: 'E-Commerce',
    category: 'ecommerce',
    color: '#0ea5e9',
    color2: '#7c3aed',
    year: 2024,
    duration: '4 мес',
    stack: ['Next.js', 'Node.js', 'PostgreSQL', 'Redis', 'AI/ML'],
    statValue: '+340%',
    statLabel: 'конверсия',
    featured: true,
  },
  {
    id: 'bank',
    slug: 'banking-portal',
    tag: 'FinTech',
    category: 'fintech',
    color: '#8b5cf6',
    color2: '#ec4899',
    year: 2024,
    duration: '6 мес',
    stack: ['React', 'Java Spring', 'Oracle DB', 'Kafka'],
    statValue: '2M+',
    statLabel: 'транзакций/день',
    featured: true,
  },
  {
    id: 'crm',
    slug: 'logistics-crm',
    tag: 'CRM',
    category: 'crm',
    color: '#22d3ee',
    color2: '#0ea5e9',
    year: 2023,
    duration: '3 мес',
    stack: ['Vue.js', 'Python', 'PostgreSQL', 'Docker'],
    statValue: '-60%',
    statLabel: 'ручной труд',
  },
  {
    id: 'bi',
    slug: 'bi-dashboard',
    tag: 'Analytics',
    category: 'analytics',
    color: '#f59e0b',
    color2: '#f97316',
    year: 2024,
    duration: '2 мес',
    stack: ['Power BI', 'Python', 'SQL Server', 'Azure'],
    statValue: '50+',
    statLabel: 'метрик real-time',
  },
  {
    id: 'bot',
    slug: 'hr-telegram-bot',
    tag: 'Automation',
    category: 'automation',
    color: '#10b981',
    color2: '#0ea5e9',
    year: 2023,
    duration: '6 нед',
    stack: ['Python', 'Telegram Bot API', 'PostgreSQL', 'AI'],
    statValue: '10K+',
    statLabel: 'пользователей',
  },
  {
    id: 'erp',
    slug: 'erp-integration',
    tag: 'ERP / 1C',
    category: 'erp',
    color: '#6366f1',
    color2: '#8b5cf6',
    year: 2023,
    duration: '5 мес',
    stack: ['1C', 'SAP', 'Python', 'REST API', 'RabbitMQ'],
    statValue: '0',
    statLabel: 'потерь данных',
  },
];

export const CATEGORIES = [
  { id: 'all',        label: 'Все проекты' },
  { id: 'ecommerce',  label: 'E-Commerce' },
  { id: 'fintech',    label: 'FinTech' },
  { id: 'crm',        label: 'CRM' },
  { id: 'analytics',  label: 'Analytics' },
  { id: 'automation', label: 'Automation' },
  { id: 'erp',        label: 'ERP / 1C' },
] as const;
