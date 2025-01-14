<template>
  <div class="layerPage">
    <div v-if="$slots.header" class="header">
      <slot name="header" />
    </div>
    <div ref="contentRef" class="content">
      <ScrollPage :pull-down="pullDown" :pull-up="pullUp" @init="init">
        <slot />
      </ScrollPage>
    </div>
    <div v-if="$slots.fixed" class="fixed">
      <slot name="fixed" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { nextTick } from 'vue'
import BScroll from '@better-scroll/core'
const props = defineProps<{
  loading?: boolean
  pullDown?: (done: () => void) => Promise<void>
  pullUp?: (done: (state: -1 | 0 | 1 | 2) => void) => Promise<void>
  reSize?: () => void
}>()
const emit = defineEmits(['init', 'onresize'])
const init = async (BScroll: BScroll) => {
  await nextTick()
  emit('init', BScroll)
}
</script>

<style lang="less" scoped>
.layerPage {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  // background: v-bind(appBackColor);

  .content {
    flex: 1;
    overflow: hidden;
    position: relative;
  }

  .header {
    z-index: 1;
    position: relative;
  }

  .fixed {
    position: absolute;
    width: 100%;
    top: 0;
    z-index: -1;
  }
}
</style>
