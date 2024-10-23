<template>
  <div ref="wrapperRef" class="playContentPanel">
    <div ref="boxRef" class="box" :class="{ left: active }">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onBeforeMount } from 'vue'

defineProps<{
  widescreen?: boolean
  active: number
}>()

onMounted(() => {})

onBeforeMount(() => {})
</script>

<style lang="less">
.playContentPanel {
  width: 100%;
  height: 100%;
  overflow: hidden;
  & > .box {
    width: 200%;
    white-space: nowrap;
    display: inline-flex;
    overflow: hidden;
    height: 100%;
    transition: all 0.3s;
    & > div {
      height: 100%;
      width: 100%;
      overflow: hidden;
    }
    &.left {
      transform: translateX(-50%);
    }
  }
}

@media (min-width: 768px) {
  .playContentPanel {
    & > .box {
      width: 100% !important;
      transform: translateX(0) !important;
      & > div {
        margin: 0 !important;
        width: 50% !important;
      }
    }
  }
}
</style>
