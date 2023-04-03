import { CyVaptchaConfig } from './config.js';
import type { CompleteVaptcha } from './types.js';
import type { VaptchaEventName } from './vaptcha.js';

/**
 * 再封装的Vaptcha类
 * 用于支持instanceof关键字判断
 */
export default class CyVaptcha implements CompleteVaptcha {
  protected readonly config;
  public readonly vaptcha;

  constructor (vaptcha: CompleteVaptcha, config: Readonly<Partial<CyVaptchaConfig>>) {
    this.config = config;
    this.vaptcha = vaptcha;
  }

  /** @deprecated 官方文档未提供 */
  get token () {
    return this.vaptcha.token;
  }
  /** @deprecated 官方文档未提供 */
  get server () {
    return this.vaptcha.server;
  }
  render () {
    return this.vaptcha.render();
  }
  listen (eventName: VaptchaEventName, callback: () => any) {
    return this.vaptcha.listen(eventName, callback);
  }
  validate () {
    return this.vaptcha.validate();
  }
  getServerToken () {
    return this.vaptcha.getServerToken();
  }
  renderTokenInput (container?: string|HTMLElement) {
    return this.vaptcha.renderTokenInput(container);
  }
  reset () {
    return this.vaptcha.reset();
  }
}
