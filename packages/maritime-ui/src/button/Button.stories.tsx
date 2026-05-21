import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'ghost', 'danger'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = { args: { children: 'Engage', variant: 'primary' } };
export const Secondary: Story = { args: { children: 'Dismiss', variant: 'secondary' } };
export const Ghost: Story = { args: { children: 'Skip', variant: 'ghost' } };
export const Danger: Story = { args: { children: 'Emergency Stop', variant: 'danger' } };
export const Small: Story = { args: { children: 'Small', size: 'sm' } };
export const Large: Story = { args: { children: 'Large', size: 'lg' } };
export const Loading: Story = { args: { children: 'Working…', loading: true } };
export const Disabled: Story = { args: { children: 'Locked', disabled: true } };

export const AsChildAnchor: Story = {
  args: {
    asChild: true,
    children: <a href="#anchor">Link styled as button</a>,
  },
};
