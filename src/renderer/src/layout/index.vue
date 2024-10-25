<template>
  <div class="layout">
    <MenuCom @change="changeMenu" />
    <div class="layoutContent">
      <RouterViewContent :reverse="reverseState" />
      <HomeController />
    </div>
    <PlayerPage :open="playerConfig.playerShow" @close="setPlayerShowState(false)" />
  </div>
</template>
<script lang="ts" setup>
import { ref, provide, onMounted } from 'vue'
import MenuCom from './menu/index.vue'
import HomeController from './player/HomeController/index.vue'
import PlayerPage from './player/index.vue'

import { AudioHook } from '@renderer/hooks/audioHook'
import { PlayerHook } from '@renderer/hooks/playerHook'
import { AudioElementKey, MediaParamKey } from '@renderer/types/injectionKey'
import { delay } from 'lodash'

const { initAudio, audioElement, mediaParam } = AudioHook()
const { playerConfig, setPlayerShowState } = PlayerHook()

//

initAudio()

provide(AudioElementKey, audioElement)
provide(MediaParamKey, mediaParam)

//

const layoutBg = ref('#f5f5f5')

const reverseState = ref(false)

const changeMenu = (item, oldActiveIndex, index) => {
  console.log(item)
  console.log(oldActiveIndex, index)
  reverseState.value = oldActiveIndex < index

  //测试open
  open.value = true
}

onMounted(() => {
  setPlayerShowState(true)
  delay(() => {
    setPlayerShowState(false)
  }, 1000)
})
//
const open = ref(false)
</script>
<style lang="less" scoped>
.layout {
  height: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  background: v-bind(layoutBg);
  .layoutContent {
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    & > .RouterView {
      flex: 1;
      height: auto;
    }
  }
}

@media (max-width: 576px) {
  .layout {
    flex-direction: column;
  }
}
</style>
: any: number: number
