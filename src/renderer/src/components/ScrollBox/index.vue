<template>
  <div ref="scrollRef" class="scrollBox">
    <div ref="contentRef" class="content">
      <div ref="viewContentRef" class="viewContent" :class="wrapperClassName">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import BScroll from '@better-scroll/core'
import { onMounted, ref, onBeforeUnmount } from 'vue'
import ObserveDOM from '@better-scroll/observe-dom'
import { throttle } from 'lodash'
import type { ScrollBoxProps } from '@renderer/types/components'
BScroll.use(ObserveDOM)

const props = withDefaults(defineProps<ScrollBoxProps>(), {
  loading: undefined,
  direction: 'x'
})

let Scroll: BScroll

const contentRef = ref<HTMLElement>()
const scrollRef = ref<HTMLElement>()
// const initLoading = ref(true)

const init: any = (el: HTMLElement) => {
  const Config: any = {
    scrollY: props.direction === 'y',
    scrollX: props.direction === 'x',
    freeScroll: props.direction === 'auto'
  }
  props.infinity &&
    Object.assign(Config, {
      infinity: props.infinity
    })

  Scroll = new BScroll(el, {
    observeDOM: true,
    probeType: props.probeType || 0,
    mouseWheel: {
      speed: 20,
      easeTime: 300
    },
    stopPropagation: true,
    bounce: true,
    bounceTime: 400,
    click: true,
    // preventDefault: false,
    ...Config
  })

  props.reload && resizeObserver.observe(scrollRef.value as Element)
}

//监听dom
const reload = throttle(async (more = true) => {
  reloadState.value = true
  props.reload && (await props.reload(more))
  reloadState.value = false
}, 1000)

const reloadState = ref(false)
const childElWidth = ref(0)
const resizeObserver = new ResizeObserver(async (entries) => {
  if (!props.reload) {
    return
  }
  for (const entry of entries) {
    const parentEl = entry.target as HTMLElement
    const childEl = parentEl.children[0] as HTMLElement
    if (entry.contentRect.width > childEl.offsetWidth && childEl.offsetWidth) {
      !childElWidth.value && (childElWidth.value = childEl.offsetWidth)
      if (reloadState.value) {
        return
      }
      await reload()
    }

    if (entry.contentRect.width <= childElWidth.value) {
      if (reloadState.value) {
        return
      }
      await reload(false)
      childElWidth.value = 0
    }
  }
})

onMounted(async () => {
  init(scrollRef.value)
})

onBeforeUnmount(() => {
  resizeObserver.disconnect()
  Scroll && Scroll.destroy()
})
</script>

<style lang="less" scoped>
.scrollBox {
  width: 100%;
  position: relative;
  overflow: hidden;
  font-size: 0;

  :deep(.content) {
    overflow: hidden;

    white-space: nowrap;
    display: inline-block;

    & > * {
      display: inline-flex;
      overflow: hidden;
    }
  }
}
</style>
