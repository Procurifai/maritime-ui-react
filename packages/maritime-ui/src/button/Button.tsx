/**
 * Button — the canonical interactive primitive.
 *
 * Four variants (primary / secondary / ghost / danger) and three sizes
 * (sm / md / lg). Supports a loading state and `asChild` (via Radix Slot)
 * for polymorphic rendering as any element.
 *
 * @category buttons
 */
import { Slot } from '@radix-ui/react-slot';
import { forwardRef, type ButtonHTMLAttributes, type ReactElement } from 'react';

import { cn } from '../lib/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Show a loading spinner; disables the button as a side effect. */
  loading?: boolean;
  /** Render the button as its child element (Radix Slot pattern). */
  asChild?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-mu-accent text-mu-on-accent hover:bg-mu-accent-hover focus-visible:outline-mu-accent',
  secondary:
    'bg-mu-surface text-mu-primary border-mu border hover:bg-mu-surface-raised focus-visible:outline-mu-accent',
  ghost: 'bg-transparent text-mu-primary hover:bg-mu-surface focus-visible:outline-mu-accent',
  danger:
    'bg-mu-status-alarm text-mu-on-accent hover:opacity-90 focus-visible:outline-mu-status-alarm',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-7 px-2.5 text-xs',
  md: 'h-9 px-3.5 text-sm',
  lg: 'h-11 px-5 text-base',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    loading = false,
    asChild = false,
    className,
    children,
    disabled,
    ...rest
  },
  ref,
) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded font-medium transition-colors',
    'focus-visible:outline-2 focus-visible:outline-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
    variantClasses[variant],
    sizeClasses[size],
    className,
  );

  // asChild: defer rendering to the child element. Slot requires exactly one
  // React element child, so the loading spinner is not composed here — the
  // consumer is responsible for the child's content.
  if (asChild) {
    return (
      <Slot ref={ref} className={classes} aria-busy={loading || undefined} {...rest}>
        {children as ReactElement}
      </Slot>
    );
  }

  return (
    <button
      ref={ref}
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading ? <Spinner /> : null}
      {children}
    </button>
  );
});

function Spinner() {
  return (
    <svg className="h-3 w-3 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25" />
      <path
        d="M22 12a10 10 0 0 1-10 10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
