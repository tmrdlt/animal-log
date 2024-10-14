import { render, screen } from '@testing-library/react';
import { expect, test, vitest } from 'vitest';

import Page from '@/app/page';

// fixes TypeError: window.matchMedia is not a function error
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vitest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vitest.fn(), // deprecated
    removeListener: vitest.fn(), // deprecated
    addEventListener: vitest.fn(),
    removeEventListener: vitest.fn(),
    dispatchEvent: vitest.fn(),
  })),
});

test('Page', () => {
  render(<Page />);
  expect(screen.getByRole('heading', { level: 1, name: '🐅 My Favourite Animals 🦒' })).toBeDefined();
});
