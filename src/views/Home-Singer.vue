<template>
  <div class="singer">
    <!-- 只 wrapper 部分需要距离顶部有间隙， 路由到的页面再另外写，兼容 ios 的写法 -->
    <div class="singer-wrapper">
      <ScrollView ref="scrollView">
        <ul class="list-wrapper">
          <li class="list-group" v-for="(value, index) in list" :key="index" ref="group">
            <h2 class="group-title">{{keys[index]}}</h2>
            <ul>
              <li class="group-item" v-for="obj in list[index]" :key="obj.id" @click.stop="switchSinger(obj.id)">
                <img v-lazy="obj.img1v1Url" alt="">
                <p>{{obj.name}}</p>
              </li>
            </ul>
          </li>
        </ul>
      </ScrollView>
      <!-- 侧边的快捷导航 -->
      <ul class="list-keys">
        <li v-for="(key, index) in keys"
            :key="key"
            :data-index="index"
            @touchstart.stop.prevent="touchstart"
            @touchmove.stop.prevent="touchmove"
            :class="{'active': currentIndex === index}">{{key}}</li>
      </ul>
      <!-- 吸顶红块块 -->
      <div class="fix-title" v-show="fixTitle !== ''" ref="fixTitle">{{fixTitle}}</div>
      <!-- 指定路由出口 -->
    </div>
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { getAllArtists } from '../api/index'
import ScrollView from '../components/ScrollView'
export default {
  name: 'Singer',
  components: {
    ScrollView
  },
  data () {
    return {
      keys: [],
      list: [],
      groupsTop: [],
      currentIndex: 0,
      beginOffsetY: 0,
      moveOffsetY: 0,
      scrollY: 0
    }
  },
  watch: {
    list () {
      // console.log(this.$refs.group)
      // 注意点: watch只能监听数据的变化, 数据变化的时候不一定已经渲染完了
      //         所以为了保证是渲染完成之后再去获取, 我们可以借助Vue的$nextTick方法来实现
      //         也就是说在$nextTick回调函数中一定能拿到渲染完成只有的数据, 因为 $nextTick 的回调函数只有渲染完成之后才会执行
      // wow!
      this.$nextTick(() => {
        // console.log(this.$refs.group)
        this.$refs.group.forEach((group) => {
          this.groupsTop.push(group.offsetTop)
        })
      })
    },
    // 用来做下一个标题顶出上一个标题
    fixTitle () {
      this.$nextTick(() => {
        this.fixTitleHeight = this.$refs.fixTitle.offsetHeight
      })
    }
  },
  computed: {
    // 吸顶效果!
    fixTitle () {
      if (this.scrollY >= 0) {
        return ''
      } else {
        return this.keys[this.currentIndex]
      }
    }
  },
  created () {
    getAllArtists()
      .then((result) => {
        // console.log(result)
        this.keys = result.keys
        this.list = result.list
      })
      .catch(function (err) {
        console.log(err)
      })
  },
  mounted () {
    // 这个虽然写在 mounted 里面, 但作用有点类似写在 computed 或者 watch 里, 原因是只要滚动就会触发这个事件
    this.$refs.scrollView.scrolling((y) => {
      this.scrollY = y
      // 处理第一个区域
      if (y >= 0) {
        this.currentIndex = 0
        return
      }
      // 处理中间区域
      for (let i = 0; i < this.groupsTop.length - 1; i++) {
        const preTop = this.groupsTop[i]
        const nextTop = this.groupsTop[i + 1]
        if (-y >= preTop && -y <= nextTop) {
          this.currentIndex = i

          // 1.用下一组标题的偏移位 + 当前滚动出去的偏移位
          const diffOffsetY = nextTop + y
          let fixTitleOffsetY = 0
          // 2.判断计算的结果是否是 0 ~ 分组标题高度的值
          if (diffOffsetY >= 0 && diffOffsetY <= this.fixTitleHeight) {
            fixTitleOffsetY = diffOffsetY - this.fixTitleHeight
          } else {
            fixTitleOffsetY = -2
          }
          if (fixTitleOffsetY === this.fixTitleOffsetY) {
            return
          }
          this.fixTitleOffsetY = fixTitleOffsetY
          // 这个还能滚回来!
          this.$refs.fixTitle.style.transform = `translateY(${fixTitleOffsetY}px)`
          return
        }
      }
      // 处理最后一个区域
      this.currentIndex = this.groupsTop.length - 1
    })
  },
  methods: {
    // 前缀下划线表示私有方法
    _keyDown (index) {
      this.currentIndex = index
      // console.log(index)
      const offsetY = this.groupsTop[index]
      // console.log(offsetY)
      this.$refs.scrollView.scrollTo(0, -offsetY)
    },
    touchstart (e) {
      // console.log(e.target.dataset)
      const index = parseInt(e.target.dataset.index)
      this._keyDown(index)
      this.beginOffsetY = e.touches[0].pageY
    },
    touchmove (e) {
      this.moveOffsetY = e.touches[0].pageY
      const offsetY = (this.moveOffsetY - this.beginOffsetY) / e.target.offsetHeight
      // console.log(offsetY)
      let index = parseInt(e.target.dataset.index) + Math.floor(offsetY)
      if (index < 0) {
        index = 0
      } else if (index > this.keys.length - 1) {
        index = this.keys.length - 1
      }
      this._keyDown(index)
    },
    switchSinger (id) {
      this.$router.push(`/singer/detail/${id}/singer`)
    }
  }
}
</script>

<style scoped lang="scss">
@import "../assets/css/variable";
@import "../assets/css/mixin";
.singer{
  width: 100%;
  height: 100%;
  .singer-wrapper{
    position: fixed;
    top: 184px;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
    @include bg_sub_color();
    .list-wrapper{
      /*width: 100%;*/
      /*height: 100%;*/
      .list-group{
        .group-title{
          @include bg_color();
          @include font_size($font_medium);
          color: #fff;
          padding: 10px 20px;
          box-sizing: border-box;
        }
        .group-item{
          display: flex;
          justify-content: flex-start;
          padding: 10px 20px;
          border-bottom: 1px solid #ccc;
          img{
            width: 100px;
            height: 100px;
            border-radius: 50%;
            overflow: hidden;
          }
          p{
            @include font_size($font_medium);
            @include font_color();
            display: flex;
            align-items: center;
            margin-left: 20px;
          }
        }
      }
    }
    .list-keys{
      position: fixed;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      li{
        @include font_color();
        @include font_size($font_medium_s);
        padding: 3px 0;
        &.active{
          text-shadow: 0 0 10px #000;
        }
      }
    }
    .fix-title{
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      padding: 10px 20px;
      box-sizing: border-box;
      @include font_size($font_medium);
      color: #fff;
      @include bg_color();
    }
  }
}
.v-enter{
  transform: translateX(100%);
}
.v-enter-to{
  transform: translateX(0%);
}
.v-enter-active{
  transition: transform 1s;
}
.v-leave{
  transform: translateX(0%);
}
.v-leave-to{
  transform: translateX(100%);
}
.v-leave-active{
  transition: transform 1s;
}
</style>
