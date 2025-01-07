declare module 'player' {
  import type { BScrollInstance } from '@better-scroll/core'
  type PlayerConfig = {
    playerShow: boolean //播放页展示
    playerMode: 'alone' | 'list' | 'random' //播放模式
    nowPlayId?: number //当前播放id
    translateState?: boolean //翻译歌词
    initBs?: (Bs: BScrollInstance) => void
    homeControllerShow: boolean //首页控制器
  }

  type MusicLyric = {
    Lyric?: string //原歌词
    tLyric?: string //翻译歌词
  }
}
