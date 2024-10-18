import { computed, watch, reactive, Ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { RouteLocationNormalizedLoaded, Router } from 'vue-router'

type Query = {
  [propName: string]: any
}

type PageRouteConfigResultType = {
  route: RouteLocationNormalizedLoaded
  router: Router
} & Query
type PageRouteConfigType = (param?: string | Array<string>) => PageRouteConfigResultType

export const PageRouteConfig: PageRouteConfigType = (param: string | Array<string> = []) => {
  const route = useRoute()
  const router = useRouter()
  const query: Query = {}
  if (typeof param === 'string') {
    query[param] = computed(() => route.query[param])
  }

  if (param instanceof Array) {
    param.forEach((p) => {
      query[p] = computed(() => route.query[p])
    })
  }

  return {
    router,
    route,
    ...query
  }
}

interface RandomArrayItem<T> {
  getRandomItem: () => T | undefined
  reset: () => void
}

export function useRandomArrayItem<T>(initialArray: Ref<T[]>): RandomArrayItem<T> {
  // 创建一个响应式对象来存储原始数组和当前状态
  const state = reactive({
    originalArray: [...initialArray.value], // 原始数组副本
    remainingItems: [...initialArray.value], // 剩余未选项
    selectedItems: [] as T[] // 已选项
  }) as any

  // 监听传入的reactive数组的变化，同步更新状态
  watch(
    initialArray,
    (newVal) => {
      state.originalArray = [...newVal]
      state.remainingItems = [...newVal]
      state.selectedItems = []
    },
    { deep: true }
  )

  // 定义获取随机项的函数
  function getRandomItem(): T {
    if (!state.remainingItems.length) {
      throw new Error('No more items to select. Please reset.')
    }

    const randomIndex = Math.floor(Math.random() * state.remainingItems.length)
    const [selectedItem] = state.remainingItems.splice(randomIndex, 1)
    state.selectedItems.push(selectedItem)

    return selectedItem
  }

  // 重置函数
  function reset(): void {
    state.remainingItems = [...state.originalArray]
    state.selectedItems = []
  }

  return {
    getRandomItem,
    reset
  }
}

export default useRandomArrayItem
