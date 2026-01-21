import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import { Inter, Outfit, Zen_Kaku_Gothic_New } from 'next/font/google';
import type { Metadata } from 'next';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
});

const zen = Zen_Kaku_Gothic_New({
  weight: ['300', '400', '500', '700', '900'],
  subsets: ['latin'],
  variable: '--font-zen',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://nami.mcsv.win'),
  title: 'Nami Network',
  description: 'Nami Network Documentation',
  icons: {
    icon: '/favicon.png',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className={`flex flex-col min-h-screen ${inter.variable} ${outfit.variable} ${zen.variable}`}>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
