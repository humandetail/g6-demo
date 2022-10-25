import G6, { Graph } from '@antv/g6'

import ServerImage from '../assets/images/server.png'

export const PREFIX = 'SERVER_ITEM_'

G6.registerNode('ServerItemShape', {
  draw: (cfg, group) => {
    const rect = group!.addShape('rect', {
      attrs: {
        width: 220,
        height: 76,
        radius: 8,
        fill: '#F5F5F5',
        cursor: 'pointer'
      }
    })
    rect.set('className', `${PREFIX}rect`)

    const image = group!.addShape('image', {
      attrs: {
        img: ServerImage,
        width: 56,
        height: 56,
        x: 10,
        y: 10,
        cursor: 'pointer'
      }
    })
    image.set('className', `${PREFIX}img`)

    const labelText = group!.addShape('text', {
      attrs: {
        text: '服务器IP:',
        x: 74,
        y: 10,
        fill: '#06244A',
        textBaseline: 'top',
        fontSize: 18,
        lineHeight: 20,
        cursor: 'pointer'
      }
    })
    labelText.set('className', `${PREFIX}label`)

    const valueText = group!.addShape('text', {
      attrs: {
        text: cfg?.label,
        x: 74,
        y: 40,
        fill: '#06244A',
        textBaseline: 'top',
        fontSize: 18,
        lineHeight: 20,
        cursor: 'pointer'
      }
    })
    valueText.set('className', `${PREFIX}value`)

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
