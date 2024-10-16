<template>
  <ConfigProvider :theme="themeConfig">
    <App>
      <Layout />
    </App>
  </ConfigProvider>
</template>
<script lang="ts" setup>
import { App, ConfigProvider } from 'ant-design-vue'
import Layout from '@renderer/layout/index.vue'

//主题样式配置
const themeConfig = {
  components: {
    Card: {
      borderRadiusLG: 12,
      colorBorderSecondary: '#fff'
    }
  }
}
</script>
