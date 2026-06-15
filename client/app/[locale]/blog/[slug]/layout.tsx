import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { getBlogPostMeta } from '@/lib/seo';

type Props = { params: { slug: string; locale: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  setRequestLocale(params.locale);
  return getBlogPostMeta(params.slug, params.locale as any);
}

export default function BlogPostLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
