import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'URL Simplifier Application',
  description:
    'Web application that takes a full URL and returns a shortened version of it.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <div className='hero'>
          <div className='form'>{children}</div>
          <div className='cube'></div>
          <div className='cube'></div>
          <div className='cube'></div>
          <div className='cube'></div>
          <div className='cube'></div>
          <div className='cube'></div>
        </div>
      </body>
    </html>
  );
}
