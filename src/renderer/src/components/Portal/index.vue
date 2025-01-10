<template>
  <teleport v-if="state" :to="to">
    <transition
      v-if="animated"
      mode="out-in"
      enter-active-class="animate__animated animate__slideInUp"
      leave-active-class="animate__animated animate__slideOutDown"
    >
      <slot v-if="slotState" />
    </transition>
    <template v-else>
      <slot v-if="slotState" />
    </template>
  </teleport>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'

defineProps({
  to: {
    type: String,
    default: 'body'
  },
  animated: {
    type: Boolean,
    default: true
  }
})

const state = ref(false)
const slotState = ref(false)
onMounted(async () => {
  state.value = true
  await nextTick()
  slotState.value = true
})

defineExpose({
  state
})
</script>
<style lang="less" scoped>
/* fade-transform */
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.2s;
}

.fade-transform-enter-from {
  opacity: 0;
  transform: translateX(-5px);
}

.fade-transform-enter {
  opacity: 1;
  transform: translateX(0);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(5px);
}
</style>
