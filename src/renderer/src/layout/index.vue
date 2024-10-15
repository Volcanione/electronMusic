<template>
  <div class="layout">
    <MenuCom @change="changeMenu" />
    <div class="layoutContent">
      <RouterViewContent :reverse="reverseState" />
      <HomeController />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, provide } from 'vue'
import MenuCom from './menu/index.vue'
import HomeController from './player/HomeController/index.vue'

import { AudioHook } from '@renderer/hooks/audioHook'
import { AudioElementKey, MediaParamKey } from '@renderer/types/injectionKey'

const { initAudio, audioElement, mediaParam } = AudioHook()

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
}
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
