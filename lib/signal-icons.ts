import {
  Brain,
  Droplets,
  Eye,
  Gauge,
  Hand,
  HeartPulse,
  Move3d,
  Plus,
  Thermometer,
  Timer,
  Wind,
  Zap,
  type LucideIcon,
} from 'lucide-react'
import type { SignalType } from '@/lib/signals'

export const SIGNAL_ICONS: Record<SignalType, LucideIcon> = {
  ecg: HeartPulse,
  eeg: Brain,
  emg: Zap,
  eog: Eye,
  gsr: Droplets,
  spo2: Gauge,
  temp: Thermometer,
  force: Hand,
  resp: Wind,
  motion: Move3d,
  reflex: Timer,
  aux: Plus,
}
