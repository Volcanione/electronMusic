<template>
  <ScrollPage :init="init" :pull-down="pullDownrefresh">
    <Row>
      <Col :xs="24" :sm="16"> <Slide :data="bannerList" /></Col>
      <Col :xs="24" :sm="8">2</Col>
    </Row>
  </ScrollPage>
</template>

<script lang="ts" setup>
import { Row, Col } from 'ant-design-vue'
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
