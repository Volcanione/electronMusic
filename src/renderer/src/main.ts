import 'animate.css'
import './styles/base.less'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import components from '@renderer/components/'
import router from '@renderer/router/index'
import mixins from '@renderer/mixins/index'

const pinia = createPinia()

createApp(App).use(router).use(pinia).use(components).use(mixins).mount('#app')
