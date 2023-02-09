export const cyVaptchaDefaultConfig = {
  'immediateRender': true,
};
const cyVaptchaConfig = { ...cyVaptchaDefaultConfig };
export type CyVaptchaConfig = typeof cyVaptchaDefaultConfig;
export const config: Readonly<CyVaptchaConfig> = new Proxy(cyVaptchaConfig, {
  set () { return false; },
});

export function defineCyVaptchaConfig (config: Partial<CyVaptchaConfig>) {
  Object.assign(cyVaptchaConfig, config);
  return cyVaptchaConfig as Readonly<CyVaptchaConfig>;
}
