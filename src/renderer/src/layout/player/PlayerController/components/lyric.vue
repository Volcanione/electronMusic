<template>
  <div class="lyricContent">
    <div v-if="showLyric.length" ref="timeBarRef" class="timeBar" :class="{ show: scrollState }">
      <div class="time" @click="checkProgress">
        <i class="iconfont">&#xe646;</i> {{ $formatTime(choseItem.time, 'mm:ss', 'mm:ss') }}
      </div>
    </div>
    <ScrollPage :init="init" :probe-type="3">
      <div
        v-for="(item, index) in showLyric"
        :key="item.time"
        ref="activeRef"
        :class="{ active: !scrollState ? activeIdx === index : choseItem.index === index }"
        class="item"
        :data-time="item.time"
      >
        {{ item.lyricText || '••••••' }}
      </div>
      <div class="empty item">暂无歌词</div>
    </ScrollPage>
    <div class="btns">
      <div v-if="lyric.tLyric" class="btn" :class="{ active: translateState }" @click="checkState">
        <span>译</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { watch, ref, reactive, computed, inject, watchEffect, nextTick } from 'vue'
import type { MusicLyric } from 'player'
import { lyricRegular, NextTimeArray } from '@renderer/utils/player'
import BScroll from '@better-scroll/core'
import { MediaParamKey } from '@renderer/types/injectionKey'
import { delay } from 'lodash'
import { findClosestObject } from '@renderer/utils/index'

type LyricItem = {
  lyricText: string
  time: number
}

const props = defineProps<{
  lyric: MusicLyric
}>()

const emit = defineEmits(['changeProgress'])

// console.log(props.lyric.Lyric)
const mediaParam = inject(MediaParamKey, reactive({ currentTime: 0, duration: 0 }))

const rLyric = reactive([]) as Array<LyricItem> //原歌词
const tLyric = reactive([]) as Array<LyricItem> //翻译歌词

//处理歌词
const delLryic = () => {
  rLyric.length = 0
  rLyric.push(...(lyricRegular(props.lyric.Lyric) as Array<LyricItem>))
  tLyric.length = 0
  tLyric.push(...(lyricRegular(props.lyric.tLyric) as Array<LyricItem>))
}

//翻译状态
const translateState = ref(false)
const checkState = () => {
  translateState.value = !translateState.value
}

//显示歌词
const showLyric = computed(() => {
  return !translateState.value ? rLyric : tLyric
})

//当前歌词
const activeIdx = ref(0)
const activeRef = reactive([]) as Array<HTMLElement> //
const setIndex = async (time: number) => {
  const arr = showLyric.value
  activeIdx.value = NextTimeArray(time, arr)
  const activeDom = activeRef[activeIdx.value]

  if (!activeDom || !Scroll || scrollState.value) {
    return
  }

  Scroll.scrollToElement(activeDom, 300, 0, -150)
}
//滚动状态
const scrollState = ref(false)

const setScrollState = (state: boolean) => {
  scrollState.value = state
}

let timeId: any
let Scroll: BScroll
const init = (bs: BScroll) => {
  Scroll = bs

  Scroll.on('scrollStart', () => {
    // debounced.cancel
    setScrollState(true)
    clearTimeout(timeId)
    timeId = delay(() => {
      setScrollState(false)
    }, 3000)
  })
  Scroll.on('mousewheelMove', () => {
    // debounced.cancel
    setScrollState(true)
    clearTimeout(timeId)
    timeId = delay(() => {
      setScrollState(false)
    }, 3000)
  })
}

//

//处理歌词
delLryic()

watchEffect(() => {
  setIndex(mediaParam.currentTime)
})

//监听scroll,获取选中的进度

const choseItem = reactive({
  index: 0,
  top: 0,
  text: '',
  time: ''
})

const scrollFn = () => {
  // console.log(dayjs('00:23:23', 'HH:mm:ss').format('mm:ss'))
  const arr = activeRef.map((item, index) => {
    return {
      index,
      top: item.getBoundingClientRect().top,
      text: item.innerText,
      time: item.getAttribute('data-time')
    }
  })
  Object.assign(choseItem, findClosestObject(arr, 'top', timeBarRefTop.value as number, 36))
}
watch(
  () => scrollState.value,
  (state) => {
    if (state) {
      getTimeBarTop()
      Scroll.on('scroll', scrollFn)
    } else {
      Scroll.off('scroll', scrollFn)
    }
  }
)

//获取timeBarRef可视距离

const timeBarRef = ref<HTMLElement>()
const timeBarRefTop = ref<number>()
const getTimeBarTop = async () => {
  await nextTick()
  timeBarRefTop.value = timeBarRef.value?.getBoundingClientRect().top
  console.log(timeBarRefTop.value)
}

//选择歌词跳转进度
const checkProgress = () => {
  if (!mediaParam.duration) {
    return
  }
  const timeArr = choseItem.time.split(':')
  console.log(timeArr)

  const time = (+timeArr[0] as number) * 60 + +timeArr[1]

  const progress = ((time / mediaParam.duration) * 100).toFixed(3)
  emit('changeProgress', progress)

  //跳转到对应的歌词
  activeIdx.value = choseItem.index
  setScrollState(false)
  Scroll.scrollToElement(activeRef[choseItem.index], 300, 0, -150)
}
</script>

<style lang="less" scoped>
.lyricContent {
  width: 100%;
  max-width: 500px;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  .item {
    text-align: center;
    white-space: pre-wrap;
    // min-height: 30px;
    line-height: 20px;
    padding: 8px 20px;
    opacity: 0.5;
    transition: all 0.5s;
    &.active {
      opacity: 1;
    }
  }
  .btns {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    .btn {
      display: flex;
      align-items: center;
      justify-content: center;

      span {
        font-size: 12px;
        color: #fff;
        border-radius: 6px;
        width: 22px;
        height: 22px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid rgba(255, 255, 255, 0.5);
        cursor: pointer;
      }

      &.active {
        span {
          color: #fff;
          background: rgba(255, 255, 255, 0.5);
          border-color: rgba(255, 255, 255, 0.5);
        }
      }
    }
  }

  .timeBar {
    position: absolute;
    height: 36px;
    width: auto;
    right: 0;
    top: 50%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    z-index: -1;
    transition: all 0.3s;
    opacity: 0;

    &.show {
      opacity: 1;
      z-index: 1;
    }
    .time {
      z-index: 9;
      cursor: pointer;
      margin-right: 10px;
      border-radius: 12px;
      line-height: 16px;
      font-size: 12px;
      border: 2px solid #fff;
      padding: 0 4px;
      display: flex;
      align-items: center;
      color: #fff;
      opacity: 0.5;
      transition: all 0.3s;
      .iconfont {
        font-size: 12px;
        margin-right: 4px;
      }
      &:hover {
        opacity: 1;
      }
    }
  }
}

@media (min-width: 768px) {
  .lyricContent {
    .item {
      text-align: left;
    }
  }
  .btns {
    justify-content: start !important;
  }
}
</style>
