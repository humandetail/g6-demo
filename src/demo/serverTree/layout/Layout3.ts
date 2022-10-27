import G6, { NodeConfig } from '@antv/g6'

G6.registerLayout('Layout3', {
  getDefaultCfg () {
    return {
    }
  },

  execute () {
    const nodes = this.nodes as NodeConfig[]

    const centerNode = nodes.find(item => item.id === 'serverItem')

    if (centerNode) {
      centerNode.x = 670
      centerNode.y = 312
      centerNode.anchorPoints = [
        [1, 0.5],
        [0, 0.5]
      ]
    }

    const acsServerNodes = nodes.filter(item => item.id !== 'serverItem')

    // 采用绝对定位布局
    const defaultPoints: { x: number, y: number }[] = [
      { x: 427, y: 35 },
      { x: 820, y: 510 },
      { x: 820, y: 35 },
      { x: 427, y: 510 },
      { x: 34, y: 272 },
      { x: 1213, y: 272 },
      { x: 34, y: 35 },
      { x: 1213, y: 510 },
      { x: 34, y: 510 },
      { x: 1213, y: 35 }
    ]
    const defaultAnchorPoints: [number, number][] = [
      [0.5, 1],
      [0.5, 0],
      [0.5, 1],
      [0.5, 0],
      [1, 0.5],
      [0, 0.5],
      [1, 0.5],
      [0, 0.5],
      [1, 0.5],
      [0, 0.5]
    ]

    acsServerNodes.forEach((node, index) => {
      const { x, y } = defaultPoints[index]
      node.x = x
      node.y = y
      node.anchorPoints = [defaultAnchorPoints[index]]
    })
  }
})

G6.registerEdge('layout3Line', {
  draw: (cfg, group) => {
    const { startPoint, endPoint, target } = cfg!

    const { x: sx, y: sy } = startPoint!
    const { x: ex, y: ey } = endPoint!

    // 相同 x 或 y 的情况直线连线
    let path: object[] = [
      ['M', sx, sy],
      ['L', ex, ey]
    ]

    // 全定制连接
    switch (target) {
      case 'acsItem1':
      case 'acsItem2':
      case 'acsItem3':
      case 'acsItem4':
        if (ex > sx) {
          if (ey > sy) {
            path = [
              ['M', sx, sy],
              ['L', ex - 20, sy],
              ['Q', ex, sy, ex, sy + 20],
              ['L', ex, ey]
            ]
          } else {
            path = [
              ['M', sx, sy],
              ['L', ex - 20, sy],
              ['Q', ex, sy, ex, sy - 20],
              ['L', ex, ey]
            ]
          }
        } else {
          if (ey > sy) {
            path = [
              ['M', sx, sy],
              ['L', ex + 20, sy],
              ['Q', ex, sy, ex, sy + 20],
              ['L', ex, ey]
            ]
          } else {
            path = [
              ['M', sx, sy],
              ['L', ex + 20, sy],
              ['Q', ex, sy, ex, sy - 20],
              ['L', ex, ey]
            ]
          }
        }
        break
      case 'acsItem7':
      case 'acsItem8':
      case 'acsItem9':
      case 'acsItem10':
        if (ex > sx) { // 元素从左到右
          if (ey > sy) { // 元素从左到右，从下到上
            path = [
              ['M', sx, sy],
              ['L', ex - 40 - 20, sy],
              ['Q', ex - 40, sy, ex - 40, sy + 20],
              ['L', ex - 40, sy + 20],
              ['L', ex - 40, ey - 20],
              ['Q', ex - 40, ey, ex - 40 + 20, ey],
              ['L', ex, ey]
            ]
          } else if (ey < sy) { // 元素从左到右，从上到下
            path = [
              ['M', sx, sy],
              ['L', ex - 40 - 20, sy],
              ['Q', ex - 40, sy, ex - 40, sy - 20],
              ['L', ex - 40, sy - 20],
              ['L', ex - 40, ey + 20],
              ['Q', ex - 40, ey, ex - 40 + 20, ey],
              ['L', ex, ey]
            ]
          }
        } else if (ex < sx) { // 元素从右到左
          if (ey > sy) { // 元素从右到到，从下到上
            path = [
              ['M', sx, sy],
              ['L', ex + 40 + 20, sy],
              ['Q', ex + 40, sy, ex + 40, sy + 20],
              ['L', ex + 40, sy + 20],
              ['L', ex + 40, ey - 20],
              ['Q', ex + 40, ey, ex + 40 - 20, ey],
              ['L', ex, ey]
            ]
          } else if (ey < sy) { // 元素从右到左，从上到下
            path = [
              ['M', sx, sy],
              ['L', ex + 40 + 20, sy],
              ['Q', ex + 40, sy, ex + 40, sy - 20],
              ['L', ex + 40, sy - 20],
              ['L', ex + 40, ey + 20],
              ['Q', ex + 40, ey, ex + 40 - 20, ey],
              ['L', ex, ey]
            ]
          }
        }
        break
      default:
        path = [
          ['M', sx, sy],
          ['L', ex, ey]
        ]
        break
    }

    const keyShape = group!.addShape('path', {
      attrs: {
        path,
        stroke: '#B7B7B7',
        lineWidth: 2,
        endArrow: {
          path: 'M 0,0 L -6,-6 M 0,0 L -6,6',
          stroke: '#B7B7B7',
          lineWidth: 2,
          fill: 'red'
        }
      }
    })

    return keyShape
  }
})
