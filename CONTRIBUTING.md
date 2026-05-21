# Contributing

Thanks for your interest. `maritime-ui-react` is small, opinionated, and
intentionally so. Before opening a PR, please skim the rules below.

## Clean-room policy

`@procurifai/maritime-ui` is a clean-room reimplementation of the OpenBridge
design language. **Contributors implementing the React equivalent of any
OpenBridge component MUST NOT read OpenBridge's Lit source code.** Work from:

1. The OpenBridge Figma community file (CC BY 4.0).
2. The IEC 62288 standard (or its summary in `THIRD_PARTY_NOTICES.md`).
3. Behavioural observation of a published OpenBridge demo in a browser.

This preserves the legal independence of our codebase under Apache 2.0's
derivative-work rules.

## Component requirements

Every component in `packages/maritime-ui/src/<component>/` ships with:

- `Component.tsx` — the implementation. Forward refs. Spread rest props.
  Provide a `<Name>Props` interface that drives the manifest.
- `Component.stories.tsx` — CSF 3.0. At least one `Default` + variant
  stories covering every meaningful prop combination. `tags: ['autodocs']`.
- `Component.test.tsx` — Vitest + `@testing-library/react`. **Required
  assertions**: renders default, applies className, forwards ref, passes
  `axe-core` (`vitest-axe`'s `toHaveNoViolations()`), and any
  component-specific behaviour.
- `index.ts` — re-export.
- JSDoc on the export and at the top of the file. This drives the catalog
  description; treat it as user-facing copy.

Subpath exports in `packages/maritime-ui/package.json` and entries in
`tsup.config.ts` must be updated alongside.

## Themes

Components must render correctly across all four built-in themes (`day`,
`dusk`, `night`, `bright`). The Storybook theme toolbar swaps the
`data-mu-theme` attribute on the canvas — verify your component looks right
in every palette before requesting review.

Never hardcode hex colours. Use the `bg-mu-*`, `text-mu-*`, etc. utilities
backed by `--mu-*` CSS variables in `src/theme/tokens.css`.

## Commits

Conventional Commits, lower-case, no period. Examples:

- `feat(button): add danger variant`
- `fix(card): drop bogus elevation on flat variant`
- `test(badge): cover sm size`
- `docs(readme): explain cherry-pick recipe`

Patch-level commits do NOT require a changeset. Anything user-visible does:

```bash
npx changeset add
```

Pick the bump (patch / minor / major) and write the changelog entry in
first-person plural ("we now…") to match Changesets' rendered output.

## Local loop

```bash
npm install
npm run dev            # Storybook
npm run test           # Vitest (watch)
npm run lint           # eslint + prettier --check
npm run typecheck      # tsc --noEmit
npm run build          # tsup
```

## PRs

- Open against `main`.
- One concern per PR. If you're adding two components, that's two PRs.
- The CI run must be green before merge. Pre-commit hooks regenerate
  `components.manifest.json` automatically; do NOT edit it by hand.
- Squash merges only.
