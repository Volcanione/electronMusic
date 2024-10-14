import { reactive } from 'vue'
import { Banner } from '@renderer/api/index'
import { BannerItem } from 'homeIndex'

export const IndexHook = () => {
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
  return {
    getBanner,
    bannerList
  }
}
