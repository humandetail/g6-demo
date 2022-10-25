import G6, { Graph } from '@antv/g6'
import { BtnBgConfig, StatusConfig } from '../config/constants'
import { createRectGroup, isDisabled } from '../libs/utils'
import { AdditionalConfig, BtnType } from '../types'

import SettingIcon from '../assets/icons/setting.svg'
import BtnOnIcon from '../assets/icons/on.svg'
import BtnOffIcon from '../assets/icons/off.svg'
import BtnRebootIcon from '../assets/icons/reboot.svg'
import LoadingIcon from '../assets/icons/loading.gif'
import { setStatus } from '../api'

G6.registerNode('AcsItemShape', {
  draw: (cfg, group) => {
    const data = cfg!.data as AdditionalConfig

    // 外边框
    const outsideRect = group!.addShape('rect', {
      attrs: {
        width: 313,
        height: 155,
        stroke: '#446BFF',
        fill: 'rgba(68,107,255,0.03)',
        class: 'custom-shape',
        radius: 8
      }
    })

    // 头部区域组
    const headerGroup = group!.addGroup({
      id: 'header-group'
    })
    headerGroup.translate(10, 10)

    // 标题
    headerGroup.addShape('text', {
      attrs: {
        x: 0,
        y: 8,
        text: data.title,
        fill: '#364064',
        fontSize: 16,
        fontWeight: 700,
        textBaseline: 'middle'
      }
    })
    // 远程配置 按钮
    createRectGroup(headerGroup, {
      id: 'btn-remote-setting',
      x: 209,
      y: 0,
      width: 84,
      height: 24,
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

    // 内区域组
    const insideGroup = group!.addGroup({
      id: 'inside-group'
    })
    insideGroup.translate(10, 40)
    // 内边框
    insideGroup.addShape('rect', {
      attrs: {
        x: 0,
        y: 0,
        width: 293,
        height: 104,
        stroke: '#446BFF',
        class: 'custom-shape-inside',
        radius: 4
      }
    })

    // 端口号
    createRectGroup(insideGroup, {
      id: 'port',
      x: 6,
      y: 6,
      width: 120,
      height: 28,
      fill: 'rgba(68,107,255,0.08)',
      radius: 4,

      text: {
        x: 6,
        text: `端口号：${data.port}`,
        fontSize: 14,
        fill: '#06244A',
        fontWeight: 400
      }
    })
    // 客户端数量
    createRectGroup(insideGroup, {
      id: 'number-of-clients',
      x: 130,
      y: 6,
      width: 157,
      height: 28,
      fill: 'rgba(68,107,255,0.08)',
      radius: 4,

      text: {
        x: 6,
        text: `客户端数量：${data.numberOfClients}`,
        fontSize: 14,
        fill: '#06244A',
        fontWeight: 400
      }
    })

    // 状态
    const statusConfig = StatusConfig[data.status]
    createRectGroup(insideGroup, {
      id: 'status',
      x: 6,
      y: 38,
      width: 281,
      height: 28,
      fill: statusConfig.background,
      radius: 4,

      text: {
        text: statusConfig.text,
        fontSize: 14,
        fill: statusConfig.color,
        fontWeight: 400,
        textAlign: 'center'
      }
    })

    // 按钮组
    const buttonsGroup = insideGroup.addGroup({
      id: 'buttons-group'
    })

    const btns: BtnType[] = ['on', 'off', 'reboot']
    const xArr = [6, 101, 196]
    const icons = [BtnOnIcon, BtnOffIcon, BtnRebootIcon]
    const texts = ['开启', '关闭', '重启']
    btns.forEach((btn, index) => {
      const btnIsDisabled = isDisabled(btn, data.status)
      createRectGroup(buttonsGroup, {
        id: `btn-${btn}`,
        x: xArr[index],
        y: 70,
        width: 91,
        height: 28,
        fill: btnIsDisabled ? BtnBgConfig.disabled : BtnBgConfig[btn],
        radius: 4,
        cursor: btnIsDisabled ? 'auto' : 'pointer',

        text: {
          x: 42,
          text: texts[index],
          fontSize: 14,
          fill: '#fff',
          fontWeight: 400
        },
  
        image: {
          img: icons[index],
          x: 18,
          y: 5,
          width: 18,
          height: 18
        }
      })
    })

    // 增加 Loading
    if (data.loading) {
      createRectGroup(group!, {
        id: 'item-loading',
        x: 0,
        y: 0,
        width: 313,
        height: 155,
        fill: 'rgba(255, 255, 255, 0.5)',

        image: {
          img: LoadingIcon,
          x: 140,
          y: 61,
          width: 32,
          height: 32,
          class: 'custom-loading'
        }
      })
    }

    return outsideRect
  }
})

export default (graph: Graph) => {
  graph.on('node:click', (e) => {
    const item = e.item!
    const shape = e.target
    const className = shape.get('className')

    console.log(className)

    const data = item.getModel().data as AdditionalConfig

    if (className.startsWith('btn-on') && !(isDisabled('on', data.status))) {
      console.log('开启')
      item.update({
        data: {
          ...data,
          loading: true
        }
      })
      setStatus(1).then(res => {
        if (res.code === 200) {
          item.update({
            data: {
              ...data,
              status: res.data,
              loading: false
            }
          })
        }
      })

      return
    }
    if (className.startsWith('btn-off') && !(isDisabled('off', data.status))) {
      console.log('关闭')
      item.update({
        data: {
          ...data,
          loading: true
        }
      })
      // 模拟关闭时状态会先进入异常状态
      setStatus(2).then(res => {
        if (res.code === 200) {
          item.update({
            data: {
              ...data,
              status: res.data,
              loading: true
            }
          })
          return setStatus(3)
        }
        throw new Error('Error')
      }).then(res => {
        // 之后才是关闭状态
        if (res.code === 200) {
          item.update({
            data: {
              ...data,
              status: res.data,
              loading: false
            }
          })
        }
      }).catch(err => console.log(err))
      return
    }
    if (className.startsWith('btn-reboot') && !(isDisabled('reboot', data.status))) {
      console.log('重启')
      item.update({
        data: {
          ...data,
          loading: true
        }
      })
      // 模拟重启时状态会先进入异常状态
      setStatus(2).then(res => {
        if (res.code === 200) {
          item.update({
            data: {
              ...data,
              status: res.data,
              loading: true
            }
          })
          return setStatus(1)
        }
        throw new Error('Error')
      }).then(res => {
        // 之后才是开启状态
        if (res.code === 200) {
          item.update({
            data: {
              ...data,
              status: res.data
            }
          })
        }
      }).catch(err => console.log(err)).finally(() => {
        item.update({
          data: {
            ...data,
            loading: false
          }
        })
      })
      return
    }
    if (className.startsWith('btn-remote-setting')) {
      console.log('远程配置')
      return
    }
  })
}
