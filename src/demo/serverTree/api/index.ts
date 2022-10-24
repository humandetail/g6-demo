import { ServerStatus } from '../types'

export const setStatus = (status: ServerStatus) => {
  return new Promise<{ code: number, data: ServerStatus }>(resolve => {
    setTimeout(() => {
      resolve({
        code: 200,
        data: status
      })
    }, 2000)
  })
}