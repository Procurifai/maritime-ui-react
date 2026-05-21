import type { Meta, StoryObj } from '@storybook/react';

import { Card } from './Card';

const meta = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    variant: { control: 'select', options: ['elevated', 'flat'] },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Elevated: Story = {
  args: { variant: 'elevated' },
  render: (args) => (
    <Card {...args} style={{ width: 320 }}>
      <Card.Header>Vessel status</Card.Header>
      <Card.Body>Currently underway at 12 knots, bearing 047°.</Card.Body>
      <Card.Footer>Last update 14:02 UTC</Card.Footer>
    </Card>
  ),
};

export const Flat: Story = {
  ...Elevated,
  args: { variant: 'flat' },
};

export const BodyOnly: Story = {
  args: {},
  render: () => (
    <Card style={{ width: 320 }}>
      <Card.Body>No header / no footer.</Card.Body>
    </Card>
  ),
};
