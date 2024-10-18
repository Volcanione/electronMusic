import { ref, reactive, inject, Ref, computed } from 'vue'
import { AudioElementKey, MediaParamKey } from '@renderer/types/injectionKey'
// import { App } from 'ant-design-vue'

export const AudioHook = () => {
  // const { message } = App.useApp()
  const audioElement = ref<HTMLAudioElement>()
  const mediaParam = reactive({
    duration: 0,
    currentTime: 0,
    playState: false,
    progress: computed(() => {
      if (!mediaParam.duration) {
        return 0
      }
      return +((mediaParam.currentTime / mediaParam.duration) * 100).toFixed(3)
    }),
    error: undefined
  }) as {
    duration: number
    currentTime: number
    playState: boolean
    progress: number
    error: any
    onended?: () => void
  }
  const initAudio = () => {
    audioElement.value = new Audio()
    audioElement.value.preload = 'metadata'
    audioElement.value.crossOrigin = 'anonymous'

    try {
      //异常处理

      audioElement.value.onerror = () => {
        const error = { code: 0, msg: '无效音乐地址' }
        // message.error(error.msg)
        Object.assign(mediaParam, {
          error
        })
      }

      //获取时长
      audioElement.value.onloadeddata = () => {
        Object.assign(mediaParam, {
          duration: audioElement.value?.duration || 0
        })
        console.log(mediaParam)
      }

      //当前播放时间
      audioElement.value.ontimeupdate = () => {
        Object.assign(mediaParam, {
          currentTime: audioElement.value?.currentTime || 0
        })
      }

      //播放结束
      audioElement.value.onended = () => {
        // console.log('播放结束')
        mediaParam.onended && mediaParam.onended()
      }
    } catch (error) {
      //
    }
  }

  // watch(
  //   () => mediaParam.progress,
  //   (val) => {
  //     // console.log(val)
  //   }
  // )

  return {
    initAudio,
    audioElement,
    mediaParam
  }
}

export const AudioOperatorHook = () => {
  const audioElement = inject<Ref<HTMLAudioElement>>(AudioElementKey, ref(new Audio()))
  const mediaParam = inject(
    MediaParamKey,
    reactive({ duration: 0, currentTime: 0, progress: 0, playState: false, error: undefined })
  )

  //设置url
  const setAudioElementUrl = (url: string) => {
    if (!audioElement || !audioElement.value || !url) {
      return
    }
    audioElement.value.src = url
  }

  //异常处理

  //播放
  const setAudioElementState = async (state?: boolean) => {
    //state true 播放，false 暂停
    if (!audioElement || !audioElement.value || mediaParam?.error || !audioElement.value.src) {
      Object.assign(mediaParam, {
        playState: false
      })
      return Promise.reject({ code: 0, msg: '无效音乐地址' })
    }
    Object.assign(mediaParam, {
      playState: typeof state === 'boolean' ? state : !mediaParam.playState
    })
    try {
      if (mediaParam.playState) {
        await audioElement.value.play()
        console.log('播放中')
      } else {
        audioElement.value.pause()
        console.log('已暂停')
      }
    } catch (error) {
      //
      return Promise.reject(error)
    }
  }
  //进度切换
  const changeProgress = (progress: number) => {
    audioElement.value.currentTime = (progress / 100) * mediaParam.duration
  }

  return {
    audioElement,
    setAudioElementUrl,
    setAudioElementState,
    mediaParam,
    changeProgress
  }
}
