/** Vaptcha基础参数 */
export interface VaptchaBaseOption {
  /** 验证单元的VID */
  vid: string,
  /** 验证单元场景：默认0 */
  scene?: number,
  /** 语言：默认auto */
  lang?: 'auto' | 'zh-CN' | 'en' | 'zh-TW' | 'jp',
  /** 验证节点区域：东南亚(sea)、北美(na)、中国大陆(cn)、根据用户区域自动匹配就近节点(auto)，默认auto */
  area?: 'auto' | 'sea' | 'na' | 'cn',
}

/** Vaptcha点击式参数 */
export interface VaptchaOptionClickType {
  /** 验证器模式：点击式(click)、隐藏式(invisible)、嵌入式(embedded) */
  mode: 'click',
  /** 容器元素或容器元素选择器；适用类型：点击式、嵌入式 */
  container: string | HTMLElement,
  /** 按钮样式：dark、light，默认dark；适用类型：点击式 */
  style?: 'dark' | 'light',
  /** 按钮颜色：默认`#57ABFF`；适用类型：点击式 */
  color?: string,
}

/** Vaptcha隐藏式参数 */
export interface VaptchaOptionInvisibleType {
  /** 验证器模式：点击式(click)、隐藏式(invisible)、嵌入式(embedded) */
  mode: 'invisible',
}

/** Vaptcha嵌入式参数 */
export interface VaptchaOptionEmbeddedType {
  /** 验证器模式：点击式(click)、隐藏式(invisible)、嵌入式(embedded) */
  mode: 'embedded',
  /** 容器元素或容器元素选择器；适用类型：点击式、嵌入式 */
  container: string | HTMLElement,
  /** 是否在嵌入式图片底部显示操作提示文字：默认true；适用类型：嵌入式	 */
  guide?: boolean,
}

type VaptchaTypeOption = VaptchaOptionClickType | VaptchaOptionInvisibleType | VaptchaOptionEmbeddedType;

export type VaptchaOption = VaptchaBaseOption & VaptchaTypeOption;

export interface VaptchaServerToken {
  token: string,
  server: string,
}

export type VaptchaEventName = 'pass' | 'close';

export interface Vaptcha {
  /**
   * 仅供点击式、嵌入式使用。
   * 执行初始化操作，将按钮或者图片插入到配置参数中的容器中去。
   */
  render (): void;
  /**
   * 用于监听验证事件。
   * @param eventName 事件名：验证通过(pass)、关闭验证弹窗(close)
   * @param callback 事件回调
   */
  listen (eventName: VaptchaEventName, callback: () => any): void;
  /**
   * 仅供隐藏式使用。由开发者决定何时调用该方法进行验证，比如在表单提交时调用该方法。
   */
  validate (): void;
  /**
   * 所有模式均可用，推荐使用此接口来获取验证结果。
   * 用于获取验证结果, 返回server、token，由于token只可使用一次，所以调用getServerToken接口获取token后，token将被置空。
   */
  getServerToken (): VaptchaServerToken;
  /**
   * 此函数用于向表单添加两个名为VAPTCHA_server,VAPTCHA_token的input标签
   * @param container 存放input标签的容器，默认值为参数配置中的container容器，使用隐藏式时为必填。
   */
  renderTokenInput (container?: string|HTMLElement): void;
  /**
   * 所有模式均可用。VAPTCHA 重置操作，例如可在登录失败时调用。
   */
  reset (): void;
}

export type GlobalFunction = (option: VaptchaOption) => Promise<Vaptcha>;

export default ((...args) => (<any>window).vaptcha(...args)) as GlobalFunction;
