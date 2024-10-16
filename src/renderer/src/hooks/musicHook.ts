import { reactive } from 'vue'
import { CheckMusic, MusicUrl } from '@renderer/api/index'
import { App } from 'ant-design-vue'

export const MusicHook = () => {
  const { message } = App.useApp()
  const getMusicUrl = async (param: { id: number }) => {
    try {
      //
      const { success } = await CheckMusic(param)
      if (!success) {
        const error = { code: 0, msg: '音乐不可用' }
        message.error(error.msg)
        return Promise.reject(error)
      }
      const { data } = await MusicUrl({ ...param, level: 'hires' })
      const url = data ? data[0].url : ''
      return url
    } catch (error) {
      //
      return Promise.reject(error)
    }
  }
  return { getMusicUrl }
}
