<template>
  <div class="songItem">
    <Image
      :width="size"
      :height="size"
      :src="`${picUrl}?param=${size}y${size}`"
      :fallback="songItemBg"
      :preview="false"
    />
    <span class="name ellipsis-2">{{ name }}</span>
    <span class="tag"> 歌单</span>
  </div>
</template>

<script lang="ts" setup>
import { Image } from 'ant-design-vue'
import { computed } from 'vue'
import songItemBg from '@renderer/assets/songListBG.png?url'

const props = withDefaults(
  defineProps<{
    size: number
    picUrl: string
    name: string
  }>(),
  {
    size: 80
  }
)

const size = computed(() => {
  return props.size + 'px'
})
</script>

<style lang="less" scoped>
.songItem {
  width: v-bind(size);
  height: v-bind(size);
  border-radius: @border-radius-base;
  background: #fafafa;
  overflow: hidden;
  position: relative;
  :deep(img) {
    object-fit: cover;
  }
  .name {
    position: absolute;
    left: 0;
    top: 6px;
    padding: 0 6px;
    width: 100%;
    font-size: 12px;
    color: #fff;
    line-height: 16px;
    text-wrap: wrap;
  }
  .tag {
    position: absolute;
    bottom: 6px;
    left: 6px;
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 4px;
    font-size: 12px;
    color: #fff;
    padding: 0 6px;
  }
}
</style>
