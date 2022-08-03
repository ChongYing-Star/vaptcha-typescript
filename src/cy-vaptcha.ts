import { config as defaultConfig, CyVaptchaConfig } from './config';
import CySecretVaptcha from './CySecretVaptcha';
import CyVaptcha from './CyVaptcha';
export {
  CyVaptcha,
  CySecretVaptcha,
};

type Constructor<T extends CyVaptcha|CySecretVaptcha> = new (vaptcha: CompleteVaptcha, config: Readonly<Partial<CyVaptchaConfig>>) => T;

/**
 * 构造封装后的Vaptcha对象
 * @param option 配置项
 * @param CyVaptchaType 目标类型构造函数
 * @param overrideConfig 自定义覆盖配置
 * @returns 目标对象
 */
export async function createVaptcha <T extends CyVaptcha|CySecretVaptcha> (option: VaptchaOption, CyVaptchaType: Constructor<T>, overrideConfig?: Readonly<Partial<CyVaptchaConfig>>) {
  const obj = await window.vaptcha(option);
  const config: Partial<CyVaptchaConfig> = {};
  Object.assign(config, defaultConfig, overrideConfig);
  const vaptcha = new CyVaptchaType(obj as CompleteVaptcha, config);
  if (config.immediateRender && (option.mode === 'click' || option.mode === 'embedded')) {
    vaptcha.render();
  }
  return vaptcha;
}
