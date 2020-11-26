<template>
  <div id="app" class="wrapper" ref="wrapper">
    <Header></Header>
    <Tabbar></Tabbar>
    <router-view></router-view> <!-- 不给路由出口哪有得显示啊弟弟 -->
  </div>
</template>
<script>
import Header from './components/Player/PlayerHeader'
import Tabbar from './components/Player/PlayerTabBar'
export default {
  name: 'App',
  components: {
    Header,
    Tabbar
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
