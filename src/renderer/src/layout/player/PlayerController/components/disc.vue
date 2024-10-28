<template>
  <div :ref="discBoxRef" class="discBox">
    <!-- <canvas v-if="vudio && showSrc" id="canvasRef" width="350" height="350"></canvas> -->
    <div class="disc" :style="{ 'animation-play-state': playerState ? 'running' : 'paused' }">
      <span class="border"></span>
      <img :src="!showSrc ? defaultImg : showSrc + `?param=${size}y${size}`" alt="" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from 'vue'
import defaultImg from '@renderer/assets/songListBG.png?url'

const props = withDefaults(
  defineProps<{
    src?: string
    playerState: boolean
    size?: number
    vudio?: boolean
  }>(),
  {
    size: 300
  }
)

const discBoxRef = (el) => {
  if (el) {
    ro.observe(el)
  }
}

const showSrc = ref('')

watch(
  () => props.src,
  (src) => {
    console.log(src)
    if (!src) {
      return
    }
    showSrc.value = src
  },
  {
    immediate: true
  }
)

const ro = new ResizeObserver((entries) => {
  for (const entry of entries) {
    const { width } = entry.contentRect
    const el = entry.target as HTMLElement
    el.style.height = width + 'px'
  }
})

onBeforeUnmount(() => {
  ro.disconnect()
})
</script>

<style lang="less" scoped>
.discBox {
  width: 100%;
  // overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  .disc {
    width: 80%;
    height: 80%;
    border-radius: 50%;
    overflow: hidden;
    position: absolute;
    animation: rotating 10s linear infinite;
    overflow: hidden;
    box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.9);

    &.paused {
      animation-play-state: paused;
    }

    & .border {
      top: 0;
      box-sizing: border-box;
      left: 0;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      border: 2px solid rgb(39, 39, 39);
      z-index: 1;
      box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.9) inset;
    }

    img {
      display: block;
      width: calc(100% - 2px);
      height: calc(100% - 2px);
      border-radius: 50%;
      margin: 1px;
    }
  }
}

@keyframes rotating {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(1turn);
  }
}
</style>
