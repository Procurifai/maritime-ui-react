/**
 * Card — surface primitive for grouping related content.
 *
 * Compound API: render `<Card.Header>`, `<Card.Body>`, `<Card.Footer>` as
 * children to slot into the predefined layout. Variants control elevation:
 * `elevated` (default) lifts above the page background; `flat` sits inline.
 *
 * @category cards
 */
import { forwardRef, type HTMLAttributes } from 'react';

import { cn } from '../lib/cn';

export type CardVariant = 'elevated' | 'flat';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
}

const Root = forwardRef<HTMLDivElement, CardProps>(function CardRoot(
  { variant = 'elevated', className, children, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(
        'bg-mu-surface text-mu-primary border-mu rounded border',
        variant === 'elevated' ? 'shadow-mu-card' : '',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
});

const Header = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function CardHeader(
  { className, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn('border-mu border-b px-4 py-3 text-sm font-semibold', className)}
      {...rest}
    />
  );
});

const Body = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function CardBody(
  { className, ...rest },
  ref,
) {
  return <div ref={ref} className={cn('px-4 py-3 text-sm', className)} {...rest} />;
});

const Footer = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function CardFooter(
  { className, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn('border-mu text-mu-secondary border-t px-4 py-3 text-xs', className)}
      {...rest}
    />
  );
});

export const Card = Object.assign(Root, { Header, Body, Footer });
