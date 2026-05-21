/**
 * StatusIndicator — coloured dot signalling a discrete state.
 *
 * Five states (safe / caution / warning / alarm / inactive) per IEC 62288's
 * severity ladder. `blink` opt-in adds a 0.9s blink loop (alarm only,
 * respecting `prefers-reduced-motion`). The container sets `aria-live` so
 * screen readers announce state changes when the consumer flips status.
 *
 * @category indicators
 */
import { forwardRef, type HTMLAttributes } from 'react';

import { cn } from '../lib/cn';
import type { StatusColor } from '../theme/tokens';

export interface StatusIndicatorProps extends HTMLAttributes<HTMLSpanElement> {
  status: StatusColor;
  /** Optional human-readable label rendered next to the dot. */
  label?: string;
  /** Pulse the dot. No-op unless `status === 'alarm'`. */
  blink?: boolean;
  /** Dot diameter in pixels. Defaults to 10. */
  dotSize?: number;
}

const dotColorClasses: Record<StatusColor, string> = {
  safe: 'bg-mu-status-safe',
  caution: 'bg-mu-status-caution',
  warning: 'bg-mu-status-warning',
  alarm: 'bg-mu-status-alarm',
  inactive: 'bg-mu-status-inactive',
};

export const StatusIndicator = forwardRef<HTMLSpanElement, StatusIndicatorProps>(
  function StatusIndicator({ status, label, blink, dotSize = 10, className, ...rest }, ref) {
    const isBlinking = blink && status === 'alarm';
    return (
      <span
        ref={ref}
        role="status"
        aria-live="polite"
        className={cn('inline-flex items-center gap-2 text-mu-primary text-sm', className)}
        {...rest}
      >
        <span
          aria-hidden
          className={cn(
            'inline-block rounded-full',
            dotColorClasses[status],
            isBlinking ? 'animate-mu-alarm-blink' : '',
          )}
          style={{ width: dotSize, height: dotSize }}
        />
        {label ? <span>{label}</span> : null}
        <span className="sr-only">Status: {status}</span>
      </span>
    );
  },
);
