<template>
  <ConfigProvider :theme="themeConfig">
    <App>
      <Layout />
    </App>
  </ConfigProvider>
</template>
<script lang="tsx" setup>
// import { ref } from 'vue'
import { App, ConfigProvider } from 'ant-design-vue'
import Layout from '@renderer/layout/index.vue'
// import LoadingIcon from '@renderer/assets/puff.svg?url'
//主题样式配置
const themeConfig = {
  components: {
    Card: {
      borderRadiusLG: 12,
      colorBorderSecondary: '#fff'
    }
  }
}

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
