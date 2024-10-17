import { defineStore } from 'pinia'
import { ref, reactive, computed, nextTick } from 'vue'
import type { PlayerConfig } from 'player'
import type { MusicItem } from 'homeIndex'

export const storePlayer = defineStore('player', () => {
  const playerConfig: PlayerConfig = reactive({ playerShow: false, playerMode: 'list' }) //播放器配置
  const MODELIST: Array<PlayerConfig['playerMode']> = ['alone', 'list', 'random'] //播放模式
  console.log(MODELIST)
  const playerList = reactive([]) as Array<MusicItem> //播放列表

  //列表是否存在添加歌曲

  const checkMusicByPlayList: (data: MusicItem) => MusicItem | undefined = (data) => {
    return playerList.find((item) => item.id === data.id)
  }

  //添加歌曲
  const addPlayerList = (data: MusicItem) => {
    if (checkMusicByPlayList(data)) {
      return
    }
    playerList.unshift(data)
  }

  //设置当前播放id
  const setNowPlayId = (data: MusicItem) => {
    Object.assign(playerConfig, {
      nowPlayId: data.id
    })
  }

  //设置playerShow页面现实隐藏

  const setPlayerShowState = (state: boolean = true) => {
    Object.assign(playerConfig, {
      playerShow: state
    })
  }

  return {
    playerConfig,
    addPlayerList,
    playerList,
    checkMusicByPlayList,
    setNowPlayId,
    setPlayerShowState
  }
})
