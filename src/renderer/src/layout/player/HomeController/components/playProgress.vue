<template>
  <div class="proPlay">
    <div class="btn" @click="changeState">
      <i v-if="playState" class="iconfont">&#xe76a;</i>
      <i v-else class="iconfont">&#xe646;</i>
    </div>
    <!-- <svg :key="progess" class="arc" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path id="arc" fill="none" d="M 49.99 10.00 A 40.00 40.00 0 1 0 50.00 10.00" />
      <path id="graph" :style="` stroke-dashoffset: calc(251.35 / 100 * ${progess});`" fill="none" d="M 49.99 10.00 A 40.00 40.00 0 1 0 50.00 10.00" />
    </svg>-->
    <svg viewBox="0 0 100 100">
      <path
        d="
        M 50 50
        m 0 -47
        a 47 47 0 1 1 0 94
        a 47 47 0 1 1 0 -94
        "
        stroke="#e5e9f2"
        stroke-width="7"
        fill="none"
        class="el-progress-circle__track"
        style="stroke-dasharray: 295.31px, 295.31px; stroke-dashoffset: 0px"
      />
      <path
        v-if="progress"
        d="
        M 50 50
        m 0 -47
        a 47 47 0 1 1 0 94
        a 47 47 0 1 1 0 -94
        "
        stroke="#20a0ff"
        fill="none"
        stroke-linecap="round"
        stroke-width="7"
        class="el-progress-circle__path"
        :style="`stroke-dasharray: ${
          (295.31 / 100) * progress
        }px, 295.31px; stroke-dashoffset: 1px; transition: stroke-dasharray 0.6s ease 0s, stroke 0.6s ease 0s;`"
      />
    </svg>
  </div>
</template>
<script lang="ts" setup>
defineProps<{
  progress: number
  playState: boolean
}>()

const emit = defineEmits(['play'])

//常量

//方法
const changeState = () => {
  emit('play')
}
</script>

<style lang="less" scoped>
.proPlay {
  width: 38px;
  height: 38px;
  position: relative;
  .btn {
    position: relative;
    z-index: 1;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .iconfont {
      color: #999;
    }
  }
  svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 38px;
    height: 38px;
    stroke: #da5a51;
  }
  #arc {
    stroke-width: 6px;
  }
  #graph {
    stroke: #cecece;
    transition: stroke-dashoffset 0.8s ease-out;
    stroke-width: 6px;
    stroke-dasharray: 251.35;
  }
}
</style>
