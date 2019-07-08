<template>
  <div>
    <router-view/>
    <Footer v-if="$route.meta.isShowFooter"/>
  </div>
</template>

<script type="text/ecmascript-6">
// import Header from './components/Header/Header.vue'
import Footer from './components/Footer/Footer.vue'

  export default {
    components:{
      // Header,
      Footer
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

 
</style>

