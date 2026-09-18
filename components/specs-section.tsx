'use client'

import Image from 'next/image'
import { Cpu } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { useT } from '@/lib/i18n'

export function SpecsSection() {
  const t = useT()

  const specs = [
    { k: t('تعداد کانال', 'Channels'), v: '12' },
    { k: t('کنترلر', 'Controller'), v: 'ESP32 (Dual-Core)' },
    { k: t('نرخ نمونه‌برداری', 'Sampling Rate'), v: t('تا ۱ کیلوهرتز', 'up to 1 kHz') },
    { k: t('رزولوشن ADC', 'ADC Resolution'), v: '24-bit' },
    { k: t('ارتباط', 'Connectivity'), v: 'USB · Wi-Fi · BLE' },
    { k: t('تغذیه', 'Power'), v: '5V / USB · Li-Po' },
    { k: t('سیگنال‌ها', 'Signals'), v: 'ECG, EEG, EMG, EOG, GSR …' },
    { k: t('خروجی داده', 'Data Output'), v: t('جریان زنده و ذخیره', 'Live stream & logging') },
  ]

  return (
    <section id="specs" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label={t('مشخصات فنی', 'Technical Specs')}
          icon={Cpu}
          title={t('مشخصات فنی سامانه', 'System Specifications')}
          subtitle={t(
            'جزئیات فنی سخت‌افزار و قابلیت‌های پردازشی دستگاه.',
            'Hardware details and processing capabilities of the device.',
          )}
        />

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <div className="relative overflow-hidden rounded-xl border border-border glass p-3">
              <Image
                src="/images/device-back.png"
                alt={t('نمای پشت دستگاه و درگاه‌ها', 'Device back view and ports')}
                width={680}
                height={520}
                className="h-auto w-full rounded-lg"
              />
            </div>
          </Reveal>

          <Reveal delay={100}>
            <dl className="overflow-hidden rounded-xl border border-border">
              {specs.map((s, i) => (
                <div
                  key={s.k}
                  className={`flex items-center justify-between gap-4 px-5 py-3.5 ${
                    i % 2 === 0 ? 'bg-card/60' : 'bg-white/[0.02]'
                  }`}
                >
                  <dt className="text-sm text-muted-foreground">{s.k}</dt>
                  <dd className="text-end font-mono text-sm font-semibold text-foreground">
                    {s.v}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
