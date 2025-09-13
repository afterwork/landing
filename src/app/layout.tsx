import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.scss';
import { I18nProvider } from '@/components/I18nProvider';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'FinFlow — Budget Smarter, Spend Wiser',
  description:
    'FinFlow helps you track spending, build budgets, scan receipts, and plan with calm confidence.',
  openGraph: {
    title: 'FinFlow — Budget Smarter, Spend Wiser',
    description:
      'FinFlow helps you track spending, build budgets, scan receipts, and plan with calm confidence.',
    url: 'https://finflow.example.com/',
    siteName: 'FinFlow',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'FinFlow — Budget Smarter, Spend Wiser',
      },
    ],
    type: 'website',
  },
  metadataBase: new URL('https://finflow.example.com'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark">
      <body className={`${poppins.variable}`}>
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
