export type SignalType =
  | 'ecg'
  | 'eeg'
  | 'emg'
  | 'eog'
  | 'gsr'
  | 'spo2'
  | 'temp'
  | 'force'
  | 'resp'
  | 'motion'
  | 'reflex'
  | 'aux'

export interface SignalInfo {
  type: SignalType
  code: string
  en: string
  faTitle: string
  faDesc: string
  rate: string
  color: string
}

/** CSS variable-backed accent per signal for consistent theming. */
export const SIGNALS: SignalInfo[] = [
  {
    type: 'ecg',
    code: 'ECG',
    en: 'Electrocardiography',
    faTitle: 'الکتروکاردیوگرافی',
    faDesc: 'ثبت فعالیت الکتریکی قلب با ریخت‌شناسی P-QRS-T',
    rate: '125 Hz',
    color: 'var(--signal-cyan)',
  },
  {
    type: 'eeg',
    code: 'EEG',
    en: 'Electroencephalography',
    faTitle: 'الکتروانسفالوگرافی',
    faDesc: 'ثبت امواج مغزی با دامنه پایین و نویز طبیعی',
    rate: '256 Hz',
    color: 'var(--signal-violet)',
  },
  {
    type: 'emg',
    code: 'EMG',
    en: 'Electromyography',
    faTitle: 'الکترومایوگرافی',
    faDesc: 'ثبت فعالیت عضلانی به‌صورت انفجارهای پرفرکانس',
    rate: '500 Hz',
    color: 'var(--signal-amber)',
  },
  {
    type: 'eog',
    code: 'EOG',
    en: 'Electrooculography',
    faTitle: 'الکترو اکولوگرافی',
    faDesc: 'ثبت حرکات چشم با انحرافات آهسته',
    rate: '100 Hz',
    color: 'var(--signal-blue)',
  },
  {
    type: 'gsr',
    code: 'GSR',
    en: 'Galvanic Skin Response',
    faTitle: 'پاسخ گالوانیکی پوست',
    faDesc: 'تغییرات آهسته هدایت الکتریکی پوست',
    rate: '200 Hz',
    color: 'var(--signal-teal)',
  },
  {
    type: 'spo2',
    code: 'SpO₂',
    en: 'Blood Oxygen Saturation',
    faTitle: 'اشباع اکسیژن خون',
    faDesc: 'پایش درصد اشباع اکسیژن خون',
    rate: '100 Hz',
    color: 'var(--signal-green)',
  },
  {
    type: 'temp',
    code: 'TEMP',
    en: 'Body / Skin Temperature',
    faTitle: 'دمای بدن / پوست',
    faDesc: 'اندازه‌گیری دمای سطح بدن و پوست',
    rate: '10 Hz',
    color: 'var(--signal-amber)',
  },
  {
    type: 'force',
    code: 'FORCE',
    en: 'Grip / Force Measurement',
    faTitle: 'اندازه‌گیری نیرو',
    faDesc: 'سنجش نیروی چنگش با تغییرات تدریجی و اوج',
    rate: '200 Hz',
    color: 'var(--signal-cyan)',
  },
  {
    type: 'resp',
    code: 'RESP',
    en: 'Respiration',
    faTitle: 'تنفس',
    faDesc: 'ثبت الگوی تنفس و نرخ دم و بازدم',
    rate: '50 Hz',
    color: 'var(--signal-blue)',
  },
  {
    type: 'motion',
    code: 'MOTION',
    en: 'Motion / IMU',
    faTitle: 'حرکت و شتاب',
    faDesc: 'داده شتاب‌سنج و ژیروسکوپ برای پایش حرکت',
    rate: '200 Hz',
    color: 'var(--signal-violet)',
  },
  {
    type: 'reflex',
    code: 'REFLEX',
    en: 'Reflex Measurement',
    faTitle: 'اندازه‌گیری رفلکس',
    faDesc: 'سنجش پاسخ رفلکسی و زمان واکنش',
    rate: '1 kHz',
    color: 'var(--signal-green)',
  },
  {
    type: 'aux',
    code: 'AUX',
    en: 'Auxiliary Channel',
    faTitle: 'کانال کمکی',
    faDesc: 'کانال قابل پیکربندی برای سنسورهای افزوده',
    rate: 'Config',
    color: 'var(--signal-teal)',
  },
]

function gaussian(x: number, mu: number, sigma: number, amp: number): number {
  return amp * Math.exp(-((x - mu) ** 2) / (2 * sigma * sigma))
}

/**
 * Returns a normalized amplitude (~[-1, 1]) for a given signal type at
 * continuous phase `t` (seconds). Designed to look like real biosignals
 * rather than plain sine waves.
 */
export function sampleSignal(type: SignalType, t: number): number {
  switch (type) {
    case 'ecg': {
      // ~1 beat per 0.85s, P-QRS-T morphology
      const period = 0.85
      const p = (t % period) / period
      let v = 0
      v += gaussian(p, 0.18, 0.022, 0.18) // P
      v += gaussian(p, 0.37, 0.008, -0.13) // Q
      v += gaussian(p, 0.4, 0.008, 1.0) // R
      v += gaussian(p, 0.43, 0.01, -0.28) // S
      v += gaussian(p, 0.62, 0.04, 0.32) // T
      return v * 0.85
    }
    case 'eeg': {
      // low amplitude, multi-band noisy
      let v = 0
      v += Math.sin(t * 2 * Math.PI * 10) * 0.18 // alpha
      v += Math.sin(t * 2 * Math.PI * 20 + 1) * 0.1 // beta
      v += Math.sin(t * 2 * Math.PI * 5 + 2) * 0.12 // theta
      v += (Math.sin(t * 137.1) + Math.sin(t * 311.7)) * 0.12 // noise-ish
      return v
    }
    case 'emg': {
      // bursts of high-frequency activity separated by quiet
      const burstPhase = (t % 1.4) / 1.4
      const active = burstPhase > 0.15 && burstPhase < 0.55
      const envelope = active
        ? Math.sin(((burstPhase - 0.15) / 0.4) * Math.PI)
        : 0.04
      const hf =
        Math.sin(t * 620) * 0.5 + Math.sin(t * 913 + 1) * 0.3 + Math.sin(t * 1330) * 0.2
      return hf * envelope * (active ? 0.95 : 0.5)
    }
    case 'eog': {
      // slow saccade-like step deflections
      const s = Math.sin(t * 0.9) + Math.sin(t * 0.37 + 1.2)
      return Math.tanh(s * 1.6) * 0.7
    }
    case 'gsr': {
      // very slow drift with occasional rises
      const v =
        Math.sin(t * 0.25) * 0.4 + Math.sin(t * 0.08 + 0.5) * 0.35 + 0.1
      return Math.max(-0.9, Math.min(0.9, v))
    }
    case 'spo2': {
      // pleth-like pulsatile waveform
      const period = 0.85
      const p = (t % period) / period
      return (gaussian(p, 0.25, 0.09, 0.9) + gaussian(p, 0.5, 0.12, 0.35)) - 0.4
    }
    case 'temp': {
      return Math.sin(t * 0.15) * 0.5 + 0.15
    }
    case 'force': {
      // gradual ramps with plateaus and peaks
      const p = t % 3.2
      let v: number
      if (p < 0.8) v = (p / 0.8) * 0.9
      else if (p < 1.6) v = 0.9
      else if (p < 2.1) v = 0.9 + Math.sin((p - 1.6) * 6) * 0.08
      else v = Math.max(-0.2, 0.9 - (p - 2.1) * 1.0)
      return v - 0.3
    }
    case 'resp': {
      // smooth breathing, slightly asymmetric
      const period = 4
      const p = (t % period) / period
      return Math.sin(p * 2 * Math.PI - Math.sin(p * 2 * Math.PI) * 0.3) * 0.75
    }
    case 'motion': {
      return (
        Math.sin(t * 3.1) * 0.4 +
        Math.sin(t * 7.3 + 1) * 0.25 +
        Math.sin(t * 13.7) * 0.15
      )
    }
    case 'reflex': {
      // mostly flat with sharp reflex spikes
      const p = t % 2.5
      return p < 0.05 ? Math.sin((p / 0.05) * Math.PI) * 0.95 : Math.sin(t * 60) * 0.03
    }
    case 'aux':
    default: {
      return Math.sin(t * 1.6) * 0.5 + Math.sin(t * 4.2 + 1) * 0.2
    }
  }
}
