'use client'

import Image from 'next/image'
import { Boxes, Cpu, Layers, Radio, Wifi } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { useT } from '@/lib/i18n'

export function ArchitectureSection() {
  const t = useT()

  const layers = [
    {
      icon: Radio,
      title: t('لایه سنسور و الکترود', 'Sensor & Electrode Layer'),
      desc: t(
        'دریافت سیگنال زیستی از طریق الکترودها و سنسورهای تخصصی.',
        'Captures biosignals through specialized electrodes and sensors.',
      ),
    },
    {
      icon: Layers,
      title: t('مدار آنالوگ (AFE)', 'Analog Front-End (AFE)'),
      desc: t(
        'تقویت، فیلتر و آماده‌سازی سیگنال با نویز پایین.',
        'Low-noise amplification, filtering and conditioning.',
      ),
    },
    {
      icon: Cpu,
      title: t('پردازنده ESP32', 'ESP32 Processor'),
      desc: t(
        'نمونه‌برداری، دیجیتال‌سازی و مدیریت هم‌زمان کانال‌ها.',
        'Sampling, digitization and concurrent channel management.',
      ),
    },
    {
      icon: Wifi,
      title: t('لایه ارتباطی', 'Connectivity Layer'),
      desc: t(
        'انتقال داده از طریق USB و بی‌سیم به نرم‌افزار.',
        'Streams data to software over USB and wireless.',
      ),
    },
  ]

  return (
    <section id="architecture" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          align="start"
          label={t('معماری سامانه', 'System Architecture')}
          icon={Boxes}
          title={t('یک معماری ماژولار و لایه‌ای', 'A Modular, Layered Architecture')}
          subtitle={t(
            'هر لایه وظیفه مشخصی دارد و مستقل قابل توسعه است؛ از سنسور تا نرم‌افزار پایش.',
            'Each layer has a defined role and is independently extensible — from sensor to monitoring software.',
          )}
        />

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-2">
          <ol className="relative space-y-4">
            {layers.map((l, i) => (
              <Reveal as="li" key={l.title} delay={i * 80}>
                <div className="flex gap-4 rounded-xl border border-border bg-card/60 p-5 transition-colors hover:border-primary/40">
                  <span className="grid size-11 shrink-0 place-items-center rounded-lg border border-primary/30 bg-primary/10 text-primary">
                    <l.icon className="size-5" />
                  </span>
                  <div>
                    <h3 className="font-bold text-foreground">{l.title}</h3>
                    <p className="mt-1 text-sm leading-7 text-muted-foreground">{l.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={120}>
            <div className="relative overflow-hidden rounded-xl border border-border glass p-3">
              <Image
                src="/images/device-pcb.png"
                alt={t('برد الکترونیکی دستگاه', 'Device electronic board')}
                width={680}
                height={520}
                className="h-auto w-full rounded-lg"
              />
              <div className="absolute end-5 top-5 rounded-md border border-primary/30 bg-background/70 px-3 py-1.5 font-mono text-xs text-primary backdrop-blur-md">
                ESP32 · AFE · 12CH
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
