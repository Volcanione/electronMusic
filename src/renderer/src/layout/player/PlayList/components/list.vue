<template>
  <LayerPage class="playList">
    <template #header>
      <div class="header">
        <Mode tip />

        <span><i class="iconfont">&#xe601;</i></span>
      </div>
    </template>
    <div class="contentBox">
      <transition
        :enter-active-class="`animate__animated animate__fadeIn${type === 1 ? 'Left' : 'Right'} `"
        :leave-active-class="`animate__animated animate__fadeOut${type === 2 ? 'Left' : 'Right'} `"
        mode="out-in"
      >
        <div v-if="type === 1">
          <div v-for="item in playerList" :key="`now_${item.id}`" class="item">
            <i v-if="nowPlayData?.id === item.id" class="iconfont playing">&#xe610;</i
            ><span class="name ellipsis">{{ item.name }} </span
            ><span class="remove"><i class="iconfont">&#xe600;</i></span>
          </div>
        </div>

        <div v-else>
          <div v-for="item in playerHisList" :key="`his_${item.id}`" class="item">
            <i v-if="nowPlayData?.id === item.id" class="iconfont playing">&#xe610;</i>
            <span class="name ellipsis">{{ item.name }} </span
            ><span class="remove"><i class="iconfont">&#xe600;</i></span>
          </div>
        </div>
      </transition>
    </div>
    <template #footer>
      <div class="footer">
        <Tabbar
          v-model:active="type"
          :options="[
            {
              label: '播放列表',
              value: 1
            },
            {
              label: '历史列表',
              value: 2
            }
          ]"
        />
      </div>
    </template>
  </LayerPage>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { PlayerHook } from '@renderer/hooks/playerHook'
import Mode from '@renderer/layout/player/PlayerController/components/mode.vue'

const { playerHisList, playerList, playerConfig, nowPlayData } = PlayerHook()

const type = ref(1)
</script>

<style lang="less" scoped>
.playList {
  .header {
    height: 40px;
    display: flex;
    align-items: center;
    padding: 0 10px;
    justify-content: space-between;
  }
  .contentBox {
    .item {
      padding: 0 10px;
      height: 40px;
      display: flex;
      align-items: center;
      overflow: hidden;
      .playing {
        margin-right: 10px;
      }
      .remove {
        margin-right: 0;
        margin-left: auto;
      }
      .name {
        padding-right: 10px;
      }
    }
  }
  .footer {
    height: 40px;
    display: flex;
    align-items: center;
    z-index: 22;
    position: relative;
    :deep(.TABBER) {
      .root {
        width: 100%;
        .bar {
          justify-content: space-around;
        }
      }
    }
  }
}
</style>
