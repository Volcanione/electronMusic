import {} from 'vue'
import { CheckMusic, MusicUrl, MusicLyric } from '@renderer/api/index'
import type { MusicItem } from 'homeIndex'

export const MusicHook = () => {
  const getMusicUrl = async (param: MusicItem) => {
    try {
      //
      const { success } = await CheckMusic(param)
      if (!success) {
        const error = { code: 0, msg: '音乐不可用' }
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

  const getMusicLyric = async (param: MusicItem) => {
    try {
      const { lrc, tlyric } = await MusicLyric(param)
      const Lyric = lrc?.lyric || ''
      const tLyric = tlyric?.lyric || ''
      //
      return {
        Lyric,
        tLyric
      }
    } catch (error) {
      //
      return {
        Lyric: '',
        tLyric: ''
      }
    }
  }

  return { getMusicUrl, getMusicLyric }
}
