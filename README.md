# @procurifai/maritime-ui

Pure React + Tailwind components for maritime, bridge, and operations UIs.
Clean-room rewrite of the [OpenBridge](https://www.openbridge.no/) design
language — no Web Components, no Shadow DOM, no Lit ↔ React friction.

[![npm](https://img.shields.io/npm/v/@procurifai/maritime-ui.svg)](https://www.npmjs.com/package/@procurifai/maritime-ui)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)

> **Status: v0.1 alpha.** 4 of the v1.0 20-component slate are shipping. See
> [Milestones](https://github.com/Procurifai/maritime-ui-react/milestones) for
> the roadmap.

---

## Why not just use OpenBridge directly?

[`@oicl/openbridge-webcomponents-react`](https://www.npmjs.com/package/@oicl/openbridge-webcomponents-react)
is excellent for greenfield maritime apps that are happy to live inside Lit's
Web-Components model. We are not.

| Concern                 | OpenBridge                                      | `@procurifai/maritime-ui`                       |
| ----------------------- | ----------------------------------------------- | ----------------------------------------------- |
| Substrate               | Lit Web Components in Shadow DOM                | Pure React + Tailwind utility classes           |
| Tailwind interop        | Tailwind can't style inside Shadow DOM          | First-class — components ship Tailwind classes  |
| Cherry-pick imports     | One bundle, manual tree-shaking                 | Per-component subpath exports                   |
| Combinable with Preline | Style isolation requires care                   | Tokens live under `--mu-*` — no collisions      |
| Polymorphic `asChild`   | No                                              | Yes (Radix Slot pattern)                        |
| TypeScript ergonomics   | Enum props need imperative `useRef + useEffect` | Plain typed React props                         |
| RSC-safe                | Web Components require client-side hydration    | Components are RSC-safe unless they use effects |

We owe OpenBridge — they built the design language and the Figma file
(CC BY 4.0) we work from. Their attribution lives in
[`THIRD_PARTY_NOTICES.md`](./THIRD_PARTY_NOTICES.md).

---

## Install

```bash
npm install @procurifai/maritime-ui
```

Peer dependencies: `react@^18 || ^19`, `react-dom@^18 || ^19`. Tailwind 4 is
recommended but not required — components render correctly with bare CSS if
the theme tokens stylesheet is loaded.

## Quick start

```tsx
import '@procurifai/maritime-ui/theme/tokens.css';
import { Button } from '@procurifai/maritime-ui';

export function App() {
  return (
    <html data-mu-theme="dusk">
      <body>
        <Button variant="primary" onClick={() => console.log('aye')}>
          Hoist
        </Button>
      </body>
    </html>
  );
}
```

## Cherry-pick recipe

Import only what you need; bundlers tree-shake the rest.

```tsx
// Whole-library import (works, but loads every barrel re-export):
import { Button, Card, Badge, StatusIndicator } from '@procurifai/maritime-ui';

// Per-component subpath import (preferred for cherry-pick):
import { Button } from '@procurifai/maritime-ui/button';
import { Card } from '@procurifai/maritime-ui/card';
```

## Mixing with Preline / shadcn / MUI

Tokens are namespaced under `--mu-*` and components emit only `mu-*`-prefixed
Tailwind utilities. Run any combination of design systems side by side:

```tsx
import 'preline/dist/preline.css';
import '@procurifai/maritime-ui/theme/tokens.css';
import { Button as MaritimeButton } from '@procurifai/maritime-ui/button';
import { HSDropdown } from 'preline';

// They cohabit; no `:root` token collisions.
```

## Themes

Four built-in palettes derived from IEC 62288 luminance categories:

| Theme    | Use case                                           |
| -------- | -------------------------------------------------- |
| `day`    | Daylight bridge / open ops centre                  |
| `dusk`   | Low-glare blue-tinted dusk / dawn                  |
| `night`  | Night vision — red-shifted, lowest luminance       |
| `bright` | High-contrast daylight (sun reflections, outdoors) |

Apply by setting `data-mu-theme` on any ancestor element (most commonly
`<html>`). To override the palette, declare your own `--mu-*` variables in a
later stylesheet:

```css
:root {
  --mu-color-accent-primary: 90 200 240;
}
```

## Accessibility

Every shipped component carries `vitest-axe` assertions that gate merges. We
don't claim WCAG conformance without a human audit, but we structurally
prevent shipping a component that fails `axe-core`'s automated rules.

If a component needs an opt-out for an `axe` rule, document the reason in a
JSDoc `@a11y-opt-out` tag — the manifest surfaces these in the catalog.

## Layout

```
maritime-ui-react/
├── packages/maritime-ui/   # the published @procurifai/maritime-ui package
├── landing/                # Astro site at maritime.ui
└── .storybook/             # interactive component catalog
```

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md). The clean-room policy is binding:
do not read OpenBridge source code when implementing a React equivalent.

## Licence

[MIT](./LICENSE) for our code. OpenBridge attribution and IEC 62288
references in [`THIRD_PARTY_NOTICES.md`](./THIRD_PARTY_NOTICES.md).
