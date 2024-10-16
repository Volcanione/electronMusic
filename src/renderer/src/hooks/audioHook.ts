import { ref, reactive, inject, Ref, computed, watch } from 'vue'
import { AudioElementKey, MediaParamKey } from '@renderer/types/injectionKey'
import { App } from 'ant-design-vue'

export const AudioHook = () => {
  const { message } = App.useApp()
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
  })
  const initAudio = () => {
    audioElement.value = new Audio()
    audioElement.value.preload = 'metadata'
    audioElement.value.crossOrigin = 'anonymous'

    try {
      //异常处理

      audioElement.value.onerror = () => {
        const error = { code: 0, msg: '无效音乐地址' }
        message.error(error.msg)
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
    } catch (error) {
      //
    }
  }

  watch(
    () => mediaParam.progress,
    (val) => {
      console.log(val)
    }
  )

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
  const setAudioElementUrl = () => {
    if (!audioElement || !audioElement.value) {
      return
    }
    audioElement.value.src =
      'http://m801.music.126.net/20241015184440/0e9d3942ed86bc097820beb174efb2d7/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/55629204206/0151/48a3/dc22/4eff5c7ceeba80b5865f0bf23f5d39d0.mp3'

    // setTimeout(() => {
    //   audioElement.value.src =
    //     'http://m801.music.126.net/20241015175443/d6732dffb3bad0f74b77b5385604bfb9/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/55631358445/d85a/3cb2/d4c5/5ec502f3a708a07120bfec5f0139acc7.mp3'
    // }, 5000)
  }

  //异常处理

  //播放
  const setAudioElementState = async () => {
    //state true 播放，false 暂停
    if (!audioElement || !audioElement.value || mediaParam?.error || !audioElement.value.src) {
      return
    }
    Object.assign(mediaParam, {
      playState: !mediaParam.playState
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
    }
  }

  return {
    audioElement,
    setAudioElementUrl,
    setAudioElementState,
    mediaParam
  }
}
