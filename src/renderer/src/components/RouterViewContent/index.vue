<template>
  <div class="RouterView">
    <router-view v-slot="{ Component }" :name="name">
      <transition
        :css="false"
        type="animation"
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter"
        @leave="leave"
        @after-leave="$emit('afterLeave')"
      >
        <keep-alive :include="['HomeIndex']">
          <component :is="Component" ref="pageRef" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script lang="ts" setup>
import gsap from 'gsap'
import { reactive, ref, computed, nextTick } from 'vue'
const props = withDefaults(
  defineProps<{
    name?: string
    reverse?: boolean
    disabled?: boolean
  }>(),
  {
    name: 'home'
  }
)
const emit = defineEmits(['beforeEnter', 'afterLeave'])

//路由过渡动画
const pageRef = ref(null)

const fromStyle = reactive({
  position: 'absolute',
  width: '100%',
  top: 0,
  backfaceVisibility: 'hidden'
})
const toStyle = reactive({
  position: 'static',
  width: '100%',
  top: 'auto',
  backfaceVisibility: 'hidden'
})

//计算属性
const X = computed(() => {
  return props.disabled ? 0 : props.reverse ? '-100%' : '100%'
})
const Left = computed(() => {
  return props.disabled ? 0 : !props.reverse ? '-100%' : '100%'
})

//方法
const beforeEnter = async (el) => {
  Object.assign(el.style, fromStyle)
  await nextTick()
  gsap.set(el, {
    x: Left.value,
    ease: 'none'
  })
  emit('beforeEnter')
}

const enter = async (el, done) => {
  await nextTick()
  gsap.to(el, {
    lazy: true,
    duration: 0.6,
    x: 0,
    ease: 'circ',
    onComplete: done
  })
}
const leave = async (el, done) => {
  await nextTick()
  gsap.to(el, {
    lazy: true,
    duration: 0.6,
    x: X.value,
    ease: 'circ',
    onComplete: done
  })
}

const afterEnter = async (el) => {
  await nextTick()
  Object.assign(el.style, toStyle)
}
</script>

<style lang="less" scoped>
.RouterView {
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
}
</style>
