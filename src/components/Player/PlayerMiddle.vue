<template>
  <swiper :options="swiperOption" class="banner">
    <!-- slides -->
    <swiper-slide class="cd">
<!--      <div class="cd-wrapper">-->
      <div class="cd-wrapper" ref="cdWrapper">
<!--        <img src="https://y.gtimg.cn/music/photo_new/T002R300x300M000003y8dsH2wBHlo.jpg" alt="">-->
        <img :src="currentSong.picUrl" alt="">
      </div>
<!--      <p>everyone's a mess</p>-->
      <p>{{getFirstLyric()}}</p>
    </swiper-slide>
    <swiper-slide class="lyric">
      <ScrollView>
        <ul>
<!--          <li>我是1个li</li>-->
          <li v-for="(value, index) in currentLyric" :key="index">{{value}}</li>
        </ul>
      </ScrollView>
    </swiper-slide>
    <!-- Optional controls -->
    <div class="swiper-pagination"  slot="pagination"></div>
  </swiper>
</template>

<script>
// import 'swiper/dist/css/swiper.css' // 报错写法
import 'vue-awesome-swiper/node_modules/swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import ScrollView from '../ScrollView'
import { mapGetters } from 'vuex'

export default {
  name: 'PlayerMiddle',
  components: {
    swiper,
    swiperSlide,
    ScrollView
  },
  data () {
    return {
      swiperOption: {
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination',
          bulletClass: 'my-bullet',
          bulletActiveClass: 'my-bullet-active'
        },
        observer: true,
        observeParents: true,
        observeSlideChildren: true
      }
    }
  },
  methods: {
    getFirstLyric () {
      // 这个判空结合 .lyric 的前两行, 解决了歌词无法滚动的 bug
      if (this.currentLyric) {
        for (const key in this.currentLyric) {
          return this.currentLyric[key]
        }
      }
    }
  },
  computed: {
    ...mapGetters([
      'isPlaying',
      'currentSong',
      'currentLyric'
    ])
  },
  watch: {
    isPlaying (newValue, oldValue) {
      if (newValue) {
        this.$refs.cdWrapper.classList.add('active')
      } else {
        this.$refs.cdWrapper.classList.remove('active')
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/css/variable";
@import "../../assets/css/mixin";
.banner{
  position: fixed;
  top: 150px;
  bottom: 300px;
  left: 0;
  right: 0;
  .cd{
    .cd-wrapper{
      display: block;
      margin: 0 auto;
      width: 500px;
      height: 500px;
      border-radius: 50%;
      border: 30px solid #fff;
      overflow: hidden;
      animation: sport 12s linear infinite;
      animation-play-state: paused;
      &.active{
        animation-play-state: running;
      }
      img{
        width: 100%;
        height: 100%;
      }
    }
    p{
      text-align: center;
      @include font_size($font_medium);
      @include font_color();
      margin-top: 50px;
    }
  }
  .lyric{
    height: 96%;
    overflow: hidden; // lyric 的前两行是自己加的
    ul{ // 花了两个钟, 找到设置 li 的方式
      li{
        height: 100%;
        //text-align: center;
        @include font_size($font_medium);
        //@include font_color();
        color: #f8f8f8;
        margin: 15px 85px;
        //&:last-of-type{ // 作用是使最后的歌词不被轮播 bullet 挡住
        //  padding-bottom: 100px;
        //}
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
<style lang="scss">
@import "../../assets/css/mixin";
.my-bullet{
  display: inline-block; // 分页器的小圆点是 span 做的
  width: 20px;
  height: 20px;
  border-radius: 10px; // 设百分比的话长条会变成椭圆形
  background: #fff;
  margin: 0 10px;
}
.my-bullet-active{
  width: 45px;
  @include bg_color();
}
</style>
