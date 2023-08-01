import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import GoogleAnalytics from './utils/analytics';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FlagGuessr',
  description: 'Flaggen-Quiz',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <GoogleAnalytics GA_TRACKING_ID={'G-DK9ZSQ5EVS'} />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
