<template>
  <div class="personalized">
    <div class="personalized-top">
      <h3>{{title}}</h3>
    </div>
    <div class="personalized-list">
      <div class="item" v-for="value in personalized" :key="value.id">
        <!-- <img :src="value.picUrl" alt=""> -->
        <img v-lazy="value.picUrl" alt="">
        <p>{{value.name}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Personalized',
  props: {
    personalized: {
      type: Array,
      default: () => [],
      required: true
    },
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
.personalized{
  @include bg_sub_color();
  .personalized-top{
    position: relative;
    width: 100%;
    height: 84px;
    line-height: 84px;
    @include bg_sub_color();
    padding: 0 20px 0 0;
    border-bottom: 2px solid rgba(208, 208, 208, 0.5);
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
  .personalized-list{
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    padding: 20px 0 0 0;
    .item{
      width: 200px;
      padding-bottom: 20px;
      img{
        width: 200px;
        height: 200px;
        border-radius: 15px;
      }
      p{
        padding: 0 3px;
        text-align: center;
        @include clamp(1);
        @include font_color();
        @include font_size($font_medium_s);
      }
    }
  }
}
</style>
