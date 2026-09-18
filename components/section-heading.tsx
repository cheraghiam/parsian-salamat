import type { LucideIcon } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  label?: string
  icon?: LucideIcon
  title: string
  subtitle?: string
  align?: 'center' | 'start'
  className?: string
}

export function SectionHeading({
  label,
  icon: Icon,
  title,
  subtitle,
  align = 'center',
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        'flex flex-col gap-4',
        align === 'center' ? 'items-center text-center' : 'items-start text-start',
        className,
      )}
    >
      {label && (
        <span className="section-label">
          {Icon && <Icon className="size-3.5" />}
          {label}
        </span>
      )}
      <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            'text-pretty text-base leading-8 text-muted-foreground',
            align === 'center' ? 'max-w-2xl' : 'max-w-xl',
          )}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  )
}
