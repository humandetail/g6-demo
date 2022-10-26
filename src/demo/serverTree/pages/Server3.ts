import G6, { GraphData, IGraph } from '@antv/g6'

import useServerItem from '../components/ServerItem'
import useAcsItem from '../components/AcsItem'

import '../assets/styles.css'
import { AdditionalConfig } from '../types';

const data: GraphData = (() => {
  const nodes: any[] = Array.from({ length: 10 }, (_, k) => {
    const r = Math.random()
    return {
      id: `acsItem${k + 1}`,
      type: 'AcsItemShape',
      data: <AdditionalConfig>{
        title: `测试ACS${k + 1}`,
        port: `1000${k}`,
        numberOfClients: 11 + k,
        status: r > 0.7 ? 1 : r > 0.4 ? 2 : 3
      },
      anchorPoints: [
        [0.5, 0],
        [1, 0.5],
        [0.5, 1],
        [0, 0.5]
      ]
    }
  })

  const edges = nodes.map(node => ({
    target: node.id,
    source: 'serverItem'
  }))

  nodes.unshift({
    id: 'serverItem',
    label: '192.168.0.1',
    type: 'ServerItemShape',
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
    width: window.innerWidth,
    height: window.innerHeight
  })

  useServerItem(graph)
  useAcsItem(graph)
  
  graph.data(data)
  graph.render()

  return graph
}

let graph: IGraph | null = null

export default {
  render () {
    graph = render()
  },

  destroy () {
    graph?.destroy()
  }
}
