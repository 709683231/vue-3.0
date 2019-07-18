<template>
  <div class="ratings" ref="ratingsScroll">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{info.foodScore}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{info.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <div>
              <Stars :size="36" :score="info.serviceScore"></Stars>
            </div>
              <span class="title">服务态度</span>
            <span class="score">{{info.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <div>
              <Stars :size="36" :score="info.deliveryPrice"></Stars>
            </div>
            <span class="title">商品评分</span>
            <span class="score">{{info.deliveryPrice}}</span></div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{info.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>

      <Split/>

      <RatingsFilter :onlyText="onlyText" :selectType="selectType"/>

      <div class="rating-wrapper" >
        <ul >
          <li class="rating-item" v-for="(rating,index) in ratingsFilter" :key="index">
            <div class="avatar">
              <img width="28" height="28" :src="rating.avatar">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <Stars :score="rating.score" :size="24"/>
                <span class="delivery">{{rating.deliveryTime}}</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend">
                <span class="iconfont icon-thumb_up"></span>
              </div>
              <div class="time">2016-12-11 12:02:13</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapState } from 'vuex'
  import BScroll from 'better-scroll'
  import Split from '../../../components/Split/Split.vue'
  import RatingsFilter from '../../../components/RatingsFilter/RatingsFilter.vue'
  export default {
    data(){
      return {
        onlyText: true,
        selectType: 1, // 2: 全部, 0: 推荐, 1: 吐槽
      }
    },
    mounted(){
      this.$eventbus.$on('setSelectType',this.setSelectType)
      this.$eventbus.$on('setOnlyText',this.setOnlyText)
      if(this.ratings.length>0){
        this.ratingsScrolls = new BScroll(this.$refs.ratingsScroll,{
          click:true
        })
      }
    },
    methods:{
      setSelectType(type){
        this.selectType = type
      },
      setOnlyText(){
        this.onlyText = !this.onlyText
      }
    },

    computed:{
      ...mapState({
        info:state => state.shop.info,
        ratings:state => state.shop.ratings
      }),

      ratingsFilter(){
        let { ratings, onlyText, selectType } = this
        return ratings.filter(rating=>{
          const { rateType, text } = rating
          //rateType 0/1   0好                                   1
          //text  length>0                                    2

          //  onlyText: true,                                 2
          //  selectType: 1, // 2: 全部, 0: 推荐, 1: 吐槽         1
         
          return (selectType===2 || selectType===rateType) && (!onlyText || text.length>0)
        })
      }
    },

    components:{
      RatingsFilter,
      Split
    },

    watch:{
      ratings(){
        this.$nextTick(()=>{
          this.ratingsScrolls = new BScroll(this.$refs.ratingsScroll,{
            click:true
          })
        })
      }
    },

  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"

  .ratings
    position: absolute
    top: 225px
    bottom: 0
    left: 0
    width: 100%
    overflow: hidden
    background: #fff
    .overview
      display: flex
      padding: 18px 0
      .overview-left
        flex: 0 0 137px
        padding: 6px 0
        width: 137px
        border-right: 1px solid rgba(7, 17, 27, 0.1)
        text-align: center
        @media only screen and (max-width: 320px)
          flex: 0 0 120px
          width: 120px
        .score
          margin-bottom: 6px
          line-height: 28px
          font-size: 24px
          color: rgb(255, 153, 0)
        .title
          margin-bottom: 8px
          line-height: 12px
          font-size: 12px
          color: rgb(7, 17, 27)
        .rank
          line-height: 10px
          font-size: 10px
          color: rgb(147, 153, 159)
      .overview-right
        flex: 1
        padding: 6px 0 6px 24px
        @media only screen and (max-width: 320px)
          padding-left: 6px
        .score-wrapper
          margin-bottom: 8px
          font-size: 0
          .title
            display: inline-block
            line-height: 18px
            vertical-align: top
            font-size: 12px
            color: rgb(7, 17, 27)
          .star
            display: inline-block
            margin: 0 12px
            vertical-align: top
          .score
            display: inline-block
            line-height: 18px
            vertical-align: top
            font-size: 12px
            color: rgb(255, 153, 0)
        .delivery-wrapper
          font-size: 0
          .title
            line-height: 18px
            font-size: 12px
            color: rgb(7, 17, 27)
          .delivery
            margin-left: 12px
            font-size: 12px
            color: rgb(147, 153, 159)
    .rating-wrapper
      padding: 0 18px
      .rating-item
        display: flex
        padding: 18px 0
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        .avatar
          flex: 0 0 28px
          width: 28px
          margin-right: 12px
          img
            border-radius: 50%
        .content
          position: relative
          flex: 1
          .name
            margin-bottom: 4px
            line-height: 12px
            font-size: 10px
            color: rgb(7, 17, 27)
          .star-wrapper
            margin-bottom: 6px
            font-size: 0
            .star
              display: inline-block
              margin-right: 6px
              vertical-align: top
            .delivery
              display: inline-block
              vertical-align: top
              line-height: 12px
              font-size: 10px
              color: rgb(147, 153, 159)
          .text
            margin-bottom: 8px
            line-height: 18px
            color: rgb(7, 17, 27)
            font-size: 12px
          .recommend
            line-height: 16px
            font-size: 0
            .icon-thumb_up, .icon-thumb_down, .item
              display: inline-block
              margin: 0 8px 4px 0
              font-size: 9px
            .icon-thumb_up
              color: $yellow
            .icon-thumb_down
              color: rgb(147, 153, 159)

            .item
              padding: 0 6px
              border: 1px solid rgba(7, 17, 27, 0.1)
              border-radius: 1px
              color: rgb(147, 153, 159)
              background: #fff
          .time
            position: absolute
            top: 0
            right: 0
            line-height: 12px
            font-size: 10px
            color: rgb(147, 153, 159)
</style>


