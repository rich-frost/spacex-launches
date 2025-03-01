import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SpaceX Launches',
  description: 'SpaceX Launches Demo Site',
  openGraph: {
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
