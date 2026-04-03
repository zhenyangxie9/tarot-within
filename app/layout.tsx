import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Tarot Within — 塔罗之内',
  description: '沉浸式数字塔罗体验，结合 AI 个性化解读，探索你内心的答案。',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-void text-white antialiased">
        {children}
      </body>
    </html>
  );
}
