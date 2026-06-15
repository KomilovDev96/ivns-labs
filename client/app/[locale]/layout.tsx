import Script from 'next/script';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/routing';
import { ThemeSync } from '@/lib/ThemeSync';
import Preloader from '@/components/Preloader';
import { ContentProvider } from '@/lib/ContentContext';

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params: { locale } }: Props) {
  if (!routing.locales.includes(locale as any)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();
  return (
    <html lang={locale} data-theme="dark" suppressHydrationWarning>
      <head />
      <body suppressHydrationWarning>
        <Script id="theme-init" strategy="beforeInteractive">{`
          try{
            var t=localStorage.getItem('ivnlabs-theme');
            if(!t){t=window.matchMedia('(prefers-color-scheme:light)').matches?'light':'dark';}
            document.documentElement.setAttribute('data-theme',t);
          }catch(e){}
        `}</Script>
        <NextIntlClientProvider messages={messages}>
          <ContentProvider>
            <ThemeSync />
            <Preloader />
            {children}
          </ContentProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
