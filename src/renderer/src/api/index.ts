import request from '@renderer/utils/request'
//获取banner
export function Banner(data: any = {}) {
  return request({ url: '/banner', method: 'post', data })
}
