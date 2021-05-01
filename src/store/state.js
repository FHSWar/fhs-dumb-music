import mode from './modeType'
export default {
  // 现在终于懂得为什么 Vuex 叫作状态管理了
  isFullScreen: false,
  isShowMiniPlayer: true,
  isPlaying: false,
  modeType: mode.loop,
  isShowListPlayer: false,
  songs: [],
  currentSong: {},
  currentIndex: 0,
  currentLyric: {},
  currentTime: 0
}
