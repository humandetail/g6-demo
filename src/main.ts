import './style.css'

import {
  Home,
  Server2,
  Server3,
  Server4
} from './demo/serverTree'

let currentInstance: any = null

const hash = location.hash.slice(1)
render(hash)

function render (hash: string) {
  console.log(hash, Home)
  switch (hash) {
    case 'server':
      currentInstance?.destroy && currentInstance.destroy()
      Home.render()
      currentInstance = Home
      break
    case 'server-2':
      currentInstance?.destroy && currentInstance.destroy()
      Server2.render()
      currentInstance = Server2
      break
    case 'server-3':
      currentInstance?.destroy && currentInstance.destroy()
      Server3.render()
      currentInstance = Server3
      break
    case 'server-4':
      currentInstance?.destroy && currentInstance.destroy()
      Server4.render()
      currentInstance = Server4
      break
    default:
      console.log('Hello world')
      break
  }
}

window.addEventListener('hashchange', (e: HashChangeEvent) => {
  console.log(e)
  const hash = e.newURL.split('#')[1]
  render(hash)
})
