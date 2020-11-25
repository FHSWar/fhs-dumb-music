<template>
  <div id="app">
    <Header></Header>
  </div>
</template>
<script>
import Header from './components/Player/PlayerHeader'
export default {
  name: 'App',
  components: {
    Header
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
