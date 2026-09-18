'use client'

import { useEffect, useMemo, useState } from 'react'
import { Gauge, Pause, Play, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { WaveformChart } from '@/components/waveform-chart'
import { SIGNAL_ICONS } from '@/lib/signal-icons'
import { SIGNALS, type SignalType } from '@/lib/signals'
import { useLang, useT } from '@/lib/i18n'
import { cn } from '@/lib/utils'

const DEFAULT_LANES: SignalType[] = ['ecg', 'eeg', 'emg', 'resp']

export function LiveDashboard() {
  const t = useT()
  const { lang } = useLang()
  const [running, setRunning] = useState(true)
  const [speed, setSpeed] = useState(1)
  const [lanes, setLanes] = useState<SignalType[]>(DEFAULT_LANES)

  // simulated live vitals
  const [vitals, setVitals] = useState({ hr: 72, spo2: 98, resp: 16, temp: 36.6 })
  useEffect(() => {
    if (!running) return
    const id = setInterval(() => {
      setVitals((v) => ({
        hr: Math.round(clamp(v.hr + rnd(-2, 2), 62, 88)),
        spo2: Math.round(clamp(v.spo2 + rnd(-1, 1), 95, 100)),
        resp: Math.round(clamp(v.resp + rnd(-1, 1), 12, 20)),
        temp: Math.round(clamp(v.temp + rnd(-0.1, 0.1), 36, 37.5) * 10) / 10,
      }))
    }, 1400)
    return () => clearInterval(id)
  }, [running])

  const toggleLane = (type: SignalType) => {
    setLanes((cur) => {
      if (cur.includes(type)) {
        return cur.length > 1 ? cur.filter((c) => c !== type) : cur
      }
      return cur.length >= 6 ? [...cur.slice(1), type] : [...cur, type]
    })
  }

  const metrics = useMemo(
    () => [
      { label: t('ضربان قلب', 'Heart Rate'), value: vitals.hr, unit: 'BPM', color: 'var(--signal-cyan)' },
      { label: 'SpO₂', value: vitals.spo2, unit: '%', color: 'var(--signal-green)' },
      { label: t('تنفس', 'Respiration'), value: vitals.resp, unit: '/min', color: 'var(--signal-blue)' },
      { label: t('دما', 'Temp'), value: vitals.temp, unit: '°C', color: 'var(--signal-amber)' },
    ],
    [vitals, t, lang],
  )

  return (
    <section id="dashboard" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label={t('پایش زنده', 'Live Monitoring')}
          icon={Gauge}
          title={t('سامانه پایش لحظه‌ای سیگنال‌ها', 'Real-Time Signal Monitoring Console')}
          subtitle={t(
            'کانال‌های موردنظر را انتخاب کنید و جریان زنده داده‌ها را به‌صورت هم‌زمان مشاهده کنید.',
            'Select channels and watch the live data stream render simultaneously.',
          )}
        />

        <Reveal className="mt-12">
          <div className="overflow-hidden rounded-xl border border-border glass-strong">
            {/* toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-white/5 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-2 rounded-md bg-background/60 px-2.5 py-1.5 text-xs font-medium text-green">
                  <span className="size-2 rounded-full bg-green status-dot" />
                  {t('در حال دریافت', 'Streaming')}
                </span>
                <span className="hidden font-mono text-xs text-muted-foreground sm:inline">
                  fs = 1kHz · 24-bit
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex overflow-hidden rounded-md border border-border">
                  {[0.5, 1, 2].map((s) => (
                    <button
                      key={s}
                      onClick={() => setSpeed(s)}
                      className={cn(
                        'px-2.5 py-1.5 font-mono text-xs transition-colors',
                        speed === s
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:bg-white/5',
                      )}
                    >
                      {s}x
                    </button>
                  ))}
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-border bg-white/5"
                  onClick={() => setVitals({ hr: 72, spo2: 98, resp: 16, temp: 36.6 })}
                >
                  <RefreshCw className="size-3.5" />
                  <span className="hidden sm:inline">{t('بازنشانی', 'Reset')}</span>
                </Button>
                <Button size="sm" className="font-semibold" onClick={() => setRunning((r) => !r)}>
                  {running ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
                  {running ? t('توقف', 'Pause') : t('اجرا', 'Play')}
                </Button>
              </div>
            </div>

            <div className="grid gap-0 lg:grid-cols-[1fr_260px]">
              {/* lanes */}
              <div className="grid-bg divide-y divide-border">
                {lanes.map((type) => {
                  const sig = SIGNALS.find((s) => s.type === type)!
                  const Icon = SIGNAL_ICONS[type]
                  return (
                    <div key={type} className="relative h-28 sm:h-32">
                      <div className="absolute inset-y-0 start-0 z-10 flex w-20 flex-col justify-center gap-1 bg-background/55 px-3 backdrop-blur-[2px]">
                        <span className="flex items-center gap-1.5 font-mono text-sm font-bold" style={{ color: sig.color }}>
                          <Icon className="size-3.5" />
                          {sig.code}
                        </span>
                        <span className="font-mono text-[10px] text-muted-foreground">{sig.rate}</span>
                      </div>
                      <WaveformChart
                        type={type}
                        color={sig.color}
                        running={running}
                        speed={speed}
                        window={type === 'ecg' || type === 'spo2' ? 4 : 5}
                      />
                    </div>
                  )
                })}
              </div>

              {/* metrics sidebar */}
              <div className="border-t border-border bg-background/40 p-4 lg:border-s lg:border-t-0">
                <p className="mb-3 text-xs font-medium tracking-wide text-muted-foreground">
                  {t('شاخص‌های حیاتی', 'Vital Metrics')}
                </p>
                <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
                  {metrics.map((m) => (
                    <div key={m.label} className="rounded-lg border border-border bg-card/60 p-3">
                      <div className="text-xs text-muted-foreground">{m.label}</div>
                      <div className="mt-1 flex items-baseline gap-1">
                        <span className="font-mono text-2xl font-bold tabular-nums" style={{ color: m.color }}>
                          {m.value}
                        </span>
                        <span className="text-xs text-muted-foreground">{m.unit}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* channel toggles */}
            <div className="border-t border-border bg-white/5 px-4 py-3">
              <p className="mb-2.5 text-xs font-medium text-muted-foreground">
                {t('انتخاب کانال (حداکثر ۶)', 'Select Channels (max 6)')}
              </p>
              <div className="flex flex-wrap gap-2">
                {SIGNALS.map((s) => {
                  const active = lanes.includes(s.type)
                  return (
                    <button
                      key={s.type}
                      onClick={() => toggleLane(s.type)}
                      className={cn(
                        'rounded-md border px-2.5 py-1.5 font-mono text-xs transition-all',
                        active
                          ? 'text-background'
                          : 'border-border text-muted-foreground hover:text-foreground',
                      )}
                      style={
                        active
                          ? { background: s.color, borderColor: s.color }
                          : undefined
                      }
                    >
                      {s.code}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v))
}
function rnd(min: number, max: number) {
  return Math.random() * (max - min) + min
}
