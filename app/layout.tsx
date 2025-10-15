import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Navigation } from '@/components/layout/Navigation';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AssetFlow - Asset Management System',
  description: 'Modern asset management and tracking system',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" >
      <body className={`${inter.className} `}>
        <div className="min-h-screen ">
          <Navigation />
          <main className="pt-16">
            {children}
          </main>
        </div>
        <Toaster />
      </body>
    </html>
  );
}