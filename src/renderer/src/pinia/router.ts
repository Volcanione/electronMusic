import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { RouteLocationNormalizedLoaded } from 'vue-router'
import router from '@renderer/router'
import { cloneDeep } from 'lodash'
export const storeRouter = defineStore('historyRouter', () => {
  const historyRoute: Array<RouteLocationNormalizedLoaded> = reactive([])

  /*************  ✨ Codeium Command ⭐  *************/
  /**
   * addHistoryRoute
   * @description  add route to historyRoute
   * @param {RouteLocationNormalizedLoaded} route vue-router route
   * @example
   * addHistoryRoute(route)
   */
  /******  2b9b337f-96a2-4a2e-9d41-4bac94a9b1df  *******/
  const addHistoryRoute = (r: RouteLocationNormalizedLoaded) => {
    const route = cloneDeep(r)
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
