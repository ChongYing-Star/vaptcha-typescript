import { vi, test, expect } from 'vitest';
import { CyVaptchaConfig } from './config.js';
import CyVaptcha from './CyVaptcha.js';
import { CompleteVaptcha } from './types.js';

test('Create CyVaptcha without option', () => {
  const vaptchaInstance = {};
  const cyInstance = new CyVaptcha(vaptchaInstance as CompleteVaptcha);
  expect(cyInstance.vaptcha).toBe(vaptchaInstance);
});
test('Create CyVaptcha with option', () => {
  const vaptchaInstance = {};
  const option: CyVaptchaConfig = { immediateRender: false };
  const cyInstance = new CyVaptcha(vaptchaInstance as CompleteVaptcha, option);
  expect(cyInstance.vaptcha).toBe(vaptchaInstance);
});

test.each([
  { property: 'token', value: 'the token string' },
  { property: 'server', value: 'the server string' },
])('Get CyVaptcha property "$property"', ({ property, value }) => {
  const vaptchaInstance = { [property]: value };
  const spy = vi.spyOn(vaptchaInstance, property, 'get').mockReturnValue(value);
  const cyInstance = new CyVaptcha(vaptchaInstance as unknown as CompleteVaptcha);
  expect((cyInstance as any)[property]).toBe(value);
  expect(spy).toHaveBeenCalledOnce();
});

test.each([
  { method: 'render', args: [] },
  { method: 'listen', args: ['name', () => void(0)] },
  { method: 'validate', args: [] },
  { method: 'getServerToken', args: [] },
  { method: 'renderTokenInput', args: [document.createElement('div')] },
  { method: 'reset', args: [] },
])('Call CyVaptcha method "$property"', ({ method, args }) => {
  const vaptchaInstance = { [method]: () => void(0) };
  const spy = vi.spyOn(vaptchaInstance, method);
  const cyInstance = new CyVaptcha(vaptchaInstance as unknown as CompleteVaptcha);
  (cyInstance as any)[method](...args);
  expect(spy).toHaveBeenCalledOnce();
  expect(spy).toHaveBeenCalledWith(...args);
});
