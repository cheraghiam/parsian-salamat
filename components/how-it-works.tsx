'use client'

import { Cpu, LineChart, Radio, Workflow } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { useT } from '@/lib/i18n'

export function HowItWorks() {
  const t = useT()

  const steps = [
    {
      icon: Radio,
      n: '01',
      title: t('دریافت سیگنال', 'Signal Acquisition'),
      desc: t(
        'سنسورها و الکترودها سیگنال‌های زیستی خام را از بدن دریافت می‌کنند.',
        'Sensors and electrodes capture raw biosignals from the body.',
      ),
    },
    {
      icon: Cpu,
      n: '02',
      title: t('پردازش و تقویت', 'Amplify & Process'),
      desc: t(
        'مدارهای آنالوگ و کنترلر ESP32 سیگنال را تقویت، فیلتر و دیجیتال می‌کنند.',
        'Analog front-end and the ESP32 amplify, filter and digitize the signal.',
      ),
    },
    {
      icon: Workflow,
      n: '03',
      title: t('انتقال داده', 'Data Transmission'),
      desc: t(
        'داده‌های دیجیتال به‌صورت هم‌زمان به نرم‌افزار پایش منتقل می‌شوند.',
        'Digitized data streams in real time to the monitoring software.',
      ),
    },
    {
      icon: LineChart,
      n: '04',
      title: t('نمایش و تحلیل', 'Visualize & Analyze'),
      desc: t(
        'سیگنال‌ها به‌صورت لحظه‌ای رسم و برای تحلیل ذخیره می‌شوند.',
        'Signals are plotted live and stored for further analysis.',
      ),
    },
  ]

  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label={t('نحوه کار', 'How It Works')}
          icon={Workflow}
          title={t('از بدن تا نمایشگر، در چهار گام', 'From Body to Screen, in Four Steps')}
          subtitle={t(
            'مسیر داده از لحظه دریافت سیگنال تا نمایش و تحلیل نهایی.',
            'The data journey from signal capture to final visualization and analysis.',
          )}
        />

        <div className="relative mt-14">
          <div className="pointer-events-none absolute inset-x-0 top-9 hidden h-px lg:block">
            <svg className="h-2 w-full" preserveAspectRatio="none" viewBox="0 0 1000 2">
              <line
                x1="0"
                y1="1"
                x2="1000"
                y2="1"
                stroke="var(--primary)"
                strokeWidth="2"
                className="dash-flow"
                opacity="0.5"
              />
            </svg>
          </div>

          <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal as="li" key={s.n} delay={i * 90} className="relative">
                <div className="flex h-full flex-col rounded-xl border border-border bg-card/60 p-6 transition-colors hover:border-primary/40">
                  <div className="flex items-center justify-between">
                    <span className="grid size-12 place-items-center rounded-lg border border-primary/30 bg-primary/10 text-primary">
                      <s.icon className="size-6" />
                    </span>
                    <span className="font-mono text-3xl font-black text-white/10">{s.n}</span>
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-foreground">{s.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
