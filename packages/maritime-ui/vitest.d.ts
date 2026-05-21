import type { AxeMatchers } from 'vitest-axe/matchers';
import 'vitest';

declare module 'vitest' {
  interface Assertion<T = unknown> extends AxeMatchers {
    _phantom?: T;
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface AsymmetricMatchersContaining extends AxeMatchers {}
}
