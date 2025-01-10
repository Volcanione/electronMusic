import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { RouteLocationNormalizedLoaded } from 'vue-router'
import router from '@renderer/router'
export const storeRouter = defineStore('historyRouter', () => {
  const historyRoute: Array<RouteLocationNormalizedLoaded> = reactive([])

  const addHistoryRoute = (route: RouteLocationNormalizedLoaded) => {
    // console.log(route, 11)
    // console.log(window.history.state.replaced)
    if (!window.history.state.replaced) {
      return historyRoute.unshift(route)
    } else {
      // console.log(historyRoute.map((item) => item.name))
      const idx = historyRoute.findIndex((item) => item.name === route.name)
      console.log(idx)
      if (idx === -1) {
        historyRoute.length = 0
      }
      if (idx === 0) {
        historyRoute.splice(idx, 1, route)
      }
    }
  }

  const removeHistoryRoute = () => {
    historyRoute.shift()
  }

  const routerBack = async (path?: string) => {
    if (!path) {
      await router.replace('/index')
      historyRoute.length = 0
    }
  }

  return { historyRoute, addHistoryRoute, removeHistoryRoute, routerBack }
})
