import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from '@/lib/CartContext';
import PageTransitionLoader from '@/components/shared/PageTransitionLoader';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Devi Sutra - Handmade Elegance | Premium Handcrafted Bags & Kurtis',
  description: 'Shop exquisite handmade bags, tote bags, purses, and traditional kurtis at Devi Sutra. Premium quality handcrafted products.',
  keywords: 'handmade bags, tote bags, purses, kurtis, handcrafted, devi sutra',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <PageTransitionLoader />
          <Navbar />
          <main className="grow">{children}</main>
          <Footer />
          <Toaster position="top-right" />
        </CartProvider>
      </body>
    </html>
  );
}
