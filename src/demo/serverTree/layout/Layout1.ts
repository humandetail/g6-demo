import G6, { NodeConfig } from '@antv/g6'

G6.registerLayout('Layout1', {
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
    const { width, height } = this

    const [centerNodeWidth, centerNodeHeight] = [260, 306]
    // const [serverNodeWidth, serverNodeHeight ] = [220, 76]

    let [centerX, centerY] = [width / 2, height / 2]

    const nodes = this.nodes as NodeConfig[]
    const edges = this.edges

    console.log(nodes, edges, width, height)

    const centerNode = nodes.find(item => item.id === 'platformItem')

    if (centerNode) {
      centerNode.x = centerX - centerNodeWidth / 2
      centerNode.y = centerY - centerNodeHeight / 2
    }

    const serverNodes = nodes.filter(item => item.id !== 'platformItem')

    // 采用绝对定位布局
    // const defaultPoints: { x: number, y: number }[] = [
    //   { x: 100, y: 10 },
    //   { x: 50, y: (height - 20 - serverNodeHeight) / 3 },
    //   { x: 50, y: ((height - 20 - serverNodeHeight) / 3) * 2 },
    //   { x: 100, y: height - 10 - serverNodeHeight },
    //   { x: centerX - serverNodeWidth / 2, y: 10 },
    //   { x: centerX - serverNodeWidth / 2, y: height - 10 - serverNodeHeight },
    //   { x: width - 100 - serverNodeWidth, y: 10 },
    //   { x: width - 50 - serverNodeWidth, y: (height - 20 - serverNodeHeight) / 3 },
    //   { x: width - 50 - serverNodeWidth, y: ((height - 20 - serverNodeHeight) / 3) * 2 },
    //   { x: width - 100 - serverNodeWidth, y: height - 10 - serverNodeHeight }
    // ]
    const defaultPoints: { x: number, y: number }[] = [
      { x: 210, y: 48 },
      { x: 60, y: 224 },
      { x: 60, y: 400 },
      { x: 210, y: 576 },
      { x: 670, y: 48 },
      { x: 670, y: 576 },
      { x: 1130, y: 48 },
      { x: 1280, y: 224 },
      { x: 1280, y: 400 },
      { x: 1130, y: 576 }
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

    switch (serverNodes.length) {
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
        break
      case 4:
        points = [defaultPoints[0], defaultPoints[3], defaultPoints[6], defaultPoints[9]]
        anchorPoints = [defaultAnchorPoints[0], defaultAnchorPoints[3], defaultAnchorPoints[6], defaultAnchorPoints[9]]
        break
      case 5:
        points = [defaultPoints[0], defaultPoints[3], defaultPoints[6], defaultPoints[9], defaultPoints[4]]
        anchorPoints = [defaultAnchorPoints[0], defaultAnchorPoints[3], defaultAnchorPoints[6], defaultAnchorPoints[9], defaultAnchorPoints[4]]
        break
      case 6:
        points = [defaultPoints[0], defaultPoints[3], defaultPoints[6], defaultPoints[9], defaultPoints[4], defaultPoints[5]]
        anchorPoints = [defaultAnchorPoints[0], defaultAnchorPoints[3], defaultAnchorPoints[6], defaultAnchorPoints[9], defaultAnchorPoints[4], defaultAnchorPoints[5]]
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
        break
    }

    serverNodes.forEach((node, index) => {
      const { x, y } = points[index]
      node.x = x
      node.y = y
      node.anchorPoints = [anchorPoints[index]]
    })
  }
})

G6.registerEdge('layout1Line', {
  draw: (cfg, group) => {
    const { startPoint, endPoint } = cfg!

    const { x: sx, y: sy } = startPoint!
    const { x: ex, y: ey } = endPoint!

    // 相同 x 或 y 的情况直线连线
    let path: object[] = [
      ['M', sx, sy],
      ['L', ex, ey]
    ]

    if (ex > sx) { // 元素从左到右
      const haftX = (ex - sx) / 2
      if (ey > sy) { // 元素从左到右，从下到上
        path = [
          ['M', sx, sy],
          ['L', sx + haftX - 20, sy],
          ['Q', sx + haftX, sy, sx + haftX, sy + 20],
          ['L', sx + haftX, sy + 20],
          ['L', sx + haftX, ey - 20],
          ['Q', sx + haftX, ey, sx + haftX + 20, ey],
          ['L', ex, ey]
        ]
      } else if (ey < sy) { // 元素从左到右，从上到下
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
    } else if (ex < sx) { // 元素从右到左
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
      } else if (ey < sy) { // 元素从右到左，从上到下
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
