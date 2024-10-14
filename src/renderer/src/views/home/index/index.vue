<template>
  <ScrollPage :init="init" :pull-down="pullDownrefresh">
    <Slide :data="bannerList" />
  </ScrollPage>
</template>

<script lang="ts" setup>
// import { App } from 'ant-design-vue'
import { IndexHook } from '@renderer/hooks/homeHook'

defineOptions({
  name: 'HomeIndex'
})

// const { message } = App.useApp()

const { getBanner, bannerList } = IndexHook()

//页面初始化函数
const init = async (Bs?: any) => {
  console.log(Bs)
  try {
    await getBanner()
  } catch (error) {
    //
  }
}

// //方法
const pullDownrefresh = async (done) => {
  await init()
  done()
}
</script>

<style lang="less" scoped>
.recom {
  padding: 10px;
}
</style>
