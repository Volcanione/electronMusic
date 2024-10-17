<template>
  <div :ref="ProRoot" class="root">
    <div
      ref="progressBar"
      class="progressBar"
      @click.capture="handlerClick"
      @mousedown.capture="fn_progressTouchStart"
    >
      <div class="line" :style="{ width: `${value}%` }"></div>
    </div>
    <div ref="lineBar" class="bar" :style="{ left: `${barLeft}px` }">
      <img :src="ProgressTipUrl" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, nextTick } from 'vue'
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

const emit = defineEmits(['changeProgress'])

//常量

const timeCount = defineModel<number>('value', { default: 0 })

const barLeft = ref(0)
const progressBar = ref<HTMLElement>()
const lineBar = ref<HTMLElement>()
const WidthLength = ref(0)
const touchStart = ref(0)

//方法
//初始化
// const wacthmodelValue = () => {
//   value.value = Math.min(props.value, 100);
// };

//获取进度条可拖拽总长度
const getWidthLenght = async () => {
  const progessBarDom = progressBar.value as HTMLElement
  const lineBarDom = lineBar.value as HTMLElement
  await nextTick()
  try {
    WidthLength.value = progessBarDom.clientWidth - lineBarDom.clientWidth
  } catch (error) {
    console.log(error)
  }
  setBarLet()
}

//监听器
const intersectionObserver = new ResizeObserver(function () {
  getWidthLenght()
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

const fn_progressTouchEnd = () => {
  TouchState.value = false
}

const fn_progressTouchStart = (event: MouseEvent) => {
  if (props.disabled) {
    return
  }
  document.body.addEventListener('mouseup', fn_progressTouchEnd)
  document.body.addEventListener('mousemove', fn_progressTouchMove)
  console.log(event)
  TouchState.value = true
  // touchStart.value = event.touches[0].clientX
  touchStart.value = event.pageX
  setValue(touchStart.value)
}
const fn_progressTouchMove = (event: MouseEvent) => {
  if (props.disabled || !TouchState.value) {
    return
  }
  // const move = event.touches[0].clientX
  const move = event.pageX
  setValue(move)
}

//设置value
const setValue = async (length) => {
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
  getWidthLenght()
  //屏幕大小改变
  intersectionObserver.observe(progressBar.value as Element)
}
</script>
<style lang="less" scoped>
.root {
  width: 100%;
  position: relative;

  .progressBar {
    width: 100%;
    height: 6px;
    background: rgba(0, 0, 0, 0.5);
    position: relative;
    border-radius: 3px;
    overflow: hidden;
    cursor: pointer;

    .line {
      height: 100%;
      background: #fff;
      pointer-events: none;
    }
  }

  .bar {
    position: absolute;
    width: 10px;
    height: 10px;
    background: #fff;
    border-radius: 50%;
    top: 50%;
    transform: translateY(-50%);
    overflow-y: visible !important;
    pointer-events: none;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 30px;
      height: 30px;
    }
  }
}
</style>
