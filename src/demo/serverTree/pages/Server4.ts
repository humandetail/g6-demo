import G6, { GraphData, IGraph } from '@antv/g6'

import useAcsItem from '../components/AcsItem'
import useDeviceItem from '../components/DeviceItem'

import '../layout/Layout4'
import '../assets/styles.css'

import { AdditionalConfig, DeviceAdditionalConfig, DeviceType } from '../types';

const data: GraphData = (() => {
  const types: DeviceType[] = ['default', 'ac', 'door', 'lamp', 'machine', 'monitor', 'radio', 'screen'] 

  const nodes: any[] = Array.from({ length: 10 }, (_, k) => {
    const r = Math.random()
    return {
      id: `deviceItem${k + 1}`,
      type: 'DeviceItemShape',
      data: <DeviceAdditionalConfig>{
        id: k + 1,
        name: `测试ACS${k + 1}`,
        type: types[Math.floor(r * 8)],
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
    source: 'acsItem'
  }))

  nodes.unshift({
    id: 'acsItem',
    type: 'AcsItemShape',
    data: <AdditionalConfig>{
      title: `测试ACS`,
      port: `100086`,
      numberOfClients: 11,
      status: 1
    },
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
    height: window.innerHeight,
    layout: {
      type: 'Layout4'
    },
    defaultEdge: {
      type: 'layout4Line'
    }
  })

  useAcsItem(graph)
  useDeviceItem(graph)
  
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
