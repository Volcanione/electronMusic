import request from '@renderer/utils/request'
//获取banner
export function Banner(data: any = {}) {
  return request({ url: '/banner', method: 'post', data })
}

//请求推荐歌单
export function SuggestedSongList(data: any = {}) {
  return request({ url: '/personalized', method: 'post', data })
}

//请求推荐歌曲
export function SuggestedMusic(data: any = {}) {
  return request({ url: '/personalized/newsong', method: 'post', data })
}

//检查是否可以播放
export function CheckMusic(data: any = {}) {
  return request({ url: '/check/music', method: 'post', data })
}

//获取音乐地址

export function MusicUrl(data: any = {}) {
  return request({ url: '/song/url/v1', method: 'post', data })
}

//获取歌词地址

export function MusicLyric(data: any = {}) {
  return request({ url: '/lyric', method: 'post', data })
}
