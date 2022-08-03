import { CyVaptchaConfig } from './config';
import { CyVaptchaEventName } from './types';

/**
 * 再封装的Vaptcha类
 * 支持instanceof关键字判断
 * 使用闭包屏蔽外部访问源对象
 */
export default class CySecretVaptcha implements CompleteVaptcha {
  protected readonly config: Readonly<Partial<CyVaptchaConfig>>;
  private __tokenGetter;
  private __serverGetter;
  private __tipGetter;
  public render;
  public listen;
  public validate;
  public getServerToken;
  public renderTokenInput;
  public reset;

  constructor (obj: CompleteVaptcha, config: Readonly<Partial<CyVaptchaConfig>>) {
    /* 使对报错的配置对象与传入的配置对象分离 */
    this.config = { ...config };
    this.__tokenGetter = () => {
      /* 使用构造函数传入的配置对象 避免外部修改配置造成数据泄露 */
      if (config.tokenReadable) {
        return obj.token;
      } else {
        return '';
      }
    };
    this.__serverGetter = () => obj.server;
    this.__tipGetter = () => obj.tip;
    this.render = () => obj.render();
    this.listen = (eventName: CyVaptchaEventName, callback: () => any) => obj.listen(eventName, callback);
    this.validate = () => obj.validate();
    this.getServerToken = () => obj.getServerToken();
    this.renderTokenInput = (container?: string|HTMLElement) => obj.renderTokenInput(container);
    this.reset = () => obj.reset();
  }

  get token () {
    return this.__tokenGetter();
  }
  get server () {
    return this.__serverGetter();
  }
  get tip () {
    return this.__tipGetter();
  }
}
