/**
 * Badge — compact status-or-category label.
 *
 * Pure visual primitive (no behaviour). Five severity variants
 * (safe / caution / warning / alarm / neutral) and two sizes (sm / md).
 *
 * @category indicators
 */
import { forwardRef, type HTMLAttributes } from 'react';

import { cn } from '../lib/cn';

export type BadgeVariant = 'safe' | 'caution' | 'warning' | 'alarm' | 'neutral';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
}

const variantClasses: Record<BadgeVariant, string> = {
  safe: 'bg-mu-status-safe text-mu-on-accent',
  caution: 'bg-mu-status-caution text-mu-primary',
  warning: 'bg-mu-status-warning text-mu-on-accent',
  alarm: 'bg-mu-status-alarm text-mu-on-accent',
  neutral: 'bg-mu-surface-raised text-mu-primary border-mu border',
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: 'px-1.5 py-0.5 text-[10px]',
  md: 'px-2 py-0.5 text-xs',
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { variant = 'neutral', size = 'md', className, children, ...rest },
  ref,
) {
  return (
    <span
      ref={ref}
      className={cn(
        'inline-flex items-center rounded font-medium tracking-wide uppercase',
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  );
});
