
import {
  reqGoods,
  reqRatings,
  reqInfo,
} from '../../Api'

import {
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO,
} from '../mutations-types'

const state = {
  goods:[],
  ratings:[],
  info:{}
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
  }
}
const getters = {

}

export default {
    state,
    actions,
    mutations,
    getters
}
