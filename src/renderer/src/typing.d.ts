/* eslint-disable */
import Vue from 'vue'
declare module 'vue' {
  // 扩展全局变量的接口内容，需要扩展ComponentCustomProperties这个接口，不要乱改成别的
 export interface ComponentCustomProperties {
    $formatDate: (time: string, rule: string, format: string) => string
    $formatTime: (time: string, format?: string) => string
    $routerBack: (path?: string) => void
  }
}
