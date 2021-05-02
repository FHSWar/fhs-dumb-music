<template>
  <div class="recommend">
    <div class="recommend-wrapper">
      <ScrollView>
        <div>
          <Banner :banners="banners"></Banner> <!-- 通过 v-bind 传数据给子组件 -->
          <!--
          这里有个注意点: title 的值的双引号是 html 标签的要求,
          里面如果是字符串就还得用引号代表字符串,
           单引号或者反引号都可以
           -->
          <!-- 最新专辑 -->
          <Personalized
            :personalized="albums"
            :title="'最新专辑'"
            @select="fatherSelectItem"
            :type="'album'"></Personalized>
          <!-- 热曲列表 -->
          <SongList :songs="songs"></SongList>
          <!-- 推荐歌单 -->
          <Personalized
            :personalized="personalized"
            :title="'推荐歌单'"
            @select="fatherSelectItem"
            :type="'personalized'"></Personalized>
        </div>
      </ScrollView>
    </div>
<!--    <transitions>-->
    <transition
      :css="false"
      @enter="enter"
      @leave="leave">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { getBanner, getPersonalized, getNewAlbum, getNewSong } from '../api/index'
import Banner from '../components/Home/Home-Banner'
import Personalized from '../components/Home/Home-Personalized'
import SongList from '../components/Home/Home-SongList'
import ScrollView from '../components/ScrollView'
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'

export default {
  name: 'Recommend',
  components: {
    Banner,
    Personalized,
    SongList,
    ScrollView
  },
  data () {
    return {
      banners: [],
      personalized: [],
      albums: [],
      songs: []
    }
  },
  methods: {
    fatherSelectItem (id, type) {
      this.$router.push({
        path: `/recommend/detail/${id}/${type}`
      })
    },
    enter (el, done) {
      Velocity(el, 'transition.slideLeftIn', { duration: 800 }, function () {
        done()
      })
    },
    leave (el, done) {
      Velocity(el, 'transition.slideLeftOut', { duration: 250 }, function () {
        done()
      })
    }
  },
  created () {
    getBanner()
      .then((data) => { // 用到了 this, 箭头函数是个好选择
        // console.log(data) 要启动本地服务器之后才请求得到, 切记切记
        this.banners = data.banners.splice(0, 3)
      })
      .catch(function (err) {
        console.log(err)
      })
    getPersonalized()
      .then((data) => {
        // console.log(data)
        this.personalized = data.result
      })
      .catch(function (err) {
        console.log(err)
      })
    getNewAlbum()
      .then((data) => {
        // console.log(data.albums.splice(0, 6)) // 高, 实在是高
        this.albums = data.albums.splice(0, 6)
      })
      .catch(function (err) {
        console.log(err)
      })
    getNewSong()
      .then((data) => {
        // console.log(data)
        // this.songs = data.result.splice(0, 3)
        // console.log(data.result)
        const list = []
        data.result.forEach((value) => {
          const obj = {}
          obj.id = value.id
          obj.name = value.name
          obj.picUrl = value.song.album.picUrl
          let singer = ''
          for (let i = 0; i < value.song.artists.length; i++) {
            if (i === 0) {
              singer = value.song.artists[i].name
            } else {
              singer += '-' + value.song.artists[i].name
            }
          }
          obj.singer = singer
          list.push(obj)
        })
        this.songs = list
      })
      .catch(function (err) {
        console.log(err)
      })
  }
}
</script>

<style scoped lang="scss">
  .recommend{
    position: fixed;
    top: 184px;
    left: 0;
    right: 0;
    bottom: 0;
    //overflow: hidden; // 优雅的解决方案
    .recommend-wrapper{ // 改称这个可以解决 iphone 端歌曲详情页头部被首页头部盖住的 bug, 老师又打错字了
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
  }

  // 过于生硬, 换成 velocity-animate 的 Plugins 来做
  //.v-enter{
  //  transform: translateX(-100%);
  //}
  //.v-enter-to{
  //  transform: translateX(0%);
  //}
  //.v-enter-active{
  //  transition: transform 0.5s;
  //}
  //.v-leave{
  //  transform: translateX(0%);
  //}
  //.v-leave-to{
  //  transform: translateX(-100%);
  //}
  //.v-leave-active{
  //  transition: transform 0.5s;
  //}
</style>
