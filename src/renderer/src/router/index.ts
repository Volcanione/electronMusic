import { createRouter, createWebHashHistory } from 'vue-router'

export const constantRoutes = [
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
  }
]

const router = createRouter({
  history: createWebHashHistory('/'),
  routes: constantRoutes
})
export default router
