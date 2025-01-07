<template>
  <ElSkeleton v-bind="$props" class="songSkeleton">
    <template #template>
      <div class="songItem">
        <el-skeleton-item variant="image" />
      </div>
    </template>
    <template #default>
      <slot name="default"></slot>
    </template>
  </ElSkeleton>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'
import { skeletonProps } from 'element-plus'

export default defineComponent({
  props: {
    ...skeletonProps,
    size: {
      type: Number,
      default: 80
    }
  },
  setup(props) {
    const Size = computed(() => {
      return props.size + 'px'
    })
    return {
      Size
    }
  }
})
</script>

<style lang="less" scoped>
.songSkeleton {
  display: flex;
  gap: 12px;
}
.songItem {
  width: v-bind(Size);
  height: v-bind(Size);
  border-radius: @border-radius-base;
  background: #fafafa;
  overflow: hidden;

  .el-skeleton__image {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}
</style>
