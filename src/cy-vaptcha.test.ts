import { vi, test, expect, describe } from 'vitest';
import { createVaptcha } from './cy-vaptcha.js';
import CyVaptcha from './CyVaptcha.js';
import type { VaptchaOption } from './vaptcha.js';
import type { CompleteVaptcha } from './types.js';
import { defineCyVaptchaConfig } from './config.js';

test('Exports form "/cy-vaptcha"', async () => {
  const exports_ = await import('./cy-vaptcha.js');
  expect(exports_.CyVaptcha).toBe(CyVaptcha);
});

const vaptcha = vi.fn<[VaptchaOption], Promise<CompleteVaptcha>>();
vi.stubGlobal('vaptcha', vaptcha);

const v = {
  render: vi.fn(),
};
vaptcha.mockImplementation(() => Promise.resolve(v as unknown as CompleteVaptcha));
class MyVaptcha extends CyVaptcha {}

describe.each([
  { immediateRender: true },
  { immediateRender: false },
])('Create with global config when immediateRender = $immediateRender', ({ immediateRender }) => {
  test.each([
    { mode: 'click', called: immediateRender && true },
    { mode: 'embedded', called: immediateRender && true },
    { mode: 'invisible', called: immediateRender && false },
  ])('Create CyVaptcha when type = $mode', async ({ mode, called }) => {
    defineCyVaptchaConfig({ immediateRender });
    const option: VaptchaOption = { vid: '', mode: (mode as any), container: '' };
    const cyInstance = await createVaptcha(option);
    expect(cyInstance.vaptcha).toBe(v);
    expect(cyInstance).toBeInstanceOf(CyVaptcha);
    if (called) {
      expect(v.render).toBeCalled();
    } else {
      expect(v.render).not.toBeCalled();
    }
  });
  test.each([
    { mode: 'click', called: immediateRender && true },
    { mode: 'embedded', called: immediateRender && true },
    { mode: 'invisible', called: immediateRender && false },
  ])('Create MyVaptcha when type = $mode', async ({ mode, called }) => {
    defineCyVaptchaConfig({ immediateRender });
    const option: VaptchaOption = { vid: '', mode: (mode as any), container: '' };
    const cyInstance = await createVaptcha(option, MyVaptcha);
    expect(cyInstance.vaptcha).toBe(v);
    expect(cyInstance).toBeInstanceOf(CyVaptcha);
    expect(cyInstance).toBeInstanceOf(MyVaptcha);
    if (called) {
      expect(v.render).toBeCalled();
    } else {
      expect(v.render).not.toBeCalled();
    }
  });
});

describe.each([
  { immediateRender: true },
  { immediateRender: false },
])('Create with overwrite config when immediateRender = $immediateRender', ({ immediateRender }) => {
  test.each([
    { mode: 'click', called: immediateRender && true },
    { mode: 'embedded', called: immediateRender && true },
    { mode: 'invisible', called: immediateRender && false },
  ])('Create CyVaptcha when type = $mode', async ({ mode, called }) => {
    const option: VaptchaOption = { vid: '', mode: (mode as any), container: '' };
    const cyInstance = await createVaptcha(option, undefined, { immediateRender });
    expect(cyInstance.vaptcha).toBe(v);
    expect(cyInstance).toBeInstanceOf(CyVaptcha);
    if (called) {
      expect(v.render).toBeCalled();
    } else {
      expect(v.render).not.toBeCalled();
    }
  });
  test.each([
    { mode: 'click', called: immediateRender && true },
    { mode: 'embedded', called: immediateRender && true },
    { mode: 'invisible', called: immediateRender && false },
  ])('Create MyVaptcha when type = $mode', async ({ mode, called }) => {
    const option: VaptchaOption = { vid: '', mode: (mode as any), container: '' };
    const cyInstance = await createVaptcha(option, MyVaptcha, { immediateRender });
    expect(cyInstance.vaptcha).toBe(v);
    expect(cyInstance).toBeInstanceOf(CyVaptcha);
    expect(cyInstance).toBeInstanceOf(MyVaptcha);
    if (called) {
      expect(v.render).toBeCalled();
    } else {
      expect(v.render).not.toBeCalled();
    }
  });
});
