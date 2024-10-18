<template>
  <div class="player">
    <div class="header">
      <PlayerHeader v-model:active="activeType" @close="emit('close')" />
    </div>
    <div class="content">2</div>
    <div class="footer">
      <ProgressBar
        :value="mediaParam.progress"
        class="ProgressBar"
        :disabled="!mediaParam.duration"
        @change="changeProgress"
      />
      <Controller />
    </div>
    <div class="playBg">
      <!-- <div
        class="filter"
        :style="{
          'background-image': `url('${BgUrl}?param=500y500')`
        }"
      ></div> -->
      <img class="filter" :src="`${BgUrl}?param=500y500`" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import PlayerHeader from './header.vue'
import ProgressBar from './Progress.vue'
import Controller from './controller.vue'
import BgUrl from '@renderer/assets/bg.png?url'
import { PlayerHook } from '@renderer/hooks/playerHook'
const { mediaParam, changeProgress } = PlayerHook()

const emit = defineEmits(['close'])

const activeType = ref(0)

// const changeProgress = (data) => {
//   console.log(data)
// }
</script>

<style lang="less" scoped>
.player {
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  .header {
    height: 50px;
    display: flex;
  }
  .content {
    flex: 1;
  }
  .footer {
    height: 130px;
    display: flex;
    flex-direction: column;
    .ProgressBar {
      margin: 0 20px;
    }
  }

  .playBg {
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
    -webkit-filter: blur(20px);
    background: rgba(0, 0, 0, 0.9);
    filter: blur(20px);

    .filter {
      display: block;
      width: 100%;
      height: 100%;
      opacity: 0.6;
      object-fit: cover;
    }
  }
}
</style>
