import G6, { NodeConfig } from '@antv/g6'

G6.registerLayout('Layout2', {
  getDefaultCfg () {
    return {}
  },

  execute () {
    const nodes = this.nodes as NodeConfig[]
    const edges = this.edges

    const platformNode = nodes.find(item => item.id === 'platformItem')
    const serverNode = nodes.find(item => item.id === 'serverItem')

    if (platformNode) {
      platformNode.x = 32
      platformNode.y = 197
      platformNode.anchorPoints = [[1, 0.5]]
    }

    if (serverNode) {
      serverNode.x = 437
      serverNode.y = 312
    }

    const acsServerNodes = nodes.filter(item => item.id !== 'platformItem' && item.id !== 'serverItem')

    // 采用绝对定位布局
    const defaultPoints: { x: number, y: number }[] = [
      { x: 391, y: 35 },
      { x: 391, y: 510 },
      { x: 803, y: 35 },
      { x: 803, y: 510 },
      { x: 1215, y: 155 },
      { x: 1215, y: 390 }
    ]
    const defaultAnchorPoints: [number, number][] = [
      [0.5, 1],
      [0.5, 0],
      [0, 0.5],
      [0, 0.5],
      [0, 0.5],
      [0, 0.5]
    ]

    acsServerNodes.forEach((node, index) => {
      const { x, y } = defaultPoints[index]
      node.x = x
      node.y = y
      node.anchorPoints = [defaultAnchorPoints[index]]
    })

    // 定义第 4、5 条线的出入口
    edges[3].sourceAnchor = 1
    edges[3].targetAnchor = 3
    edges[4].sourceAnchor = 1
    edges[4].targetAnchor = 3
  }
})

G6.registerEdge('layout2Line', {
  draw: (cfg, group) => {
    const { startPoint, endPoint } = cfg!
    console.log(startPoint, cfg)

    const { x: sx, y: sy } = startPoint!
    const { x: ex, y: ey } = endPoint!

    // 相同 x 或 y 的情况直线连线
    let path: object[] = [
      ['M', sx, sy],
      ['L', ex, ey]
    ]

    if (Math.floor(ex) > Math.floor(sx)) { // 元素从左到右
      const haftX = (ex - sx) / 2
      if (Math.floor(ey) > Math.floor(sy)) { // 元素从左到右，从下到上
        path = [
          ['M', sx, sy],
          ['L', sx + haftX - 20, sy],
          ['Q', sx + haftX, sy, sx + haftX, sy + 20],
          ['L', sx + haftX, sy + 20],
          ['L', sx + haftX, ey - 20],
          ['Q', sx + haftX, ey, sx + haftX + 20, ey],
          ['L', ex, ey]
        ]
      } else if (Math.floor(ey) < Math.floor(sy)) { // 元素从左到右，从上到下
        path = [
          ['M', sx, sy],
          ['L', sx + haftX - 20, sy],
          ['Q', sx + haftX, sy, sx + haftX, sy - 20],
          ['L', sx + haftX, sy - 20],
          ['L', sx + haftX, ey + 20],
          ['Q', sx + haftX, ey, sx + haftX + 20, ey],
          ['L', ex, ey]
        ]
      }
    } else if (Math.floor(ex) < Math.floor(sx)) { // 元素从右到左
      const haftX = (sx - ex) / 2
      if (Math.floor(ey) > Math.floor(sy)) { // 元素从右到到，从下到上
        path = [
          ['M', sx, sy],
          ['L', sx - haftX + 20, sy],
          ['Q', sx - haftX, sy, sx - haftX, sy + 20],
          ['L', sx - haftX, sy + 20],
          ['L', sx - haftX, ey - 20],
          ['Q', sx - haftX, ey, sx - haftX - 20, ey],
          ['L', ex, ey]
        ]
      } else if (Math.floor(ey) < Math.floor(sy)) { // 元素从右到左，从上到下
        path = [
          ['M', sx, sy],
          ['L', sx - haftX + 20, sy],
          ['Q', sx - haftX, sy, sx - haftX, sy - 20],
          ['L', sx - haftX, sy - 20],
          ['L', sx - haftX, ey + 20],
          ['Q', sx - haftX, ey, sx - haftX - 20, ey],
          ['L', ex, ey]
        ]
      }
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
