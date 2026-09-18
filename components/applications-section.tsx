'use client'

import { FlaskConical, GraduationCap, HeartHandshake, Microscope, Stethoscope, Target } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { useT } from '@/lib/i18n'

export function ApplicationsSection() {
  const t = useT()

  const apps = [
    {
      icon: GraduationCap,
      title: t('آموزش مهندسی پزشکی', 'Biomedical Education'),
      desc: t(
        'ابزاری عملی برای آموزش دانشجویان در آزمایشگاه‌های مهندسی پزشکی.',
        'A hands-on tool for teaching students in biomedical engineering labs.',
      ),
    },
    {
      icon: FlaskConical,
      title: t('پژوهش و آزمایش', 'Research & Experiments'),
      desc: t(
        'بستری قابل اعتماد برای طراحی و اجرای آزمایش‌های فیزیولوژیک.',
        'A reliable platform for designing and running physiological experiments.',
      ),
    },
    {
      icon: Microscope,
      title: t('توسعه سامانه‌ها', 'System Development'),
      desc: t(
        'پایه‌ای برای توسعه و نمونه‌سازی دستگاه‌های پزشکی جدید.',
        'A foundation for developing and prototyping new medical devices.',
      ),
    },
    {
      icon: HeartHandshake,
      title: t('توان‌بخشی', 'Rehabilitation'),
      desc: t(
        'پایش فعالیت عضلانی و حرکتی در فرآیندهای توان‌بخشی.',
        'Monitoring muscular and motion activity in rehabilitation.',
      ),
    },
    {
      icon: Stethoscope,
      title: t('پایش فیزیولوژیک', 'Physiological Monitoring'),
      desc: t(
        'ثبت و پایش شاخص‌های حیاتی برای مطالعات کاربردی.',
        'Recording and monitoring vital indicators for applied studies.',
      ),
    },
    {
      icon: Target,
      title: t('پروژه‌های دانشجویی', 'Student Projects'),
      desc: t(
        'انتخابی مناسب برای پروژه‌های پایان‌نامه و مسابقات علمی.',
        'A great fit for thesis projects and scientific competitions.',
      ),
    },
  ]

  return (
    <section id="applications" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label={t('کاربردها', 'Applications')}
          icon={Target}
          title={t('کجا استفاده می‌شود؟', 'Where It Is Used')}
          subtitle={t(
            'از کلاس درس تا آزمایشگاه پژوهشی و توسعه محصول.',
            'From the classroom to the research lab and product development.',
          )}
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {apps.map((a, i) => (
            <Reveal key={a.title} delay={(i % 3) * 70}>
              <div className="group relative h-full overflow-hidden rounded-xl border border-border bg-card/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40">
                <span className="grid size-12 place-items-center rounded-lg border border-primary/30 bg-primary/10 text-primary">
                  <a.icon className="size-6" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-foreground">{a.title}</h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{a.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
