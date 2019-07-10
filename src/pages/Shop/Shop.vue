<template>
  <div>
      <ShopHeader/>
      <router-link to="/shop/shopgoods">点餐</router-link>
      <router-link to="/shop/shopratings">评价</router-link>
      <router-link to="/shop/shopinfo">商家</router-link>
      <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import ShopHeader from '../../components/ShopHeader/ShopHeader.vue'
  export default {
      components:{
          ShopHeader
      }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

 
</style>
