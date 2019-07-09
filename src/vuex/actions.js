
import Cookies from 'js-cookie'
import {
  reqAddress,
  reqCategorys,
  reqShops
} from '../Api'

import {RECEIVE_ADDRESS,RECEIVE_CATEGORYS,RECEIVE_SHOPS,RECEIVE_USER,RESET_USER} from './mutations-types'
 
export default {
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


  pwdLogin({commit},user){
      localStorage.setItem('token_key',user.token)
      commit(RECEIVE_USER,{user})
  },
  
  logOut({commit}){
    commit(RESET_USER)
    localStorage.removeItem('token_key')
    Cookies.remove('user_id')
  }

}