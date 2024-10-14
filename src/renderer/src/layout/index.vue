<template>
  <div class="layout">
    <MenuCom @change="changeMenu" />
    <div class="content">
      <RouterViewContent :reverse="reverseState" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import MenuCom from './menu/index.vue'

const layoutBg = ref('#f5f5f5')

const reverseState = ref(false)

const changeMenu = (item, oldActiveIndex, index) => {
  console.log(item)
  console.log(oldActiveIndex, index)
  reverseState.value = oldActiveIndex < index
}
</script>
<style lang="less" scoped>
.layout {
  height: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  background: v-bind(layoutBg);
  .content {
    flex: 1;
    overflow: hidden;
  }
}

@media (max-width: 480px) {
  .layout {
    flex-direction: column;
  }
}
</style>
: any: number: number
