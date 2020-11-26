<template>
  <div class="song">
    <div class="song-top">
      <h3>最新音乐</h3>
    </div>
    <ul class="song-list">
      <li v-for="value in songs" :key="value.id" class="item">
        <!-- <img :src="value.song.album.picUrl" alt=""> -->
        <img v-lazy="value.song.album.picUrl" alt="">
        <div>
          <h3>{{value.name}}</h3>
          <p>{{value.song.artists[0].name}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SongList',
  props: {
    songs: {
      type: Array,
      default: () => [],
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/css/mixin";
@import "../../assets/css/variable";
.song{
  width: 100%;
  @include bg_sub_color();
  .song-top{
    position: relative;
    width: 100%;
    height: 84px;
    line-height: 84px;
    @include bg_sub_color();
    border-bottom: 2px solid rgba(208, 208, 208, 0.5);
    padding: 0 20px 0 0;
    &:before{
      content: "";
      display: inline-block;
      width: 1%;
      height: 80%;
      margin: 8px 20px 0 0 ;
      border-radius: 5px;
      @include bg_color()
    }
    h3{
      display: inline-block;
      position: absolute;
      top: 50%;
      /* margin-left: 负的元素宽度的一半; */
      transform: translateY(-50%);
      line-height: 84px;
      @include font_size($font_large);
      //font-weight: bold;
      @include font_color();
    }
  }
  .song-list{
    width: 100%;
    overflow: hidden;
    .item{
      width: 100%;
      height: 150px;
      display: flex;
      align-items: center;
      padding: 0 20px;
      margin-bottom: 20px;
      border-bottom: 1px solid #ccc;
      img{
        width: 100px;
        height: 100px;
        border-radius: 20px;
        margin-right: 20px;
      }
      div{
        h3{
          @include font_size($font_large);
          @include font_color();
        }
        p{
          @include font_size($font_small);
          @include font_color();
          opacity: 0.6;
          margin-top: 20px;
        }
      }
    }
  }
}
</style>
