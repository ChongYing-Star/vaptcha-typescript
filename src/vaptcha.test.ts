import { test, expect, vi } from 'vitest';
import vaptcha, { Vaptcha, VaptchaOption } from './vaptcha.js';

const globalFunction = vi.fn<[VaptchaOption], Promise<Vaptcha>>();
vi.stubGlobal('vaptcha', globalFunction);

test('Call global function', async () => {
  const returnValue = {};
  globalFunction.mockResolvedValue(returnValue as Vaptcha);
  const option: VaptchaOption = {
    vid: '',
    mode: 'invisible',
  };
  await expect(vaptcha(option)).resolves.toBe(returnValue);
  expect(globalFunction).toHaveBeenCalledOnce();
  expect(globalFunction).toHaveBeenCalledWith(option);
});
