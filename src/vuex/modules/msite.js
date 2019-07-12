
import {
  reqAddress,
  reqCategorys,
  reqShops,
} from '../../Api'

import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
} from '../mutations-types'


const state = {
  longitude:116.36867,
  latitude:40.10038,
  
  address:{},
  categorys:[],
  shops:[],
}
const actions = {
  async getAddress({commit,state}) {
    const {longitude,latitude} = state
    const result = await reqAddress(longitude, latitude)
    if (result.code === 0) {
      const address = result.data
      commit(RECEIVE_ADDRESS,address)
    }
  },


  async getCategorys({commit}) {
    const result = await reqCategorys()

    if (result.code === 0) {
      const categorys = result.data
      commit(RECEIVE_CATEGORYS,categorys)
    }
  },


  async getShops({commit,state}) {
    const {longitude,latitude} = state
    const result = await reqShops({latitude,longitude})
    if (result.code === 0) {
      const shops = result.data
      commit(RECEIVE_SHOPS,shops)
    }
  },
}
const mutations = {
  [RECEIVE_ADDRESS](state, address) {
    state.address = address
  },
  [RECEIVE_CATEGORYS](state, categorys) {
    state.categorys = categorys
  },
  [RECEIVE_SHOPS](state, shops) {
    state.shops = shops
  },
}
const getters = {

}

export default {
    state,
    actions,
    mutations,
    getters
}

