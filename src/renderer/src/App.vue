<template>
  <ConfigProvider :theme="themeConfig">
    <App>
      <Layer />
      <PlayerPage :open="playerConfig.playerShow" @close="setPlayerShowState(false)" />
      <Layout />
    </App>
  </ConfigProvider>
</template>
<script lang="tsx" setup>
import { watch } from 'vue'
import { App, ConfigProvider } from 'ant-design-vue'
import Layout from '@renderer/layout/index.vue'
import Layer from '@renderer/components/Layer/index.vue'
// import LoadingIcon from '@renderer/assets/puff.svg?url'
import { RouterHook } from '@renderer/hooks/routerHook'
import { PageRouteConfig } from '@renderer/utils/index'
import PlayerPage from '@renderer/layout/player/index.vue'
import { PlayerHook } from '@renderer/hooks/playerHook'
//主题样式配置
const themeConfig = {
  components: {
    Card: {
      borderRadiusLG: 12,
      colorBorderSecondary: '#fff'
    }
  }
}

//
const { playerConfig, setPlayerShowState } = PlayerHook()

// const indicator = (
//   <img
//     src={LoadingIcon}
//     style={{
//       width: '4rem',
//       height: '4rem',
//       margin: 0,
//       transform: 'translate(-50%,-50%)'
//     }}
//   />
// )

// const spinning = ref(true)
// setTimeout(() => {
//   spinning.value = false
// }, 2000)

const { route, router } = PageRouteConfig()
const { addHistoryRoute, removeHistoryRoute } = RouterHook()

//初始化路由
router.replace('/')
//更新路由历史记录
watch(
  () => route.fullPath,
  () => {
    // console.log(route)
    // console.log(window.history.state)
    // console.log(window.history.state.forward)
    // console.log(historyRoute)
    if (!window.history.state.replaced && !window.history.state.forward) {
      addHistoryRoute(route)
    }

    if (window.history.state.forward) {
      removeHistoryRoute()
    }

    // console.log(historyRoute.map((item) => item.fullPath))
  }
)
</script>

<style lang="less" scoped>
// .AppContent {
//   height: 100%;
//   overflow: hidden;
//   & > :deep(.ant-spin-container) {
//     height: 100%;
//     overflow: hidden;
//     position: reactive;
//   }
//   & > :deep(div) {
//     height: 100% !important;
//     & > * {
//       max-height: none !important;
//     }
//   }
// }
</style>
