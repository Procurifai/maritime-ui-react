import type { Meta, StoryObj } from '@storybook/react';

import { Badge } from './Badge';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    variant: { control: 'select', options: ['safe', 'caution', 'warning', 'alarm', 'neutral'] },
    size: { control: 'select', options: ['sm', 'md'] },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Safe: Story = { args: { variant: 'safe', children: 'Nominal' } };
export const Caution: Story = { args: { variant: 'caution', children: 'Caution' } };
export const Warning: Story = { args: { variant: 'warning', children: 'Warning' } };
export const Alarm: Story = { args: { variant: 'alarm', children: 'Alarm' } };
export const Neutral: Story = { args: { variant: 'neutral', children: 'Info' } };
export const Small: Story = { args: { size: 'sm', children: 'sm' } };

export const SeverityRow: Story = {
  args: {},
  render: () => (
    <div className="flex gap-2">
      <Badge variant="safe">Safe</Badge>
      <Badge variant="caution">Caution</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="alarm">Alarm</Badge>
      <Badge variant="neutral">Neutral</Badge>
    </div>
  ),
};
