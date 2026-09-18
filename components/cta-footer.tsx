'use client'

import { Activity, ArrowLeft, Mail, MapPin, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Reveal } from '@/components/reveal'
import { useLang, useT } from '@/lib/i18n'

export function CtaFooter() {
  const t = useT()
  const { lang } = useLang()

  const nav = [
    { href: '#product', label: t('محصول', 'Product') },
    { href: '#signals', label: t('سیگنال‌ها', 'Signals') },
    { href: '#features', label: t('امکانات', 'Features') },
    { href: '#specs', label: t('مشخصات', 'Specs') },
    { href: '#applications', label: t('کاربردها', 'Applications') },
    { href: '#gallery', label: t('گالری', 'Gallery') },
  ]

  return (
    <>
      <section id="contact" className="relative py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-primary/30 p-8 sm:p-14">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-cyan/10" />
              <div className="pointer-events-none absolute -top-24 end-0 size-72 rounded-full bg-primary/20 blur-3xl" />
              <div className="relative max-w-2xl">
                <h2 className="text-balance text-3xl font-black leading-tight sm:text-4xl">
                  {t(
                    'آماده‌اید سامانه پایش سیگنال خود را راه‌اندازی کنید؟',
                    'Ready to deploy your own biosignal monitoring system?',
                  )}
                </h2>
                <p className="mt-4 text-pretty text-base leading-8 text-muted-foreground">
                  {t(
                    'برای مشاوره، دریافت اطلاعات فنی یا سفارش دستگاه با ما در تماس باشید.',
                    'Get in touch for consultation, technical details, or to order the device.',
                  )}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button size="lg" className="group font-semibold">
                    {t('درخواست مشاوره', 'Request Consultation')}
                    <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1 rtl:rotate-0 ltr:rotate-180" />
                  </Button>
                  <Button size="lg" variant="outline" className="border-border bg-white/5 font-semibold">
                    {t('دانلود بروشور', 'Download Brochure')}
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="relative border-t border-border bg-background/60">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr]">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="grid size-9 place-items-center rounded-lg bg-primary text-primary-foreground">
                  <Activity className="size-5" />
                </span>
                <span className="text-lg font-black tracking-tight">
                  Bio<span className="text-primary">Signal</span> 12
                </span>
              </div>
              <p className="mt-4 max-w-sm text-sm leading-7 text-muted-foreground">
                {t(
                  'سامانه‌ای یکپارچه برای دریافت، پردازش و نمایش هم‌زمان ۱۲ سیگنال زیستی، مبتنی بر پردازنده ESP32.',
                  'An integrated system for acquiring, processing and displaying 12 biosignals simultaneously, powered by ESP32.',
                )}
              </p>
            </div>

            <nav aria-label={t('پیوندهای سریع', 'Quick links')}>
              <h3 className="text-sm font-bold text-foreground">{t('پیوندهای سریع', 'Quick Links')}</h3>
              <ul className="mt-4 grid grid-cols-2 gap-2.5">
                {nav.map((n) => (
                  <li key={n.href}>
                    <a href={n.href} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                      {n.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h3 className="text-sm font-bold text-foreground">{t('تماس', 'Contact')}</h3>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li className="flex items-center gap-2.5">
                  <Mail className="size-4 text-primary" />
                  <span dir="ltr">info@biosignal12.dev</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone className="size-4 text-primary" />
                  <span dir="ltr">+98 21 0000 0000</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <MapPin className="size-4 text-primary" />
                  <span>{t('تهران، ایران', 'Tehran, Iran')}</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
            <p>© {new Date().getFullYear()} BioSignal 12. {t('تمامی حقوق محفوظ است.', 'All rights reserved.')}</p>
            <p className="font-mono">{t('طراحی و توسعه سامانه پایش سیگنال زیستی', 'Biosignal monitoring system')}</p>
          </div>
        </div>
      </footer>
    </>
  )
}
