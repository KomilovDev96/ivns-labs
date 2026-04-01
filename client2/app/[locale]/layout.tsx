import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/routing';

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Inline script: reads localStorage BEFORE first paint → no flash
const themeScript = `
(function(){
  try{
    var t=localStorage.getItem('ivnlabs-theme');
    if(!t){t=window.matchMedia('(prefers-color-scheme:light)').matches?'light':'dark';}
    document.documentElement.setAttribute('data-theme',t);
  }catch(e){}
})();
`;

export default async function LocaleLayout({ children, params: { locale } }: Props) {
  if (!routing.locales.includes(locale as any)) notFound();
  const messages = await getMessages();
  return (
    <html lang={locale} data-theme="dark" suppressHydrationWarning>
      <head>
        {/* Must be first — prevents flash of wrong theme */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
