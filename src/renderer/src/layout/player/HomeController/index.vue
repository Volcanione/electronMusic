<template>
  <div class="homeController">
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
    <PlayProgress :play-state="mediaParam.playState" :progress="mediaParam.progress" @play="play" />
  </div>
</template>

<script lang="ts" setup>
import Disc from '../PlayerController/components/disc.vue'
import Lyric from '../PlayerController/components/lyric.vue'
import PlayProgress from './components/playProgress.vue'
import { PlayerHook } from '@renderer/hooks/playerHook'
const { mediaParam, playPause, setPlayerShowState, nowPlayData, musicLyric, playerConfig } =
  PlayerHook()

const play = async () => {
  try {
    playPause()
  } catch (error) {
    //
  }
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
  }
}
</style>
