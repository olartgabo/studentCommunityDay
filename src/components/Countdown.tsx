import { useEffect, useState } from 'react';
import { event } from '@/data/event';

function targetDate(): Date {
  // Event opens 08:30 local (UTC−04). Encode as ISO with the local offset so
  // the countdown is identical for every visitor regardless of their TZ.
  return new Date(`${event.dateISO}T08:30:00-04:00`);
}

interface Parts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

function diff(now: Date): Parts {
  const total = Math.max(0, targetDate().getTime() - now.getTime());
  const days = Math.floor(total / 86_400_000);
  const hours = Math.floor((total / 3_600_000) % 24);
  const minutes = Math.floor((total / 60_000) % 60);
  const seconds = Math.floor((total / 1000) % 60);
  return { days, hours, minutes, seconds, total };
}

function useCountdown(intervalMs = 1000): Parts {
  const [parts, setParts] = useState<Parts>(() => diff(new Date()));
  useEffect(() => {
    const tick = () => setParts(diff(new Date()));
    tick();
    const id = window.setInterval(tick, intervalMs);
    return () => window.clearInterval(id);
  }, [intervalMs]);
  return parts;
}

const pad = (n: number, w = 2) => Math.max(0, n).toString().padStart(w, '0');

// Compact T-minus pill for the nav.
export function CountdownPill() {
  const { days, hours, total } = useCountdown(60_000);

  if (total <= 0) {
    return (
      <div className="hidden xl:flex items-center gap-2 pill text-cyan-200 border-cyan-400/50 bg-cyan-400/15">
        <span className="font-mono text-[10px]">LIVE · NOW</span>
      </div>
    );
  }

  return (
    <div className="hidden xl:flex items-center gap-2 pill">
      <span className="font-mono text-[10px] text-white/40">T−</span>
      <span className="font-mono text-[11px] tabular-nums text-cyan-200">
        {pad(days, 3)}d{' '}
        <span className="text-white/40">·</span> {pad(hours)}h
      </span>
    </div>
  );
}

// Full ticker for the footer.
export function CountdownBlock() {
  const { days, hours, minutes, seconds, total } = useCountdown(1000);

  if (total <= 0) {
    return (
      <div className="rounded-2xl border border-cyan-400/40 bg-cyan-400/5 p-6">
        <div className="mono-label mb-3">Event status</div>
        <div className="font-display font-medium text-2xl text-cyan-300">LIVE · NOW</div>
        <div className="font-mono text-[11px] text-white/40 mt-2">
          {event.venue} · {event.dateLong}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="mono-label">T-minus</div>
        <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-white/40">
          to gates open
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2">
        <Slot value={pad(days, 3)} label="days" />
        <Slot value={pad(hours)} label="hours" />
        <Slot value={pad(minutes)} label="min" />
        <Slot value={pad(seconds)} label="sec" pulse />
      </div>
      <div className="font-mono text-[11px] text-white/40 mt-4">
        {event.dateLong} · 08:30 UTC−04
      </div>
    </div>
  );
}

function Slot({ value, label, pulse }: { value: string; label: string; pulse?: boolean }) {
  return (
    <div className="rounded-lg border border-white/5 bg-navy-950/60 px-2 py-3 text-center">
      <div
        className={`font-display font-medium text-[clamp(20px,3vw,28px)] tabular-nums leading-none ${
          pulse ? 'text-cyan-300' : 'text-white'
        }`}
      >
        {value}
      </div>
      <div className="font-mono text-[9px] tracking-[0.16em] uppercase text-white/40 mt-1.5">
        {label}
      </div>
    </div>
  );
}
