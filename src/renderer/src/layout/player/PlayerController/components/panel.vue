<template>
  <div ref="wrapperRef" class="playContont">
    <div ref="boxRef" class="box" :class="{ spread: widescreen }">
      <div>1</div>
      <div>2</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { nextTick, ref, watch, onMounted, onBeforeMount } from 'vue'
import BScroll from '@better-scroll/core'
import ObserveDOM from '@better-scroll/observe-dom'
BScroll.use(ObserveDOM)

const props = defineProps<{
  widescreen?: boolean
  active: number
}>()

const wrapperRef = ref<HTMLElement>()
const boxRef = ref<HTMLElement>()
let scroll: BScroll

const init = (el: HTMLElement) => {
  scroll = new BScroll(el, {
    scrollY: false,
    scrollX: true,
    bounce: false,
    click: true,
    preventDefault: false,
    observeDOM: true
  })
  scroll.disable()
  resizeObserver.observe(el as Element)
}

//watch
watch(
  () => props.active,
  (idx) => {
    scroll.refresh()
    boxRef.value?.children.length &&
      scroll.scrollToElement(boxRef.value?.children[idx] as HTMLElement, 300, 0, 0)
  },
  { deep: true }
)

//监听dom
const resizeObserver = new ResizeObserver(async () => {
  const boxChilderns = boxRef.value?.children as unknown as Array<HTMLElement>
  for (let i = 0; i <= boxChilderns?.length - 1; i++) {
    boxChilderns[i].style.width = wrapperRef.value?.clientWidth + 'px'
  }

  await nextTick()
  scroll.scrollTo(
    props.active === 0 ? 0 : wrapperRef.value?.clientWidth || 0,
    0,
    300,
    undefined,
    undefined
  )
  console.log(props.active)
})

onMounted(() => {
  wrapperRef.value && init(wrapperRef.value)
})

onBeforeMount(() => {
  resizeObserver.disconnect()
  scroll && scroll.destroy()
})
</script>

<style lang="less" scoped>
.playContont {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .box {
    width: auto;
    white-space: nowrap;
    display: inline-flex;
    overflow: hidden;
    height: 100%;
    & > div {
      height: 100%;
      width: 100vw;
      display: flex;
    }
    &.spread {
      display: flex;
      & > div {
        transition: all 1s;
      }
    }
  }
}
</style>
