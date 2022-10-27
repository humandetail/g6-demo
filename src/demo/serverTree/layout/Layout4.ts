import G6, { NodeConfig } from '@antv/g6'

G6.registerLayout('Layout4', {
  getDefaultCfg () {
    return {
      // center: [0, 0], // 布局的中心
      // biSep: 100, // 两部分的间距
      // nodeSep: 20, // 同一部分的节点间距
      // direction: 'horizontal', // 两部分的分布方向
      // nodeSize: 20, // 节点大小
    }
  },

  execute () {
    const nodes = this.nodes as NodeConfig[]
    const edges = this.edges
    console.log(edges);

    const centerNode = nodes.find(item => item.id === 'acsItem')

    if (centerNode) {
      centerNode.x = 623
      centerNode.y = 273
    }

    const deviceNodes = nodes.filter(item => item.id !== 'acsItem')

    // 采用绝对定位布局
    const defaultPoints: { x: number, y: number }[] = [
      { x: 264, y: 36 },
      { x: 90, y: 212 },
      { x: 90, y: 388 },
      { x: 264, y: 564 },
      { x: 664, y: 36 },
      { x: 664, y: 564 },
      { x: 1064, y: 36 },
      { x: 1240, y: 212 },
      { x: 1240, y: 388 },
      { x: 1064, y: 564 }
    ]
    const defaultAnchorPoints: [number, number][] = [
      [1, 0.5],
      [1, 0.5],
      [1, 0.5],
      [1, 0.5],
      [0.5, 1],
      [0.5, 0],
      [0, 0.5],
      [0, 0.5],
      [0, 0.5],
      [0, 0.5]
    ]

    let points: { x: number, y: number }[] = []
    let anchorPoints: [number, number][] = [
      [0.5, 0],
      [1, 0.5],
      [0.5, 1],
      [0, 0.5]
    ]

    switch (deviceNodes.length) {
      case 1:
        points = [defaultPoints[4]]
        anchorPoints = [defaultAnchorPoints[4]]
        break
      case 2:
        points = [defaultPoints[4], defaultPoints[5]]
        anchorPoints = [defaultAnchorPoints[4], defaultAnchorPoints[5]]
        break
      case 3:
        points = [defaultPoints[0], defaultPoints[3], defaultPoints[6]]
        anchorPoints = [defaultAnchorPoints[0], defaultAnchorPoints[3], defaultAnchorPoints[6]]
        edges[2].sourceAnchor = 1
        break
      case 4:
        points = [defaultPoints[0], defaultPoints[3], defaultPoints[6], defaultPoints[9]]
        anchorPoints = [defaultAnchorPoints[0], defaultAnchorPoints[3], defaultAnchorPoints[6], defaultAnchorPoints[9]]
        edges[2].sourceAnchor = 1
        break
      case 5:
        points = [defaultPoints[0], defaultPoints[3], defaultPoints[6], defaultPoints[9], defaultPoints[4]]
        anchorPoints = [defaultAnchorPoints[0], defaultAnchorPoints[3], defaultAnchorPoints[6], defaultAnchorPoints[9], defaultAnchorPoints[4]]
        edges[2].sourceAnchor = 1
        break
      case 6:
        points = [defaultPoints[0], defaultPoints[3], defaultPoints[6], defaultPoints[9], defaultPoints[4], defaultPoints[5]]
        anchorPoints = [defaultAnchorPoints[0], defaultAnchorPoints[3], defaultAnchorPoints[6], defaultAnchorPoints[9], defaultAnchorPoints[4], defaultAnchorPoints[5]]
        edges[2].sourceAnchor = 1
        break
      default:
        points = [
          defaultPoints[0], defaultPoints[3], defaultPoints[6], defaultPoints[9], defaultPoints[4], defaultPoints[5],
          defaultPoints[1], defaultPoints[8], defaultPoints[2], defaultPoints[7]
        ]
        anchorPoints = [
          defaultAnchorPoints[0], defaultAnchorPoints[3], defaultAnchorPoints[6], defaultAnchorPoints[9], defaultAnchorPoints[4], defaultAnchorPoints[5],
          defaultAnchorPoints[1], defaultAnchorPoints[8], defaultAnchorPoints[2], defaultAnchorPoints[7]
        ]
        edges[2].sourceAnchor = 1
        break
    }

    deviceNodes.forEach((node, index) => {
      const { x, y } = points[index]
      node.x = x
      node.y = y
      node.anchorPoints = [anchorPoints[index]]
    })
  }
})

G6.registerEdge('layout4Line', {
  draw: (cfg, group) => {
    const { startPoint, endPoint } = cfg!

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
      if (ey > sy) { // 元素从右到到，从下到上
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
