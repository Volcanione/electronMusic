import { reactive } from 'vue'
import { Banner, SuggestedSongList, SuggestedMusic } from '@renderer/api/index'
import type { BannerItem, SongItem, MusicItem } from 'homeIndex'
// import { storePlayer } from '@renderer/pinia/player'

export const IndexHook = () => {
  //banner
  const bannerList = reactive([]) as Array<BannerItem>
  const getBanner = async () => {
    try {
      const { banners } = await Banner()
      bannerList.length = 0
      banners && bannerList.push(...banners)
    } catch (error) {
      //
    }
  }

  //推荐歌单
  const suggestedSongList = reactive([]) as Array<SongItem>
  const suggestedSongListParam = reactive({ limit: 10 })
  const getSuggestedSongList = async () => {
    try {
      const { result } = await SuggestedSongList(suggestedSongListParam)
      suggestedSongList.length = 0
      suggestedSongList.push(...result)
    } catch (error) {
      //
    }
  }

  //推荐新歌

  const suggestedMusic = reactive([]) as Array<MusicItem>
  const getSuggestedMusic = async () => {
    try {
      const { result } = await SuggestedMusic()
      suggestedMusic.length = 0
      suggestedMusic.push(...result)
    } catch (error) {
      //
    }
  }

  return {
    getBanner,
    bannerList,
    suggestedSongList,
    getSuggestedSongList,
    suggestedSongListParam,
    suggestedMusic,
    getSuggestedMusic
  }
}
