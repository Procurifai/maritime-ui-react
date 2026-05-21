import type { Meta, StoryObj } from '@storybook/react';

import { STATUS_COLORS, THEMES } from './tokens';

const meta = {
  title: 'Theme/Swatches',
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;

type Story = StoryObj;

function Swatch({ label, varName }: { label: string; varName: string }) {
  return (
    <div className="flex items-center gap-3 rounded border-mu border bg-mu-surface px-3 py-2 text-mu-primary">
      <div
        className="h-8 w-8 rounded border-mu border"
        style={{ background: `rgb(var(${varName}))` }}
        aria-hidden
      />
      <div className="flex flex-col">
        <code className="text-xs">{varName}</code>
        <span className="text-mu-secondary text-xs">{label}</span>
      </div>
    </div>
  );
}

/** Visualises every palette token in the current theme. Use the theme toolbar to swap. */
export const Palette: Story = {
  render: () => (
    <div className="bg-mu-bg-primary min-h-screen p-6">
      <h2 className="text-mu-primary mb-3 text-lg font-semibold">Surface & text</h2>
      <div className="mb-6 grid grid-cols-2 gap-2 md:grid-cols-4">
        <Swatch label="page background" varName="--mu-color-bg-primary" />
        <Swatch label="surface" varName="--mu-color-surface" />
        <Swatch label="surface raised" varName="--mu-color-surface-raised" />
        <Swatch label="border" varName="--mu-color-border" />
        <Swatch label="text primary" varName="--mu-color-text-primary" />
        <Swatch label="text secondary" varName="--mu-color-text-secondary" />
        <Swatch label="accent primary" varName="--mu-color-accent-primary" />
        <Swatch label="accent hover" varName="--mu-color-accent-hover" />
      </div>

      <h2 className="text-mu-primary mb-3 text-lg font-semibold">Status</h2>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-5">
        {STATUS_COLORS.map((status) => (
          <Swatch key={status} label={status} varName={`--mu-color-status-${status}`} />
        ))}
      </div>
    </div>
  ),
};

/** Per-theme reference grid — useful for design review across all four themes. */
export const AllThemes: Story = {
  render: () => (
    <div className="flex min-h-screen flex-col gap-4 p-6">
      {THEMES.map((theme) => (
        <div key={theme} data-mu-theme={theme} className="bg-mu-bg-primary rounded p-4">
          <h3 className="text-mu-primary mb-2 text-sm font-semibold capitalize">{theme}</h3>
          <div className="grid grid-cols-5 gap-2">
            {STATUS_COLORS.map((status) => (
              <Swatch key={status} label={status} varName={`--mu-color-status-${status}`} />
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};
