import type { Vaptcha } from './vaptcha';

export interface CompleteVaptcha extends Vaptcha {
  /**
   * 获取token
   * @deprecated 官方文档未提供
   */
  readonly token: string;
  /**
   * 获取server
   * @deprecated 官方文档未提供
   */
  readonly server: string;
}
