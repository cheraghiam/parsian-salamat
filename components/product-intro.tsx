'use client'

import Image from 'next/image'
import { Check } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { WaveformChart } from '@/components/waveform-chart'
import { useT } from '@/lib/i18n'

export function ProductIntro() {
  const t = useT()

  const features = [
    t('ثبت هم‌زمان چند سیگنال', 'Simultaneous multi-signal acquisition'),
    t('نمایش لحظه‌ای داده‌ها', 'Real-time data visualization'),
    t('معماری ماژولار', 'Modular architecture'),
    t('مناسب برای آموزش و پژوهش', 'Ideal for education & research'),
    t('اتصال سنسورها و ماژول‌های مختلف', 'Connects diverse sensors & modules'),
    t('قابلیت توسعه نرم‌افزاری', 'Software-extensible platform'),
  ]

  const badges = ['ESP32', 'Real-Time', 'Multi-Channel', 'Biomedical']

  return (
    <section id="product" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="order-2 lg:order-1">
            <div className="relative overflow-hidden rounded-xl border border-border glass">
              <Image
                src="/images/device-front.png"
                alt={t('نمای جلوی دستگاه', 'Device front view')}
                width={700}
                height={520}
                className="h-auto w-full"
              />
              <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background/90 to-transparent" />
              <div className="absolute inset-x-4 bottom-4 h-12 opacity-70">
                <WaveformChart type="ecg" variant="mini" color="var(--signal-cyan)" />
              </div>
            </div>
          </Reveal>

          <div className="order-1 lg:order-2">
            <Reveal>
              <span className="section-label">
                {t('معرفی محصول', 'Product Overview')}
              </span>
              <h2 className="mt-5 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
                {t(
                  'سامانه ثبت و پایش ۱۲ سیگنال زیستی',
                  '12-Channel Biosignal Acquisition & Monitoring System',
                )}
              </h2>
              <p className="mt-5 text-pretty leading-8 text-muted-foreground">
                {t(
                  'این سامانه یک پلتفرم یکپارچه برای دریافت و پایش سیگنال‌های فیزیولوژیک است که امکان ثبت هم‌زمان چندین سیگنال زیستی و تبدیل داده‌های خام به اطلاعات قابل تحلیل را فراهم می‌کند.',
                  'An integrated platform for acquiring and monitoring physiological signals, enabling simultaneous recording of multiple biosignals and transforming raw data into analyzable information.',
                )}
              </p>
            </Reveal>

            <Reveal delay={80}>
              <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border border-primary/30 bg-primary/10 text-primary">
                      <Check className="size-3" strokeWidth={3} />
                    </span>
                    <span className="text-foreground/90">{f}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={140}>
              <div className="mt-8 flex flex-wrap gap-2">
                {badges.map((b) => (
                  <span
                    key={b}
                    className="rounded-md border border-border bg-white/5 px-3 py-1.5 font-mono text-xs tracking-wide text-primary"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
