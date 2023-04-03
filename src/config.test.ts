import { test, expect } from 'vitest';
import { config, defineCyVaptchaConfig } from './config.js';

test('Get config property', () => {
  expect(config.immediateRender).toBeTypeOf('boolean');
});

test('DefineCyVaptchaConfig', () => {
  defineCyVaptchaConfig({
    immediateRender: false,
  });
  expect(config.immediateRender).toBe(false);
  defineCyVaptchaConfig({
    immediateRender: true,
  });
  expect(config.immediateRender).toBe(true);
});

test('Set config property will fail', () => {
  'use strict';
  defineCyVaptchaConfig({
    immediateRender: false,
  });
  expect(() => (config.immediateRender as any) = true).toThrow(TypeError);
  expect(config.immediateRender).toBe(false);
});
