export const cyVaptchaDefaultConfig = {
  'tokenReadable': false,
  'immediateRender': true,
};
const cyVaptchaConfig = { ...cyVaptchaDefaultConfig };
export type CyVaptchaConfig = typeof cyVaptchaDefaultConfig;
export const config: Readonly<CyVaptchaConfig> = cyVaptchaConfig;

export function defineCyVaptchaConfig (config: Partial<CyVaptchaConfig>) {
  Object.assign(cyVaptchaConfig, config);
  return cyVaptchaConfig as Readonly<CyVaptchaConfig>;
}
