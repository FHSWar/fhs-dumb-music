<template>
<!--  <div class="normal-player">-->
  <!--    <div class="normal-player" v-show="this.$store.getters.isFullScreen">-->
  <transition
    :css="false"
    @enter="enter"
    @leave="leave">
    <div class="normal-player" v-show="this.isFullScreen">
      <div class="player-wrapper">
        <PlayerHeader/>
        <PlayerMiddle :currentTime="currentTime"/>
        <PlayerBottom :totalTime="totalTime" :currentTime="currentTime"/>
      </div>
      <div class="player-bg">
        <img :src="currentSong.picUrl" alt="">
      </div>
    </div>
  </transition>
</template>

<script>
import PlayerHeader from './PlayerHeader'
import PlayerMiddle from './PlayerMiddle'
import PlayerBottom from './PlayerBottom'
import { mapGetters, mapActions } from 'vuex' // mapGetters, 使用 getter 更方便!
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'

export default {
  name: 'NormalPlayer',
  components: {
    PlayerHeader,
    PlayerMiddle,
    PlayerBottom
  },
  props: {
    totalTime: {
      type: Number,
      default: 0,
      required: true
    },
    currentTime: {
      type: Number,
      default: 0,
      required: true
    }
  },
  computed: {
    ...mapGetters([
      'isFullScreen',
      'currentSong'
    ])
  },
  methods: {
    ...mapActions([
      'getSongLyric'
    ]),
    enter (el, done) {
      Velocity(el, 'transition.slideLeftIn', { duration: 250 }, function () {
        done()
      })
    },
    leave (el, done) {
      Velocity(el, 'transition.slideLeftOut', { duration: 250 }, function () {
        done()
      })
    }
  },
  watch: {
    currentSong (newValue, _) {
      if (newValue.id === undefined) {
        return
      }
      this.getSongLyric(newValue.id)
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/css/variable";
@import "../../assets/css/mixin";
.normal-player{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  @include bg_sub_color();
  .player-wrapper{
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 3;
  }
  .player-bg{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    img{
      height: 100%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      filter: blur(10px);
    }
  }
}
</style>
