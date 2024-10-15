<template>
  <div class="homeController">
    <PlayProgress :play-state="mediaParam.playState" :progress="mediaParam.progress" @play="play" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import PlayProgress from './components/playProgress.vue'
import { AudioOperatorHook } from '@renderer/hooks/audioHook'
const { audioElement, setAudioElementUrl, setAudioElementState, mediaParam } = AudioOperatorHook()

console.log(audioElement)

const play = async () => {
  try {
    await setAudioElementState()
  } catch (error) {
    //
  }
}

onMounted(() => {
  setAudioElementUrl()
})
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
