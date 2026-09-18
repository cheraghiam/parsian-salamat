'use client'

import Image from 'next/image'
import { ImageIcon } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { useT } from '@/lib/i18n'

export function GallerySection() {
  const t = useT()

  const items = [
    {
      src: '/images/device-front.png',
      alt: t('نمای جلوی دستگاه', 'Device front view'),
      caption: t('نمای جلو', 'Front'),
      span: 'sm:col-span-2 sm:row-span-2',
    },
    {
      src: '/images/device-pcb.png',
      alt: t('برد الکترونیکی', 'Electronic board'),
      caption: t('برد الکترونیکی', 'PCB'),
      span: '',
    },
    {
      src: '/images/device-sensors.png',
      alt: t('سنسورها و الکترودها', 'Sensors and electrodes'),
      caption: t('سنسورها', 'Sensors'),
      span: '',
    },
    {
      src: '/images/device-dashboard.png',
      alt: t('نرم‌افزار پایش', 'Monitoring software'),
      caption: t('نرم‌افزار پایش', 'Software'),
      span: 'sm:col-span-2',
    },
    {
      src: '/images/device-back.png',
      alt: t('نمای پشت و درگاه‌ها', 'Back view and ports'),
      caption: t('درگاه‌ها', 'Ports'),
      span: '',
    },
  ]

  return (
    <section id="gallery" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label={t('گالری', 'Gallery')}
          icon={ImageIcon}
          title={t('نگاهی نزدیک به دستگاه', 'A Closer Look at the Device')}
          subtitle={t(
            'تصاویری از سخت‌افزار، برد الکترونیکی و نرم‌افزار پایش.',
            'Images of the hardware, electronic board and monitoring software.',
          )}
        />

        <Reveal className="mt-12">
          <div className="grid auto-rows-[180px] grid-cols-2 gap-4 sm:grid-cols-4">
            {items.map((it) => (
              <figure
                key={it.src}
                className={`group relative overflow-hidden rounded-xl border border-border ${it.span}`}
              >
                <Image
                  src={it.src || '/placeholder.svg'}
                  alt={it.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                <figcaption className="absolute bottom-3 start-3 rounded-md border border-border bg-background/70 px-2.5 py-1 font-mono text-xs text-foreground backdrop-blur-md">
                  {it.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
