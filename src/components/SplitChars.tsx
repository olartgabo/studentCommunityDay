import { forwardRef, useMemo } from 'react';

interface SplitCharsProps {
  text: string;
  className?: string;
  charClassName?: string;
  accent?: boolean;
}

/**
 * Splits text into per-character spans. Whitespace is preserved as a non-animated span
 * so word-spacing stays correct. Each animatable char carries data-split-char.
 */
export const SplitChars = forwardRef<HTMLSpanElement, SplitCharsProps>(
  ({ text, className = '', charClassName = '', accent = false }, ref) => {
    const chars = useMemo(() => Array.from(text), [text]);
    return (
      <span ref={ref} className={`inline-block ${className}`} aria-label={text}>
        {chars.map((ch, i) =>
          ch === ' ' ? (
            <span key={i} className="inline-block w-[0.25em]" aria-hidden>
              {' '}
            </span>
          ) : (
            <span
              key={i}
              aria-hidden
              data-split-char
              className={`inline-block will-change-transform ${
                accent ? 'text-cyan-300 glow-text' : ''
              } ${charClassName}`}
              style={{ transformOrigin: '50% 100%' }}
            >
              {ch}
            </span>
          ),
        )}
      </span>
    );
  },
);
SplitChars.displayName = 'SplitChars';
