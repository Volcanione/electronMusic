<template>
  <div ref="scrollContent" class="TABBER">
    <div class="root">
      <div ref="tabbar" class="bar">
        <template v-for="(item, index) in options" :key="item.value">
          <div
            ref="activeRef"
            :class="{ item: true, active: item.value === active }"
            @click="($event) => handlerClick(item, $event, index)"
          >
            {{ item.label }}
          </div>
        </template>
      </div>
      <div class="line">
        <span :style="LineStyle" class="linetip"></span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import BScroll from '@better-scroll/core'
import { ref, watch, nextTick, reactive, onBeforeUnmount, onMounted } from 'vue'

type Option = {
  label?: string
  value: number | string
  [propName: string]: any
}

const props = defineProps<{
  options: Array<Option>
  active: string | number
  scrollDisabled?: boolean
}>()
const activeValue = defineModel<string | number>('active', { required: true })

const emit = defineEmits(['change'])

const activeRef = ref<Array<HTMLElement>>([])
//申明方法

const handlerClick = (item: Option, event: Event, index: number) => {
  const oldActiveIndex = props.options.findIndex((item) => item.value === activeValue.value)

  // console.log(oldActiveIndex, index)

  if (activeValue.value === item.value) {
    return
  }

  activeValue.value = item.value
  emit('change', item, oldActiveIndex, index)
  if (event.target) {
    const activeEl = activeRef.value[Math.max(index - 1, 0)] as HTMLElement

    Scroll.scrollToElement && Scroll.scrollToElement(activeEl as HTMLElement, 300, 0, 0, undefined)
  }
}

//dom操作

const scrollContent = ref()
const LineStyle = reactive({ width: '', transform: '' })

let Scroll: BScroll

const initWapper = () => {
  Scroll = new BScroll(scrollContent.value, {
    scrollY: false,
    scrollX: true,
    scrollbar: false,
    disableMouse: false,
    disableTouch: false,
    bounce: true,
    click: true,
    tap: 'tap',
    observeDOM: true
  })

  // props.scrollDisabled && scroll.disable()
}

watch(
  () => activeValue.value,
  async () => {
    await nextTick()

    const activeEl = activeRef.value?.find((el) => el.classList.contains('active')) as HTMLElement
    if (!activeEl) {
      return
    }
    const { paddingLeft, paddingRight } = getComputedStyle(activeEl as Element)

    const paddingL = +paddingLeft.replace('px', '') as unknown as number
    const paddingR = +paddingRight.replace('px', '') as unknown as number

    Object.assign(LineStyle, {
      width: activeEl?.offsetWidth - paddingL - paddingR + 'px',
      transform: `translateX(${activeEl.offsetLeft + paddingL}px)`
    })
  },
  {
    immediate: true
  }
)

onMounted(async () => {
  initWapper()
})

watch(
  () => props.options.length,
  async () => {
    await nextTick()
    Scroll && Scroll?.refresh()
  },
  {
    immediate: true
  }
)

onBeforeUnmount(() => {
  Scroll.destroy && Scroll.destroy()
})
</script>

<style lang="less" scoped>
.TABBER {
  width: 100%;
  height: 100%;

  .root {
    white-space: nowrap;
    display: inline-flex;
    flex-direction: column;
    height: 100%;

    .bar {
      position: relative;
      flex: 1;
      display: flex;

      .item {
        -webkit-app-region: no-drag;
        display: flex;
        flex-shrink: 0;
        padding: 0 10px;
        justify-content: center;
        align-items: center;
        color: @text-color3;
        cursor: pointer;
        transition: all 0.3s linear;

        &.active {
          color: @text-color;
          font-weight: 600;
        }
      }
    }

    .line {
      height: 4px;
      display: flex;

      .linetip {
        height: 4px;
        background: @primary-color;
        transition: 0.3s;
      }
    }
  }
}
</style>
