<template>
  <transition name="fade">
    <div v-show="visible" class="Layer">
      <router-view v-slot="{ Component }" name="layer">
        <transition :css="false" @before-enter="beforeEnter" @enter="enter" @leave="leave">
          <component :is="Component" class="layerRouteView" />
        </transition>
      </router-view>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue'
import gsap from 'gsap'
import { PageRouteConfig } from '@renderer/utils/index'
import { RouterHook } from '@renderer/hooks/routerHook'

const { route, router } = PageRouteConfig()
const { historyRoute } = RouterHook()
//
const visible = computed(() => {
  return !!router.getRoutes().find((item) => item.components?.layer && route.name === item.name)
})

const backState = ref(false) //后退状态

const beforeEnter = (el) => {
  // console.log(historyRoute.map((item) => item.fullPath))
  // console.log(route.fullPath)
  // const idx = historyRoute.findIndex((item) => item.name === route.name)
  // console.log(idx)
  gsap.set(el, {
    x: backState.value ? '0' : '100%',
    opacity: 0
  })
}

const enter = (el, done) => {
  gsap.to(el, { x: 0, opacity: 1, onComplete: done })
}

const leave = async (el, done) => {
  gsap.to(el, {
    duration: 0.4,
    x: backState.value ? '100%' : '0',
    onComplete: done
  })
}

watch(
  () => historyRoute.length,
  (val, old) => {
    backState.value = val < old
    console.log(backState.value)
  }
)
</script>

<style lang="less" scoped>
.Layer {
  position: absolute;
  z-index: 1;
  top: 0;
  bottom: 60px;
  left: 60px;
  width: 100%;
  background: #fff;
  .layerRouteView {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
  }
}

@media (max-width: 576px) {
  .Layer {
    left: 0;
    bottom: 0;
  }
}
</style>
