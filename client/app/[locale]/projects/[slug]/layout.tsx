import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { getProjectMeta } from '@/lib/seo';

type Props = { params: { slug: string; locale: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  setRequestLocale(params.locale);
  return getProjectMeta(params.slug, params.locale as any);
}

export default function ProjectLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
