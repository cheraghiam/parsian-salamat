'use client'

import {
  Activity,
  Blocks,
  Database,
  Gauge,
  MonitorSmartphone,
  ShieldCheck,
  Sparkles,
  Zap,
} from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { useT } from '@/lib/i18n'

export function CapabilitiesGrid() {
  const t = useT()

  const items = [
    {
      icon: Activity,
      title: t('ثبت هم‌زمان چند سیگنال', 'Simultaneous Acquisition'),
      desc: t(
        'دریافت و پایش هم‌زمان تا ۱۲ سیگنال زیستی بدون افت کیفیت.',
        'Capture and monitor up to 12 biosignals at once without quality loss.',
      ),
    },
    {
      icon: Gauge,
      title: t('نمایش لحظه‌ای', 'Real-Time Display'),
      desc: t(
        'رسم زنده سیگنال‌ها با کمترین تأخیر برای پایش دقیق.',
        'Live signal plotting with minimal latency for precise monitoring.',
      ),
    },
    {
      icon: Blocks,
      title: t('معماری ماژولار', 'Modular Architecture'),
      desc: t(
        'افزودن یا حذف کانال‌ها و ماژول‌ها متناسب با نیاز پروژه.',
        'Add or remove channels and modules to fit each project.',
      ),
    },
    {
      icon: Zap,
      title: t('کنترلر ESP32', 'ESP32-Powered'),
      desc: t(
        'پردازش سریع و مدیریت هم‌زمان چند کانال با مصرف بهینه.',
        'Fast processing and concurrent multi-channel management, efficiently.',
      ),
    },
    {
      icon: Database,
      title: t('ثبت و ذخیره داده', 'Data Logging'),
      desc: t(
        'ذخیره داده‌های خام و پردازش‌شده برای تحلیل‌های بعدی.',
        'Store raw and processed data for downstream analysis.',
      ),
    },
    {
      icon: MonitorSmartphone,
      title: t('نرم‌افزار پایش', 'Monitoring Software'),
      desc: t(
        'رابط کاربری روان برای مشاهده، مقایسه و مدیریت کانال‌ها.',
        'A fluid interface to view, compare and manage channels.',
      ),
    },
    {
      icon: ShieldCheck,
      title: t('سیگنال کم‌نویز', 'Low-Noise Signal'),
      desc: t(
        'مدارهای آنالوگ دقیق برای سیگنال تمیز و قابل اعتماد.',
        'Precision analog circuitry for clean, reliable signals.',
      ),
    },
    {
      icon: Sparkles,
      title: t('توسعه‌پذیر', 'Extensible'),
      desc: t(
        'قابلیت توسعه نرم‌افزاری و افزودن الگوریتم‌های پردازش.',
        'Software-extensible with room for custom processing algorithms.',
      ),
    },
  ]

  return (
    <section id="features" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label={t('امکانات کلیدی', 'Key Capabilities')}
          icon={Sparkles}
          title={t('امکاناتی که کار را جدی می‌کنند', 'Capabilities Built for Serious Work')}
          subtitle={t(
            'ترکیبی از سخت‌افزار دقیق و نرم‌افزار منعطف برای پوشش نیازهای آموزشی و پژوهشی.',
            'Precision hardware paired with flexible software for education and research needs.',
          )}
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={(i % 4) * 60}>
              <div className="group flex h-full flex-col rounded-xl border border-border bg-card/60 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40">
                <span className="grid size-11 place-items-center rounded-lg border border-primary/30 bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                  <it.icon className="size-5" />
                </span>
                <h3 className="mt-4 font-bold text-foreground">{it.title}</h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{it.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
