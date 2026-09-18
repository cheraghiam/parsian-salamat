'use client'

import Image from 'next/image'
import { ArrowLeft, PlayCircle, Radio } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { WaveformChart } from '@/components/waveform-chart'
import { useLang, useT } from '@/lib/i18n'

export function HeroSection() {
  const t = useT()
  const { dir } = useLang()
  const Arrow = ArrowLeft

  const chips = [
    { label: '12 Channels', top: '6%', side: '-4%' },
    { label: 'Real-Time Acquisition', top: '30%', side: '86%' },
    { label: 'Biomedical Signals', top: '72%', side: '-6%' },
    { label: 'Research Platform', top: '90%', side: '70%' },
  ]

  return (
    <section
      id="home"
      className="relative overflow-hidden pt-28 pb-16 sm:pt-32 lg:pb-24"
    >
      {/* ECG line behind */}
      <div className="pointer-events-none absolute inset-x-0 top-1/2 h-40 -translate-y-1/2 opacity-[0.18]">
        <WaveformChart type="ecg" variant="mini" window={6} speed={0.9} />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8">
        <div>
          <span className="section-label">
            <Radio className="size-3.5" />
            {t('پلتفرم ثبت سیگنال زیستی', 'Biosignal Acquisition Platform')}
          </span>

          <h1 className="mt-6 text-balance text-4xl font-black leading-[1.15] tracking-tight sm:text-5xl lg:text-6xl">
            {t('یک سامانه،', 'One system,')}
            <br />
            <span className="text-primary text-glow">
              {t('۱۲ سیگنال زیستی،', '12 biosignals,')}
            </span>
            <br />
            {t('یک تجربه یکپارچه', 'one unified experience')}
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-base leading-8 text-muted-foreground sm:text-lg">
            {t(
              'سامانه حرفه‌ای ثبت، پردازش و پایش هم‌زمان سیگنال‌های زیستی برای آموزش، پژوهش و توسعه سامانه‌های مهندسی پزشکی.',
              'A professional platform for simultaneous acquisition, processing and monitoring of biosignals — built for education, research and biomedical engineering development.',
            )}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="group font-semibold">
              <a href="#product">
                {t('معرفی محصول', 'Explore Product')}
                <Arrow className="size-4 transition-transform group-hover:-translate-x-1 rtl:group-hover:-translate-x-1 ltr:group-hover:translate-x-1" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-border bg-white/5 font-semibold hover:bg-white/10"
            >
              <a href="#dashboard">
                <PlayCircle className="size-4" />
                {t('مشاهده سامانه آنلاین', 'View Live System')}
              </a>
            </Button>
          </div>

          <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-border pt-6">
            {[
              { v: '12', l: t('کانال زیستی', 'Bio Channels') },
              { v: '1kHz', l: t('نرخ نمونه‌برداری', 'Sampling Rate') },
              { v: 'ESP32', l: t('کنترلر تعبیه‌شده', 'Embedded MCU') },
            ].map((s) => (
              <div key={s.l}>
                <dt className="text-2xl font-bold text-foreground">{s.v}</dt>
                <dd className="mt-1 text-xs text-muted-foreground">{s.l}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Device */}
        <div className="relative float-y">
          <div className="absolute inset-0 -z-10 rounded-full bg-primary/20 blur-3xl" />
          <div className="relative overflow-hidden rounded-xl border border-border glass p-2">
            <Image
              src="/images/device-hero.png"
              alt={t(
                'دستگاه ثبت ۱۲ کانال سیگنال زیستی پارسیان سلامت',
                'PARSIAN SALAMAT 12-channel biosignal acquisition device',
              )}
              width={720}
              height={720}
              priority
              className="h-auto w-full rounded-lg"
            />
          </div>

          {chips.map((c) => (
            <span
              key={c.label}
              className="absolute hidden rounded-full border border-primary/25 bg-background/70 px-3 py-1.5 text-xs font-medium text-primary backdrop-blur-md sm:inline-flex"
              style={{
                top: c.top,
                [dir === 'rtl' ? 'right' : 'left']: c.side,
              }}
            >
              <span className="mr-1.5 inline-block size-1.5 rounded-full bg-primary status-dot rtl:ml-1.5 rtl:mr-0" />
              {c.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
