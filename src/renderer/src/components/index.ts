import { App } from 'vue'
import Tabbar from './Tabbar/index.vue'
import RouterViewContent from './RouterViewContent/index.vue'
import ScrollPage from './ScrollPage/index.vue'
import Slide from './Slide/index.vue'

export default function install(app: App) {
  app.component('Tabbar', Tabbar)
  app.component('RouterViewContent', RouterViewContent)
  app.component('ScrollPage', ScrollPage)
  app.component('Slide', Slide)
}
