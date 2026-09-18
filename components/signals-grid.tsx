'use client'

import { Waves } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { SignalCard } from '@/components/signal-card'
import { SIGNALS } from '@/lib/signals'
import { useT } from '@/lib/i18n'

export function SignalsGrid() {
  const t = useT()

  return (
    <section id="signals" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label={t('کانال‌های سیگنال', 'Signal Channels')}
          icon={Waves}
          title={t('۱۲ سیگنال زیستی در یک سامانه', '12 Biosignals in One System')}
          subtitle={t(
            'هر کانال برای ثبت یک سیگنال فیزیولوژیک اختصاصی طراحی شده و به‌صورت هم‌زمان قابل پایش است.',
            'Each channel is dedicated to a specific physiological signal and can be monitored simultaneously.',
          )}
        />

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {SIGNALS.map((signal, i) => (
            <Reveal key={signal.type} delay={(i % 4) * 60}>
              <SignalCard signal={signal} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
