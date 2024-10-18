<template>
  <div :ref="ProRoot" class="root">
    <div
      ref="progressBar"
      class="progressBar"
      @click.capture="handlerClick"
      @mousedown.capture="fn_progressTouchStart"
    >
      <div class="line" :style="{ width: `${timeCount}%` }">
        <img :src="ProgressTipUrl" class="icon" />
      </div>
    </div>
    <!-- <div ref="lineBar" class="bar" :style="{ left: `${barLeft}px` }">
      <img :src="ProgressTipUrl" />
    </div> -->
  </div>
</template>

<script lang="ts" setup>
import { ref, nextTick, watch } from 'vue'
import ProgressTipUrl from '@renderer/assets/tigers.svg?url'
const props = defineProps({
  value: {
    type: Number,
    default: 0
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['changeProgress', 'change'])

//常量

const timeCount = ref(0)

const barLeft = ref(0)
const progressBar = ref<HTMLElement>()
const WidthLength = ref(0)
const touchStart = ref(0)

//获取进度条可拖拽总长度
const getWidthLength = async () => {
  const progressBarDom = progressBar.value as HTMLElement
  await nextTick()
  try {
    WidthLength.value = progressBarDom.clientWidth
  } catch (error) {
    console.log(error)
  }
  setBarLet()
}

//监听器
const intersectionObserver = new ResizeObserver(function () {
  getWidthLength()
})
//设置球位置
const setBarLet = () => {
  barLeft.value = (WidthLength.value * timeCount.value) / 100
}
//点击进度条
const handlerClick = (event) => {
  if (props.disabled) {
    return
  }
  setValue(event.x)
}

//拖拽事件

const TouchState = ref(false)

const fn_progressTouchEnd = async () => {
  TouchState.value = false
  await nextTick()
  emit('change', timeCount.value)
  document.body.removeEventListener('mouseup', fn_progressTouchEnd)
  document.body.removeEventListener('mousemove', fn_progressTouchMove)
}

const fn_progressTouchStart = (event: MouseEvent) => {
  if (props.disabled) {
    return
  }
  document.body.addEventListener('mouseup', fn_progressTouchEnd)
  document.body.addEventListener('mousemove', fn_progressTouchMove)
  TouchState.value = true
  touchStart.value = event.pageX
  setValue(touchStart.value)
}
const fn_progressTouchMove = (event: MouseEvent) => {
  if (props.disabled || !TouchState.value || !event.buttons) {
    return
  }
  const move = event.pageX
  setValue(move)
}

//设置value
const setValue = async (length: number) => {
  const percentage = +(((length - 25) / WidthLength.value) * 100).toFixed(3)
  timeCount.value = Math.min(Math.max(percentage, 0), 100)
  await nextTick()
  emit('changeProgress', Math.min(Math.max(percentage, 0), 100))
}

const ProRoot = async (event) => {
  if (!event) {
    return
  }
  await nextTick()
  getWidthLength()
  //屏幕大小改变
  intersectionObserver.observe(progressBar.value as Element)
}

watch(
  () => props.value,
  (val) => {
    if (TouchState.value) {
      return
    }
    timeCount.value = val
  },
  {
    immediate: true
  }
)
</script>
<style lang="less" scoped>
.root {
  position: relative;

  .progressBar {
    width: 100%;
    height: 12px;
    position: relative;
    display: flex;
    align-items: center;
    // overflow: hidden;
    cursor: pointer;
    &::before {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      height: 6px;
      background: rgba(0, 0, 0, 0.5);
      border-radius: 3px;
      top: 50%;
      transform: translateY(-50%);
    }

    .line {
      height: 6px;
      background: #fff;
      pointer-events: none;
      border-radius: 3px;
      position: relative;
      img {
        width: 30px;
        height: 30px;
        position: absolute;
        z-index: 2;
        right: 0;
        top: 50%;
        transform: translate(50%, -50%);
      }
    }
  }
}
</style>
