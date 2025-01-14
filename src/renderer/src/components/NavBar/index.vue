<template>
  <div class="Nav" :class="{ fixed: fixed }">
    <div class="NavWapper">
      <div class="left">
        <slot name="left" />
        <span v-if="!$slots.left" class="back" @click="handlerBack">
          <i class="iconfont">&#xe603;</i>
        </span>
      </div>
      <div class="content" :class="{ padR: !$slots.right }">
        <div class="ellipsis">
          <slot />
        </div>
      </div>
      <div v-if="$slots.right" class="right">
        <slot name="right" />
      </div>
    </div>
    <div class="bgImg" :style="style"></div>
  </div>
</template>

<script lang="ts" setup>
import { PageRouteConfig } from '@renderer/utils/index'

const props = defineProps<{
  back?: (router: any, route: any) => void
  style?: any
  fixed?: boolean
}>()

const { router, route } = PageRouteConfig()

const handlerBack = () => {
  if (props.back) {
    return props.back(router, route)
  }
  router.go(-1)
}
</script>
<style lang="less" scoped>
.Nav {
  width: 100%;
  position: relative;
  z-index: 2;

  .NavWapper {
    display: flex;
    justify-content: space-between;
    min-height: 44px;
  }

  .placeholder {
    width: 100%;
  }

  .bgImg {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
    background-position: center calc(50% - 44px);
    background-size: 100% auto;
    opacity: 0;

    overflow: hidden;

    top: 0;
  }

  .left,
  .right {
    width: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .content {
    flex: 1;
    display: flex;
    align-items: center;
    overflow: hidden;

    & > div {
      width: 100%;
    }

    &.padR {
      margin-right: 20px;
    }
  }

  .back {
    width: 44px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .iconfont {
    }
  }

  &.fixed {
    position: fixed;
    color: #333;
    background: transparent;
    overflow: hidden;
  }
}
</style>
