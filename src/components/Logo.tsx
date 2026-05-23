import awsLogo from '@/assets/aws-logo.svg';

interface LogoProps {
  size?: number;
  className?: string;
}

export function Logo({ size = 48, className = '' }: LogoProps) {
  return (
    <img
      src={awsLogo}
      width={size}
      height={size}
      className={className}
      alt="AWS Student Builder Group UPB"
      style={{ objectFit: 'contain' }}
    />
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
