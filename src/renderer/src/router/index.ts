import { createRouter, RouteRecordRaw, createWebHistory } from 'vue-router'

export const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    name: 'Index',
    meta: {
      title: '推荐',
      icon: '&#xe63b;'
    },
    components: {
      home: () => import('@renderer/views/home/index/index.vue')
    }
  },
  {
    path: '/music',
    name: 'Music',
    meta: {
      title: '音乐馆',
      icon: '&#xe610;'
    },
    components: {
      home: () => import('@renderer/views/home/music/index.vue')
    }
  },
  {
    path: '/radio',
    name: 'Radio',
    meta: {
      title: '电台',
      icon: '&#xe7e5;'
    },
    components: {
      home: () => import('@renderer/views/home/radio/index.vue')
    }
  },
  {
    path: '/search',
    name: 'Search',
    components: {
      layer: () => import('@renderer/views/layer/search/index.vue')
    }
  },
  {
    path: '/search/:value',
    name: 'SearchResult',
    components: {
      layer: () => import('@renderer/views/layer/search/result.vue')
    }
  }
]

const router = createRouter({
  history: createWebHistory('/'),
  routes: constantRoutes
})

export default router
