<template>
  <div class="playerHead">
    <div class="left" @click="emit('close')">
      <i class="iconfont">&#xe6ca;</i>
    </div>
    <div class="center">
      <Tabbar :active="active" :options="list" class="TabBar" @change="change" />
    </div>
    <div class="right" @click="$emit('comment')">
      <i class="iconfont">&#xe6d3;</i>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted } from 'vue'
withDefaults(
  defineProps<{
    active: number
  }>(),
  {
    active: 0
  }
)

const activeValue = defineModel<string | number>('active', { required: true })

const emit = defineEmits(['comment', 'switch', 'close'])

//常量
const list = [
  {
    label: '歌曲',
    value: 0
  },
  {
    label: '歌词',
    value: 1
  }
]

const change = (item) => {
  activeValue.value = item.value
}

onMounted(() => {})

onBeforeUnmount(() => {})
</script>
<style lang="less" scoped>
.playerHead {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  color: #fff;
  .left,
  .right {
    width: 50px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  .center {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 35px;
    position: relative;
    :deep(.TABBER) {
      width: auto;
      .root {
        .item {
          color: rgba(255, 255, 255, 0.5);
          &.active {
            color: #fff !important;
          }
        }
        .linetip {
          background: transparent;
        }
      }
    }
  }
}
.TabBar {
  transition: all 0.3s;
  display: block;
}

@media (min-width: 768px) {
  .TabBar {
    transform: translateY(-100%);
  }
}
</style>
