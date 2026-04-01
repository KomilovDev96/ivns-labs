import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'IVN Labs — IT Solutions',
  description: 'IVN Labs — команда разработчиков, создающих умные решения: AI-агенты, корпоративные платформы, интеграции.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
