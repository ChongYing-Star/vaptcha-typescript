// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare interface CompleteVaptcha extends Vaptcha {
  /** 获取token */
  readonly token: string;
  /** 获取server */
  readonly server: string;
  /** 获取tip */
  readonly tip?: HTMLDivElement;
}
