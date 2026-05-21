import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';

import { Badge } from './Badge';

describe('<Badge>', () => {
  it('renders default with neutral variant', () => {
    const { container } = render(<Badge>Info</Badge>);
    expect(screen.getByText('Info')).toBeInTheDocument();
    expect(container.firstChild).toHaveClass('bg-mu-surface-raised');
  });

  it('applies className', () => {
    render(<Badge className="my-badge">x</Badge>);
    expect(screen.getByText('x')).toHaveClass('my-badge');
  });

  it('forwards ref', () => {
    const ref = createRef<HTMLSpanElement>();
    render(<Badge ref={ref}>x</Badge>);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  it.each(['safe', 'caution', 'warning', 'alarm', 'neutral'] as const)(
    'renders variant %s',
    (variant) => {
      const { container } = render(<Badge variant={variant}>{variant}</Badge>);
      expect(container.firstChild).toBeInTheDocument();
    },
  );

  it('passes axe-core', async () => {
    const { container } = render(<Badge variant="alarm">Alarm</Badge>);
    expect(await axe(container)).toHaveNoViolations();
  });
});
