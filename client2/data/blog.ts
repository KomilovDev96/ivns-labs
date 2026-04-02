export type BlogPost = {
  id: string;
  slug: string;
  category: 'tech' | 'business' | 'ai' | 'design' | 'news';
  color: string;
  color2: string;
  date: string;
  readTime: string;
  image: string;
};

export const blogPosts: BlogPost[] = [
  {
    id: 'ai-agents-business',
    slug: 'ai-agents-for-business',
    category: 'ai',
    color: '#0ea5e9',
    color2: '#7c3aed',
    date: '2024-12-15',
    readTime: '7 мин',
    image: '/images/blog/ai-agents.jpg',
  },
  {
    id: 'nextjs-performance',
    slug: 'nextjs-performance-optimization',
    category: 'tech',
    color: '#22d3ee',
    color2: '#0ea5e9',
    date: '2024-11-28',
    readTime: '10 мин',
    image: '/images/blog/nextjs-performance.jpg',
  },
  {
    id: 'crm-mistakes',
    slug: 'crm-implementation-mistakes',
    category: 'business',
    color: '#f59e0b',
    color2: '#f97316',
    date: '2024-11-10',
    readTime: '6 мин',
    image: '/images/blog/crm-mistakes.jpg',
  },
  {
    id: 'telegram-bots-2024',
    slug: 'telegram-bots-trends-2024',
    category: 'tech',
    color: '#10b981',
    color2: '#0ea5e9',
    date: '2024-10-22',
    readTime: '8 мин',
    image: '/images/blog/telegram-bots.jpg',
  },
  {
    id: 'design-system',
    slug: 'building-design-system',
    category: 'design',
    color: '#8b5cf6',
    color2: '#ec4899',
    date: '2024-10-05',
    readTime: '5 мин',
    image: '/images/blog/design-system.jpg',
  },
  {
    id: 'it-park-experience',
    slug: 'it-park-uzbekistan-experience',
    category: 'news',
    color: '#6366f1',
    color2: '#8b5cf6',
    date: '2024-09-18',
    readTime: '4 мин',
    image: '/images/blog/it-park.jpg',
  },
];

export const BLOG_CATEGORIES = [
  { id: 'all',      label: 'Все' },
  { id: 'tech',     label: 'Технологии' },
  { id: 'business', label: 'Бизнес' },
  { id: 'ai',       label: 'AI / ML' },
  { id: 'design',   label: 'Дизайн' },
  { id: 'news',     label: 'Новости' },
] as const;
