import { ref, reactive } from 'vue'
import { DefaultSearch, HotSearch } from '@renderer/api/index'

export const SearchHook = () => {
  const defaultSearch = ref('')
  const getDefaultSearch = async () => {
    try {
      const {
        data: { showKeyword }
      } = await DefaultSearch()
      console.log(showKeyword)
      defaultSearch.value = showKeyword
    } catch (error) {
      //
    }
  }

  const search = (e: string) => {
    console.log(e)
  }

  const HotSearchList = reactive([])

  const getHotSearch = async () => {
    try {
      const { data } = await HotSearch()
      console.log(data)
      HotSearchList.length = 0
      HotSearchList.push(...data)
    } catch (error) {
      //
    }
  }

  return {
    getDefaultSearch,
    defaultSearch,
    search,
    getHotSearch,
    HotSearchList
  }
}
