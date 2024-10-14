import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'
import dynamicImport from 'vite-plugin-dynamic-import'
import vueJsx from '@vitejs/plugin-vue-jsx'
import dsv from '@rollup/plugin-dsv'
import svgLoader from 'vite-svg-loader'
import json5Plugin from 'vite-plugin-json5'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig(({ mode }) => {
  console.log(mode)
  return {
    main: {
      plugins: [externalizeDepsPlugin()]
    },
    preload: {
      plugins: [externalizeDepsPlugin()]
    },
    renderer: {
      server: {
        host: '0.0.0.0',
        port: 4000, //启动端口
        // open: true,
        proxy: {
          // 第一个代理
          '/api': {
            // 匹配到啥来进行方向代理
            // target: "http://localhost:3000", //对应自己的接口
            target: 'http://47.111.144.121:3000', //对应自己的接口
            changeOrigin: true,
            ws: true,
            rewrite: (path) => path.replace(/^\/api/, '') // 如果不需要api 直接把路径上的api 替换成空，这个
          }
        }
      },
      resolve: {
        alias: {
          '@renderer': resolve('src/renderer/src')
        }
      },
      plugins: [
        vue(),
        dynamicImport(),
        vueJsx({}),
        dsv(),
        svgLoader(),
        json5Plugin(),
        Components({
          resolvers: [
            AntDesignVueResolver({
              importStyle: false // css in js
            })
          ]
        })
      ],
      css: {
        preprocessorOptions: {
          less: {
            javascriptEnabled: true,
            modifyVars: {
              'primary-color': '#3A7CFF',
              'text-color': '#313233',
              'text-color2': '#626366',
              'text-color3': '#939599',
              'border-radius-base': '4px',
              'form-vertical-label-padding': ' 0 0 7px',
              'tree-title-height': '20px'
            }
          }
        }
      },
      optimizeDeps: {
        include: ['dayjs/locale/zh-cn']
      }
    }
  }
})
