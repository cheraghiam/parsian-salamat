'use client'

import { useEffect, useState } from 'react'
import { Activity, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLang, useT } from '@/lib/i18n'
import { cn } from '@/lib/utils'

export function Navbar() {
  const t = useT()
  const { lang, toggle } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '#home', label: t('خانه', 'Home') },
    { href: '#product', label: t('محصول', 'Product') },
    { href: '#signals', label: t('سیگنال‌ها', 'Signals') },
    { href: '#features', label: t('امکانات', 'Features') },
    { href: '#applications', label: t('کاربردها', 'Applications') },
    { href: '#specs', label: t('مشخصات فنی', 'Specs') },
    { href: '#gallery', label: t('گالری', 'Gallery') },
    { href: '#contact', label: t('تماس با ما', 'Contact') },
  ]

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled ? 'glass-strong border-b border-border' : 'border-b border-transparent',
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <a href="#home" className="flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-md border border-primary/30 bg-primary/10 text-primary">
            <Activity className="size-5" strokeWidth={2.2} />
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-sm font-bold tracking-wide text-foreground">
              PARSIAN SALAMAT
            </span>
            <span className="mt-0.5 text-[10px] font-medium tracking-[0.18em] text-muted-foreground">
              BIOMEDICAL TECHNOLOGY
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-1 xl:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            className="flex items-center gap-1 rounded-md border border-border px-2 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Toggle language"
          >
            <span className={cn(lang === 'fa' && 'text-primary')}>FA</span>
            <span className="text-border">|</span>
            <span className={cn(lang === 'en' && 'text-primary')}>EN</span>
          </button>
          <Button asChild size="sm" className="hidden font-semibold sm:inline-flex">
            <a href="#dashboard">{t('مشاهده سامانه', 'View System')}</a>
          </Button>
          <button
            className="grid size-9 place-items-center rounded-md border border-border text-foreground xl:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="glass-strong border-t border-border xl:hidden">
          <div className="mx-auto grid max-w-7xl gap-1 px-4 py-3 sm:px-6">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
            <Button asChild size="sm" className="mt-2 font-semibold">
              <a href="#dashboard" onClick={() => setOpen(false)}>
                {t('مشاهده سامانه', 'View System')}
              </a>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
