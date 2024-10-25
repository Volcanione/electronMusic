import { App } from 'vue'
import dayjs from '@renderer/utils/dayjs'

export default function install(app: App) {
  Object.assign(app.config.globalProperties, {
    $formatTime: (time: string, rule: string, format: string) => {
      if (!time) {
        return '-'
      }
      return dayjs(time, rule).format(format)
    }
  })
}
