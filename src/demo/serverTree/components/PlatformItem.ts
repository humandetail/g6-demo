import G6, { Graph } from '@antv/g6'

import PlatformImage from '../assets/images/monitoring-platform.png'

export const PREFIX = 'PLATFORM_ITEM_'

G6.registerNode('PlatformItemShape', {
  draw: (cfg, group) => {
    const rect = group!.addShape('rect', {
      attrs: {
        width: 260,
        height: 306,
        radius: 20,
        fill: '#F5F5F5',
        cursor: 'pointer'
      }
    })
    rect.set('className', `${PREFIX}rect`)

    const image = group!.addShape('image', {
      attrs: {
        img: PlatformImage,
        width: 240,
        height: 240,
        x: 10,
        y: 10,
        cursor: 'pointer'
      }
    })
    image.set('className', `${PREFIX}img`)

    const text = group!.addShape('text', {
      attrs: {
        text: cfg?.label,
        x: 37,
        y: 250,
        fill: '#06244A',
        textBaseline: 'top',
        fontSize: 32,
        lineHeight: 32,
        cursor: 'pointer'
      }
    })
    text.set('className', `${PREFIX}name`)

    return rect
  }
})

export default (graph: Graph) => {
  graph.on('node:click', (e) => {
    const item = e.item!
    const shape = e.target
    const className = shape.get('className')

    console.log(className)
    if (className?.startsWith(PREFIX)) {
      console.log('SERVER_ITEM')
    }
  })
}
