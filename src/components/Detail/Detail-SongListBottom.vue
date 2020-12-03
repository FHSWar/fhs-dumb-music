<template>
  <ul class="detail-bottom">
<!--    <li class="bottom-top">-->
    <li class="bottom-top" @click="selectAllMusic">
    <div class="bottom-icon"></div>
      <div class="bottom-title">播放全部</div>
    </li>
<!--    <li v-for="value in playlist" :key="value.id" class="item">-->
<!--    <li v-for="value in playlist" :key="value.id" class="item" @click="selectMusic">-->
    <li v-for="value in playlist" :key="value.id" class="item" @click="selectMusic(value.id)">
      <h3>{{value.name}}</h3>
      <p>{{value.al.name}} - {{value.ar[0].name}}</p>
    </li>
  </ul>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'DetailBottom',
  props: {
    playlist: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  methods: {
    ...mapActions([
      'setFullScreen',
      'setSongDetail'
    ]),
    // selectMusic () {
    selectMusic (id) { // 我应该就是错在这里没传 id! 淦, 复制也是技术活, 还不是列文虎克
      // this.$store.dispatch('setFullScreen', true)
      this.setFullScreen(true)
      this.setSongDetail([id])
    },
    selectAllMusic () {
      this.setFullScreen(true)
      const ids = this.playlist.map(function (item) {
        return item.id
      })
      this.setSongDetail(ids)
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/css/variable";
@import "../../assets/css/mixin";
.detail-bottom{
  min-height: 101%; // 无论内容是否撑满容器都可以滚动
  width: 100%;
  li{
    width: 100%;
    height: 100px;
    padding: 20px;
    box-sizing: border-box;
    @include bg_sub_color();
    border-bottom: 1px solid #ccc;
  }
  .bottom-top{
    display: flex;
    align-items: center;
    border-top-left-radius: 35px;
    border-top-right-radius: 35px;
    border-bottom: 2px solid rgba(208, 208, 208, 0.7);
    .bottom-icon{
      width: 60px;
      height: 60px;
      @include bg_img('../../assets/images/small_play');
      margin-right: 20px;
    }
    .bottom-title{
      @include font_color();
      @include font_size($font_large);
    }
  }
  .item{
    h3{
      @include font_color();
      @include font_size($font_medium);
      @include no-wrap()
    }
    p{
      @include font_color();
      @include font_size($font_small);
      margin-top: 10px;
      opacity: 0.8;
    }
  }
}
</style>
