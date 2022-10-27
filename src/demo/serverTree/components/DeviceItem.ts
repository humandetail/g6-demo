import G6, { Graph, IShape } from '@antv/g6'
import { deviceStatusConfig } from '../config/constants'
import { createRectGroup, getDeviceImage } from '../libs/utils'
import { DeviceAdditionalConfig, DeviceStatus } from '../types'

import SettingIcon from '../assets/icons/setting.svg'
import DeviceOnIcon from '../assets/icons/device-on.svg'
import DeviceOffIcon from '../assets/icons/device-off.svg'
import DeviceFalutIcon from '../assets/icons/device-fault.svg'
import DeviceBrokenIcon from '../assets/icons/device-broken.svg'

const getIcon = (status: DeviceStatus) => {
  switch (status) {
    case 1:
      return DeviceOnIcon
    case 2:
      return DeviceOffIcon
    case 3:
      return DeviceFalutIcon
    case 4:
      return DeviceBrokenIcon
    default:
      return ''
  }
}

export const PREFIX = 'DEVICE_ITEM_'

G6.registerNode('DeviceItemShape', {
  draw: (cfg, group) => {
    const data = cfg!.data as DeviceAdditionalConfig

    const rect: IShape = group!.addShape('rect', {
      attrs: {
        width: 230,
        height: 100,
        radius: 6,
        fill: 'rgba(68,107,255,0.03)',
        stroke: 'rgba(68,107,255,0.7)',
        class: 'custom-shape'
      }
    })
    rect.set('className', `${PREFIX}outline`)

    // 设备图
    group!.addShape('image', {
      attrs: {
        img: getDeviceImage(data.type, data.status),
        x: 8,
        y: 8,
        width: 45,
        height: 48
      }
    })

    // 设备名称
    const nameGroup = createRectGroup(group!, {
      id: `${PREFIX}device-name`,
      x: 61,
      y: 8,
      width: 161,
      height: 20,

      text: {
        text: '设备:',
        fontSize: 14,
        fill: '#999'
      }
    })
    nameGroup.addShape('dom', {
      attrs: {
        x: 42,
        y: 0,
        width: 120,
        height: 20,
        lineHeight: 20,
        fontSize: 14,
        html: `
          <p
            class="ellipsis"
            title="${data.name}"
            style="color: #446BFF; font-weight: 500;"
          >
            ${data.name}
          </p>
        `
      }
    })

    // 设备状态
    const statusGroup = group!.addGroup({
      name: 'statusGroup'
    })
    statusGroup.addShape('text', {
      attrs: {
        x: 61,
        y: 33,
        text: '状态:',
        fontSize: 14,
        fill: '#999',
        lineHeight: 20,
        textBaseline: 'top'
      }
    })
    createRectGroup(group!, {
      id: `${PREFIX}device-status`,
      x: 103,
      y: 33,
      width: 161,
      height: 20,

      text: {
        text: deviceStatusConfig[data.status].text,
        fontSize: 14,
        fill: deviceStatusConfig[data.status].color,
      },

      image: {
        width: 16,
        height: 16,
        img: getIcon(data.status),
        x: deviceStatusConfig[data.status].text.length * 16,
        y: 2
      }
    })

    // 远程设置

    // 远程配置 按钮
    createRectGroup(group!, {
      id: PREFIX + 'btn-remote-setting',
      x: 8,
      y: 64,
      width: 88,
      height: 28,
      fill: 'rgba(68,107,255,0.04)',
      radius: 4,
      cursor: 'pointer',

      text: {
        x: 24,
        text: '远程配置',
        fontSize: 14,
        fill: '#364064',
        fontWeight: 400
      },

      image: {
        img: SettingIcon,
        x: 5,
        y: 4,
        width: 16,
        height: 16
      }
    })

    // 开启 / 关闭按钮
    const opGroup = createRectGroup(group!, {
      id: `${PREFIX}status-operation`,
      x: 104,
      y: 64,
      width: 118,
      height: 28,
      radius: 4,
      fill: 'rgba(68,107,255,0.04)'
    })
    opGroup.addShape('dom', {
      attrs: {
        x: 8,
        width: 128,
        height: 28,
        fontSize: 14,
        html: `
          <p style="line-height: 28px; color: #999;">
            <span style="color: ${data.status !== 1 ? '#364064' : '#999999'}">OFF</span>/<span style="color: ${data.status === 1 ? '#364064' : '#999999'}">ON</span>
          </p>
        `
      }
    })
    // 切换按钮
    const opBtnGroup = opGroup.addGroup({
      name: 'opBtnGroup'
    })
    opBtnGroup.translate(78, 6)

    const statusRect = opBtnGroup.addShape('rect', {
      attrs: {
        width: 32,
        height: 16,
        radius: 8,
        fill: data.status !== 1 ? '#CACCD3' : 'l(0) 0:#ffffff 0:#00C6FF 1:#0072FF',
        cursor: 'pointer'
      }
    })
    const statusCircle = opBtnGroup.addShape('circle', {
      attrs: {
        r: 6,
        x: data.status === 1 ? 24 : 8,
        y: 8,
        fill: '#fff',
        cursor: 'pointer'
      }
    })
    statusRect.set('className', `${PREFIX}btn-switch-status-rect`)
    statusCircle.set('className', `${PREFIX}btn-switch-status-circle`)

    return rect
  }
})

export default (graph: Graph) => {
  graph.on('node:click', (e) => {
    // const item = e.item!
    const shape = e.target
    const className = shape.get('className')

    console.log(className)

    if (className.startsWith(`${PREFIX}btn-remote-setting`)) {
      console.log('远程配置')
      return
    }

    if (className.startsWith(`${PREFIX}btn-switch-status`)) {
      console.log('切换状态')
      return
    }
  })
}
