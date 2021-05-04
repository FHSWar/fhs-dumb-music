<template>
  <div class="detail">
    <SubHeader :title="playlist.name"></SubHeader>
    <DetailTop :path="playlist.coverImgUrl" ref="top"></DetailTop>
    <div class="bottom">
      <ScrollView ref="scrollView">
        <DetailBottom :playlist="playlist.tracks"></DetailBottom>
      </ScrollView>
    </div>
  </div>
</template>

<script>
import { getPlayList, getAlbum, getArtistsSongs, getTopList } from '@/api'
import ScrollView from '@/components/ScrollView'
import SubHeader from '@/components/Detail/Detail-Header'
import DetailTop from '@/components/Detail/Detail-Top'
import DetailBottom from '@/components/Detail/Detail-SongListBottom'
import MetaInfo from '../../vue-meta-info'

export default {
  name: 'Detail',
  metaInfo: MetaInfo.detail,
  components: {
    SubHeader,
    DetailTop,
    DetailBottom,
    ScrollView
  },
  data: function () {
    return {
      playlist: {}
    }
  },
  created () {
    // console.log(this.$route.params.type)
    if (this.$route.params.type === 'personalized') {
      getPlayList({ id: this.$route.params.id })
        .then((data) => {
          // console.log(data)
          this.playlist = data.playlist
          // this.playlist.tracks = this.playlist.tracks.splice(0, 3) // 切也要切对地方啊弟弟
        })
        .catch((err) => {
          console.log(err)
        })
    } else if (this.$route.params.type === 'album') {
      getAlbum({ id: this.$route.params.id })
        .then((data) => {
          // console.log(data)
          this.playlist = {
            name: data.album.name,
            coverImgUrl: data.album.picUrl,
            tracks: data.songs
          }
        })
        .catch((err) => {
          console.log(err)
        })
    } else if (this.$route.params.type === 'singer') {
      getArtistsSongs({ id: this.$route.params.id })
        .then((data) => {
          this.playlist = {
            name: data.artist.name,
            coverImgUrl: data.artist.picUrl,
            tracks: data.hotSongs
          }
        })
        .catch((err) => {
          console.log(err)
        })
    } else if (this.$route.params.type === 'rank') {
      getTopList({ idx: this.$route.params.id })
        .then((data) => {
          this.playlist = {
            name: data.playlist.name,
            coverImgUrl: data.playlist.creator.backgroundUrl,
            tracks: data.playlist.tracks
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  mounted () {
    const defaultHeight = this.$refs.top.$el.offsetHeight // 通过 组件.$ef 能拿到组件的根元素
    // console.log(defaultHeight)
    this.$refs.scrollView.scrolling((offsetY) => {
      // console.log(offsetY)
      if (offsetY < 0) {
        // console.log('向上滚动')
        const scale = 20 * Math.abs(offsetY) / defaultHeight
        // console.log(scale)
        this.$refs.top.$el.style.filter = `blur(${scale}px)`
      } else {
        // console.log('向下滚动')
        const scale = 1 + offsetY / defaultHeight
        // console.log(scale)
        this.$refs.top.$el.style.transform = `scale(${scale})`
      }
    })
  }
}
</script>

<style scoped lang="scss">
@import "../assets/css/mixin";
.detail{
  // position: fixed; 的这一套能实现全屏覆盖
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  // 这是没用的, 如果父级也有 z-index 且较低, 那子级数值再高也不顶用
  /*z-index: 1999;*/
  @include bg_sub_color();
  .bottom {
    position: fixed;
    top: 500px;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>
