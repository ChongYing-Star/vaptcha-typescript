import { test, expect } from 'vitest';
import vaptcha from './vaptcha.js';
import CyVaptcha from './CyVaptcha.js';
import { createVaptcha } from './cy-vaptcha.js';
import { defineCyVaptchaConfig } from './config.js';

test('Exports form "/index"', async () => {
  const exports_ = await import('./index.js');
  expect(exports_.default).toBe(vaptcha);
  expect(exports_.CyVaptcha).toBe(CyVaptcha);
  expect(exports_.createVaptcha).toBe(createVaptcha);
  expect(exports_.defineCyVaptchaConfig).toBe(defineCyVaptchaConfig);
});
