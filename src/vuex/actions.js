
// import Cookies from 'js-cookie'
import {
  reqAddress,
  reqCategorys,
  reqShops,
  reqAutoLogin
} from '../Api'

import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_TOKEN,
  RESET_TOKEN
} from './mutations-types'
 
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


  receiveUser({commit},user){
      localStorage.setItem('token_key',user.token)
      commit(RECEIVE_TOKEN,{token : user.token})
      delete user.token
      commit(RECEIVE_USER,{user})
  },

  
  logOut({commit}){
    commit(RESET_USER)
    commit(RESET_TOKEN)
    localStorage.removeItem('token_key')
  },


  async autoLogin({commit,state}){
    const token = state.token
    if(token){
      const result = await reqAutoLogin()
      if(result.code===0){
        const user = result.data
        commit(RECEIVE_USER,{user})
      }
    }
  },


}