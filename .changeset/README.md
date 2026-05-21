# Changesets

This directory is managed by [Changesets](https://github.com/changesets/changesets).

When a PR introduces a user-visible change, add a changeset:

```bash
npx changeset add
```

You'll be prompted for the bump (patch / minor / major) and a summary. The
summary becomes the CHANGELOG entry — write it as user-facing copy.

On merge to `main`, the Release workflow opens a "Release @procurifai/maritime-ui"
PR. Merging that PR publishes to npm and creates a GitHub release.
