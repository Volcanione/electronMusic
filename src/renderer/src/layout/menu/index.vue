<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="menu menuTop">
    <!-- <template v-for="item in menuList" :key="item.label">
      <div v-if="!item.customize" class="item" @click="item.fn">
        <i class="iconfont" v-html="item.icon"></i>
      </div>
      <template v-else>
        <div v-if="item.value === 'my'" :class="item.value"></div>
      </template>
</template> -->
    <div class="item">
      <i class="iconfont">&#xe78b;</i>
    </div>
    <div class="Tabbar">
      <Tabbar
        v-model:active="activeRoute"
        :options="topMenuList"
        @change="(item, oldActiveIndex, index) => $emit('change', item, oldActiveIndex, index)"
      />
    </div>
    <div class="item">
      <i class="iconfont">&#xe6e4;</i>
    </div>
  </div>
  <div class="menu menuLeft">
    <template v-for="(item, index) in menuList" :key="item.label">
      <div
        v-if="!item.customize"
        class="item"
        :class="{ active: item.value === activeRoute }"
        @click="item.fn ? item.fn() : handlerClick(item, index)"
      >
        <i class="iconfont" v-html="item.icon"></i>
      </div>
      <template v-else>
        <div v-if="item.value === 'my'" :class="item.value"></div>
      </template>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { PageRouteConfig } from '@renderer/utils/index'
import { constantRoutes } from '@renderer/router/index'

const { route, router } = PageRouteConfig()

const emit = defineEmits(['change'])

const menuTopBg = ref('#f5f5f5')
const menuLeftBg = ref('#ffffff')

//

const topMenuList = constantRoutes
  .filter((item) => {
    return item.components && item.components['home']
  })
  .map((item) => {
    return {
      icon: item.meta?.icon,
      label: item.meta?.title,
      value: item.path
    }
  })

const menuList: Array<{
  icon?: string
  label?: string
  value: string
  customize?: boolean
  fn?: () => void
}> = [
  ...topMenuList,
  {
    icon: '&#xe6e4;',
    label: '我的',
    customize: true,
    value: 'my',
    fn: () => {
      //
    }
  },
  {
    icon: '&#xe75e;',
    label: '设置',
    value: 'setting',
    fn: () => {
      //
    }
  },
  {
    icon: '&#xe600;',
    label: '关闭',
    value: 'close',
    fn: () => {
      console.log(112)
      window?.api?.exit()
    }
  }
]

//当前的路由
const activeRoute = computed({
  get() {
    return route.path
  },
  set(path) {
    router.push({ path })
  }
})

//changeMenu

const handlerClick = (item, index) => {
  const oldActiveIndex = menuList.findIndex((item) => item.value === activeRoute.value)
  if (activeRoute.value === item.value) {
    return
  }
  activeRoute.value = item.value
  emit('change', item, oldActiveIndex, index)
}
</script>

<style lang="less" scoped>
.menu {
  transition: all 0.3s;
}

.menuTop {
  height: 44px;
  width: 100%;
  background: v-bind(menuTopBg);
  margin-top: -44px;
  position: absolute;
  -webkit-app-region: drag;
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;

  .item {
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    -webkit-app-region: no-drag;

    .iconfont {
      font-size: 16px;
    }
  }

  .Tabbar {
    flex: 1;
    overflow: hidden;

    :deep(.TABBER) {
      .item {
        height: 40px;
        padding-top: 2px;
      }
    }
  }
}

.menuLeft {
  height: 100%;
  width: 60px;
  background: v-bind(menuLeftBg);
  position: relative;
  -webkit-app-region: drag;
  display: flex;
  flex-direction: column;
  align-items: center;

  .item {
    -webkit-app-region: no-drag;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    border-radius: @border-radius-base;
    color: @text-color2;
    cursor: pointer;

    .iconfont {
      font-size: 18px;
    }

    &:hover {
      color: @text-color;
    }

    &:last-child {
      margin-bottom: 20px;
    }

    &.active {
      color: @primary-color;
    }
  }

  .my {
    -webkit-app-region: no-drag;
    margin-top: auto;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #eaeaea;
    overflow: hidden;
  }
}

@media (max-width: 480px) {
  .menuTop {
    margin-top: 0;
    position: relative;
  }

  .menuLeft {
    margin-left: -60px;
    position: absolute;
  }
}
</style>
