import { storePlayer } from '@renderer/pinia/player'
import { AudioOperatorHook } from '@renderer/hooks/audioHook'
import { MusicHook } from '@renderer/hooks/musicHook'
import { App } from 'ant-design-vue'
import type { MusicItem } from 'homeIndex'

export const PlayerHook = () => {
  const { message } = App.useApp()

  const { setAudioElementUrl, setAudioElementState, mediaParam } = AudioOperatorHook()
  const { getMusicUrl } = MusicHook()

  const { addPlayerList, checkMusicByPlayList, playerConfig, setNowPlayId, setPlayerShowState } =
    storePlayer()

  //选择并播放
  const checkMusicPlaying = async (data: MusicItem) => {
    try {
      if (playerConfig.nowPlayId !== data.id) {
        const url = await getMusicUrl(data) //通过接口检查音乐可用后返回播放地址
        setAudioElementUrl(url) //设置播放器的url
        await playPause(true) //成功开始播放
      }

      setNowPlayId(data)
      //将当前播放中的数据保持至状态管理中
      /**

      **/
      //添加到播放列表
      addPlayerList(data)
      //显示播放页
      setPlayerShowState()
    } catch (error: any) {
      //
      console.log(error)
      message.error(error?.msg || '未知错误')
    }
  }

  //播放暂停
  const playPause = async (state?: boolean) => {
    //state true 播放，false 暂停,不传根据当前音乐选择
    try {
      await setAudioElementState(state)
      console.log('操作成功')
    } catch (error) {
      //
      return Promise.reject(error)
    }
  }

  return { checkMusicPlaying, mediaParam, playPause, playerConfig, setPlayerShowState }
}
