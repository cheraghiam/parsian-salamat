'use client'

import { useEffect, useRef } from 'react'
import { sampleSignal, type SignalType } from '@/lib/signals'
import { cn } from '@/lib/utils'

interface WaveformChartProps {
  type: SignalType
  color?: string
  running?: boolean
  variant?: 'mini' | 'panel'
  /** seconds of signal shown across the width */
  window?: number
  speed?: number
  className?: string
}

/**
 * Canvas-based scrolling biosignal renderer. Generates realistic morphology
 * per signal type and pauses automatically when scrolled offscreen.
 */
export function WaveformChart({
  type,
  color = 'var(--signal-cyan)',
  running = true,
  variant = 'panel',
  window = 4,
  speed = 1,
  className,
}: WaveformChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const runningRef = useRef(running)
  const onScreenRef = useRef(true)
  const tRef = useRef(Math.random() * 4)

  useEffect(() => {
    runningRef.current = running
  }, [running])

  useEffect(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let last = performance.now()
    let dpr = 1
    let w = 0
    let h = 0

    const resolveColor = () => {
      // resolve CSS var to concrete color for canvas stroke
      const probe = document.createElement('span')
      probe.style.color = color
      document.body.appendChild(probe)
      const resolved = getComputedStyle(probe).color
      probe.remove()
      return resolved
    }
    let stroke = resolveColor()

    const resize = () => {
      dpr = Math.min(window === 4 ? 2 : 2, globalThis.devicePixelRatio || 1)
      const rect = wrap.getBoundingClientRect()
      w = rect.width
      h = rect.height
      canvas.width = Math.max(1, Math.floor(w * dpr))
      canvas.height = Math.max(1, Math.floor(h * dpr))
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      stroke = resolveColor()
    }
    resize()

    const ro = new ResizeObserver(resize)
    ro.observe(wrap)

    const io = new IntersectionObserver(
      (entries) => {
        onScreenRef.current = entries[0]?.isIntersecting ?? true
      },
      { threshold: 0 },
    )
    io.observe(wrap)

    const showGrid = variant === 'panel'
    const samples = Math.max(120, Math.floor(w * (variant === 'panel' ? 1.5 : 1)))
    const midY = () => h / 2
    const ampScale = () => (variant === 'panel' ? h * 0.36 : h * 0.34)

    const draw = () => {
      const now = performance.now()
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      if (runningRef.current && onScreenRef.current) {
        tRef.current += dt * speed
      }

      ctx.clearRect(0, 0, w, h)

      if (showGrid) {
        ctx.strokeStyle = 'rgba(255,255,255,0.05)'
        ctx.lineWidth = 1
        const step = 22
        ctx.beginPath()
        for (let x = w % step; x < w; x += step) {
          ctx.moveTo(x, 0)
          ctx.lineTo(x, h)
        }
        for (let y = (h / 2) % step; y < h; y += step) {
          ctx.moveTo(0, y)
          ctx.lineTo(w, y)
        }
        ctx.stroke()
      }

      const t = tRef.current
      const mid = midY()
      const amp = ampScale()

      // glow underlay
      ctx.save()
      ctx.strokeStyle = stroke
      ctx.globalAlpha = 0.25
      ctx.lineWidth = variant === 'panel' ? 4 : 3
      ctx.shadowColor = stroke
      ctx.shadowBlur = variant === 'panel' ? 14 : 8
      ctx.beginPath()
      for (let i = 0; i <= samples; i++) {
        const frac = i / samples
        const time = t - window + frac * window
        const v = sampleSignal(type, time)
        const x = frac * w
        const y = mid - v * amp
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()
      ctx.restore()

      // crisp line
      ctx.strokeStyle = stroke
      ctx.lineWidth = variant === 'panel' ? 1.6 : 1.4
      ctx.lineJoin = 'round'
      ctx.beginPath()
      for (let i = 0; i <= samples; i++) {
        const frac = i / samples
        const time = t - window + frac * window
        const v = sampleSignal(type, time)
        const x = frac * w
        const y = mid - v * amp
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()

      // leading dot
      const leadV = sampleSignal(type, t)
      ctx.fillStyle = stroke
      ctx.beginPath()
      ctx.arc(w, mid - leadV * amp, variant === 'panel' ? 2.6 : 2, 0, Math.PI * 2)
      ctx.fill()

      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, color, variant, window, speed])

  return (
    <div ref={wrapRef} className={cn('relative h-full w-full', className)}>
      <canvas ref={canvasRef} className="block h-full w-full" aria-hidden="true" />
    </div>
  )
}
