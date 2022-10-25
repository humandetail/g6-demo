export const BtnBgConfig = {
  on: '#07C160',
  off: '#FA5151',
  reboot: '#FA9D3B',
  disabled: '#CCCCCC',
}

export const StatusConfig = {
  1: {
    background: 'rgba(82,196,26,0.4)',
    color: '#135200',
    text: '已启动'
  },
  2: {
    background: '#FFD1A0',
    color: '#7E4304',
    text: '状态异常'
  },
  3: {
    background: '#CCCCCC',
    color: '#7C7C7C',
    text: '未启动'
  },
}

export const deviceStatusConfig = {
  1: {
    text: '运行中',
    color: '#07C160',
    name: 'on'
  },
  2: {
    text: '已关闭',
    color: '#BABABA',
    name: 'off'
  },
  3: {
    text: '异常',
    color: '#FA9D3B',
    name: 'fault'
  },
  4: {
    text: '断开连接',
    color: '#FA5151',
    name: 'broken'
  }
}
