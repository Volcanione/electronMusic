<template>
  <div class="slide-banner">
    <div ref="setSlideRef" class="slide-banner-wrapper">
      <div class="slide-banner-content">
        <div v-for="(item, index) in data" :key="index" class="slide-page">
          <div class="pageconent">
            <img :src="item.imageUrl || item.pic" alt="" />
          </div>
        </div>
        <div v-if="!data.length" class="slide-page"></div>
      </div>
      <div class="sign-list">
        <span
          v-for="index in data.length"
          :key="index"
          :class="{ active: currentPageIndex === index - 1 }"
        ></span>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import BScroll from '@better-scroll/core'
import Slide from '@better-scroll/slide'
import { onBeforeUnmount, ref, watch, nextTick, onMounted } from 'vue'
import { delay } from 'lodash'
BScroll.use(Slide)

const props = defineProps<{
  data: Array<any>
}>()

//常量
const setSlideRef = ref<HTMLElement>()
const currentPageIndex = ref(0)
let slide: BScroll

//方法
const init = () => {
  slide = new BScroll(setSlideRef.value as any, {
    scrollX: true,
    scrollY: false,
    slide: true,
    momentum: false
  })
  slide.on('slideWillChange', (page) => {
    currentPageIndex.value = page.pageX
  })
}

//watch
watch(
  () => props.data,
  async () => {
    await nextTick()
    delay(() => {
      slide && slide.refresh()
    }, 100)
  },
  { deep: true }
)
//钩子

onBeforeUnmount(() => {
  slide.destroy && slide.destroy()
})

onMounted(() => {
  init()
})
</script>
<style lang="less" scoped>
.slide-banner {
  position: relative;
  margin-top: 20px;
  width: 100%;
  overflow: hidden;
  .slide-banner-wrapper {
    height: 100%;
    overflow: hidden;
    position: relative;

    .sign-list {
      position: absolute;
      bottom: 10px;
      height: 10px;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      span {
        width: 8px;
        height: 8px;
        background: rgba(255, 255, 255, 0.5);
        margin: 0 5px;
        border-radius: 50%;

        &.active {
          background: #fff;
        }
      }
    }
  }

  .slide-banner-content {
    height: 100%;
    white-space: nowrap;
    font-size: 0;

    .slide-page {
      display: inline-block;
      height: 100%;
      padding: 0 20px;
      overflow: hidden;

      .pageconent {
        height: 100%;
        border-radius: 12px;
        background: #f0f0f0;
        overflow: hidden;

        img {
          display: block;
          width: 100%;
          border-radius: 12px;
        }
      }
    }
  }
}
</style>
