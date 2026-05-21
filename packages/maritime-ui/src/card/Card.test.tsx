import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';

import { Card } from './Card';

describe('<Card>', () => {
  it('renders default with elevated shadow', () => {
    const { container } = render(<Card>content</Card>);
    expect(container.firstChild).toHaveClass('shadow-mu-card');
  });

  it('flat variant omits shadow', () => {
    const { container } = render(<Card variant="flat">content</Card>);
    expect(container.firstChild).not.toHaveClass('shadow-mu-card');
  });

  it('applies className', () => {
    const { container } = render(<Card className="my-card">x</Card>);
    expect(container.firstChild).toHaveClass('my-card');
  });

  it('forwards ref', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Card ref={ref}>x</Card>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('compound subcomponents render', () => {
    render(
      <Card>
        <Card.Header>H</Card.Header>
        <Card.Body>B</Card.Body>
        <Card.Footer>F</Card.Footer>
      </Card>,
    );
    expect(screen.getByText('H')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
    expect(screen.getByText('F')).toBeInTheDocument();
  });

  it('passes axe-core', async () => {
    const { container } = render(
      <Card>
        <Card.Header>Title</Card.Header>
        <Card.Body>Body text.</Card.Body>
      </Card>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
