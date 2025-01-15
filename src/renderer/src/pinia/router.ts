import { defineStore } from 'pinia'
import { reactive } from 'vue'
import type { RouteLocationNormalized } from 'vue-router'
import router from '@renderer/router'
import { cloneDeep } from 'lodash'
export const storeRouter = defineStore('historyRouter', () => {
  const historyRoute: Array<RouteLocationNormalized> = reactive([])

  const addHistoryRoute = (r: RouteLocationNormalized) => {
    const route = cloneDeep(r)
    // console.log(route, 11)
    // console.log(window.history.state.replaced)
    if (!window.history.state.replaced) {
      historyRoute.unshift(route)
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
      await router.go(-(historyRoute.length + 1))
      historyRoute.length = 0
    } else {
      const idx = historyRoute.findIndex((item) => item.path === path)
      // console.log(
      //   historyRoute.map((item) => item.name),
      //   idx
      // )
      await router.go(-idx)
    }
  }

  return { historyRoute, addHistoryRoute, removeHistoryRoute, routerBack }
})
