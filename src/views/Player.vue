<template>
  <div class="player">
    <NormalPlayer></NormalPlayer>
<!--    <MiniPlayer @showList="showList"></MiniPlayer>-->
    <MiniPlayer></MiniPlayer>
    <ListPlayer ref="listPlayer"></ListPlayer>
  </div>
</template>

<script>
import NormalPlayer from '../components/Player/NormalPlayer'
import MiniPlayer from '../components/Player/MiniPlayer'
import ListPlayer from '@/components/Player/ListPlayer'
import { mapGetters } from 'vuex'

export default {
  name: 'Player',
  components: {
    NormalPlayer,
    MiniPlayer,
    ListPlayer
  },
  // methods: {
  //   ...mapActions([
  //     'setMiniPlayer'
  //   ]),
  //   showList () {
  //     this.$refs.listPlayer.show()
  //     this.setMiniPlayer(false)
  //   }
  // },
  computed: {
    ...mapGetters([
      'isShowMiniPlayer'
    ])
  }
}
</script>

<style scoped lang="scss">

</style>
