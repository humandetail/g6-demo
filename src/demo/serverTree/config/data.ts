import { GraphData } from "@antv/g6"
import { AdditionalConfig, DeviceAdditionalConfig } from "../types"

const data: GraphData = {
  nodes: [
    {
      id: 'platformItem',
      x: 10,
      y: 200,
      label: 'ACS监控平台',
      type: 'PlatformItemShape'
    },
    {
      id: 'serverItem1',
      x: 300,
      y: 200,
      label: '192.168.101.899',
      type: 'ServerItemShape'
    },
    {
      id: 'acsItem1',
      x: 300,
      y: 340,
      label: '一个说明',
      type: 'AcsItemShape',
      data: <AdditionalConfig>{
        title: '测试ACS1',
        port: '10086',
        numberOfClients: 11,
        status: 1
      }
    },
    {
      id: 'deviceItem1',
      x: 700,
      y: 200,
      type: 'DeviceItemShape',
      data: <DeviceAdditionalConfig>{
        id: '1',
        name: '智能设备_超长名称测试',
        type: 'default',
        status: 1
      }
    }
  ],
  edges: [
    {
      id: 'edge1',
      target: 'serverItem1',
      source: 'platformItem'
    },
    {
      id: 'edge2',
      target: 'acsItem1',
      source: 'serverItem1'
    },
    {
      id: 'edge3',
      target: 'deviceItem1',
      source: 'acsItem1'
    }
  ]
}

export default data
