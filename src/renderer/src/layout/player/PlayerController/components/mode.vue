<template>
  <div class="mode" @click="setPlayerMode">
    <i v-if="playerConfig.playerMode === 'alone'" class="iconfont">&#xe6a2;</i>
    <i v-else-if="playerConfig.playerMode === 'list'" class="iconfont">&#xe6a3;</i>
    <i v-else class="iconfont">&#xe624;</i>
    <span v-if="tip">{{ tips }}</span>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { PlayerHook } from '@renderer/hooks/playerHook'

defineProps<{
  tip?: boolean
}>()

const { playerConfig, setPlayerMode } = PlayerHook()

const tips = computed(() => {
  switch (playerConfig.playerMode) {
    case 'alone':
      return '单曲循环'
    case 'list':
      return '列表循环'
    default:
      return '随机播放'
  }
})
</script>

<style lang="less" scoped>
.mode {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  overflow: hidden;
}
</style>
