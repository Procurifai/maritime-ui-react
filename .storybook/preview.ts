import type { Preview } from '@storybook/react';
import { withThemeByDataAttribute } from '@storybook/addon-themes';

import '../packages/maritime-ui/src/theme/tokens.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: { disable: true },
    a11y: {
      element: '#storybook-root',
      manual: false,
    },
  },
  decorators: [
    withThemeByDataAttribute({
      themes: {
        day: 'day',
        dusk: 'dusk',
        night: 'night',
        bright: 'bright',
      },
      defaultTheme: 'dusk',
      attributeName: 'data-mu-theme',
    }),
  ],
};

export default preview;
