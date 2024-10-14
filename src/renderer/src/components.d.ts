import Tabbar from '@renderer/components/Tabbar/index.vue'
import RouterViewContent from '@renderer/components/RouterViewContent/index.vue'
import ScrollPage from '@renderer/components/ScrollPage/index.vue'
import Slide from '@renderer/components/Slide/index.vue'
declare module 'vue' {
  export interface GlobalComponents {
    Tabbar: typeof Tabbar
    RouterViewContent: typeof RouterViewContent
    ScrollPage: typeof ScrollPage
    Slide: typeof Slide
  }
}
