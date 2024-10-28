<template>
  <div class="player">
    <div class="header">
      <PlayerHeader v-model:active="activeType" @close="emit('close')" />
    </div>
    <div class="contentPanel">
      <Panel :active="activeType">
        <div class="musicPanel">
          <div class="songDisc">
            <Disc :src="nowPlayData?.picUrl" :player-state="mediaParam.playState" />
          </div>
          <div class="name">
            <span class="title ellipsis">{{ nowPlayData?.name || 'nomusic' }} </span>
            <span class="arts">{{ nowPlayData?.song?.artists[0]?.name || '-' }}</span>
          </div>
          <div class="lineLyric">
            <Lyric :key="nowPlayData?.id" :lyric="musicLyric" line />
          </div>
        </div>
        <div class="musicInfo">
          <div class="name">
            <span class="title ellipsis">{{ nowPlayData?.name || 'nomusic' }} </span>
            <span class="arts">{{ nowPlayData?.song?.artists[0]?.name || '-' }}</span>
          </div>
          <div class="lyric">
            <Lyric :key="nowPlayData?.id" :lyric="musicLyric" @change-progress="changeProgress" />
          </div>
        </div>
      </Panel>
    </div>

    <div class="footer">
      <ProgressBar
        :value="mediaParam.progress"
        class="ProgressBar"
        :disabled="!mediaParam.duration"
        @change="changeProgress"
      />
      <Controller />
    </div>
    <div class="playBg">
      <!-- <div
        class="filter"
        :style="{
          'background-image': `url('${BgUrl}?param=500y500')`
        }"
      ></div> -->
      <img class="filter" :src="`${BgUrl}?param=500y500`" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import PlayerHeader from './header.vue'
import ProgressBar from './Progress.vue'
import Controller from './controller.vue'
import Disc from './components/disc.vue'
import Panel from './components/panel.vue'
import Lyric from './components/lyric.vue'
import BgUrl from '@renderer/assets/bg.png?url'
import { PlayerHook } from '@renderer/hooks/playerHook'
const { mediaParam, changeProgress, nowPlayData, musicLyric } = PlayerHook()

const emit = defineEmits(['close'])

const activeType = ref(0)

// const changeProgress = (data) => {
//   console.log(data)
// }
</script>

<style lang="less" scoped>
.player {
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  color: #fff;

  .header {
    height: 50px;
    display: flex;
  }
  .contentPanel {
    flex: 1;
    // margin: 0 20px;
    overflow: hidden;
    .musicPanel {
      overflow: hidden;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .songDisc {
        flex-shrink: 0;
        flex: 2;
        display: flex;
        align-items: center;
        justify-content: center;
        max-width: 320px;
        width: 80%;
      }
      .name {
        margin-bottom: 20px;
      }
      .lineLyric {
        margin-bottom: 40px;
      }
    }
    .musicInfo {
      overflow: hidden;
      display: flex;
      flex-direction: column;

      .name {
        opacity: 0;
        position: absolute;
        max-width: 500px;
      }
      .lyric {
        flex: 1;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    }
    .name {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
      align-self: start;
      transition: all 0.3s;
      width: 100%;
      padding: 0 20px;
      .title {
        font-size: 20px;
      }

      .arts {
        font-size: 12px;
      }
    }
    .lineLyric {
      width: 100%;
      padding: 0 20px;
      transition: all 0.3s;
      max-height: 56px;
    }
  }

  .footer {
    height: 130px;
    display: flex;
    flex-direction: column;
    .ProgressBar {
      margin: 0 20px;
    }
  }

  .playBg {
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
    -webkit-filter: blur(20px);
    background: rgba(0, 0, 0, 0.9);
    filter: blur(20px);

    .filter {
      display: block;
      width: 100%;
      height: 100%;
      opacity: 0.6;
      object-fit: cover;
    }
  }
}

@media (min-width: 768px) {
  .contentPanel {
    .musicPanel {
      .name,
      .lineLyric {
        opacity: 0 !important;
      }
    }
    .musicInfo {
      .name {
        opacity: 1 !important;
        position: relative !important;
        padding-bottom: 10px;
      }
      .lyric {
        align-items: self-start !important;
      }
    }
  }
}
</style>
