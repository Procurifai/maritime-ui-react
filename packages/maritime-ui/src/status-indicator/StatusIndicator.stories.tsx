import type { Meta, StoryObj } from '@storybook/react';

import { StatusIndicator } from './StatusIndicator';

const meta = {
  title: 'Components/StatusIndicator',
  component: StatusIndicator,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    status: { control: 'select', options: ['safe', 'caution', 'warning', 'alarm', 'inactive'] },
    blink: { control: 'boolean' },
  },
} satisfies Meta<typeof StatusIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Safe: Story = { args: { status: 'safe', label: 'Operational' } };
export const Caution: Story = { args: { status: 'caution', label: 'Caution' } };
export const Warning: Story = { args: { status: 'warning', label: 'Warning' } };
export const Alarm: Story = { args: { status: 'alarm', label: 'Alarm' } };
export const Inactive: Story = { args: { status: 'inactive', label: 'Offline' } };
export const BlinkingAlarm: Story = {
  args: { status: 'alarm', label: 'Critical alarm', blink: true },
};

export const SeverityLadder: Story = {
  args: { status: 'safe' },
  render: () => (
    <div className="flex flex-col gap-1">
      <StatusIndicator status="safe" label="Safe — within normal parameters" />
      <StatusIndicator status="caution" label="Caution — monitor closely" />
      <StatusIndicator status="warning" label="Warning — operator action recommended" />
      <StatusIndicator status="alarm" label="Alarm — operator action required" />
      <StatusIndicator status="alarm" label="Critical — blinking" blink />
      <StatusIndicator status="inactive" label="Inactive" />
    </div>
  ),
};
