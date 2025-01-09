import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { RouteLocationNormalizedLoaded } from 'vue-router'

export const storeRouter = defineStore('historyRouter', () => {
  const historyRoute: Array<RouteLocationNormalizedLoaded> = reactive([])

  const addHistoryRoute = (route: RouteLocationNormalizedLoaded) => {
    console.log(route)
    historyRoute.unshift(route)
  }

  const removeHistoryRoute = () => {
    historyRoute.shift()
  }

  return { historyRoute, addHistoryRoute, removeHistoryRoute }
})
