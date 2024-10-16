import { storePlayer } from '@renderer/pinia/player'
import { AudioOperatorHook } from '@renderer/hooks/audioHook'
import { MusicHook } from '@renderer/hooks/musicHook'

export const PlayerHook = () => {
  const { setAudioElementUrl, setAudioElementState, mediaParam } = AudioOperatorHook()
  const { getMusicUrl } = MusicHook()
  const { playerConfig, addMusicPlating } = storePlayer()

  //选择并播放
  const checkMusicPlaying = async (data) => {
    console.log(data)
    try {
      await getMusicUrl(data)
    } catch (error) {
      //
    }
  }

  //播放暂停

  const playPause = async () => {
    try {
      await setAudioElementState()
    } catch (error) {
      //
    }
  }

  return { checkMusicPlaying, mediaParam, playPause }
}
