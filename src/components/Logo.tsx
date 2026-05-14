interface LogoProps {
  size?: number;
  className?: string;
  animated?: boolean;
}

export function Logo({ size = 48, className = '', animated = false }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-label="SCD·26 mark"
    >
      <rect
        x="6"
        y="14"
        width="32"
        height="32"
        rx="9"
        fill="#06175D"
        className={animated ? 'origin-center' : ''}
      />
      <rect
        x="22"
        y="22"
        width="32"
        height="32"
        rx="9"
        fill="#00BFF0"
        className={animated ? 'origin-center' : ''}
      />
      <rect
        x="14"
        y="18"
        width="32"
        height="32"
        rx="9"
        fill="none"
        stroke="white"
        strokeWidth="2.5"
        className={animated ? 'origin-center' : ''}
      />
    </svg>
  );
}

export function LockupHorizontal({ className = '' }: { className?: string }) {
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <Logo size={36} />
      <div className="flex flex-col leading-none">
        <span className="font-display font-semibold text-[20px] tracking-tight text-white">
          SCD<span className="text-cyan-300">·</span>26
        </span>
        <span className="font-mono text-[9px] tracking-[0.18em] uppercase text-white/40 mt-1">
          STUDENT · COMMUNITY · DAY
        </span>
      </div>
    </div>
  );
}
