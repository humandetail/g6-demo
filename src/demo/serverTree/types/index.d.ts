/**
 * 服务状态：1 正常/已启动，2 异常 3， 关闭/未启动
 */
export type ServerStatus = 1 | 2 | 3

export type BtnType = 'on' | 'off' | 'reboot'

export type AdditionalConfig = {
  title: string;
  port: string;
  numberOfClients: number;
  status: ServerStatus;
  loading?: boolean;
}

export interface RectGroupOptions {
  id: string | number;

  class?: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fill?: string;
  radius?: number;
  cursor?: string;

  text?: {
    text: string;
    x?: number;
    y?: number;
    /** 设置文本内容的当前对齐方式 */
    textAlign?: 'left' | 'center' | 'right';
    /** 设置在绘制文本时使用的当前文本基线 */
    textBaseline?: 'top' | 'middle' | 'bottom';
    fill?: string;
    fontSize?: number;
    fontWeight?: number | "normal" | "bold" | "bolder" | "lighter";
    fontStyle?: 'normal' | 'italic' | 'oblique';
    class?: string;
  };

  image?: {
    img: string;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    class?: string;
  }
}

export type DeviceStatus = 1 | 2 | 3 | 4

export type DeviceType = 'default' | 'ac' | 'door' | 'lamp' | 'machine' | 'monitor' | 'radio' | 'screen'

export type DeviceAdditionalConfig = {
  id: string | number;
  name: string;
  type: DeviceType;
  status: DeviceStatus;
}
