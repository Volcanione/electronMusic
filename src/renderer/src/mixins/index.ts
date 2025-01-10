import { App } from 'vue'
import dayjs from '@renderer/utils/dayjs'
import { storeRouter } from '@renderer/pinia/router'
export const routerBack = (path?: string) => {
  const { routerBack } = storeRouter()
  routerBack(path)
}

export default function install(app: App) {
  Object.assign(app.config.globalProperties, {
    $formatDate: (time: string, rule: string, format: string) => {
      if (!time) {
        return '-'
      }
      return dayjs(time, rule).format(format)
    },
    $formatTime: (time: string, format = 'mm:ss') => {
      if (!time) {
        return '-'
      }
      return dayjs.duration(time).format(format)
    },
    $routerBack: routerBack
  })
}
