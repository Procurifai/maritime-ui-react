import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';

import { StatusIndicator } from './StatusIndicator';

describe('<StatusIndicator>', () => {
  it('renders default', () => {
    render(<StatusIndicator status="safe" />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders label', () => {
    render(<StatusIndicator status="warning" label="Hello" />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('exposes status to screen readers via sr-only text', () => {
    render(<StatusIndicator status="alarm" />);
    expect(screen.getByText(/Status: alarm/i)).toBeInTheDocument();
  });

  it('applies className', () => {
    const { container } = render(<StatusIndicator status="safe" className="my-status" />);
    expect(container.firstChild).toHaveClass('my-status');
  });

  it('forwards ref', () => {
    const ref = createRef<HTMLSpanElement>();
    render(<StatusIndicator status="safe" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  it('blink applies only when status is alarm', () => {
    const { rerender, container } = render(<StatusIndicator status="warning" blink />);
    const findDot = () => container.querySelector('[aria-hidden="true"]') as HTMLElement;
    expect(findDot()?.className).not.toContain('animate-mu-alarm-blink');

    rerender(<StatusIndicator status="alarm" blink />);
    expect(findDot()?.className).toContain('animate-mu-alarm-blink');
  });

  it('respects custom dotSize', () => {
    const { container } = render(<StatusIndicator status="safe" dotSize={20} />);
    const dot = container.querySelector('[aria-hidden="true"]') as HTMLElement;
    expect(dot.style.width).toBe('20px');
    expect(dot.style.height).toBe('20px');
  });

  it('passes axe-core', async () => {
    const { container } = render(<StatusIndicator status="alarm" label="Critical" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
