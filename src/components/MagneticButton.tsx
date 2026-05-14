import { forwardRef } from 'react';
import { useMagnetic } from '@/lib/useMagnetic';

type Variant = 'primary' | 'ghost';

interface MagneticButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
  strength?: number;
}

export const MagneticButton = forwardRef<HTMLAnchorElement, MagneticButtonProps>(
  ({ variant = 'primary', strength = 0.35, className = '', children, ...rest }, _outerRef) => {
    const ref = useMagnetic<HTMLAnchorElement>(strength);
    const variantCls = variant === 'primary' ? 'btn-primary' : 'btn-ghost';
    return (
      <a
        ref={ref}
        data-cursor="go"
        className={`${variantCls} inline-flex items-center gap-3 will-change-transform ${className}`}
        {...rest}
      >
        <span className="pointer-events-none inline-flex items-center gap-3">{children}</span>
      </a>
    );
  },
);
MagneticButton.displayName = 'MagneticButton';
