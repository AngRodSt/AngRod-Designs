import type { Metadata } from 'next';
import { Source_Code_Pro } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { cookies } from 'next/headers';
import { getCart } from '@/lib/shopify';
const sourceCode = Source_Code_Pro({
  weight: '400',
  variable: '--font-sourceCode',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'AngRod Designs',
  description: 'Personal web application for AngRod Designs Company',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  //Fetching the card for the card provider
  const cartId = (await cookies()).get('cartId')?.value;
  const cart = getCart(cartId);
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.cdnfonts.com/css/helvetica-neue-55"
          rel="stylesheet"
        />
      </head>
      <body className={` ${sourceCode.variable} antialiased bg-gray-950`}>
        <CartProvider cartPromise={cart}>{children}</CartProvider>
      </body>
    </html>
  );
}
