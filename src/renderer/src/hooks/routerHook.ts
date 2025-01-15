import { storeRouter } from '@renderer/pinia/router'
// import { PageRouteConfig } from '@renderer/utils/index'

export const RouterHook = () => {
  // const { router } = PageRouteConfig()
  const { historyRoute, addHistoryRoute, removeHistoryRoute, routerBack } = storeRouter()

  return {
    historyRoute,
    addHistoryRoute,
    removeHistoryRoute,
    routerBack
  }
}
