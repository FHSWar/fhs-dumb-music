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
      'songs'
    ])
  },
  methods: {
    ...mapActions([
      'setCurrentIndex'
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
        const index = this.getRandomIntInclusive(0, this.songs.length - 1)
        this.setCurrentIndex(index)
      }
    },
    getRandomIntInclusive (min, max) {
      min = Math.ceil(min)
      max = Math.floor(max)
      return Math.floor(Math.random() * (max - min + 1)) + min // 含最大值，含最小值
    }
  },
  watch: {
    isPlaying (newValue, _) {
      if (newValue) {
        this.$refs.audio.play()
      } else {
        this.$refs.audio.pause()
      }
    },
    currentIndex () {
      this.$refs.audio.oncanplay = () => {
        this.totalTime = this.$refs.audio.duration
        if (this.isPlaying) {
          this.$refs.audio.play()
        } else {
          this.$refs.audio.pause()
        }
      }
    },
    curTime (newValue, _) {
      this.$refs.audio.currentTime = newValue
    }
  },
  mounted () {
    this.$refs.audio.oncanplay = () => {
      this.totalTime = this.$refs.audio.duration
    }
  }
}
</script>

<style scoped lang="scss">

</style>
