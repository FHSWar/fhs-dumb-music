<template>
  <div class="recommend">
    <ScrollView>
      <div>
        <Banner :banners="banners"></Banner> <!-- 通过 v-bind 传数据给子组件 -->
        <!--
        这里有个注意点: title 的值的双引号是 html 标签的要求,
        里面如果是字符串就还得用引号代表字符串,
         单引号或者反引号都可以
         -->
        <Personalized :personalized="personalized" :title="'推荐歌单'"></Personalized>
        <Personalized :personalized="albums" :title="'最新专辑'"></Personalized>
        <SongList :songs="songs"></SongList>
      </div>
    </ScrollView>
  </div>
</template>

<script>
import { getBanner, getPersonalized, getNewAlbum, getNewSong } from '../api/index'
import Banner from '../components/Player/PlayerBanner'
import Personalized from '../components/Player/Personalized'
import SongList from '../components/Player/SongList'
import ScrollView from '../components/ScrollView'

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
        this.songs = data.result.splice(0, 3)
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
  }
</style>
