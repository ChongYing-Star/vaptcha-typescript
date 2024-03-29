import { CompleteVaptcha } from './types.js';
import { config as defaultConfig, CyVaptchaConfig } from './config.js';
import CyVaptcha from './CyVaptcha.js';
import type { VaptchaOption, GlobalFunction } from './vaptcha.js';
export {
  CyVaptcha,
};

type Constructor<T extends CyVaptcha> = new (vaptcha: CompleteVaptcha, config: Readonly<Partial<CyVaptchaConfig>>) => T;

/**
 * 构造封装后的Vaptcha对象
 * @param option 配置项
 * @param CyVaptchaType 目标类型构造函数
 * @param overwriteConfig 自定义覆盖配置
 * @returns 目标对象
 */
export async function createVaptcha <T extends CyVaptcha> (option: VaptchaOption, CyVaptchaType?: Constructor<T>, overwriteConfig?: Readonly<Partial<CyVaptchaConfig>>): Promise<T> {
  const obj = await ((<any>window).vaptcha as GlobalFunction)(option);
  const config: Partial<CyVaptchaConfig> = {};
  Object.assign(config, defaultConfig, overwriteConfig);
  const vaptcha = new (CyVaptchaType ?? (CyVaptcha as Constructor<T>))(obj as CompleteVaptcha, config);
  if (config.immediateRender && (option.mode === 'click' || option.mode === 'embedded')) {
    vaptcha.render();
  }
  return vaptcha;
}
