import { defineStore } from 'pinia'
import { ref, reactive, computed, nextTick } from 'vue'
import type { PlayerConfig } from 'player'

export const storePlayer = defineStore('player', () => {
  const playerConfig = reactive({}) //播放器配置
  const playerList = reactive([]) //播放列表

  //添加歌曲并播放
  const addMusicPlating = (data) => {
    console.log(data)
  }

  return {
    playerConfig,
    addMusicPlating
  }
})
