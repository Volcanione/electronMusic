<template>
  <transition
    enter-active-class="animate__animated animate__slideInUp"
    leave-active-class="animate__animated animate__slideOutDown"
  >
    <div v-show="playerConfig.homeControllerShow" ref="homeControllerRef" class="homeController">
      <Disc
        :src="nowPlayData?.picUrl"
        :player-state="mediaParam.playState"
        :size="32"
        class="disc"
        @click="setPlayerShowState()"
      />
      <transition name="fade">
        <Lyric
          v-if="!playerConfig.playerShow"
          :key="nowPlayData?.id"
          :lyric="musicLyric"
          line
          class="lyric"
        />
      </transition>
      <PlayProgress
        :play-state="mediaParam.playState"
        :progress="mediaParam.progress"
        @play="play"
      />
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Disc from '../PlayerController/components/disc.vue'
import Lyric from '../PlayerController/components/lyric.vue'
import PlayProgress from './components/playProgress.vue'
import { PlayerHook } from '@renderer/hooks/playerHook'
const {
  mediaParam,
  playPause,
  setPlayerShowState,
  nowPlayData,
  musicLyric,
  playerConfig,
  setHomeControllerShowState
} = PlayerHook()

const play = async () => {
  try {
    playPause()
  } catch (error) {
    //
  }
}

const homeControllerRef = ref<Element>()
playerConfig.initBs = (Bs) => {
  Bs.on('scrollEnd', (data: any) => {
    if (
      homeControllerRef.value &&
      window.getComputedStyle(homeControllerRef.value).position === 'relative'
    )
      return setHomeControllerShowState(true)
    if (data?.y === Bs.maxScrollY) {
      setHomeControllerShowState(false)
    } else {
      setHomeControllerShowState(true)
    }
  })
}
</script>

<style lang="less" scoped>
.homeController {
  width: 100%;
  background: #ffffff;
  position: relative;
  height: 60px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  overflow: hidden;
  .disc {
    width: 47.5px;
    height: 47.5px;
  }
  .lyric {
    margin-left: 20px;
    margin-right: 20px;
    width: auto;
    flex: 1;
    overflow: hidden;
    height: auto;
    :deep(.btns) {
      display: none !important;
    }
    :deep(.scrollPage) {
      max-height: 36px !important;
    }
    :deep(.item) {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}

@media (max-width: 576px) {
  .homeController {
    position: absolute;
    bottom: 0;
    background: rgba(255, 255, 255, 0.8);
    &::before {
      content: '';
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      background: inherit;
      filter: blur(20px);
      // z-index: ;
    }
  }
}
</style>
