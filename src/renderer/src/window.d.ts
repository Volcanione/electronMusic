declare interface Window {
  api: {
    exit: () => void
  }
  webkitAudioContext: AudioContext
  mozAudioContext: AudioContext
}
