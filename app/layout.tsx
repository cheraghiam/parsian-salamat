import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Vazirmatn } from 'next/font/google'
import './globals.css'

const vazirmatn = Vazirmatn({
  subsets: ['arabic', 'latin'],
  variable: '--font-vazirmatn',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'پارسیان سلامت | سامانه ثبت و پایش ۱۲ سیگنال زیستی',
  description:
    'سامانه حرفه‌ای ثبت، پردازش و پایش هم‌زمان سیگنال‌های زیستی برای آموزش، پژوهش و توسعه سامانه‌های مهندسی پزشکی. ساخت پارسیان سلامت.',
  generator: 'v0.app',
  keywords: [
    'مهندسی پزشکی',
    'سیگنال زیستی',
    'ECG',
    'EEG',
    'EMG',
    'پارسیان سلامت',
    'biosignal acquisition',
    'biomedical',
  ],
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#060b16',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fa" dir="rtl" className={`dark ${vazirmatn.variable}`}>
      <body className="antialiased font-sans">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
