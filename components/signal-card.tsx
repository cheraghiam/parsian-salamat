'use client'

import { WaveformChart } from '@/components/waveform-chart'
import { SIGNAL_ICONS } from '@/lib/signal-icons'
import type { SignalInfo } from '@/lib/signals'
import { useLang } from '@/lib/i18n'

export function SignalCard({ signal, index }: { signal: SignalInfo; index: number }) {
  const { lang } = useLang()
  const Icon = SIGNAL_ICONS[signal.type]
  const ch = String(index + 1).padStart(2, '0')

  return (
    <article
      className="group relative overflow-hidden rounded-lg border border-border bg-card/60 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-card"
      style={{ '--sig': signal.color } as React.CSSProperties}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(20rem 12rem at 100% 0%, color-mix(in oklch, var(--sig) 16%, transparent), transparent 70%)',
        }}
      />
      <div className="relative flex items-start justify-between">
        <span
          className="grid size-10 place-items-center rounded-md border"
          style={{
            color: signal.color,
            borderColor: 'color-mix(in oklch, var(--sig) 40%, transparent)',
            background: 'color-mix(in oklch, var(--sig) 12%, transparent)',
          }}
        >
          <Icon className="size-5" />
        </span>
        <span className="rounded border border-border px-1.5 py-0.5 font-mono text-[10px] tracking-widest text-muted-foreground">
          CH {ch}
        </span>
      </div>

      <div className="relative mt-4">
        <h3 className="font-mono text-lg font-bold tracking-wide" style={{ color: signal.color }}>
          {signal.code}
        </h3>
        <p className="mt-1 text-xs text-muted-foreground">{signal.en}</p>
        {lang === 'fa' ? (
          <>
            <p className="mt-2 text-sm font-semibold text-foreground">{signal.faTitle}</p>
            <p className="mt-1 text-xs leading-6 text-muted-foreground">{signal.faDesc}</p>
          </>
        ) : (
          <p className="mt-2 text-sm font-semibold text-foreground">{signal.en}</p>
        )}
      </div>

      <div className="relative mt-3 h-12 w-full">
        <WaveformChart
          type={signal.type}
          color={signal.color}
          variant="mini"
          window={signal.type === 'ecg' || signal.type === 'spo2' ? 3 : 4}
        />
      </div>

      <div className="relative mt-3 flex items-center justify-between border-t border-border pt-2.5">
        <span className="font-mono text-[11px] text-muted-foreground">{signal.rate}</span>
        <span className="flex items-center gap-1.5 text-[11px] text-green">
          <span className="size-1.5 rounded-full bg-green status-dot" />
          ACTIVE
        </span>
      </div>
    </article>
  )
}
