<template>
<!--  template<div class="header" @click="changeTheme">
    <div class="header-left" @click.stop="back"></div>
    <p class="header-title">{{title}}</p>
    <div class="header-right"></div>
  </div>-->
  <Header class="header">
    <div slot="left" class="header-left" @click.stop="back"></div>
    <p slot="center" class="header-title">{{title}}</p>
    <div slot="right" class="header-right"></div>
  </Header>
</template>

<script>
import Header from '../Home/Home-Header'
export default {
  name: 'SubHeader',
  components: {
    Header
  },
  /* data () {
    return {
      themes: ['theme', 'theme1', 'theme2'],
      index: 0
    }
  }, */
  methods: {
    /* changeTheme () {
      this.index++
      if (this.index >= this.themes.length) {
        this.index = 0
      }
    }, */
    back () {
      window.history.back()
    }
  },
  props: {
    title: {
      type: String,
      default: '',
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/css/variable";
@import "../../assets/css/mixin";
.header{
 /* width: 100%;
  height: 100px;
  !*background: #f00;*!
  @include bg_color();
  display: flex;
  justify-content: space-between;
  position: relative;
  z-index: 999;
  .header-left, .header-right{
    width: 48px;
    height: 48px;
    !*background: #000;*!
  }*/
  .header-left{
    //margin-top: 21px;
    padding-left: 15px;
    @include bg_img('../../assets/images/back');
  }
  .header-right{
    //margin-top: 24px;
    padding-right: 10px;
    @include bg_img('../../assets/images/more')
  }
  .header-title{
    width: 60%; // 不做限制的话, 一旦标题太长看起来就很丑 (老师后来也加上了 hhhh)
    text-align: center;
    line-height: 100px;
    color: #fff;
    font-weight: bold;
    @include font_size($font_medium);
    @include no-wrap();
  }
}
</style>
