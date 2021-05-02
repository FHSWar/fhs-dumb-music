<template>
  <swiper :options="swiperOption" class="banner">
    <swiper-slide class="cd">
      <div class="cd-wrapper" ref="cdWrapper">
        <img :src="currentSong.picUrl" alt="">
      </div>
      <p>{{getFirstLyric()}}</p>
    </swiper-slide>
    <swiper-slide class="lyric" ref="lyric">
      <ScrollView ref="scrollView">
        <ul>
          <li v-for="(value, key) in currentLyric"
              :key="key"
              :class="{'active' :currentLineNum === key}"> <!-- 这个意思是只在 this.currentLineNum 为 key 时才高亮 -->
            {{value}}
          </li>
        </ul>
      </ScrollView>
    </swiper-slide>
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
  props: {
    currentTime: {
      type: Number,
      default: 0,
      required: true
    }
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
      },
      currentLineNum: '0'
    }
  },
  watch: {
    isPlaying (newValue, oldValue) {
      if (newValue) {
        this.$refs.cdWrapper.classList.add('active')
      } else {
        this.$refs.cdWrapper.classList.remove('active')
      }
    },
    currentTime (newValue, _) {
      // 1.高亮歌词同步
      const lineNum = Math.floor(newValue)
      this.currentLineNum = this.getActiveLineNum(lineNum)
      // 2.歌词滚动同步
      const currentLyricTop = document.querySelector('li.active').offsetTop
      const lyricHeight = this.$refs.lyric.$el.offsetHeight
      if (currentLyricTop > lyricHeight / 2) {
        this.$refs.scrollView.scrollTo(0, lyricHeight / 2 - currentLyricTop, 100)
        // 如果当前高亮的不大于一半, 就要滚回最初的位置
      } else {
        this.$refs.scrollView.scrollTo(0, 0, 100)
      }
    },
    currentLyric (newValue, _) {
      for (const key in newValue) {
        this.currentLineNum = key
        return
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
  methods: {
    getFirstLyric () {
      for (const key in this.currentLyric) {
        return this.currentLyric[key]
      }
    },
    getActiveLineNum (lineNum) {
      // 如果初始值值为零且歌词中没有 '0' 这个键, 取到的 result 就是 undefined, 会导致一直 line--
      if (lineNum < 0) {
        return this.currentLineNum
      }
      const result = this.currentLyric[lineNum + '']
      // 递归: 如果有些行没有歌词就一直往上翻, 翻到上面离得最近的有歌词的那一行去
      // 解决了由于某些时间没有对应的歌词而在点击进度条时没有跳到对应歌词部分的 bug
      if (result === undefined || result === '') {
        lineNum--
        return this.getActiveLineNum(lineNum)
      } else {
        return lineNum + ''
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
        color: #ccc;
        margin: 15px 85px;
          //&:last-of-type{ // 作用是使最后的歌词不被轮播 bullet 挡住
          //  padding-bottom: 100px;
          //}
        // 伪类用电嗷! 在 html 标签中只需要写 class="active" 就好了
        &.active{
          color: #fff
        }
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
