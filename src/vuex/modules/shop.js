import Vue from 'vue'
import {
  reqGoods,
  reqRatings,
  reqInfo,
} from '../../Api'

import {
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO,
  ADD_GOOD_COUNT,
  DELETE_GOOD_COUNT,
  CLEAR_CART
} from '../mutations-types'

const state = {
  goods:[],
  ratings:[],
  info:{},
  cartFoods:[]
}
const actions = {
  async getShopInfo({commit},cb){
    const result = await reqGoods()
    if(result.code===0){
      const goods = result.data
      commit(RECEIVE_GOODS,{goods})
      cb && cb()
    }
  },

  async getShopGoods({commit},cb){
    const result = await reqRatings()
    if(result.code===0){
      const ratings = result.data
      commit(RECEIVE_RATINGS,{ratings})
      cb && cb()
    }
  },

  async getShopRatings({commit},cb){
    const result = await reqInfo()
    if(result.code===0){
      const info = result.data
      commit(RECEIVE_INFO,{info})
      cb && cb()
    }
  },

  updateFoodCount({commit},{isAdd,food}){
    if(isAdd){
      commit(ADD_GOOD_COUNT,food)
    }else{
      commit(DELETE_GOOD_COUNT,food)
    }
  }
}
const mutations = {
  [RECEIVE_GOODS](state,{goods}) {
    state.goods = goods
  },
  [RECEIVE_RATINGS](state,{ratings}) {
    state.ratings = ratings
  },
  [RECEIVE_INFO](state,{info}) {
    state.info = info
  },
  [ADD_GOOD_COUNT](state,food){
    if(!food.hasOwnProperty('count')){
      Vue.set(food, 'count', 1)
      state.cartFoods.push(food)
    }else{
      food.count++
    }
  },
  [DELETE_GOOD_COUNT](state,food){
    if(food.count>0){
      food.count--
      if(food.count === 0){
        delete food.count
        state.cartFoods.splice(state.cartFoods.indexOf(food), 1)
      }
    }
  },
  [CLEAR_CART](state){
    state.cartFoods.forEach(food=> food.count = 0)
    state.cartFoods = []
  }
}
const getters = {
  totalCount(state){
    return state.cartFoods.reduce((pre,food) => pre + food.count ,0)
  },
  totalPrice(state){
    return state.cartFoods.reduce((pre,food) => pre + food.price * food.count,0)
  },
  positiveRatingsCount(state){
    return state.ratings.reduce((pre,rating)=>pre + (rating.rateType===0? 1 : 0) ,0)
  }
}

export default {
    state,
    actions,
    mutations,
    getters
}
