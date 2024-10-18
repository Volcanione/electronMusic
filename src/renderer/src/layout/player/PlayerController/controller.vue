<template>
  <div class="controller">
    <div class="mode" @click="setPlayerMode">
      <i v-if="playerConfig.playerMode === 'alone'" class="iconfont">&#xe6a2;</i>
      <i v-else-if="playerConfig.playerMode === 'list'" class="iconfont">&#xe6a3;</i>
      <i v-else class="iconfont">&#xe624;</i>
    </div>
    <div class="prev">
      <i class="iconfont">&#xe607;</i>
    </div>
    <div class="play" @click="play">
      <i v-if="mediaParam.playState" class="iconfont">&#xe76a;</i>
      <i v-else class="iconfont">&#xe646;</i>
    </div>
    <div class="next" @click="nextPlay">
      <i class="iconfont">&#xe872;</i>
    </div>
    <div class="list">
      <i class="iconfont">&#xe6e4;</i>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PlayerHook } from '@renderer/hooks/playerHook'
const { mediaParam, playerConfig, setPlayerMode, playPause, nextPlay } = PlayerHook()
const play = async () => {
  try {
    playPause()
  } catch (error) {
    //
  }
}
</script>

<style lang="less" scoped>
.controller {
  align-self: center;
  max-width: 550px;
  width: 100%;
  flex: 1;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .prev,
  .next {
    width: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .playerMode,
  .list {
    width: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .play {
    width: 60px;
    height: 60px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
  }

  .iconfont {
    color: #fff;
    font-size: 26px;
  }
  & > * {
    cursor: pointer;
  }
}
</style>
