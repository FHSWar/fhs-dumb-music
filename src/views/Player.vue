<template>
  <div class="player">
    <NormalPlayer :totalTime="totalTime" :currentTime="currentTime"/>
    <MiniPlayer/>
    <ListPlayer ref="listPlayer"/>
    <audio :src="currentSong.url" ref="audio" @timeupdate="timeupdate" @ended="end"/>
  </div>
</template>

<script>
import NormalPlayer from '../components/Player/NormalPlayer'
import MiniPlayer from '../components/Player/MiniPlayer'
import ListPlayer from '@/components/Player/ListPlayer'
import { mapGetters, mapActions } from 'vuex'
import mode from '../store/modeType'
import { getRandomIntInclusive, setLocalStorage, getLocalStorage } from '@/tools/tools'

export default {
  name: 'Player',
  components: {
    NormalPlayer,
    MiniPlayer,
    ListPlayer
  },
  data () {
    return {
      totalTime: 0,
      currentTime: 0
    }
  },
  computed: {
    ...mapGetters([
      'currentSong',
      'isPlaying',
      'currentIndex',
      'curTime',
      'modeType',
      'songs',
      'favoriteList',
      'historyList'
    ])
  },
  methods: {
    ...mapActions([
      'setCurrentIndex',
      'setFavoriteList',
      'setHistorySong',
      'setHistoryList'
    ]),
    timeupdate (e) {
    // console.log(e.target.currentTime)
      this.currentTime = e.target.currentTime
    },
    end () {
      if (this.modeType === mode.loop) {
        this.setCurrentIndex(this.currentIndex + 1)
      } else if (this.modeType === mode.one) {
        this.$refs.audio.play()
      } else if (this.modeType === mode.random) {
        const index = getRandomIntInclusive(0, this.songs.length - 1)
        this.setCurrentIndex(index)
      }
    }
  },
  watch: {
    isPlaying (newValue, _) {
      this.setHistorySong(this.currentSong)
      if (newValue) {
        this.$refs.audio.play()
      } else {
        this.$refs.audio.pause()
      }
    },
    currentIndex () {
      /*
      注意点: 在 iOS 中系统不会自动加载歌曲, 所以 oncanplay 不会自动执行
              https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/AudioandVideoTagBasics/AudioandVideoTagBasics.html
              在PC端和Android端, 系统会自动加载歌曲, 所以 oncanplay 会自动被执行
      解决方案: 如何监听 iOS 中 Audio 的歌曲是否已经准备好了, 通过 ondurationchange 事件来监听
                ondurationchange 事件什么时候执行: 当歌曲加载完成之后执行, 因为只有歌曲加载完成之后才能获取到歌曲的总时长
      */
      // this.$refs.audio.oncanplay = () => {
      this.$refs.audio.ondurationchange = () => {
        this.totalTime = this.$refs.audio.duration
        if (this.isPlaying) {
          this.setHistorySong(this.currentSong)
          this.$refs.audio.play()
        } else {
          this.$refs.audio.pause()
        }
      }
    },
    curTime (newValue, _) {
      this.$refs.audio.currentTime = newValue
    },
    favoriteList (newValue, _) {
      // 正经流程应该要存到服务器, 网易云 api 没提供这个接口, 所以用 localStorage 凑合一下
      // localStorage 只能存储字符串
      // window.localStorage.setItem('favoriteList', JSON.stringify(newValue))
      setLocalStorage('favoriteList', newValue)
    },
    historyList (newValue, oldValue) {
      // window.localStorage.setItem('historyList', JSON.stringify(newValue))
      setLocalStorage('historyList', newValue)
    }
  },
  created () {
    // 从 loaalStorage 里面拿出来放进 vuex 里
    // const favoriteList = JSON.parse(window.localStorage.getItem('favoriteList'))
    const favoriteList = getLocalStorage('favoriteList')
    // 取空不行, 因为初始值得是个空数组而非 null
    if (favoriteList === null) { return }
    this.setFavoriteList(favoriteList)
    // const historyList = JSON.parse(window.localStorage.getItem('historyList'))
    const historyList = getLocalStorage('historyList')
    if (historyList === null) { return }
    this.setHistoryList(historyList)
  },
  mounted () {
    // this.$refs.audio.oncanplay = () => {
    this.$refs.audio.ondurationchange = () => {
      this.totalTime = this.$refs.audio.duration
    }
  }
}
</script>

<style scoped lang="scss">

</style>
