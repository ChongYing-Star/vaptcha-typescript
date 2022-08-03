import { CyVaptchaConfig } from './config';
import { CyVaptchaEventName } from './types';

/**
 * 再封装的Vaptcha类
 * 用于支持instanceof关键字判断
 */
export default class CyVaptcha implements CompleteVaptcha {
  protected readonly config;
  public vaptcha;

  constructor (vaptcha: CompleteVaptcha, config: Readonly<Partial<CyVaptchaConfig>>) {
    this.config = config;
    this.vaptcha = vaptcha;
  }

  get token () {
    return this.vaptcha.token;
  }
  get server () {
    return this.vaptcha.server;
  }
  get tip () {
    return this.vaptcha.tip;
  }
  render () {
    return this.vaptcha.render();
  }
  listen (eventName: CyVaptchaEventName, callback: () => any) {
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
