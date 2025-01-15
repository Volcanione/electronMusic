<template>
  <Spin
    :spinning="typeof loading === 'boolean' ? loading : initLoading"
    wrapper-class-name="scrollPageCom"
    :indicator="indicator"
  >
    <div ref="scrollRef" class="scrollPage">
      <div ref="contentRef" class="content">
        <span v-if="pullDown" class="pullingDownLoading">
          <Down />
        </span>
        <div ref="viewContentRef" class="viewContent" :class="wrapperClassName">
          <slot />
        </div>
        <template v-if="pullUp">
          <Up v-if="pullUpShow"> </Up>
        </template>
      </div>
    </div>
  </Spin>
</template>

<script lang="tsx" setup>
import { nextTick, onBeforeUnmount, onMounted, reactive, ref, watch, onActivated } from 'vue'
import BScroll from '@better-scroll/core'
import PullDown from '@better-scroll/pull-down'
import Pullup from '@better-scroll/pull-up'
import ObserveDOM from '@better-scroll/observe-dom'
import MouseWheel from '@better-scroll/mouse-wheel'
import Down from './components/down/index.vue'
import Up from './components/up/index.vue'
import type { ScrollPageProps } from '@renderer/types/components'
import { Spin } from 'ant-design-vue'
import { PlayerHook } from '@renderer/hooks/playerHook'
import LoadingIcon from '@renderer/assets/puff.svg?url'

BScroll.use(PullDown)
BScroll.use(Pullup)
BScroll.use(ObserveDOM)
BScroll.use(MouseWheel)

const props = withDefaults(defineProps<ScrollPageProps>(), {
  loading: undefined
})

const { playerConfig } = PlayerHook()

let Scroll: BScroll

const contentRef = ref<HTMLElement>()
const scrollRef = ref<HTMLElement>()
const initLoading = ref(true)
const init: any = async (el: HTMLElement) => {
  if (!el) {
    return
  }
  const Config: any = {}

  props.infinity &&
    Object.assign(Config, {
      infinity: props.infinity
    })

  props.pullUp &&
    (Config.pullUpLoad = {
      threshold: 0
    })
  props.pullDown &&
    (Config.pullDownRefresh = {
      threshold: 50,
      stop: 30
    })

  Scroll = new BScroll(el, {
    observeDOM: true,
    probeType: props.probeType || 0,
    mouseWheel: true,
    stopPropagation: true,
    bounce: { top: true, bottom: true, left: false, right: false },
    bounceTime: 400,
    click: true,
    ...Config
  })

  setScrollState()

  resizeObserver.observe(contentRef.value as Element)
  resizeObserver.observe(el)
  //设置是否开启滚动监听，优化性能
  Scroll.setScrollMonitor = (state = true) => {
    Scroll.options.probeType = !state ? 0 : 3
    Scroll.refresh()
  }

  if (props.pullUp) {
    Scroll.on('pullingUp', pullingUPHandler)
  }

  if (props.pullDown) {
    Scroll.on('pullingDown', pullingDownHandler)
    Scroll.on('enterThreshold', enterThresholdHandler)
    Scroll.on('leaveThreshold', leaveThresholdHandler)
    props.autoPullDownRefresh && Scroll.autoPullDownRefresh()
  }
  try {
    props.init && (await props.init(Scroll))
  } catch (error) {
    //
  }
  initLoading.value = false

  //
  playerConfig.initBs && playerConfig.initBs(Scroll)
}

//

//
//设置viewcontent高度
const viewContentRef = ref<HTMLElement>()
const viewContentInit = async () => {
  await nextTick()
  if (!viewContentRef.value) {
    return
  }
  // console.dir( scrollWarpper.value,2)
  scrollRef.value &&
    (viewContentRef.value.style.minHeight = scrollRef.value.offsetHeight + 0.5 + 'px')
}

/***上拉加载* */
const pullUpShow = ref(true)
const pullUpConfig = reactive({
  type: -1, //0上拉 1 成功 2 没有内容
  refreshtimeID: -1,
  initializetimeID: -1
})
//完成上拉
const donePullUp = (state = 1) => {
  Scroll.finishPullUp()
  Scroll.refresh()
  pullUpConfig.type = state
  pullUpShow.value = state !== 1
}

//处理上拉

const pullingUPHandler = async () => {
  pullUpShow.value = true
  pullUpConfig.type = 0
  if (!props.pullUp) {
    return
  }
  await props.pullUp(donePullUp)
}

/**下拉刷新**/
const pullDownConfig = reactive({
  srcollState: true,
  type: 0, //0初始 1 下拉中 2 加载中
  refreshtimeID: -1,
  initializetimeID: -1
})

const donePullDown = () => {
  pullDownConfig.type = 0
  Scroll.finishPullDown()
}

//处理刷新
const pullingDownHandler = async () => {
  pullDownConfig.type = 2
  if (!props.pullDown) {
    return
  }
  await props.pullDown(donePullDown)
}

//
const enterThresholdHandler = () => {
  pullDownConfig.type = 1
}

//
const leaveThresholdHandler = () => {
  pullDownConfig.type = -1
}

//监听dom
const resizeObserver = new ResizeObserver(() => {
  viewContentInit()
  Scroll.refresh()
})

//设置loading 参数
console.log(LoadingIcon)
const indicator = (
  <img
    src={LoadingIcon}
    style={{
      width: '4rem',
      height: '4rem',
      margin: 0,
      transform: 'translate(-50%,-50%)'
    }}
  />
)

onBeforeUnmount(() => {
  resizeObserver.disconnect()
  Scroll && Scroll.destroy()
})

onMounted(async () => {
  init(scrollRef.value)
})

onActivated(async () => {
  await nextTick()
  // init(scrollRef.value)
  Scroll.refresh()
})

const setScrollState = () => {
  if (props.disabled) {
    Scroll.disable()
  } else {
    Scroll.enable()
  }
}

watch(
  () => props.disabled,
  () => {
    if (!Scroll) {
      return
    }
    setScrollState()
  }
)
</script>

<style lang="less" scoped>
.scrollPageCom {
  height: 100%;
  overflow: hidden;
  & > :deep(.ant-spin-container) {
    height: 100%;
    overflow: hidden;
  }
  & > :deep(div) {
    height: 100% !important;
    & > * {
      max-height: none !important;
    }
  }
}
.scrollPage {
  height: 100%;
  overflow: hidden;
  position: relative;

  .content {
    min-height: calc(100% + 0.5px);
    display: flex;
    flex-direction: column;
    // overflow: hidden;
  }

  .pullingDownLoading {
    position: absolute;
    z-index: 9;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    transform: translateY(-30px);
  }

  .pullingUpLoading {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;

    .noData {
      font-size: 12px;
      color: @text-color3;
    }
  }
}
</style>
