import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ivnlabs.uz';
const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api';

type Locale = 'ru' | 'uz' | 'en';

async function fetchJson<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

interface SeoLocale { metaTitle?: string; metaDescription?: string; keywords?: string }
interface Seo { ogImage?: string; ru?: SeoLocale; uz?: SeoLocale; en?: SeoLocale }

function buildMeta(
  seo: Seo | undefined,
  locale: Locale,
  fallbackTitle: string,
  fallbackDesc: string,
  slug: string,
  path: string,
): Metadata {
  const s = seo?.[locale] ?? seo?.ru ?? {};
  const title = s.metaTitle || fallbackTitle;
  const description = s.metaDescription || fallbackDesc;
  const keywords = s.keywords;
  const ogImage = seo?.ogImage || `${SITE_URL}/images/og-default.jpg`;
  const canonical = `${SITE_URL}/${locale}/${path}/${slug}`;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical,
      languages: {
        'ru': `${SITE_URL}/ru/${path}/${slug}`,
        'uz': `${SITE_URL}/uz/${path}/${slug}`,
        'en': `${SITE_URL}/en/${path}/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'IVN Labs',
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      locale: locale === 'ru' ? 'ru_RU' : locale === 'uz' ? 'uz_UZ' : 'en_US',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    robots: { index: true, follow: true },
  };
}

export async function getBlogPostMeta(slug: string, locale: Locale): Promise<Metadata> {
  const posts = await fetchJson<any[]>(`${API}/blog`);
  const post = posts?.find((p) => p.slug === slug);
  if (!post) return { title: 'Блог | IVN Labs' };

  const tr = post.translations?.[locale] ?? post.translations?.ru ?? {};
  return buildMeta(
    post.seo,
    locale,
    tr.title || slug,
    tr.excerpt || '',
    slug,
    'blog',
  );
}

export async function getProjectMeta(slug: string, locale: Locale): Promise<Metadata> {
  const projects = await fetchJson<any[]>(`${API}/projects`);
  const project = projects?.find((p) => p.slug === slug);
  if (!project) return { title: 'Проекты | IVN Labs' };

  const tr = project.translations?.[locale] ?? project.translations?.ru ?? {};
  return buildMeta(
    project.seo,
    locale,
    tr.title || project.tag,
    tr.desc || '',
    slug,
    'projects',
  );
}

export async function getServiceMeta(serviceId: string, locale: Locale): Promise<Metadata> {
  const services = await fetchJson<any[]>(`${API}/services`);
  const service = services?.find((s) => s.serviceId === serviceId);
  if (!service) return { title: 'Услуги | IVN Labs' };

  const tr = service.translations?.[locale] ?? service.translations?.ru ?? {};
  return buildMeta(
    service.seo,
    locale,
    tr.title || service.tag,
    tr.subtitle || '',
    serviceId,
    'services',
  );
}
