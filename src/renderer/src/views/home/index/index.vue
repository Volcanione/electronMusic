<template>
  <ScrollPage :init="init" :pull-down="pullDownrefresh">
    <Flex align="stretch" class="mt20" wrap="wrap">
      <Slide :data="bannerList" class="banner mb20" />
      <Card style="flex: 1" class="mlr20 mb20" title="推荐歌单" size="small">
        <template #extra>
          <a href="#">更多</a>
        </template>
        <ScrollBox :reload="reloadSongList">
          <SongItem
            v-for="song in suggestedSongList"
            :key="song.id"
            v-bind="song"
            :size="100"
            class="mr12 lastMr0"
            >1</SongItem
          >
        </ScrollBox>
      </Card>
    </Flex>
    <Card title="推荐新歌" class="transparent" size="small">
      <template #extra>
        <a href="#">更多</a>
      </template>
      <div v-for="music in suggestedMusic" :key="music.id" @click="checkMusicPlaying(music)">
        {{ music.name }}
      </div>
    </Card>
  </ScrollPage>
</template>

<script lang="ts" setup>
import {} from 'vue'
import { Flex, Card } from 'ant-design-vue'
import { IndexHook } from '@renderer/hooks/homeHook'
import { PlayerHook } from '@renderer/hooks/playerHook'

defineOptions({
  name: 'HomeIndex'
})

// const { message } = App.useApp()

const { checkMusicPlaying } = PlayerHook()

const {
  getBanner,
  bannerList,
  suggestedSongList,
  getSuggestedSongList,
  suggestedSongListParam,
  getSuggestedMusic,
  suggestedMusic
} = IndexHook()

//页面初始化函数
const init = async (Bs?: any) => {
  console.log(Bs)
  try {
    await getBanner()
    await getSuggestedSongList()
    await getSuggestedMusic()
  } catch (error) {
    //
  }
}

//重载

const reloadSongList = async (more: boolean) => {
  try {
    Object.assign(suggestedSongListParam, {
      limit: more ? 20 : 10
    })
    await getSuggestedSongList()
  } catch (error) {
    //
  }
}

// //方法
const pullDownrefresh = async (done) => {
  await init()
  done()
}
</script>

<style lang="less" scoped>
.item {
  width: 100px;
  height: 100px;
  background: red;
  &:last-child {
    margin-right: 0;
  }
}

@media (min-width: 768px) {
  .banner {
    max-width: 500px;
  }
}
</style>
