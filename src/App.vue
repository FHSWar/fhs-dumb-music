<template>
  <div id="app" class="wrapper" ref="wrapper">
    <Header/>
    <TabBar/>
    <router-view/> <!-- 不给路由出口哪有得显示啊弟弟 -->
    <Player/>
  </div>
</template>
<script>
import Header from './components/Home/Home-Header'
import TabBar from './components/Home/Home-TabBar'
import Player from './views/Player'

export default {
  name: 'App',
  components: {
    Header,
    TabBar,
    Player
  }
}
</script>
<style scoped lang="scss">
@import "assets/css/variable";
.theme{
  position: fixed;
  left: 0;
  bottom: 0;
  button{
    width: 100px;
    height: 100px;
    &:nth-of-type(1){
      background: $bgc-theme;
    }
    &:nth-of-type(2){
      background: $bgc-theme1;
    }
    &:nth-of-type(3){
      background: $bgc-theme2;
    }
  }
}
</style>
