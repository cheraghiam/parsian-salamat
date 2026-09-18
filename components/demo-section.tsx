'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Play, Video } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { WaveformChart } from '@/components/waveform-chart'
import { SIGNALS, type SignalType } from '@/lib/signals'
import { useT } from '@/lib/i18n'

const MONTAGE: SignalType[] = ['ecg', 'eeg', 'emg', 'resp', 'eog', 'gsr']

export function DemoSection() {
  const t = useT()
  const [playing, setPlaying] = useState(false)

  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label={t('نمایش عملکرد', 'Demo')}
          icon={Video}
          title={t('سامانه را در عمل ببینید', 'See the System in Action')}
          subtitle={t(
            'نمایی از جریان زنده داده‌ها و نرم‌افزار پایش دستگاه.',
            'A glimpse of the live data stream and monitoring software.',
          )}
        />

        <Reveal className="mt-12">
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-border glass-strong">
            {!playing ? (
              <>
                <Image
                  src="/images/device-dashboard.png"
                  alt={t('پیش‌نمایش نرم‌افزار پایش', 'Monitoring software preview')}
                  fill
                  className="object-cover opacity-80"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-background/40" />
                <button
                  onClick={() => setPlaying(true)}
                  className="absolute inset-0 grid place-items-center"
                  aria-label={t('پخش نمایش', 'Play demo')}
                >
                  <span className="relative grid size-20 place-items-center rounded-full bg-primary text-primary-foreground shadow-xl transition-transform duration-300 hover:scale-110">
                    <span className="absolute inset-0 rounded-full bg-primary/40 pulse-ring" />
                    <Play className="size-8 translate-x-0.5" />
                  </span>
                </button>
              </>
            ) : (
              <div className="grid-bg absolute inset-0 grid grid-rows-6">
                {MONTAGE.map((type) => {
                  const sig = SIGNALS.find((s) => s.type === type)!
                  return (
                    <div key={type} className="relative border-b border-border/60">
                      <span
                        className="absolute inset-y-0 start-0 z-10 flex items-center gap-1.5 bg-background/50 px-3 font-mono text-xs font-bold backdrop-blur-[2px]"
                        style={{ color: sig.color }}
                      >
                        {sig.code}
                      </span>
                      <WaveformChart type={type} color={sig.color} running speed={1.4} window={6} />
                    </div>
                  )
                })}
                <button
                  onClick={() => setPlaying(false)}
                  className="absolute end-4 top-4 z-20 rounded-md border border-border bg-background/70 px-3 py-1.5 text-xs text-foreground backdrop-blur-md hover:bg-background"
                >
                  {t('توقف', 'Stop')}
                </button>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
