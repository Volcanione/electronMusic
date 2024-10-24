<template>
  <div class="lyricContent">
    <ScrollPage :init="init" class="lyricLine">
      <div
        v-for="(item, index) in showLyric"
        :key="item.time"
        ref="activeRef"
        :class="{ active: activeIdx === index }"
        class="item"
      >
        {{ item.lyricText || '••••••' }}
      </div>
    </ScrollPage>
    <div class="btns">
      <div v-if="lyric.tLyric" class="btn" :class="{ active: translateState }" @click="checkState">
        <span>译</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { watch, ref, reactive, computed, inject, watchEffect } from 'vue'
import type { MusicLyric } from 'player'
import { lyricRegular, NextTimeArray } from '@renderer/utils/player'
import BScroll from '@better-scroll/core'
import { MediaParamKey } from '@renderer/types/injectionKey'
import { delay } from 'lodash'

type LyricItem = {
  lyricText: string
  time: number
}

const props = defineProps<{
  lyric: MusicLyric
}>()

// console.log(props.lyric.Lyric)
const mediaParam = inject(MediaParamKey, reactive({ currentTime: 0 }))

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
//
const scrollState = ref(false)

let timeId: any
let Scroll: BScroll
const init = (bs: BScroll) => {
  Scroll = bs
  Scroll.on('scrollStart', () => {
    // debounced.cancel
    scrollState.value = true
    clearTimeout(timeId)
    timeId = delay(() => {
      scrollState.value = false
    }, 3000)
  })
  Scroll.on('mousewheelMove', () => {
    // debounced.cancel
    scrollState.value = true
    clearTimeout(timeId)
    timeId = delay(() => {
      scrollState.value = false
    }, 3000)
  })

  // hooks.on('mousewheelStart', () => {
  //   console.log(222)
  // })
}

delLryic()

watchEffect(() => {
  setIndex(mediaParam.currentTime)
})

watch(
  () => scrollState.value,
  (val) => {
    console.log(val)
  }
)
</script>

<style lang="less" scoped>
.lyricContent {
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;

  .lyricLine {
    flex: 1;
  }
  .item {
    text-align: center;
    white-space: pre-wrap;
    // min-height: 30px;
    line-height: 20px;
    padding: 8px 0;
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
