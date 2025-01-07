<template>
  <ElSkeleton v-bind="$props">
    <template #template>
      <div class="musicItem">
        <el-skeleton-item variant="image" />
        <div class="info">
          <div class="title">
            <el-skeleton-item variant="h3" class="name" style="width: 50%" />
            <el-skeleton-item variant="h3" class="time" style="width: 40px" />
          </div>

          <el-skeleton-item variant="text" class="arts" style="width: 20%" />
        </div>
      </div>
    </template>
    <template #default>
      <slot name="default"></slot>
    </template>
  </ElSkeleton>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { skeletonProps } from 'element-plus'

export default defineComponent({
  props: {
    ...skeletonProps
  }
})
</script>

<style lang="less" scoped>
@import './index.less';
</style>
