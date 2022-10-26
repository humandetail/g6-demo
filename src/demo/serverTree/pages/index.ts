import G6, { GraphData, IGraph } from '@antv/g6'

import usePlatformItem from '../components/PlatformItem'
import useServerItem from '../components/ServerItem'

import '../layout/Layout1'

import '../assets/styles.css'

const data: GraphData = (() => {
  const IPs = Array.from({ length: 10 }, (_, k) => {
    return `192.168.0.${k + 1}`
  })

  const nodes: any[] = IPs.map((ip, index) => ({
    id: `serverItem${index + 1}`,
    label: ip,
    type: 'ServerItemShape',
    anchorPoints: [
      [0.5, 0],
      [1, 0.5],
      [0.5, 1],
      [0, 0.5]
    ]
  }))

  const edges = nodes.map(node => ({
    target: node.id,
    source: 'platformItem'
  }))

  nodes.unshift({
    id: 'platformItem',
    label: 'ACS监控平台',
    type: 'PlatformItemShape',
    anchorPoints: [
      [0.5, 0],
      [1, 0.5],
      [0.5, 1],
      [0, 0.5]
    ]
  })
  
  return {
    nodes,
    edges
  }
})();

function render () {
  const graph = new G6.Graph({
    container: 'app',
    renderer: 'svg',
    width: 1560,
    height: 700,
    layout: {
      type: 'Layout1'
    },
    defaultEdge: {
      type: 'layout1Line'
    }
  })
  
  usePlatformItem(graph)
  useServerItem(graph)
  
  graph.data(data)
  graph.render()

  return graph
}

let graph: IGraph | null = null

export default {
  render () {
    graph = render()
    const scale = window.innerWidth / 1560
    graph.zoom(scale)
    graph.changeSize(window.innerWidth, window.innerHeight * scale)
  },

  destroy () {
    graph?.destroy()
  }
}
