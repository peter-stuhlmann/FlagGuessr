import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import GoogleAnalytics from './utils/analytics';

import StyledComponentsRegistry from './registry';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FlagGuessr',
  description: 'Flaggen-Quiz',
  themeColor: '#0086FE',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <head>
        <link rel="preconnect" href="https://google-analytics.com" />
        <link rel="preconnect" href="https://restcountries.com" />
      </head>
      <StyledComponentsRegistry>
        <GoogleAnalytics GA_TRACKING_ID={'G-DK9ZSQ5EVS'} />
        <body className={inter.className}>{children}</body>
      </StyledComponentsRegistry>
    </html>
  );
}
