'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'

export type Lang = 'fa' | 'en'

interface LangContextValue {
  lang: Lang
  setLang: (l: Lang) => void
  toggle: () => void
  dir: 'rtl' | 'ltr'
}

const LangContext = createContext<LangContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('fa')

  useEffect(() => {
    const el = document.documentElement
    el.lang = lang
    el.dir = lang === 'fa' ? 'rtl' : 'ltr'
  }, [lang])

  const toggle = () => setLang((p) => (p === 'fa' ? 'en' : 'fa'))

  return (
    <LangContext.Provider
      value={{ lang, setLang, toggle, dir: lang === 'fa' ? 'rtl' : 'ltr' }}
    >
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used within LanguageProvider')
  return ctx
}

/** Pick a value based on the active language. */
export function useT() {
  const { lang } = useLang()
  return function t<T>(fa: T, en: T): T {
    return lang === 'fa' ? fa : en
  }
}
