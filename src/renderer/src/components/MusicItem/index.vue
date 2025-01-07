<template>
  <div class="musicItem">
    <Image :src="`${data.picUrl}?param=80y80`" :preview="false" />
    <div class="info">
      <div class="title">
        <span class="name ellipsis">{{ data.name }} </span>
        <span class="time">{{ $formatTime(data.song.duration) }}</span>
      </div>
      <span class="arts">{{ data.song?.artists[0]?.name }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Image } from 'ant-design-vue'
import type { MusicItem } from 'homeIndex'

withDefaults(
  defineProps<{
    data: MusicItem
  }>(),
  {}
)
</script>

<style lang="less" scoped>
@import './index.less';
</style>
