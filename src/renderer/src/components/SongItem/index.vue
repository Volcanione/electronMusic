<template>
  <div class="songItem">
    <Image
      :width="size"
      :height="size"
      :src="`${picUrl}?param=${size}y${size}`"
      :fallback="songItemBg"
      :preview="false"
    />
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
  :deep(img) {
    object-fit: cover;
  }
}
</style>
