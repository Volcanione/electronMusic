import client from '@renderer/utils/client'

export function Test() {
  return client({ url: '/client/users', method: 'get' })
}
