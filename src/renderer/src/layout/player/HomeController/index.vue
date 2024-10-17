<template>
  <div class="homeController" @click.self="setPlayerShowState()">
    <PlayProgress :play-state="mediaParam.playState" :progress="mediaParam.progress" @play="play" />
  </div>
</template>

<script lang="ts" setup>
import PlayProgress from './components/playProgress.vue'
import { PlayerHook } from '@renderer/hooks/playerHook'
const { mediaParam, playPause, setPlayerShowState } = PlayerHook()

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
}

@media (max-width: 576px) {
  .homeController {
    position: absolute;
    bottom: 0;
  }
}
</style>
