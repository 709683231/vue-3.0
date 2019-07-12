
import {
  reqAutoLogin,
} from '../../Api'

import {
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_TOKEN,
  RESET_TOKEN,

} from '../mutations-types'

const state = {
  user:{},
  token:localStorage.getItem('token_key'),
}
const actions = {
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
const mutations = {
  [RECEIVE_USER](state, {user}) {
    state.user = user
  },
  [RECEIVE_TOKEN](state,{token}) {
    state.token = token
  },
  [RESET_USER](state) {
    state.user = {}
  },
  [RESET_TOKEN](state) {
    state.token = ''
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
