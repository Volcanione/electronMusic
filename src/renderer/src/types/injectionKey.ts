import type { InjectionKey } from 'vue'

export const AudioElementKey = Symbol() as InjectionKey<any>

export type MediaParam = {
  duration: number
  currentTime: number
  progress: number
  playState: boolean
  error?: {
    code: number
    msg: string
  }
}

export const MediaParamKey = Symbol() as InjectionKey<MediaParam>
