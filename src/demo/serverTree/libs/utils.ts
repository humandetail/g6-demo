import { IGroup } from '@antv/g6'
import { BtnType, RectGroupOptions, ServerStatus } from '../types'

export const createRectGroup = (group: IGroup, opts: RectGroupOptions) => {
  const g = group.addGroup({
    name: opts.id,
    id: opts.id
  })

  const rect = g.addShape('rect', {
    attrs: {
      width: opts.width,
      height: opts.height,
      fill: opts.fill || null,
      radius: opts.radius || 0,
      cursor: opts.cursor || 'auto',
      class: opts.class
    }
  })

  rect.set('style', { color: 'red' })

  if (opts.text) {
    const {
      text,
      textAlign = 'left',
      textBaseline = 'middle',
      fill = 'inherit',
      fontSize = 16,
      fontWeight = 'normal',
      fontStyle = 'normal'
    } = opts.text

    let { 
      x = 0,
      y = 0
    } = opts.text

    if (textAlign === 'center') {
      x = opts.width / 2
    }

    if (textBaseline === 'middle') {
      y = opts.height / 2
    }

    const textShape = g.addShape('text', {
      attrs: {
        x,
        y,
        text,
        fill,
        fontSize,
        fontWeight,
        textBaseline,
        textAlign,
        fontStyle,
        cursor: opts.cursor || 'auto',
        class: opts.text.class,
      }
    })

    textShape.set('className', `${opts.id}-text`)
  }

  if (opts.image) {
    const image = g.addShape('image', {
      attrs: {
        img: opts.image.img,
        class: opts.image.class,
        x: opts.image.x || 0,
        y: opts.image.y || 0,
        width: opts.image.width || opts.width,
        height: opts.image.height || opts.height,
        cursor: opts.cursor || 'auto'
      }
    })

    image.set('className', `${opts.id}-image`)
  }

  rect.set('className', `${opts.id}-rect`)

  g.translate(opts.x, opts.y)

  return g
}

export const isDisabled = (btn: BtnType, status: ServerStatus) => {
  switch (btn) {
    case 'on':
      // 状态为开启状态时，开启按钮禁用
      return status === 1
    case 'off':
      // 状态为非开启状态时，关闭按钮禁用
      return !(status === 1)
    case 'reboot':
      // 状态为非开启状态时，重启按钮禁用
      return !(status === 1)
    default:
      return false
  }
}
