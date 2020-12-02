<template>
<!--  <div class="mini-player">-->
  <transition
    :css="false"
    @enter="enter"
    @leave="leave">
    <div class="mini-player" v-show="this.isShowMiniPlayer">
      <div class="player-wrapper">
  <!--      <div class="player-left">-->
        <div class="player-left" @click="showNormalPlayer">
<!--          <img src="https://y.gtimg.cn/music/photo_new/T002R300x300M000003y8dsH2wBHlo.jpg" alt="">-->
          <img src="https://y.gtimg.cn/music/photo_new/T002R300x300M000003y8dsH2wBHlo.jpg" ref="cd">
          <div class="player-title">
            <h3>演员</h3>
            <p>薛之谦</p>
          </div>
        </div>
        <div class="player-right">
<!--          <div class="play"></div>-->
          <div class="play" @click.stop="play" ref="play"></div>
  <!--        <div class="list"></div>-->
          <div class="list" @click.stop="showList"></div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'

export default {
  name: 'MiniPlayer',
  methods: {
    ...mapActions([
      'setFullScreen',
      'setMiniPlayer',
      'setIsPlaying',
      'setListPlayer'
    ]),
    showList () {
      // this.$emit('showList')
      this.setListPlayer(true)
    },
    showNormalPlayer () {
      this.setFullScreen(true)
      this.setMiniPlayer(false)
    },
    play () {
      this.setIsPlaying(!this.isPlaying)
    },
    enter (el, done) {
      Velocity(el, 'transition.slideUpIn', { duration: 25 }, function () {
        done()
      })
    },
    leave (el, done) {
      Velocity(el, 'transition.slideDownOut', { duration: 250 }, function () {
        done()
      })
    }
  },
  computed: {
    ...mapGetters([
      'isShowMiniPlayer',
      'isPlaying'
    ])
  },
  watch: {
    isPlaying (newValue, oldValue) {
      if (newValue) {
        this.$refs.play.classList.add('active')
        this.$refs.cd.classList.add('active')
      } else {
        this.$refs.play.classList.remove('active')
        this.$refs.cd.classList.remove('active')
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/css/variable";
@import "../../assets/css/mixin";
.mini-player{
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 115px;
  .player-wrapper{
    width: 100%;
    height: 100%;
    @include bg_color();
    display: flex;
    align-items: center;
    justify-content: space-between;
    .player-left{
      display: flex;
      padding-left: 30px;
      img{
        width: 80px;
        height: 80px;
        border-radius: 50%;
        margin-right: 20px;
        animation: sport 3s linear infinite;
        animation-play-state: paused;
        &.active{
          animation-play-state: running;
        }
      }
      .player-title{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        h3{
          @include font_size($font_medium);
          //@include font_color();
          color: rgb(222, 232, 232);
        }
        p{
          @include font_size($font_medium_s);
          //@include font_color();
          color: rgb(222, 232, 232);
        }
      }
    }
    .player-right{
      display: flex;
      align-items: center;
      .play{
        width: 64px;
        height: 64px;
        //@include bg_img('../../assets/images/play')
        @include bg_img('../../assets/images/play');
        &.active{
          @include bg_img('../../assets/images/pause');
        }
      }
      .list{
        width: 100px;
        height: 100px;
        @include bg_img('../../assets/images/list')
      }
    }
  }
}

@keyframes sport {
  from{
    transform: rotate(0deg);
  }
  to{
    transform: rotate(360deg);
  }
}
</style>
