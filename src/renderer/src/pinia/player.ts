import { defineStore } from 'pinia'
import { reactive, computed, ref } from 'vue'
import { findIndex } from 'lodash'
import { useRandomArrayItem } from '@renderer/utils/index'
import type { PlayerConfig, MusicLyric } from 'player'
import type { MusicItem } from 'homeIndex'

export const storePlayer = defineStore('player', () => {
  const playerConfig: PlayerConfig = reactive({ playerShow: false, playerMode: 'list' }) //播放器配置
  const MODELIST: Array<PlayerConfig['playerMode']> = ['alone', 'list', 'random'] //播放模式
  console.log(MODELIST)
  const playerList = reactive([]) as Array<MusicItem> //播放列表
  const playerHisList = reactive([]) as Array<MusicItem> //已经播放过的列表

  //歌曲歌词

  const musicLyric = reactive({
    Lyric: '', //原歌词
    tLyric: '' //翻译歌词
  }) as MusicLyric

  //列表是否存在添加歌曲

  const checkMusicByPlayList: (data: MusicItem) => MusicItem | undefined = (data) => {
    return playerList.find((item) => item.id === data.id)
  }

  //历史列表是否存在添加歌曲
  const checkMusicByPlayHisList: (data: MusicItem) => MusicItem | undefined = (data) => {
    return playerHisList.find((item) => item.id === data.id)
  }

  //添加当前歌曲歌曲
  const addMusicToPlayerList = (data: MusicItem) => {
    if (checkMusicByPlayList(data)) {
      return
    }
    playerList.unshift(data)
  }

  //播放过的添加到历史列表
  const addMusicToPlayerHisList = (data: MusicItem) => {
    if (checkMusicByPlayHisList(data)) {
      return
    }
    playerHisList.unshift(data)
  }

  //设置当前播放id
  const oldPlayId = ref<number | undefined>()
  const setNowPlayId = (data?: MusicItem) => {
    if (!data) {
      oldPlayId.value = playerConfig.nowPlayId
    }
    Object.assign(playerConfig, {
      nowPlayId: data ? data.id : ''
    })
  }

  //设置playerShow页面现实隐藏

  const setPlayerShowState = (state: boolean = true) => {
    Object.assign(playerConfig, {
      playerShow: state
    })
  }
  //切换播放模式
  const setPlayerMode = () => {
    console.log(playerConfig.playerMode, MODELIST)
    const idx = findIndex(
      MODELIST,
      (i: PlayerConfig['playerMode']) => i === playerConfig.playerMode
    )

    Object.assign(playerConfig, {
      playerMode: MODELIST[idx < MODELIST.length - 1 ? idx + 1 : 0]
    })
  }

  const filterPlayerList = computed(() => {
    return playerList.filter((item) => item.id !== playerConfig.nowPlayId)
  })

  //下一首
  const { getRandomItem, reset } = useRandomArrayItem(filterPlayerList)
  const nextMusic: () => MusicItem | undefined = () => {
    if (!playerList.length) {
      return
    }
    const idx = findIndex(playerList, ['id', playerConfig.nowPlayId])

    //清空当前播放的id
    setNowPlayId()

    //返回下一首数据
    let data: MusicItem
    switch (playerConfig.playerMode) {
      case 'alone':
        return playerList[idx]
      case 'list':
        return playerList[idx === playerList.length - 1 ? 0 : idx + 1]
      case 'random':
        try {
          data = getRandomItem() as MusicItem
        } catch (error) {
          reset()
          data = getRandomItem() as MusicItem
        }

        return data
    }
  }

  //上一首
  const prevMusic: () => MusicItem | undefined = () => {
    if (!playerHisList.length) {
      return
    }
    const idx = findIndex(playerHisList, ['id', playerConfig.nowPlayId])
    //清空当前播放的id
    setNowPlayId()

    //返回下一首数据
    return playerList[idx === 0 ? playerHisList.length - 1 : idx - 1]
  }

  //当前播放的歌曲数据
  const nowPlayData = computed(() => {
    if (!playerConfig.nowPlayId) {
      return playerList.find((item) => item.id === oldPlayId.value) || undefined
    }
    return playerList.find((item) => item.id === playerConfig.nowPlayId) as MusicItem
  })

  //设置歌词

  const setMusicLyric = async (data: MusicLyric) => {
    Object.assign(musicLyric, data)
  }

  return {
    playerConfig,
    addMusicToPlayerList,
    playerList,
    checkMusicByPlayList,
    setNowPlayId,
    setPlayerShowState,
    setPlayerMode,
    nextMusic,
    prevMusic,
    addMusicToPlayerHisList,
    playerHisList,
    nowPlayData,
    musicLyric,
    setMusicLyric
  }
})
