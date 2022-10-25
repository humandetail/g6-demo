import G6 from '@antv/g6'

import data from './config/data'
import usePlatformItem from './components/PlatformItem'
import useAcsItem from './components/AcsItem'
import useServerItem from './components/ServerItem'

import './assets/styles.css'

const graph = new G6.Graph({
  container: 'app',
  renderer: 'svg',
  width: window.innerWidth,
  height: window.innerHeight
})

usePlatformItem(graph)
useAcsItem(graph)
useServerItem(graph)

graph.data(data)
graph.render()
