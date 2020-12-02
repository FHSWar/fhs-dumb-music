<template>
  <!-- swiper 的 bug,如果数据是从网络获取的, 那么自动轮播到最后一页之后就不轮播了 -->
  <!-- 解决办法: 只需要在swiper组件上面加上 v-if="数据.length > 0" -->
  <swiper :options="swiperOption" class="banner" v-if="banners.length > 0">
    <!-- slides -->
    <swiper-slide v-for="value in banners" :key="value.bannerId" class="item">
      <a :href="value.url"> <!-- 跳转标签包裹图片 -->
        <img :src="value.pic" alt="">
      </a>
    </swiper-slide>
    <!-- Optional controls -->
    <div class="swiper-pagination"  slot="pagination"></div>
  </swiper>
</template>

<script>
// import 'swiper/dist/css/swiper.css' 这样写会报错
import 'vue-awesome-swiper/node_modules/swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'Banner',
  data () {
    return {
      swiperOption: {
        loop: true, // 循环模式选项
        autoplay: {
          delay: 3000, // 自动切换的时间间隔，单位ms
          stopOnLastSlide: false, // 当切换到最后一个slide时停止自动切换
          disableOnInteraction: false // 用户操作swiper之后，是否禁止autoplay。
        },
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination'
        },
        observer: true,
        observeParents: true,
        observeSlideChildren: true
      }
    }
  },
  props: { // 用 props 接收父组件传递过来的数据
    // props 的值是花括号包裹的好处: 可以进行类型验证, 非空验证和指定默认值
    banners: {
      type: Array,
      default: () => [], // 这是 vue 的语法要求
      required: true
    }
  },
  components: {
    swiper,
    swiperSlide
  }
}
</script>

<style scoped lang="scss">
.banner{
  .item{
    img{
      width: 100%;
      height: 300px;
    }
  }
}
</style>
<style lang="scss">
@import "../../assets/css/mixin";
/*注意点: 如果想覆盖swiper的样式, 那么style标签不能是scoped的, 否则无法覆盖*/
.banner{
  .swiper-pagination-bullet{
    width: 16px;
    height: 16px;
    background: rgba(255, 255, 255, 0.5);
    opacity: 1;
  }
  .swiper-pagination-bullet-active{
    @include bg_color();
    /*background: #f00;*/
  }
}
</style>
