declare module 'homeIndex' {
  import type { Dayjs } from 'dayjs'
  type BannerItem = {
    imageUrl: string
  }
  type SongItem = {
    alg: string
    canDislike: boolean
    copywriter: string
    highQuality: boolean
    id: number
    name: string
    picUrl: string
    playCount: number
    trackCount: number
    trackNumberUpdateTime: Dayjs
    type: number
  }

  type MusicItem = {
    alg: string
    canDislike: boolean
    copywriter: any
    id: number
    name: string
    picUrl: string
    song: any
    trackNumberUpdateTime: any
    type: number
  }
}
