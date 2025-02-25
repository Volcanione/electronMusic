<template>
  <LayerPage auto-pull-down-refresh :pull-down="pullDownrefresh">
    <template #header>
      <NavBar>
        <a-input-search :placeholder="defaultSearch || 'Search'" @search="search">
          <template #prefix>
            <img :src="searchIcon" class="searchIcon" />
          </template>
        </a-input-search>
      </NavBar>
    </template>

    <div>
      <Card title="搜索历史" class="transparent searchHistory" size="small">
        <template #extra>
          <span class="clear">清空</span>
        </template>
        <ScrollBox>
          <div v-for="item in 20" :key="item" class="historyItem">{{ item }}</div>
        </ScrollBox>
      </Card>
      <Card title="热门搜索" class="transparent hotSearch" size="small">
        <div v-for="item in HotSearchList" :key="item.score" class="hotItem">
          {{ item.searchWord }}
        </div>
      </Card>
    </div>
  </LayerPage>
</template>
<script lang="ts" setup>
import { Card } from 'ant-design-vue'
import searchIcon from '@renderer/assets/tigers.svg?url'
import { SearchHook } from '@renderer/hooks/searchHook'

const { getDefaultSearch, defaultSearch, search, getHotSearch, HotSearchList } = SearchHook()

const init = () => {
  try {
    getDefaultSearch()
    getHotSearch()
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
.searchIcon {
  height: 20px;
}

.searchHistory {
  margin-top: 10px;

  .clear {
    color: @text-color3;
    cursor: pointer;
  }

  .historyItem {
    padding: 0 15px;
    background: #fff;
    border-radius: 4px;
    margin-right: 20px;
    line-height: 30px;

    &:first-child {
      margin-left: 20px;
    }
  }

  :deep(.ant-card-body) {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
}

.hotSearch {
  :deep(.ant-card-body) {
    display: grid;
    grid-template-columns: 50% 50%;
    gap: 10px;

    &::before {
      display: none !important;
    }
  }

  .hotItem {
  }
}
</style>
