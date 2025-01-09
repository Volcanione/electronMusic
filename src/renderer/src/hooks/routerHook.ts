import { storeRouter } from '@renderer/pinia/router'

export const RouterHook = () => {
  const { historyRoute, addHistoryRoute, removeHistoryRoute } = storeRouter()
  return {
    historyRoute,
    addHistoryRoute,
    removeHistoryRoute
  }
}
