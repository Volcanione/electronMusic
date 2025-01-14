import { App } from 'vue'
import Tabbar from './Tabbar/index.vue'
import RouterViewContent from './RouterViewContent/index.vue'
import ScrollPage from './ScrollPage/index.vue'
import ScrollBox from './ScrollBox/index.vue'
import Slide from './Slide/index.vue'
import SongItem from './SongItem/index.vue'
import MusicItem from './MusicItem/index.vue'
import LayerPage from './LayerPage/index.vue'
import Portal from './Portal/index.vue'
import NavBar from './NavBar/index.vue'

export default function install(app: App) {
  app.component('Tabbar', Tabbar)
  app.component('RouterViewContent', RouterViewContent)
  app.component('ScrollPage', ScrollPage)
  app.component('ScrollBox', ScrollBox)
  app.component('Slide', Slide)
  app.component('SongItem', SongItem)
  app.component('MusicItem', MusicItem)
  app.component('LayerPage', LayerPage)
  app.component('Portal', Portal)
  app.component('NavBar', NavBar)
}
