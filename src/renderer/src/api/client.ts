import client from '@renderer/utils/client'

export function Test() {
  return client({ url: '/client/users', method: 'get' })
}

export function DeepSeekChart(data: any = {}) {
  return client({ url: '/client/deepseek-chart', method: 'post', data })
}
