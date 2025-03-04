<template>
  <ConfigProvider :theme="themeConfig">
    <App ref="APPlayoutRef" class="APPlayout">
      <Layout />
    </App>
  </ConfigProvider>
</template>
<script lang="tsx" setup>
import { watch, ref, onMounted, reactive, provide } from 'vue'
import { App, ConfigProvider } from 'ant-design-vue'
import Layout from '@renderer/layout/index.vue'

import { RouterHook } from '@renderer/hooks/routerHook'
import { PageRouteConfig } from '@renderer/utils/index'

import { Test } from '@renderer/api/client'

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

const { route, router } = PageRouteConfig()
const { addHistoryRoute, removeHistoryRoute } = RouterHook()

//初始化路由
router.replace('/')
//更新路由历史记录
watch(
  () => route.fullPath,
  () => {
    if (!window.history.state.replaced && !window.history.state.forward) {
      addHistoryRoute(route)
    }

    if (window.history.state.forward) {
      removeHistoryRoute()
    }

    // console.log(historyRoute.map((item) => item.fullPath))
  }
)

// 配置观察选项
const APPlayoutRef = ref()

const AppGlobalConfig = reactive({
  pcMode: false
})

// 创建一个回调函数来执行当变动发生时的操作
const callback = function (entries) {
  for (const entry of entries) {
    Object.assign(AppGlobalConfig, {
      pcMode: entry.contentRect.width > 576
    })
  }
}

// 创建一个观察者实例并传入回调
const observer = new ResizeObserver(callback)

// 启动观察
onMounted(() => {
  observer.observe(APPlayoutRef.value.$el)
})

provide('AppGlobalConfig', AppGlobalConfig)

Test()
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
.APPlayout {
}

@media (max-width: 576px) {
  .APPlayout {
    position: relative;
  }
}
</style>
