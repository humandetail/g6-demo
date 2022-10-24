import { GraphData } from "@antv/g6"
import { AdditionalConfig } from "../types"

const data: GraphData = {
  nodes: [{
    id: 'node1',
    x: 100,
    y: 200,
    label: '一个说明',
    type: 'serverItemShape',
    data: <AdditionalConfig>{
      title: '测试ACS1',
      port: '10086',
      numberOfClients: 11,
      status: 1
    }
 },{
    id: 'node2',
    x: 400,
    y: 400,
    label: '另一个说明',
    type: 'serverItemShape',
    data: <AdditionalConfig>{
      title: '测试ACS2',
      port: '10010',
      numberOfClients: 20,
      status: 3,
      loading: false
    }
 }],
  edges: [{
    id: 'edge1',
    target: 'node2',
    source: 'node1'
 }]
}

export default data
