import { storeToRefs } from 'pinia'
import { storePlayer } from '@renderer/pinia/player'
import { AudioOperatorHook } from '@renderer/hooks/audioHook'
import { MusicHook } from '@renderer/hooks/musicHook'
import { App } from 'ant-design-vue'
import type { MusicItem } from 'homeIndex'

export const PlayerHook = () => {
  const { message } = App.useApp()

  const { setAudioElementUrl, setAudioElementState, mediaParam, changeProgress } =
    AudioOperatorHook()

  const { getMusicUrl, getMusicLyric } = MusicHook()

  //导入store
  const PlayerStore = storePlayer()
  const {
    addMusicToPlayerList,
    // checkMusicByPlayList,
    addMusicToPlayerHisList,
    playerConfig,
    setNowPlayId,
    setPlayerShowState,
    nextMusic,
    prevMusic,
    setPlayerMode,
    setMusicLyric,
    musicLyric,
    setPlayerTranslateState,
    setHomeControllerShowState
  } = PlayerStore

  const { nowPlayData } = storeToRefs(PlayerStore)

  //选择并播放
  const checkMusicPlaying = async (data: MusicItem, openPlayer?: boolean) => {
    try {
      if (playerConfig.nowPlayId !== data.id) {
        const url = await getMusicUrl(data) //通过接口检查音乐可用后返回播放地址
        setAudioElementUrl(url) //设置播放器的url
        const lyric = await getMusicLyric(data) //获取歌词
        setPlayerTranslateState(false) //重置翻译状态
        setMusicLyric(lyric)
        await playPause(true) //成功开始播放
      }

      setNowPlayId(data)
      //将当前播放中的数据保持至状态管理中
      /**

      **/
      //添加到播放列表
      addMusicToPlayerList(data)
      addMusicToPlayerHisList(data) //同时添加到历史列表
      //显示播放页
      openPlayer && setPlayerShowState()
    } catch (error: any) {
      //
      console.log(error)
      message.error(error?.msg || '音乐不可播放')
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

  //下一首处理

  const nextPlay = () => {
    const data = nextMusic()
    if (data) {
      //继续播放
      console.log('下一首')
      checkMusicPlaying(data)
    } else {
      //结束播放\
      console.log('播放结束')
      playPause(false)
    }
  }

  //上一首
  const prevPlay = () => {
    const data = prevMusic()
    if (data) {
      //继续播放
      console.log('上一首')
      checkMusicPlaying(data)
    } else {
      //结束播放\
      console.log('播放结束')
      playPause(false)
    }
  }

  //播放结束处理

  Object.assign(mediaParam, {
    onended: () => {
      nextPlay()
    }
  })

  return {
    checkMusicPlaying,
    mediaParam,
    playPause,
    playerConfig,
    setPlayerShowState,
    changeProgress,
    setPlayerMode,
    nextPlay,
    prevPlay,
    nowPlayData,
    musicLyric,
    setPlayerTranslateState,
    setHomeControllerShowState
  }
}
